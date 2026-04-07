/**
 * Sync inteligente de paquetes — versión CI (GitHub Actions)
 * Lee credenciales de env vars en vez de archivos locales.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { google } from "googleapis";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const OUTPUT_JSON = path.resolve(ROOT, "src/data/packages.json");
const OUTPUT_IMAGES = path.resolve(ROOT, "public/packages/flyers");
const ROOT_FOLDER_ID = "1T2Q1ZZonR9NW7e_a6165KmR3s8i_7RXW";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Service Account from env var (file path) or inline JSON
const SA_PATH = process.env.GOOGLE_SERVICE_ACCOUNT_PATH;
if (!SA_PATH || !fs.existsSync(SA_PATH)) {
  console.error("❌ GOOGLE_SERVICE_ACCOUNT_PATH not set or file not found");
  process.exit(1);
}
if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY not set");
  process.exit(1);
}

const SKIP_FOLDERS = ["ITINERARIOS", "ULTIMOS LUGARES", "ÚLTIMOS LUGARES"];

const CONTINENT_MAP = {
  EUROPA: "europa",
  ASIA: "asia",
  "MEDIO ORIENTE": "medio-oriente",
  "AMÉRICA": "america",
};

function parseDepartureCity(folderName) {
  const lower = folderName.toLowerCase();
  if (lower.includes("cdmx") || lower.includes("ciudad de méxico")) return "CDMX";
  if (lower.includes("mty") || lower.includes("monterrey")) return "Monterrey";
  if (lower.includes("gdl") || lower.includes("guadalajara")) return "Guadalajara";
  if (lower.includes("qro") || lower.includes("querétaro") || lower.includes("queretaro")) return "Querétaro";
  if (lower.includes("cancún") || lower.includes("cancun")) return "Cancún";
  return null;
}

function slugify(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\.[^.]+$/, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// ---- Drive ----

const auth = new google.auth.GoogleAuth({
  keyFile: SA_PATH,
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});
const drive = google.drive({ version: "v3", auth });

async function listFiles(folderId) {
  const res = await drive.files.list({
    q: `'${folderId}' in parents and trashed = false`,
    fields: "files(id, name, mimeType)",
    pageSize: 100,
  });
  return res.data.files || [];
}

async function downloadFile(fileId) {
  const res = await drive.files.get({ fileId, alt: "media" }, { responseType: "arraybuffer" });
  return Buffer.from(res.data);
}

async function scanDrive(folderId = ROOT_FOLDER_ID, pathParts = [], continent = null, departureCity = null) {
  const files = await listFiles(folderId);
  const results = [];

  for (const file of files) {
    if (file.mimeType === "application/vnd.google-apps.folder") {
      if (SKIP_FOLDERS.includes(file.name.toUpperCase())) continue;
      const continentSlug = CONTINENT_MAP[file.name.toUpperCase()];
      if (continentSlug) {
        const sub = await scanDrive(file.id, [...pathParts, file.name], continentSlug, null);
        results.push(...sub);
      } else {
        const city = parseDepartureCity(file.name);
        const sub = await scanDrive(file.id, [...pathParts, file.name], continent, city || departureCity);
        results.push(...sub);
      }
    } else if (file.mimeType.startsWith("image/")) {
      const ext = file.name.toLowerCase().match(/\.(jpe?g)$/) ? ".jpg" : ".png";
      const slug = slugify(file.name);
      const folderPrefix = pathParts.map(p => slugify(p)).join("--");
      const id = folderPrefix ? `${folderPrefix}--${slug}` : slug;
      results.push({ id, driveFileId: file.id, fileName: file.name, continent, departureCity, ext, drivePath: [...pathParts, file.name].join(" / ") });
    }
  }
  return results;
}

// ---- Gemini ----

async function extractWithGemini(imageBuffer, fileName) {
  const mimeType = fileName.toLowerCase().match(/\.(jpe?g)$/) ? "image/jpeg" : "image/png";
  const prompt = `Analiza este flyer de un paquete de viaje y extrae la siguiente información en formato JSON.
Si no encuentras algún dato, usa null.

Responde SOLO con un JSON válido, sin markdown ni texto adicional:
{
  "title": "nombre del paquete (ej: Europa Clásica)",
  "destinations": ["lista", "de", "ciudades", "visitadas"],
  "countries": ["lista", "de", "países"],
  "duration": "duración tal como aparece (ej: 17D / 15N)",
  "dates": ["fechas de salida tal como aparecen"],
  "price": número solo (ej: 55000),
  "currency": "MXN o USD",
  "includes": "descripción breve de qué incluye",
  "airline": "aerolínea si aparece, o null",
  "operator": "operador turístico si aparece, o null"
}`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }, { inline_data: { mime_type: mimeType, data: imageBuffer.toString("base64") } }] }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 2048 },
    }),
  });

  if (!res.ok) throw new Error(`Gemini ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  const text = (data.candidates?.[0]?.content?.parts?.[0]?.text || "").trim();
  return JSON.parse(text.replace(/^```json?\n?/, "").replace(/\n?```$/, ""));
}

// ---- Main ----

async function main() {
  console.log("🔄 Sincronizando paquetes desde Google Drive...\n");

  fs.mkdirSync(path.dirname(OUTPUT_JSON), { recursive: true });
  fs.mkdirSync(OUTPUT_IMAGES, { recursive: true });

  let existing = [];
  if (fs.existsSync(OUTPUT_JSON)) {
    try { existing = JSON.parse(fs.readFileSync(OUTPUT_JSON, "utf-8")); } catch {}
  }
  const existingById = new Map(existing.map(p => [p.id, p]));
  console.log(`📊 Estado actual: ${existing.length} paquetes en packages.json\n`);

  console.log("Escaneando Drive...");
  const driveFiles = await scanDrive();
  const driveIds = new Set(driveFiles.map(f => f.id));
  console.log(`   ${driveFiles.length} archivos encontrados en Drive\n`);

  const newFiles = driveFiles.filter(f => !existingById.has(f.id));
  const removedPkgs = existing.filter(p => !driveIds.has(p.id));
  const unchangedPkgs = existing.filter(p => driveIds.has(p.id));

  console.log("📋 Comparación:");
  console.log(`   ✓ ${unchangedPkgs.length} sin cambios`);
  console.log(`   🆕 ${newFiles.length} nuevos`);
  console.log(`   🗑  ${removedPkgs.length} eliminados\n`);

  if (newFiles.length === 0 && removedPkgs.length === 0) {
    console.log("✅ No changes detected");
    return;
  }

  const newPkgs = [];
  if (newFiles.length > 0) {
    console.log("Procesando nuevos...");
    for (const file of newFiles) {
      console.log(`   🖼  ${file.drivePath}`);
      try {
        const imageBuffer = await downloadFile(file.driveFileId);
        fs.writeFileSync(path.resolve(OUTPUT_IMAGES, `${file.id}${file.ext}`), imageBuffer);
        const parsed = await extractWithGemini(imageBuffer, file.fileName);
        newPkgs.push({
          id: file.id, title: parsed.title || file.fileName.replace(/\.[^.]+$/, "").replace(/-/g, " "),
          continent: file.continent, departureCity: file.departureCity || null,
          destinations: parsed.destinations || [], countries: parsed.countries || [],
          duration: parsed.duration || null, dates: parsed.dates || [],
          price: parsed.price || null, currency: parsed.currency || "MXN",
          includes: parsed.includes || null, flyerImage: `/packages/flyers/${file.id}${file.ext}`, year: 2026, operator: parsed.operator || "Eme Travel",
        });
        console.log(`      ✓ ${parsed.title} — $${parsed.price?.toLocaleString() || "?"} MXN`);
      } catch (err) {
        console.error(`      ⚠ Error: ${err.message}`);
      }
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  if (removedPkgs.length > 0) {
    console.log("Limpiando eliminados...");
    for (const pkg of removedPkgs) {
      console.log(`   🗑  ${pkg.title}`);
      if (pkg.flyerImage) {
        const imgPath = path.resolve(ROOT, "public", pkg.flyerImage.replace(/^\//, ""));
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      }
    }
  }

  const allPackages = [...unchangedPkgs, ...newPkgs];
  allPackages.sort((a, b) => {
    if (a.continent !== b.continent) return (a.continent || "").localeCompare(b.continent || "");
    return (a.price || 0) - (b.price || 0);
  });

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(allPackages, null, 2), "utf-8");

  console.log(`\n✅ Sincronización completa: ${allPackages.length} paquetes`);
  if (newPkgs.length) console.log(`   🆕 ${newPkgs.length} nuevos`);
  if (removedPkgs.length) console.log(`   🗑  ${removedPkgs.length} eliminados`);
}

main().catch(err => { console.error("❌ Error:", err); process.exit(1); });

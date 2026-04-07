#!/usr/bin/env node
/**
 * Syncs travel packages from Google Drive to src/data/packages.json
 *
 * Folder structure in Drive:
 *   ASIA                         → continent: "asia"
 *   MEDIO ORIENTE                → continent: "medio-oriente"
 *   EUROPA > Salidas desde CDMX/MTY/GDL/QRO/Cancún
 *   AMÉRICA > Salidas desde CDMX/MTY/GDL/Cancún
 *   ITINERARIOS                  → skip
 *   ULTIMOS LUGARES / ÚLTIMOS LUGARES subfolders → skip
 */

import { google } from "googleapis";
import fs from "fs";
import path from "path";
import https from "https";
import http from "http";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { tmpdir } from "os";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../..");
const PACKAGES_JSON = path.join(REPO_ROOT, "src/data/packages.json");
const FLYERS_DIR = path.join(REPO_ROOT, "public/packages/flyers");
const MANIFEST_FILE = path.join(FLYERS_DIR, "_manifest.txt");

// Top-level Drive folder
const ROOT_FOLDER_ID = "1T2Q1ZZonR9NW7e_a6165KmR3s8i_7RXW";

// ─── Credential setup ───────────────────────────────────────────────────────

const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT;
const geminiApiKey = process.env.GEMINI_API_KEY;

if (!serviceAccountJson) {
  console.error("ERROR: GOOGLE_SERVICE_ACCOUNT environment variable is not set.");
  process.exit(1);
}
if (!geminiApiKey) {
  console.error("ERROR: GEMINI_API_KEY environment variable is not set.");
  process.exit(1);
}

const serviceAccount = JSON.parse(serviceAccountJson);

const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

const drive = google.drive({ version: "v3", auth });

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Slugify a string for use as a file/id component */
function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Normalise city name to a canonical short form */
function normaliseCity(raw) {
  const s = raw.toUpperCase();
  if (s.includes("CDMX") || s.includes("CIUDAD DE MEXICO") || s.includes("CIUDAD DE MÉXICO")) return "CDMX";
  if (s.includes("MTY") || s.includes("MONTERREY")) return "Monterrey";
  if (s.includes("GDL") || s.includes("GUADALAJARA")) return "Guadalajara";
  if (s.includes("QRO") || s.includes("QUERETARO") || s.includes("QUERÉTARO")) return "Querétaro";
  if (s.includes("CANCUN") || s.includes("CANCÚN")) return "Cancún";
  return raw.trim();
}

/** Map folder name to continent slug */
function continentSlug(name) {
  const n = name.toUpperCase();
  if (n.includes("ASIA")) return "asia";
  if (n.includes("MEDIO") || n.includes("ORIENTE")) return "medio-oriente";
  if (n.includes("EUROPA")) return "europa";
  if (n.includes("AMER")) return "america";
  return slugify(name);
}

/** Build the package id from its path components */
function buildId(continent, subfolder, filename) {
  const base = path.parse(filename).name;
  if (subfolder) {
    return `${continent}--${slugify(subfolder)}--${slugify(base)}`;
  }
  return `${continent}--${slugify(base)}`;
}

/** List all files inside a Drive folder (non-recursive) */
async function listFiles(folderId) {
  const files = [];
  let pageToken = null;
  do {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: "nextPageToken, files(id, name, mimeType)",
      pageSize: 1000,
      pageToken: pageToken || undefined,
    });
    files.push(...(res.data.files || []));
    pageToken = res.data.nextPageToken;
  } while (pageToken);
  return files;
}

/** Download a Drive file by id to a local path */
async function downloadFile(fileId, destPath) {
  const res = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "stream" }
  );
  return new Promise((resolve, reject) => {
    const ws = fs.createWriteStream(destPath);
    res.data.pipe(ws);
    ws.on("finish", resolve);
    ws.on("error", reject);
  });
}

/** Call Gemini vision API to extract package data from a flyer image */
async function extractPackageData(imagePath, id, continent, departureCity) {
  const imageBytes = fs.readFileSync(imagePath);
  const base64Image = imageBytes.toString("base64");
  const ext = path.extname(imagePath).toLowerCase().replace(".", "");
  const mimeType = ext === "jpg" || ext === "jpeg" ? "image/jpeg" : "image/png";

  const prompt = `You are extracting travel package data from a promotional flyer image for a Mexican travel agency.

Extract the following fields from the flyer and respond ONLY with valid JSON (no markdown, no explanation):
{
  "title": "Package title in Spanish (short, descriptive name without departure city)",
  "destinations": ["array", "of", "destination", "cities/places"],
  "countries": ["array", "of", "country", "names"],
  "duration": "e.g. 10D / 9N",
  "dates": ["array of departure date strings as they appear, in Spanish"],
  "price": <number, lowest price shown, no currency symbol>,
  "currency": "MXN or USD",
  "includes": "one-sentence summary of what is included (flights, hotels, meals, tours, etc.)",
  "year": <4-digit year, default ${new Date().getFullYear()}>,
  "operator": "tour operator name if visible, otherwise null"
}

Rules:
- Use the exact price shown (number only).
- If multiple prices are shown, use the lowest one.
- If year is not on flyer, use ${new Date().getFullYear()}.
- Dates should be an array of strings like ["15 Abr", "2, 16 May", "3 Jun"].
- Keep destinations in Spanish.
- If a field is not visible, use null for objects or [] for arrays.`;

  const body = JSON.stringify({
    contents: [
      {
        parts: [
          { text: prompt },
          { inline_data: { mime_type: mimeType, data: base64Image } },
        ],
      },
    ],
    generationConfig: { temperature: 0.1, maxOutputTokens: 1024 },
  });

  return new Promise((resolve, reject) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`;
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
    };
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          const text = json?.candidates?.[0]?.content?.parts?.[0]?.text || "";
          // Strip possible markdown fences
          const cleaned = text.replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();
          const extracted = JSON.parse(cleaned);
          resolve(extracted);
        } catch (e) {
          reject(new Error(`Gemini parse error: ${e.message}\nRaw: ${data}`));
        }
      });
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

/** Determine the local extension for a Drive file by its name */
function extensionFromName(name) {
  const lower = name.toLowerCase();
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return ".jpg";
  return ".png";
}

// ─── Scan Drive ──────────────────────────────────────────────────────────────

/**
 * Returns an array of:
 *   { id, driveFileId, continent, subfolder, departureCityRaw, name }
 */
async function scanDrive() {
  const results = [];

  const topLevel = await listFiles(ROOT_FOLDER_ID);

  for (const item of topLevel) {
    const nameUpper = item.name.toUpperCase();

    // Skip ITINERARIOS
    if (nameUpper.includes("ITINERARIO")) continue;

    if (item.mimeType === "application/vnd.google-apps.folder") {
      const continent = continentSlug(item.name);

      // ASIA and MEDIO ORIENTE: flyers are directly inside
      if (continent === "asia" || continent === "medio-oriente") {
        const flyers = await listFiles(item.id);
        for (const f of flyers) {
          if (f.mimeType === "application/vnd.google-apps.folder") continue;
          const ext = extensionFromName(f.name);
          const id = buildId(continent, null, f.name);
          results.push({
            id,
            driveFileId: f.id,
            continent,
            subfolder: null,
            departureCityRaw: null,
            name: f.name,
            ext,
          });
        }
      }

      // EUROPA and AMERICA: subfolders per departure city
      if (continent === "europa" || continent === "america") {
        const subfolders = await listFiles(item.id);
        for (const sub of subfolders) {
          if (sub.mimeType !== "application/vnd.google-apps.folder") continue;
          const subUpper = sub.name.toUpperCase();
          // Skip ULTIMOS LUGARES subfolders
          if (subUpper.includes("ULTIMO") || subUpper.includes("ÚLTIMO")) continue;

          const flyers = await listFiles(sub.id);
          for (const f of flyers) {
            if (f.mimeType === "application/vnd.google-apps.folder") continue;
            const ext = extensionFromName(f.name);
            const id = buildId(continent, sub.name, f.name);
            results.push({
              id,
              driveFileId: f.id,
              continent,
              subfolder: sub.name,
              departureCityRaw: sub.name,
              name: f.name,
              ext,
            });
          }
        }
      }
    }
  }

  return results;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log("Reading current packages.json...");
  const currentPackages = JSON.parse(fs.readFileSync(PACKAGES_JSON, "utf-8"));
  const currentIds = new Set(currentPackages.map((p) => p.id));

  console.log(`  Current packages: ${currentPackages.length}`);

  console.log("\nScanning Google Drive folder...");
  const driveFiles = await scanDrive();
  const driveIds = new Set(driveFiles.map((f) => f.id));

  console.log(`  Drive files found: ${driveFiles.length}`);

  // Determine diff
  const newFiles = driveFiles.filter((f) => !currentIds.has(f.id));
  const removedPackages = currentPackages.filter((p) => !driveIds.has(p.id));

  if (newFiles.length === 0 && removedPackages.length === 0) {
    console.log("\nNo changes detected.");
    process.exit(0);
  }

  console.log(`\nNew packages: ${newFiles.length}`);
  console.log(`Removed packages: ${removedPackages.length}`);

  let updatedPackages = [...currentPackages];

  // ── Handle removals ────────────────────────────────────────────────────────
  for (const pkg of removedPackages) {
    console.log(`\nREMOVING: ${pkg.id}`);

    // Delete flyer image
    if (pkg.flyerImage) {
      const flyerPath = path.join(REPO_ROOT, "public", pkg.flyerImage);
      if (fs.existsSync(flyerPath)) {
        fs.unlinkSync(flyerPath);
        console.log(`  Deleted flyer: ${pkg.flyerImage}`);
      }
    }

    updatedPackages = updatedPackages.filter((p) => p.id !== pkg.id);
  }

  // ── Handle additions ───────────────────────────────────────────────────────
  for (const file of newFiles) {
    console.log(`\nADDING: ${file.id}`);
    console.log(`  Drive name: ${file.name}`);

    const flyerFilename = `${file.id}${file.ext}`;
    const flyerLocalPath = path.join(FLYERS_DIR, flyerFilename);
    const flyerPublicPath = `/packages/flyers/${flyerFilename}`;

    console.log(`  Downloading flyer...`);
    await downloadFile(file.driveFileId, flyerLocalPath);
    console.log(`  Saved to: ${flyerLocalPath}`);

    console.log(`  Extracting data with Gemini...`);
    let extracted;
    try {
      extracted = await extractPackageData(
        flyerLocalPath,
        file.id,
        file.continent,
        file.departureCityRaw ? normaliseCity(file.departureCityRaw) : null
      );
    } catch (err) {
      console.error(`  WARNING: Gemini extraction failed: ${err.message}`);
      extracted = {};
    }

    const departureCity = file.departureCityRaw
      ? normaliseCity(file.departureCityRaw)
      : null;

    const pkg = {
      id: file.id,
      title: extracted.title || path.parse(file.name).name,
      continent: file.continent,
      departureCity,
      destinations: extracted.destinations || [],
      countries: extracted.countries || [],
      duration: extracted.duration || null,
      dates: extracted.dates || [],
      price: extracted.price || null,
      currency: extracted.currency || "MXN",
      includes: extracted.includes || null,
      flyerImage: flyerPublicPath,
      year: extracted.year || new Date().getFullYear(),
      operator: extracted.operator || null,
    };

    console.log(`  Title: ${pkg.title}`);
    console.log(`  Price: ${pkg.price} ${pkg.currency}`);

    updatedPackages.push(pkg);
  }

  // ── Sort packages (continent → departureCity → title) ─────────────────────
  const continentOrder = ["europa", "asia", "medio-oriente", "america"];
  updatedPackages.sort((a, b) => {
    const ci = continentOrder.indexOf(a.continent) - continentOrder.indexOf(b.continent);
    if (ci !== 0) return ci;
    return (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
  });

  // ── Write updated JSON ─────────────────────────────────────────────────────
  fs.writeFileSync(PACKAGES_JSON, JSON.stringify(updatedPackages, null, 2) + "\n");
  console.log(`\nUpdated packages.json (${updatedPackages.length} packages)`);

  // ── Update manifest ────────────────────────────────────────────────────────
  const manifestLines = updatedPackages
    .map((p) => path.basename(p.flyerImage))
    .join("\n");
  fs.writeFileSync(MANIFEST_FILE, manifestLines + "\n");
  console.log("Updated _manifest.txt");

  // ── Git commit & push ──────────────────────────────────────────────────────
  console.log("\nCommitting changes...");
  try {
    execSync("git add src/data/packages.json public/packages/flyers/", {
      cwd: REPO_ROOT,
      stdio: "inherit",
    });

    const added = newFiles.map((f) => f.id);
    const removed = removedPackages.map((p) => p.id);
    const parts = [];
    if (added.length) parts.push(`add ${added.length} package(s)`);
    if (removed.length) parts.push(`remove ${removed.length} package(s)`);
    const commitMsg = `packages: ${parts.join(", ")} via Drive sync`;

    execSync(`git commit -m "${commitMsg}"`, { cwd: REPO_ROOT, stdio: "inherit" });
    console.log("Committed.");

    execSync("git push -u origin HEAD", { cwd: REPO_ROOT, stdio: "inherit" });
    console.log("Pushed.");
  } catch (err) {
    console.error("Git error:", err.message);
    process.exit(1);
  }

  // ── Summary ────────────────────────────────────────────────────────────────
  console.log("\n═══════════════════════════════════════");
  console.log("SYNC SUMMARY");
  console.log("═══════════════════════════════════════");
  if (newFiles.length) {
    console.log(`\nNew packages added (${newFiles.length}):`);
    for (const f of newFiles) console.log(`  + ${f.id}`);
  }
  if (removedPackages.length) {
    console.log(`\nPackages removed (${removedPackages.length}):`);
    for (const p of removedPackages) console.log(`  - ${p.id}`);
  }
  console.log(`\nTotal packages: ${updatedPackages.length}`);
  console.log("═══════════════════════════════════════");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

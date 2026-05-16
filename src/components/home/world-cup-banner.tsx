"use client";

import {
  ShieldCheck,
  Ticket,
  Lock,
  Star,
  MessageCircle,
  HeadphonesIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLinkWithText } from "@/lib/constants";
import { trackConversion } from "@/lib/conversion";

type Stage = "GROUPS" | "R32" | "R16";

type Match = {
  match: string;
  home: { name: string; cc: string };
  away: { name: string; cc: string };
  forecast: boolean;
  stadium: string;
  date: string;
  hour: string;
  stage: Stage;
};

const MATCHES: Match[] = [
  { match: "M24", home: { name: "Colombia", cc: "co" }, away: { name: "Uzbekistán", cc: "uz" }, forecast: false, stadium: "Estadio Azteca", date: "2026-06-17", hour: "09:00 PM", stage: "GROUPS" },
  { match: "M41", home: { name: "Noruega", cc: "no" }, away: { name: "Senegal", cc: "sn" }, forecast: false, stadium: "Nueva York / Nueva Jersey Stadium", date: "2026-06-22", hour: "08:00 PM", stage: "GROUPS" },
  { match: "M54", home: { name: "Corea del Sur", cc: "kr" }, away: { name: "Sudáfrica", cc: "za" }, forecast: false, stadium: "Estadio Monterrey", date: "2026-06-24", hour: "08:00 PM", stage: "GROUPS" },
  { match: "M73", home: { name: "Corea del Sur", cc: "kr" }, away: { name: "Suiza", cc: "ch" }, forecast: true, stadium: "Los Angeles Stadium", date: "2026-06-28", hour: "12:00 PM", stage: "R32" },
  { match: "M76", home: { name: "Brasil", cc: "br" }, away: { name: "Japón", cc: "jp" }, forecast: true, stadium: "Houston Stadium", date: "2026-06-29", hour: "12:00 PM", stage: "R32" },
  { match: "M88", home: { name: "Turquía", cc: "tr" }, away: { name: "Egipto", cc: "eg" }, forecast: true, stadium: "Dallas Stadium", date: "2026-07-03", hour: "01:00 PM", stage: "R32" },
  { match: "M89", home: { name: "Francia", cc: "fr" }, away: { name: "Alemania", cc: "de" }, forecast: false, stadium: "Philadelphia Stadium", date: "2026-07-04", hour: "05:00 PM", stage: "R16" },
  { match: "M90", home: { name: "Países Bajos", cc: "nl" }, away: { name: "Suiza", cc: "ch" }, forecast: true, stadium: "Houston Stadium", date: "2026-07-04", hour: "12:00 PM", stage: "R16" },
  { match: "M94", home: { name: "Bélgica", cc: "be" }, away: { name: "EUA", cc: "us" }, forecast: true, stadium: "Seattle Stadium", date: "2026-07-06", hour: "05:00 PM", stage: "R16" },
];

const STAGE_STYLES: Record<Stage, string> = {
  GROUPS: "bg-pink-600 text-white",
  R32: "bg-purple-600 text-white",
  R16: "bg-teal-500 text-white",
};

const FEATURES = [
  { icon: ShieldCheck, label: "Partidos increíbles" },
  { icon: Ticket, label: "2 boletos por partido" },
  { icon: Lock, label: "Compra segura y confiable" },
  { icon: Star, label: "Vive la pasión del Mundial" },
];

const WHATSAPP_MSG =
  "Hola, me interesa información sobre los boletos del Mundial 2026 con Feliz Viaje. ¿Pueden ayudarme?";

function Flag({ cc, name }: { cc: string; name: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/h20/${cc}.png`}
      srcSet={`https://flagcdn.com/h40/${cc}.png 2x`}
      alt={`Bandera de ${name}`}
      width={20}
      height={15}
      loading="lazy"
      className="inline-block align-[-3px] rounded-sm shadow-sm"
    />
  );
}

export function WorldCupBanner() {
  const waLink = whatsappLinkWithText(WHATSAPP_MSG);

  return (
    <section className="py-8 lg:py-12 bg-background">
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl shadow-strong text-white bg-[radial-gradient(ellipse_at_top,_#0e1b3d_0%,_#050a1c_70%)]">
          {/* Mexico flag stripe */}
          <div className="h-1.5 w-full flex">
            <div className="flex-1 bg-emerald-600" />
            <div className="flex-1 bg-white" />
            <div className="flex-1 bg-red-600" />
          </div>

          {/* Header */}
          <div className="px-5 lg:px-10 pt-6 lg:pt-8 pb-4 lg:pb-6">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-none tracking-tight">
                  FIFA <span className="text-white">WORLD CUP</span>{" "}
                  <span className="bg-gradient-to-r from-emerald-400 via-yellow-300 to-red-500 bg-clip-text text-transparent">
                    2026
                  </span>
                  <span className="text-sm align-top ml-1">™</span>
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-3">
                  <p className="text-xl lg:text-2xl font-extrabold text-yellow-400">
                    ¡BOLETOS EN VENTA!
                  </p>
                  <span className="inline-flex items-center gap-1.5 bg-emerald-600/90 px-3 py-1 rounded-full text-sm font-semibold w-fit">
                    <Ticket className="h-3.5 w-3.5" />
                    2 boletos por partido
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Matches table - desktop */}
          <div className="hidden md:block px-5 lg:px-10 pb-4">
            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead className="bg-white/5">
                  <tr className="text-left text-xs uppercase tracking-wider text-white/70">
                    <th className="px-4 py-3">Match</th>
                    <th className="px-4 py-3">
                      Versus
                      <span className="normal-case text-white/40 ml-1">
                        (forecast*)
                      </span>
                    </th>
                    <th className="px-4 py-3">Stadium</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Hour</th>
                    <th className="px-4 py-3 text-center">Stage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {MATCHES.map((m, i) => (
                    <tr
                      key={m.match}
                      className={i % 2 === 0 ? "bg-white/[0.02]" : ""}
                    >
                      <td className="px-4 py-3 font-mono font-bold text-yellow-400">
                        {m.match}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Flag cc={m.home.cc} name={m.home.name} />
                        <span className="ml-2">{m.home.name}</span>
                        <span className="text-white/40 mx-2">vs</span>
                        <Flag cc={m.away.cc} name={m.away.name} />
                        <span className="ml-2">
                          {m.away.name}
                          {m.forecast && (
                            <span className="text-yellow-400">*</span>
                          )}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white/80">{m.stadium}</td>
                      <td className="px-4 py-3 font-mono text-white/80 whitespace-nowrap">
                        {m.date}
                      </td>
                      <td className="px-4 py-3 font-mono text-white/80 whitespace-nowrap">
                        {m.hour}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide ${STAGE_STYLES[m.stage]}`}
                        >
                          {m.stage}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-white/50 mt-2">
              *Match-ups proyectados según cuadro oficial.
            </p>
          </div>

          {/* Matches cards - mobile */}
          <div className="md:hidden px-5 pb-4 space-y-2.5">
            {MATCHES.map((m) => (
              <div
                key={m.match}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-3"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-mono font-bold text-yellow-400 text-sm">
                    {m.match}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${STAGE_STYLES[m.stage]}`}
                  >
                    {m.stage}
                  </span>
                </div>
                <div className="text-sm font-semibold mb-1.5 leading-snug">
                  <Flag cc={m.home.cc} name={m.home.name} />
                  <span className="ml-2">{m.home.name}</span>
                  <span className="text-white/40 mx-1.5">vs</span>
                  <Flag cc={m.away.cc} name={m.away.name} />
                  <span className="ml-2">
                    {m.away.name}
                    {m.forecast && <span className="text-yellow-400">*</span>}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-xs text-white/70">
                  <span>{m.stadium}</span>
                  <span className="text-white/30">•</span>
                  <span className="font-mono">{m.date}</span>
                  <span className="text-white/30">•</span>
                  <span className="font-mono">{m.hour}</span>
                </div>
              </div>
            ))}
            <p className="text-[10px] text-white/50">
              *Match-ups proyectados según cuadro oficial.
            </p>
          </div>

          {/* Features strip */}
          <div className="bg-white/5 border-y border-white/10 px-5 lg:px-10 py-3 lg:py-4">
            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 lg:gap-4">
              {FEATURES.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-xs lg:text-sm text-white/90"
                >
                  <Icon className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="px-5 lg:px-10 py-6 lg:py-8">
            <div className="flex items-center justify-center gap-2 text-xs lg:text-sm text-white/70 mb-3">
              <HeadphonesIcon className="h-3.5 w-3.5 text-emerald-400" />
              <span>
                Atención personalizada · Confirma disponibilidad con un asesor
              </span>
            </div>
            <Button
              render={
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackConversion("whatsapp_click")}
                />
              }
              size="lg"
              className="w-full h-auto py-4 bg-[#25D366] text-white hover:bg-[#1fb955] font-semibold text-base lg:text-lg gap-2.5 shadow-strong"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Reservar boletos por WhatsApp</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

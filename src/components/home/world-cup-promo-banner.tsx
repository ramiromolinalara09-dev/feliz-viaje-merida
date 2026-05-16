"use client";

import Link from "next/link";
import { Trophy, Ticket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WorldCupPromoBanner() {
  return (
    <section className="py-8 lg:py-10 bg-background">
      <div className="container">
        <Link
          href="/boletos-mundial-2026"
          className="group block overflow-hidden rounded-2xl shadow-strong text-white bg-[radial-gradient(ellipse_at_top,_#0e1b3d_0%,_#050a1c_70%)] hover:shadow-[0_18px_50px_-12px_rgba(0,0,0,0.6)] transition-shadow"
        >
          {/* Mexico flag stripe */}
          <div className="h-1.5 w-full flex">
            <div className="flex-1 bg-emerald-600" />
            <div className="flex-1 bg-white" />
            <div className="flex-1 bg-red-600" />
          </div>

          <div className="px-5 lg:px-10 py-6 lg:py-8 flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8">
            {/* Trophy icon */}
            <div className="hidden lg:flex h-16 w-16 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 items-center justify-center flex-shrink-0">
              <Trophy className="h-8 w-8 text-yellow-400" />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur px-2.5 py-0.5 rounded-full text-[11px] lg:text-xs mb-2 border border-white/20">
                <Trophy className="h-3 w-3 text-yellow-400 lg:hidden" />
                Feliz Viaje Mérida · Promoción especial
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight tracking-tight">
                Boletos para el{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-yellow-300 to-red-500 bg-clip-text text-transparent">
                  Mundial 2026
                </span>
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs lg:text-sm">
                  <Ticket className="h-3.5 w-3.5 text-emerald-400" />
                  9 partidos disponibles
                </span>
                <span className="inline-flex items-center gap-1.5 bg-emerald-600/90 px-3 py-1 rounded-full text-xs lg:text-sm font-semibold">
                  2 boletos por partido
                </span>
              </div>
            </div>

            {/* CTA */}
            <Button
              render={<span />}
              size="lg"
              className="w-full lg:w-auto h-auto py-3.5 px-6 bg-[#25D366] text-white hover:bg-[#1fb955] font-semibold gap-2 shadow-strong group-hover:translate-x-0.5 transition-transform flex-shrink-0"
            >
              <span>Ver partidos disponibles</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Link>
      </div>
    </section>
  );
}

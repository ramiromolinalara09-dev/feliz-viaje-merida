"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLinkWithText } from "@/lib/constants";
import { trackConversion } from "@/lib/conversion";
import { WorldCupBanner } from "@/components/home/world-cup-banner";

const WHATSAPP_MSG =
  "Hola, me interesa información sobre los boletos del Mundial 2026 con Feliz Viaje. ¿Pueden ayudarme?";

const FAQS = [
  {
    q: "¿Cómo reservo mis boletos?",
    a: "Contáctanos por WhatsApp y un asesor te confirmará la disponibilidad del partido que te interesa, te explicará la opción de pago y la documentación que necesitas. Toda la reserva se hace con atención personalizada, no es una compra automática.",
  },
  {
    q: "¿Por qué algunos enfrentamientos tienen un asterisco (*)?",
    a: "Los partidos marcados con asterisco son enfrentamientos proyectados según el cuadro oficial. Significa que el boleto está confirmado para esa fecha, estadio y fase del torneo (R32, R16), pero los equipos finales dependen del resultado de los partidos anteriores. Los partidos sin asterisco son enfrentamientos ya confirmados.",
  },
  {
    q: "¿Qué incluye el boleto?",
    a: "El boleto te da acceso al partido en el estadio indicado, en la fecha y hora especificadas. No incluye vuelos, hospedaje ni traslados. Si necesitas un paquete completo de viaje + boletos, también podemos cotizarlo.",
  },
  {
    q: "¿Por qué solo 2 boletos por partido?",
    a: "Tenemos disponibilidad limitada por partido para garantizar buenos asientos y un proceso de reserva ordenado. Si necesitas más boletos, escríbenos por WhatsApp y revisamos opciones.",
  },
];

export function BoletosMundialClient() {
  const waLink = whatsappLinkWithText(WHATSAPP_MSG);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-[radial-gradient(ellipse_at_top,_#0e1b3d_0%,_#050a1c_70%)] text-white">
        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-1.5 rounded-full text-xs lg:text-sm border border-white/20 mb-5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Promoción especial · Feliz Viaje Mérida
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4">
            Boletos para el{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-yellow-300 to-red-500 bg-clip-text text-transparent">
              Mundial FIFA 2026
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
            9 partidos disponibles en estadios de México y Estados Unidos. Atención
            personalizada, 2 boletos por partido.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
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
              className="w-full sm:w-auto h-14 px-8 bg-[#25D366] text-white hover:bg-[#1fb955] font-semibold text-base gap-2 shadow-strong"
            >
              <MessageCircle className="h-5 w-5" />
              Reservar por WhatsApp
            </Button>
            <a
              href="#partidos"
              className="text-sm text-white/70 hover:text-white underline-offset-4 hover:underline"
            >
              Ver lista de partidos ↓
            </a>
          </div>
        </div>
      </section>

      {/* Partidos disponibles - reusa el WorldCupBanner como tabla con CTA */}
      <div id="partidos">
        <WorldCupBanner />
      </div>

      {/* FAQs */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-3">
              Preguntas frecuentes
            </h2>
            <p className="text-muted-foreground">
              Todo lo que necesitas saber antes de reservar.
            </p>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border border-border bg-card p-5 open:shadow-medium transition-shadow"
              >
                <summary className="cursor-pointer list-none flex items-start justify-between gap-4 font-semibold text-foreground">
                  <span>{faq.q}</span>
                  <span className="text-2xl text-muted-foreground group-open:rotate-45 transition-transform flex-shrink-0 leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-secondary to-primary text-white">
        <div className="container text-center max-w-2xl">
          <h2 className="text-2xl lg:text-3xl font-bold mb-3">
            ¿Listo para vivir el Mundial?
          </h2>
          <p className="text-white/85 mb-6">
            Escríbenos por WhatsApp y un asesor te confirma disponibilidad,
            asiento y proceso de reserva.
          </p>
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
            className="h-14 px-8 bg-[#25D366] text-white hover:bg-[#1fb955] font-semibold text-base gap-2 shadow-strong"
          >
            <MessageCircle className="h-5 w-5" />
            Reservar boletos por WhatsApp
          </Button>
          <p className="text-xs text-white/60 mt-4">
            Atención personalizada · Sin compra automática
          </p>
        </div>
      </section>
    </>
  );
}

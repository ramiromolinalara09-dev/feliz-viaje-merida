import type { Metadata } from "next";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingEuropaClient } from "@/components/landing/landing-europa-client";

export const metadata: Metadata = {
  title: "Paquetes a Europa con todo incluido desde Mérida | Feliz Viaje",
  description:
    "Vuelos, hoteles, tours guiados y acompañamiento por WhatsApp 24/7. Paquetes a Europa desde $39,900 MXN. Cotiza por WhatsApp.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    title: "Paquetes a Europa con todo incluido | Feliz Viaje Mérida",
    description:
      "Diseñamos tu viaje a Europa desde México. Cotiza por WhatsApp y recibe opciones reales en menos de 1 hora.",
    type: "website",
  },
};

export default function PromocionesEuropaPage() {
  return (
    <>
      <LandingHeader />
      <main className="flex-1">
        <LandingEuropaClient />
      </main>
      <LandingFooter />
    </>
  );
}

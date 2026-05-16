import type { Metadata } from "next";
import { BoletosMundialClient } from "@/components/pages/boletos-mundial-client";

export const metadata: Metadata = {
  title: `Boletos para el Mundial FIFA 2026`,
  description:
    "Reserva tus boletos para el Mundial FIFA 2026. 9 partidos disponibles en estadios de México y Estados Unidos. 2 boletos por partido con atención personalizada de Feliz Viaje Mérida.",
};

export default function BoletosMundialPage() {
  return <BoletosMundialClient />;
}

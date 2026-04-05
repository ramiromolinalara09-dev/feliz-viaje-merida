import type { Metadata } from "next";
import { ViajeEuropaClient } from "@/components/pages/viaje-europa-client";

export const metadata: Metadata = {
  title: `Viaje a Europa Todo Incluido`,
  description:
    "Viaja a Europa desde $50,000 MXN con vuelos, hoteles y acompañamiento. Paquetes a París, Roma, Barcelona y más destinos europeos.",
};

export default function ViajeEuropaPage() {
  return <ViajeEuropaClient />;
}

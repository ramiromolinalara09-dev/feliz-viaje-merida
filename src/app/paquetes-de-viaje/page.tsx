import type { Metadata } from "next";
import { PaquetesClient } from "@/components/pages/paquetes-client";

export const metadata: Metadata = {
  title: `Paquetes de Viaje`,
  description:
    "Explora nuestros paquetes de viaje nacionales e internacionales. Europa, Asia, Sudamérica, cruceros y más destinos increíbles.",
};

export default function PaquetesPage() {
  return <PaquetesClient />;
}

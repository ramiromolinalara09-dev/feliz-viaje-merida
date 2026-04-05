import type { Metadata } from "next";
import { ContactoClient } from "@/components/pages/contacto-client";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Contacto | ${SITE_NAME}`,
  description:
    "Contáctanos para cotizar tu próximo viaje. WhatsApp, teléfono, email o visítanos en Mérida, Yucatán.",
};

export default function ContactoPage() {
  return <ContactoClient />;
}

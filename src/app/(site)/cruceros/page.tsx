import type { Metadata } from "next";
import { CrucerosClient } from "@/components/pages/cruceros-client";

export const metadata: Metadata = {
  title: `Cruceros`,
  description:
    "Cotiza cruceros por el Caribe, Mediterráneo, Alaska y más. Todas las navieras: Royal Caribbean, MSC, Norwegian. Asesoría personalizada.",
};

export default function CrucerosPage() {
  return <CrucerosClient />;
}

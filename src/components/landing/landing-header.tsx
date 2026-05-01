"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLinkWithText } from "@/lib/constants";
import { trackConversion } from "@/lib/conversion";

const HEADER_WHATSAPP_MESSAGE =
  "Hola, vi su anuncio de paquetes a Europa y me gustaría más información.";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Feliz Viaje Mérida"
            width={140}
            height={40}
            priority
            className="h-9 w-auto"
          />
        </div>
        <Button
          nativeButton={false}
          render={
            <a
              href={whatsappLinkWithText(HEADER_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackConversion("whatsapp_click")}
            />
          }
          className="bg-warning text-warning-foreground hover:bg-warning/90 h-10 px-4 gap-2 shadow-soft"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Cotizar por WhatsApp</span>
          <span className="sm:hidden">WhatsApp</span>
        </Button>
      </div>
    </header>
  );
}

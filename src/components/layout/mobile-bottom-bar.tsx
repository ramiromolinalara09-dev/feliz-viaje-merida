import Link from "next/link";
import { MessageCircle, Mail } from "lucide-react";
import { WHATSAPP_LINK_WITH_MESSAGE } from "@/lib/constants";

export function MobileBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
      <div className="flex bg-white border-t border-border shadow-strong">
        {/* WhatsApp - Primary */}
        <a
          href={WHATSAPP_LINK_WITH_MESSAGE}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground font-medium"
        >
          <MessageCircle className="h-5 w-5" />
          <span>WhatsApp</span>
        </a>

        {/* Contact - Secondary */}
        <Link
          href="/contacto"
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border-t border-accent/30 text-accent font-medium"
        >
          <Mail className="h-5 w-5" />
          <span>Contacto</span>
        </Link>
      </div>
    </div>
  );
}

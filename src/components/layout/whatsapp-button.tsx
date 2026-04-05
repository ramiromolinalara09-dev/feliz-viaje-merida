import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK_WITH_MESSAGE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function WhatsAppButton({ className }: { className?: string }) {
  return (
    <a
      href={WHATSAPP_LINK_WITH_MESSAGE}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-50",
        "flex items-center justify-center",
        "w-14 h-14 lg:w-16 lg:h-16",
        "rounded-full bg-[#25D366] hover:bg-[#20BD5A]",
        "text-white shadow-strong",
        "transition-all duration-300 hover:scale-110",
        className
      )}
      aria-label="Enviar mensaje por WhatsApp"
    >
      <MessageCircle className="h-7 w-7 lg:h-8 lg:w-8" />
    </a>
  );
}

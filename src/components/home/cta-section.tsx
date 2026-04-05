import Link from "next/link";
import { MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_LINK_WITH_MESSAGE } from "@/lib/constants";

export function CTASection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-secondary via-secondary to-primary text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-warning rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            ¿Listo para tu próximo viaje?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Escríbenos hoy y comienza a planear el viaje de tus sueños con el respaldo de expertos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              render={<a href={WHATSAPP_LINK_WITH_MESSAGE} target="_blank" rel="noopener noreferrer" />}
              size="lg"
              className="w-full sm:w-auto bg-warning text-warning-foreground hover:bg-warning/90 shadow-strong text-lg h-14 px-8 gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              Enviar WhatsApp
            </Button>
            <Button
              render={<Link href="/contacto" />}
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white text-lg h-14 px-8 gap-2"
            >
              <Mail className="h-5 w-5" />
              Ir a Contacto
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

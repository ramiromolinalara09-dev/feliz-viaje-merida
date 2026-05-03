import Link from "next/link";
import Image from "next/image";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_LINK_WITH_MESSAGE } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[600px] lg:min-h-[700px] flex items-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=1920&q=80')"
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      <div className="container relative z-10 py-12 lg:py-20">
        <div className="max-w-3xl mx-auto text-center text-white">
          {/* Logo badge */}
          <div className="inline-flex items-center justify-center w-32 h-32 lg:w-40 lg:h-40 bg-white rounded-full shadow-medium mb-6 p-4">
            <Image
              src="/logo.png"
              alt="Feliz Viaje Mérida"
              width={240}
              height={96}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* H1 */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Agencia de viajes en Mérida
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl lg:text-3xl mb-4 text-white/90">
            Viaja a <span className="text-warning font-semibold">Europa</span> con{" "}
            <span className="text-warning font-semibold">$50,000 pesos</span>
          </p>
          <p className="text-lg md:text-xl mb-8 text-white/80">
            Incluye vuelos, hospedaje y acompañamiento personalizado
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button
              render={<a href={WHATSAPP_LINK_WITH_MESSAGE} target="_blank" rel="noopener noreferrer" />}
              size="lg"
              className="w-full sm:w-auto bg-warning text-warning-foreground hover:bg-warning/90 shadow-strong text-lg h-14 px-8 gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              Enviar WhatsApp
            </Button>
            <Button
              render={<Link href="/viaje-a-europa-todo-incluido" />}
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white text-lg h-14 px-8 gap-2"
            >
              Ver paquetes a Europa
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-white/60">
            *Sujeto a disponibilidad, temporada y condiciones. Consulta términos.
          </p>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="var(--background)"/>
        </svg>
      </div>
    </section>
  );
}

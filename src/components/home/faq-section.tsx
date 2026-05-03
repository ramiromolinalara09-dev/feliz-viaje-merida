"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WHATSAPP_LINK_WITH_MESSAGE } from "@/lib/constants";
import { trackConversion } from "@/lib/conversion";

const faqs = [
  {
    question: "¿Por qué debería contratar una agencia en lugar de organizar mi viaje por mi cuenta?",
    answer: "Al contratar una agencia, obtienes acceso a promociones exclusivas, soporte 24/7 durante tu viaje, y la tranquilidad de tener un experto que ya conoce los destinos. Además, evitas errores costosos y ahorras horas de investigación. Un viaje mal planificado puede costarte mucho más que la pequeña comisión de una agencia.",
  },
  {
    question: "¿Qué incluye el acompañamiento personalizado?",
    answer: "El acompañamiento incluye: asesoría completa antes del viaje, ayuda con documentación y visas, itinerario detallado día por día, soporte por WhatsApp durante todo tu viaje, y asistencia inmediata si surge cualquier imprevisto como cambios de vuelo o reservaciones.",
  },
  {
    question: "¿Puedo pagar a meses sin intereses?",
    answer: "Sí, trabajamos con diferentes opciones de financiamiento. Dependiendo del monto y el proveedor, puedes acceder a planes de 3, 6, 12 y hasta 18 meses sin intereses. Contáctanos por WhatsApp para conocer las opciones disponibles para tu viaje.",
  },
  {
    question: "¿Cuánto tiempo antes debo reservar mi viaje a Europa?",
    answer: "Recomendamos reservar con al menos 3-4 meses de anticipación para obtener mejores precios en vuelos y disponibilidad de hoteles. Sin embargo, también podemos ayudarte con viajes de última hora si hay disponibilidad.",
  },
  {
    question: "¿Qué documentos necesito para viajar a Europa?",
    answer: "Los mexicanos necesitan pasaporte vigente (mínimo 6 meses de validez) y seguro de viaje. Desde 2024, también se requiere el formulario ETIAS. No necesitas visa para estancias turísticas de hasta 90 días. Te ayudamos con todos los requisitos.",
  },
  {
    question: "¿Qué pasa si necesito cancelar mi viaje?",
    answer: "Las políticas de cancelación varían según el proveedor y el tipo de tarifa contratada. Siempre te explicamos claramente las condiciones antes de reservar. También ofrecemos seguros de viaje que cubren cancelaciones por emergencias médicas u otras causas justificadas.",
  },
];

export function FAQSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted/40">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Preguntas frecuentes
            </h2>
            <p className="text-lg text-muted-foreground">
              Resolvemos tus dudas más comunes
            </p>
          </div>

          <Accordion className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                className="border border-border bg-background rounded-lg px-6 data-[open]:border-primary/30 data-[open]:shadow-soft transition-all"
              >
                <AccordionTrigger className="text-left font-medium hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              ¿Tienes más preguntas? Escríbenos por WhatsApp
            </p>
            <Button render={<a href={WHATSAPP_LINK_WITH_MESSAGE} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion("whatsapp_click")} />} size="lg" className="bg-gradient-primary gap-2">
              <MessageCircle className="h-5 w-5" />
              Enviar WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

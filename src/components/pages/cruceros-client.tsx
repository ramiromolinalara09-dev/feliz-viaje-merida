"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  Users,
  Heart,
  Crown,
  Ship,
  Anchor,
  Calendar,
  CreditCard,
  FileText,
  Utensils,
  Wine,
  Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WHATSAPP_LINK_WITH_MESSAGE } from "@/lib/constants";
import { trackConversion } from "@/lib/conversion";

const cruiseTypes = [
  {
    icon: Users,
    title: "Cruceros familiares",
    description:
      "Barcos con actividades para todas las edades, parques acuáticos, shows y entretenimiento familiar.",
    image:
      "https://images.unsplash.com/photo-1599640842225-85d111c60e6b?w=600&q=80",
  },
  {
    icon: Heart,
    title: "Cruceros para parejas",
    description:
      "Experiencias románticas con cenas privadas, spas de lujo y destinos exóticos.",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
  },
  {
    icon: Crown,
    title: "Cruceros de lujo",
    description:
      "Servicio premium, camarotes suite, gastronomía gourmet y experiencias exclusivas.",
    image:
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=80",
  },
];

const steps = [
  {
    icon: Calendar,
    step: 1,
    title: "Elegimos fechas y destino",
    description: "Caribe, Mediterráneo, Alaska, Nórdico... tú decides.",
  },
  {
    icon: Ship,
    step: 2,
    title: "Seleccionamos el barco ideal",
    description: "Royal Caribbean, MSC, Norwegian, Celebrity y más.",
  },
  {
    icon: Anchor,
    step: 3,
    title: "Tipo de camarote",
    description:
      "Interior, vista al mar, balcón o suite según tu presupuesto.",
  },
  {
    icon: CreditCard,
    step: 4,
    title: "Reservamos y aseguramos",
    description: "Apartamos tu crucero con el mejor precio disponible.",
  },
  {
    icon: FileText,
    step: 5,
    title: "Preparamos tu viaje",
    description: "Itinerario, tips, y todo lo que necesitas saber.",
  },
];

const includes = [
  { icon: Ship, text: "Alojamiento a bordo" },
  { icon: Utensils, text: "Todas las comidas" },
  { icon: Users, text: "Entretenimiento" },
  { icon: Anchor, text: "Visitas a puertos" },
  { icon: Wifi, text: "Actividades a bordo" },
  { icon: Wine, text: "Shows y eventos" },
];

const faqs = [
  {
    question: "¿Qué documentos necesito para un crucero?",
    answer:
      "Depende del destino. Para cruceros por el Caribe desde EE.UU., los mexicanos necesitan pasaporte vigente y visa americana. Para Europa, pasaporte con ETIAS. Te asesoramos según tu itinerario específico.",
  },
  {
    question: "¿Cuál es la diferencia entre tipos de camarote?",
    answer:
      "Interior: sin ventana, más económico. Vista al mar: con ventana fija. Balcón: con balcón privado. Suite: más espacio, servicios premium. El precio varía significativamente entre cada tipo.",
  },
  {
    question: "¿Las propinas están incluidas?",
    answer:
      "La mayoría de las líneas cobran propinas diarias (aprox. $15-20 USD por persona/día) que se cargan a tu cuenta a bordo. Algunas promociones las incluyen. Te lo detallamos antes de reservar.",
  },
  {
    question: "¿Las bebidas alcohólicas están incluidas?",
    answer:
      "En la mayoría de los cruceros, las bebidas alcohólicas NO están incluidas. Se pueden comprar paquetes de bebidas con anticipación a mejor precio. Algunas líneas de lujo sí las incluyen.",
  },
  {
    question: "¿Puedo hacer excursiones en cada puerto?",
    answer:
      "Sí, puedes contratar excursiones directamente con el crucero o de forma independiente. Te recomendamos las mejores opciones según tu tiempo en cada puerto.",
  },
  {
    question: "¿Qué pasa si me mareo?",
    answer:
      "Los cruceros modernos tienen estabilizadores que minimizan el movimiento. Además, hay medicamentos y parches disponibles. La mayoría de las personas no experimenta mareo.",
  },
];

export function CrucerosClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1920&q=80"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/55" />

        <div className="container relative z-10 text-center text-white">
          <Badge className="mb-6 bg-warning text-warning-foreground">
            Cruceros
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Vive la experiencia de un crucero
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Caribe, Mediterráneo, Alaska y más destinos. Cotizamos con las
            mejores navieras del mundo.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              render={
                <a
                  href={WHATSAPP_LINK_WITH_MESSAGE}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              size="lg"
              className="bg-warning text-warning-foreground hover:bg-warning/90 h-14 px-8 gap-2"
            >
              <MessageCircle className="h-5 w-5" /> Cotizar crucero
            </Button>
            <Button
              render={<Link href="/contacto" />}
              size="lg"
              variant="outline"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20 h-14 px-8"
            >
              Más información
            </Button>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <h2 className="text-center text-xl font-semibold mb-6">
            ¿Qué incluye un crucero?
          </h2>
          <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
            {includes.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cruise Types */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Tipos de crucero
            </h2>
            <p className="text-lg text-muted-foreground">
              Encuentra el crucero perfecto para ti
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cruiseTypes.map((type, index) => (
              <Card
                key={index}
                className="group overflow-hidden hover:shadow-strong transition-all"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={type.image}
                    alt={type.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white">
                      <type.icon className="h-6 w-6" />
                      <h3 className="text-xl font-bold">{type.title}</h3>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">
                    {type.description}
                  </p>
                  <Button
                    render={
                      <a
                        href={WHATSAPP_LINK_WITH_MESSAGE}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackConversion("whatsapp_click")}
                      />
                    }
                    className="w-full bg-gradient-primary gap-2"
                  >
                    <MessageCircle className="h-4 w-4" /> Cotizar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              ¿Cómo cotizamos tu crucero?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 shadow-medium">
                  <step.icon className="h-7 w-7 text-primary-foreground" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-warning text-warning-foreground text-xs font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Preguntas sobre cruceros
              </h2>
            </div>
            <Accordion className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left font-medium py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-secondary to-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            ¿Listo para zarpar?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Cotiza tu crucero hoy y vive una experiencia inolvidable
          </p>
          <Button
            render={
              <a
                href={WHATSAPP_LINK_WITH_MESSAGE}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackConversion("whatsapp_click")}
              />
            }
            size="lg"
            className="bg-warning text-warning-foreground hover:bg-warning/90 h-14 px-8 gap-2"
          >
            <MessageCircle className="h-5 w-5" /> Enviar WhatsApp
          </Button>
        </div>
      </section>
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  ArrowRight,
  Check,
  X,
  Users,
  Heart,
  Briefcase,
  MapPin,
  Clock,
  Shield,
  Plane,
  Hotel,
  Camera,
  Utensils,
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

const europePackages = [
  {
    id: 1,
    title: "Europa Clásica",
    destinations: "París, Roma, Barcelona, Madrid",
    duration: "15 días / 14 noches",
    price: "Desde $50,000 MXN",
    includes: [
      "Vuelos redondos",
      "Hoteles 4★",
      "Desayunos",
      "Traslados",
      "Tours guiados",
    ],
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
    tag: "Más popular",
  },
  {
    id: 2,
    title: "Maravillas de Italia",
    destinations: "Roma, Florencia, Venecia, Milán",
    duration: "12 días / 11 noches",
    price: "Desde $45,000 MXN",
    includes: [
      "Vuelos redondos",
      "Hoteles 4★",
      "Desayunos",
      "Trenes internos",
      "Tours",
    ],
    image:
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=600&q=80",
    tag: null,
  },
  {
    id: 3,
    title: "España Completa",
    destinations: "Madrid, Barcelona, Sevilla, Granada",
    duration: "14 días / 13 noches",
    price: "Desde $48,000 MXN",
    includes: [
      "Vuelos redondos",
      "Hoteles 4★",
      "Desayunos",
      "AVE incluido",
      "Excursiones",
    ],
    image:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80",
    tag: null,
  },
  {
    id: 4,
    title: "Francia & Suiza",
    destinations: "París, Ginebra, Zúrich, Lucerna",
    duration: "10 días / 9 noches",
    price: "Desde $55,000 MXN",
    includes: [
      "Vuelos redondos",
      "Hoteles 4★",
      "Desayunos",
      "Trenes panorámicos",
      "Tours",
    ],
    image:
      "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=600&q=80",
    tag: "Premium",
  },
];

const forWhom = [
  {
    icon: Users,
    title: "Primera vez en Europa",
    description:
      "Te guiamos paso a paso para que tu primer viaje internacional sea perfecto.",
  },
  {
    icon: Heart,
    title: "Viaje de luna de miel",
    description:
      "Diseñamos itinerarios románticos con detalles especiales para parejas.",
  },
  {
    icon: Briefcase,
    title: "Presupuesto controlado",
    description:
      "Optimizamos cada peso para que viajes más por menos dinero.",
  },
];

const comparison = [
  { feature: "Acceso a promociones exclusivas", solo: false, agency: true },
  { feature: "Soporte 24/7 durante el viaje", solo: false, agency: true },
  { feature: "Itinerario personalizado", solo: false, agency: true },
  {
    feature: "Asistencia con visas y documentos",
    solo: false,
    agency: true,
  },
  { feature: "Reservaciones garantizadas", solo: false, agency: true },
  { feature: "Horas de investigación", solo: true, agency: false },
  { feature: "Riesgo de errores costosos", solo: true, agency: false },
];

const faqs = [
  {
    question: "¿El precio incluye los vuelos desde Mérida?",
    answer:
      "Sí, todos nuestros paquetes a Europa incluyen vuelos redondos desde la Ciudad de México. Si sales desde Mérida, podemos agregar el vuelo de conexión con un costo adicional muy accesible.",
  },
  {
    question: "¿Necesito visa para viajar a Europa?",
    answer:
      "Los mexicanos no necesitan visa para viajes turísticos de hasta 90 días en la zona Schengen. Solo necesitas pasaporte vigente (mínimo 6 meses), seguro de viaje y desde 2024 el formulario ETIAS. Te ayudamos con todos los requisitos.",
  },
  {
    question: "¿Puedo personalizar el itinerario?",
    answer:
      "¡Absolutamente! Los paquetes que mostramos son ejemplos base. Podemos agregar o quitar ciudades, cambiar la duración, mejorar hoteles, agregar experiencias exclusivas. Todo se adapta a tus preferencias.",
  },
  {
    question: "¿Cuánto debo apartar para asegurar mi viaje?",
    answer:
      "Generalmente solicitamos un anticipo del 30-40% para asegurar tu reservación, especialmente en temporada alta. El resto se puede pagar hasta 30 días antes del viaje. También ofrecemos meses sin intereses.",
  },
  {
    question: "¿Qué pasa si necesito cancelar?",
    answer:
      "Las políticas de cancelación varían según la fecha y el tipo de servicios. Siempre te explicamos claramente las condiciones antes de reservar y ofrecemos seguros de viaje que cubren cancelaciones por causas justificadas.",
  },
  {
    question: "¿Incluyen seguro de viaje?",
    answer:
      "Todos nuestros paquetes pueden incluir seguro de viaje con cobertura médica, equipaje y cancelación. Es altamente recomendado y obligatorio para ingresar a la zona Schengen.",
  },
  {
    question: "¿Cómo es el acompañamiento durante el viaje?",
    answer:
      "Te proporcionamos un itinerario detallado, contactos de emergencia, y soporte por WhatsApp las 24 horas. Si surge cualquier imprevisto, estamos aquí para ayudarte a resolverlo.",
  },
  {
    question: "¿Trabajan con grupos o solo viajes individuales?",
    answer:
      "Trabajamos con ambos. Grupos familiares, amigos, empresas, lunas de miel, viajes individuales. Cada tipo de viaje tiene consideraciones especiales que conocemos bien.",
  },
];

const includes = [
  { icon: Plane, text: "Vuelos redondos" },
  { icon: Hotel, text: "Hoteles 4★" },
  { icon: Utensils, text: "Desayunos incluidos" },
  { icon: Camera, text: "Tours guiados" },
  { icon: Shield, text: "Seguro de viaje" },
  { icon: MapPin, text: "Traslados" },
];

export function ViajeEuropaClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1491557345352-5929e343eb89?w=1920&q=80"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/55" />

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Badge className="mb-6 bg-warning text-warning-foreground">
              Paquetes Todo Incluido
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Viaja a Europa con todo incluido
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90">
              Desde{" "}
              <span className="text-warning font-bold">$50,000 MXN</span> con
              vuelos, hoteles y acompañamiento personalizado
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                render={
                  <a
                    href={WHATSAPP_LINK_WITH_MESSAGE}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                size="lg"
                className="w-full sm:w-auto bg-warning text-warning-foreground hover:bg-warning/90 h-14 px-8 gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Cotizar por WhatsApp
              </Button>
              <Button
                render={<Link href="/contacto" />}
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/30 bg-white/10 text-white hover:bg-white/20 h-14 px-8"
              >
                Enviar formulario
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
            {includes.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-foreground"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Paquetes a Europa
            </h2>
            <p className="text-lg text-muted-foreground">
              Elige tu aventura o personaliza tu itinerario
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {europePackages.map((pkg) => (
              <Card
                key={pkg.id}
                className="overflow-hidden group hover:shadow-strong transition-all"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {pkg.tag && (
                    <Badge className="absolute top-4 left-4 bg-accent">
                      {pkg.tag}
                    </Badge>
                  )}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-2xl font-bold">{pkg.price}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
                  <p className="text-muted-foreground mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {pkg.destinations}
                  </p>
                  <p className="text-muted-foreground mb-4 flex items-center gap-2">
                    <Clock className="h-4 w-4" /> {pkg.duration}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pkg.includes.map((item, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button
                      render={
                        <a
                          href={WHATSAPP_LINK_WITH_MESSAGE}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      }
                      className="flex-1 bg-gradient-primary gap-2"
                    >
                      <MessageCircle className="h-4 w-4" /> WhatsApp
                    </Button>
                    <Button
                      render={<Link href="/contacto" />}
                      variant="outline"
                      className="flex-1 border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                    >
                      Más info
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* For whom */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              ¿Para quién es este viaje?
            </h2>
            <p className="text-lg text-muted-foreground">
              Diseñamos experiencias para diferentes tipos de viajeros
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {forWhom.map((item, index) => (
              <Card
                key={index}
                className="text-center p-8 hover:shadow-medium transition-all"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              ¿Por qué con agencia?
            </h2>
            <p className="text-lg text-muted-foreground">
              Compara viajar solo vs. con nuestro acompañamiento
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-3 gap-4 mb-4 text-center font-semibold">
              <div></div>
              <div className="text-muted-foreground">Por tu cuenta</div>
              <div className="text-primary">Con agencia</div>
            </div>
            {comparison.map((row, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-4 py-3 border-b items-center"
              >
                <div className="text-sm">{row.feature}</div>
                <div className="text-center">
                  {row.solo ? (
                    <Check className="h-5 w-5 text-red-500 mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-muted-foreground mx-auto" />
                  )}
                </div>
                <div className="text-center">
                  {row.agency ? (
                    <Check className="h-5 w-5 text-primary mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-muted-foreground mx-auto" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Preguntas frecuentes
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
            ¿Listo para conocer Europa?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Escríbenos y comienza a planear tu viaje hoy
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
              <MessageCircle className="h-5 w-5" /> Enviar WhatsApp
            </Button>
            <Button
              render={<Link href="/contacto" />}
              size="lg"
              variant="outline"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20 h-14 px-8"
            >
              Ir a Contacto
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

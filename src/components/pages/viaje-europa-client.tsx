"use client";

import Image from "next/image";
import {
  MessageCircle,
  ArrowDown,
  Briefcase,
  MapPin,
  Clock,
  Shield,
  Plane,
  Hotel,
  Camera,
  Utensils,
  Star,
  HeartHandshake,
  ShieldCheck,
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
import { WHATSAPP_LINK_WITH_MESSAGE, whatsappLinkForPackage } from "@/lib/constants";
import { trackConversion } from "@/lib/conversion";
import { InlineContactForm } from "@/components/forms/inline-contact-form";
import allPackages from "@/data/packages.json";

const europePackages = allPackages.filter((p: any) => p.continent === "europa");

const heroBullets = [
  { icon: Star, text: "+500 viajeros felices" },
  { icon: Briefcase, text: "13 años de experiencia organizando viajes" },
  { icon: MessageCircle, text: "Respuesta en menos de 1 hora hábil" },
];

const process = [
  {
    step: "1",
    title: "Cotiza por WhatsApp",
    description:
      "Mándanos un mensaje y te enviamos opciones que se adecúen a ti en menos de 1 hora hábil.",
  },
  {
    step: "2",
    title: "Personalizamos tu itinerario",
    description:
      "Ajustamos ciudades, duración, hoteles y experiencias a tu presupuesto y a lo que tú quieres vivir.",
  },
  {
    step: "3",
    title: "Apartas tu lugar",
    description:
      "Aseguras tu reservación con un anticipo. El resto lo terminas de pagar antes del viaje, con opción a meses sin intereses.",
  },
  {
    step: "4",
    title: "Te acompañamos antes y durante",
    description:
      "Te ayudamos con visas, seguros y documentos. Y mientras viajas tienes soporte por WhatsApp 24/7 si pasa algo.",
  },
];

const guarantees = [
  {
    icon: HeartHandshake,
    title: "Asesoría sin compromiso",
    description:
      "Nos cuentas qué buscas y te armamos opciones gratis. Si no te convence, no pasa nada.",
  },
  {
    icon: ShieldCheck,
    title: "Mejor precio garantizado",
    description:
      "Trabajamos directo con mayoristas. Si encuentras el mismo paquete más barato, te lo igualamos.",
  },
  {
    icon: Star,
    title: "Acompañamiento real, no chatbot",
    description:
      "Hablas con personas reales que conocen Europa, no con un menú automatizado.",
  },
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
              <span className="text-warning font-bold">$39,900 MXN</span> con
              vuelos, hoteles y acompañamiento personalizado
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
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
                className="w-full sm:w-auto bg-warning text-warning-foreground hover:bg-warning/90 h-14 px-8 gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Cotizar por WhatsApp
              </Button>
              <Button
                render={<a href="#paquetes" />}
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/30 bg-white/10 text-white hover:bg-white/20 h-14 px-8 gap-2"
              >
                Ver paquetes <ArrowDown className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/85">
              {heroBullets.map((bullet) => (
                <span
                  key={bullet.text}
                  className="flex items-center gap-1.5"
                >
                  <bullet.icon className="h-4 w-4 text-warning" />
                  {bullet.text}
                </span>
              ))}
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
      <section id="paquetes" className="py-16 lg:py-24 scroll-mt-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Paquetes a Europa
            </h2>
            <p className="text-lg text-muted-foreground">
              Elige tu aventura o personaliza tu itinerario
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {europePackages.map((pkg: any) => (
              <Card
                key={pkg.id}
                className="overflow-hidden group hover:shadow-strong transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={pkg.flyerImage}
                    alt={pkg.title}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {pkg.departureCity && (
                    <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground z-10">
                      Desde {pkg.departureCity}
                    </Badge>
                  )}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4 z-10">
                    <p className="text-white text-2xl font-bold">Desde ${pkg.price?.toLocaleString()} {pkg.currency}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
                  <p className="text-muted-foreground mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">
                      {Array.isArray(pkg.destinations) ? pkg.destinations.slice(0, 4).join(", ") : pkg.destinations}
                      {Array.isArray(pkg.destinations) && pkg.destinations.length > 4 ? "..." : ""}
                    </span>
                  </p>
                  <p className="text-muted-foreground mb-4 flex items-center gap-2">
                    <Clock className="h-4 w-4" /> {pkg.duration}
                  </p>
                  <div className="flex gap-3">
                    <Button
                      render={
                        <a
                          href={whatsappLinkForPackage(pkg.title)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackConversion("whatsapp_click")}
                        />
                      }
                      className="flex-1 bg-gradient-primary gap-2"
                    >
                      <MessageCircle className="h-4 w-4" /> Cotizar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process — Así funciona, paso por paso */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Así funciona, paso por paso
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sin formularios largos. Sin cotizaciones que tardan días.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {process.map((step) => (
              <div
                key={step.step}
                className="relative rounded-2xl border bg-card p-6 shadow-soft"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-white text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees — Nuestras promesas */}
      <section className="py-16 lg:py-24">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Nuestras promesas, en blanco y negro
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {guarantees.map((g) => (
              <div
                key={g.title}
                className="rounded-2xl border bg-card p-6 shadow-soft text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-warning/15">
                  <g.icon className="h-7 w-7 text-warning-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{g.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {g.description}
                </p>
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

      {/* Inline contact form */}
      <section id="contacto" className="py-16 lg:py-20 scroll-mt-20">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-primary/10 text-primary border-0 px-3 py-1">
              ¿Prefieres formulario?
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Déjanos tus datos y te llamamos nosotros
            </h2>
            <p className="text-lg text-muted-foreground">
              Te contactamos en menos de 1 hora hábil con opciones reales.
            </p>
          </div>
          <InlineContactForm
            origen="lp-europa-todo-incluido"
            servicioPrellenado="Viaje a Europa"
          />
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
          <div className="flex justify-center">
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
        </div>
      </section>
    </>
  );
}

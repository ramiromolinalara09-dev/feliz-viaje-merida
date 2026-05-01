"use client";

import Image from "next/image";
import {
  MessageCircle,
  ArrowRight,
  ArrowDown,
  Check,
  X,
  Plane,
  Hotel,
  Camera,
  Shield,
  MapPin,
  Clock,
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  Star,
  Compass,
  AlertTriangle,
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
import {
  whatsappLinkForPackage,
  whatsappLinkWithText,
} from "@/lib/constants";
import { trackConversion } from "@/lib/conversion";
import { InlineContactForm } from "./inline-contact-form";
import allPackages from "@/data/packages.json";

const ORIGEN = "lp-europa";

const HERO_WHATSAPP_TEXT =
  "Hola, vi su anuncio de paquetes a Europa y me gustaría una cotización.";
const FOOTER_WHATSAPP_TEXT =
  "Hola, ya leí toda la página y quiero empezar a planear mi viaje a Europa.";

type Pkg = {
  id: string;
  title: string;
  continent: string;
  departureCity?: string;
  destinations?: string[];
  duration?: string;
  price?: number;
  currency?: string;
  flyerImage?: string;
};

const FEATURED: Pkg[] = (allPackages as Pkg[])
  .filter((p) => p.continent === "europa" && p.departureCity === "CDMX")
  .sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
  .slice(0, 6);

const includes = [
  { icon: Plane, text: "Vuelos redondos" },
  { icon: Hotel, text: "Hoteles" },
  { icon: Camera, text: "Tours guiados" },
  { icon: Shield, text: "Seguro de viaje" },
  { icon: MapPin, text: "Traslados" },
];

const pains = [
  {
    icon: AlertTriangle,
    title: "Horas perdidas comparando vuelos y hoteles",
    description:
      "Buscar el mejor precio en 5 plataformas distintas, leer reseñas, calcular conexiones... y al final no estás seguro si eligiste bien.",
  },
  {
    icon: Compass,
    title: "Riesgo de errores costosos",
    description:
      "Reservas mal hechas, traslados que no conectan, hoteles en zonas inseguras. En Europa, un error te puede salir más caro que el paquete completo.",
  },
  {
    icon: Sparkles,
    title: "Te pierdes lo verdaderamente especial",
    description:
      "Sin alguien que conozca Europa, terminas en los mismos lugares turísticos saturados. Te pierdes los rincones que hacen el viaje memorable.",
  },
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

const comparison = [
  { feature: "Acceso a promociones exclusivas de mayoristas", solo: false, agency: true },
  { feature: "Soporte por WhatsApp 24/7 durante el viaje", solo: false, agency: true },
  { feature: "Itinerario personalizado a tu presupuesto", solo: false, agency: true },
  { feature: "Asistencia con visas, seguros y documentos", solo: false, agency: true },
  { feature: "Reservaciones garantizadas en hoteles seleccionados", solo: false, agency: true },
  { feature: "Pago a meses sin intereses", solo: false, agency: true },
  { feature: "Decenas de horas de investigación", solo: true, agency: false },
  { feature: "Riesgo de pagar de más por errores", solo: true, agency: false },
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
    question: "¿Los precios incluyen vuelos desde Mérida?",
    answer:
      "Los precios base incluyen vuelos desde Ciudad de México. Si sales desde Mérida agregamos el vuelo de conexión a un costo accesible. Te lo cotizamos completo, sin sorpresas.",
  },
  {
    question: "¿Necesito visa para viajar a Europa?",
    answer:
      "Los mexicanos no necesitan visa para viajes turísticos de hasta 90 días en la zona Schengen. Solo pasaporte vigente con mínimo 6 meses, seguro de viaje y desde 2024 el formulario ETIAS. Te ayudamos con todo.",
  },
  {
    question: "¿Puedo personalizar el itinerario o tengo que tomar el paquete tal cual?",
    answer:
      "Personalizable al 100%. Los paquetes que ves son ejemplos base. Podemos agregar o quitar ciudades, cambiar duración, mejorar hoteles o agregar experiencias exclusivas según tus preferencias.",
  },
  {
    question: "¿Cuánto tengo que pagar para apartar mi viaje?",
    answer:
      "Solicitamos un anticipo para asegurar tu reservación. Te confirmamos el monto exacto y los plazos en tu cotización personalizada, junto con las opciones de pago a meses sin intereses.",
  },
  {
    question: "¿Qué pasa si necesito cancelar o cambiar fechas?",
    answer:
      "Las políticas dependen del paquete y de qué tan cerca esté la fecha de viaje. Te explicamos las condiciones específicas antes de reservar y siempre recomendamos contratar el seguro de viaje, que cubre cancelaciones por causas justificadas.",
  },
  {
    question: "¿Cómo es el acompañamiento durante el viaje?",
    answer:
      "Te entregamos un itinerario detallado y soporte por WhatsApp 24/7. Si un vuelo se atrasa, si tienes dudas con un traslado o si necesitas cualquier cosa, nos escribes y te ayudamos en tiempo real.",
  },
];

export function LandingEuropaClient() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/lp-europa-hero.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/85 via-secondary/70 to-primary/60" />

        <div className="container relative z-10 py-20 md:py-28 lg:py-32">
          <div className="max-w-3xl text-white">
            <Badge className="mb-6 bg-warning text-warning-foreground border-0 text-sm px-3 py-1">
              ✈️ Salidas confirmadas en 2026
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Viaja a Europa con todo incluido,
              <span className="text-warning"> sin los dolores de cabeza</span> de organizarlo solo
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl">
              Vuelos, hoteles, tours guiados y acompañamiento por WhatsApp 24/7.
              Diseñamos tu viaje desde Mérida o cualquier ciudad de México.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center mb-8">
              <Button
                nativeButton={false}
                render={
                  <a
                    href={whatsappLinkWithText(HERO_WHATSAPP_TEXT)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackConversion("whatsapp_click")}
                  />
                }
                className="bg-warning text-warning-foreground hover:bg-warning/90 h-14 px-8 gap-2 text-base shadow-strong"
              >
                <MessageCircle className="h-5 w-5" />
                Cotizar por WhatsApp
              </Button>
              <Button
                nativeButton={false}
                render={<a href="#paquetes" />}
                className="bg-white/15 backdrop-blur-sm border border-white/30 text-white hover:bg-white/25 h-14 px-8 gap-2 text-base"
              >
                Ver paquetes <ArrowDown className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-warning text-warning" /> +500 viajeros felices
              </span>
              <span>·</span>
              <span>+8 años de experiencia organizando viajes</span>
              <span>·</span>
              <span>Respuesta en menos de 1 hora hábil</span>
            </div>
          </div>
        </div>
      </section>

      {/* INCLUDES STRIP */}
      <section className="border-y border-border/40 bg-muted/30 py-6">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {includes.map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-2 text-sm text-foreground"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-16 lg:py-20">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Organizar Europa por tu cuenta es agotador
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Lo que parece ahorro termina costando tiempo, dinero y la tranquilidad de un viaje bien planeado.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {pains.map((pain) => (
              <div
                key={pain.title}
                className="rounded-2xl border bg-card p-6 shadow-soft"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <pain.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{pain.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pain.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="paquetes" className="py-16 lg:py-20 bg-muted/30 scroll-mt-20">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent/10 text-accent border-0 px-3 py-1">
              Paquetes 2026
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Paquetes destacados a Europa
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Elige el que más te llame y cotízalo por WhatsApp. Personalizamos cualquiera a lo que tú necesitas.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURED.map((pkg) => (
              <Card
                key={pkg.id}
                className="overflow-hidden border bg-card shadow-soft transition-all hover:shadow-strong hover:-translate-y-0.5 p-0"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  {pkg.flyerImage && (
                    <Image
                      src={pkg.flyerImage}
                      alt={pkg.title}
                      fill
                      className="object-cover object-top transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                    <p className="text-white text-2xl font-bold">
                      Desde ${pkg.price?.toLocaleString("es-MX")}{" "}
                      <span className="text-base font-medium opacity-90">
                        {pkg.currency}
                      </span>
                    </p>
                  </div>
                </div>
                <CardContent className="p-5 pt-4">
                  <h3 className="mb-2 text-lg font-bold leading-snug">
                    {pkg.title}
                  </h3>
                  <div className="mb-4 space-y-1.5 text-sm text-muted-foreground">
                    {pkg.destinations && (
                      <p className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">
                          {pkg.destinations.slice(0, 4).join(", ")}
                          {pkg.destinations.length > 4 ? "..." : ""}
                        </span>
                      </p>
                    )}
                    {pkg.duration && (
                      <p className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{pkg.duration}</span>
                      </p>
                    )}
                  </div>
                  <Button
                    nativeButton={false}
                    render={
                      <a
                        href={whatsappLinkForPackage(pkg.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackConversion("whatsapp_click")}
                      />
                    }
                    className="w-full bg-gradient-primary text-white hover:opacity-90 h-11 gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Cotizar este paquete
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="mb-4 text-muted-foreground">
              ¿Buscas algo distinto? Tenemos más de 25 itinerarios a Europa.
            </p>
            <Button
              nativeButton={false}
              render={
                <a
                  href={whatsappLinkWithText(
                    "Hola, vi sus paquetes a Europa pero busco algo diferente. ¿Podemos armar uno a mi medida?",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackConversion("whatsapp_click")}
                />
              }
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 px-6 gap-2"
            >
              Pídenos un paquete a tu medida
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 lg:py-20">
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

      {/* COMPARISON */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Por tu cuenta vs. con nosotros
            </h2>
            <p className="text-lg text-muted-foreground">
              Comparado lado a lado, sin marketing.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border bg-card shadow-soft">
            <div className="grid grid-cols-3 bg-muted/50 px-4 py-3 text-sm font-semibold">
              <div></div>
              <div className="text-center text-muted-foreground">Por tu cuenta</div>
              <div className="text-center text-primary">Con nosotros</div>
            </div>
            {comparison.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 items-center gap-2 px-4 py-3 text-sm ${
                  i % 2 === 0 ? "bg-background" : "bg-muted/20"
                }`}
              >
                <div>{row.feature}</div>
                <div className="flex justify-center">
                  {row.solo ? (
                    <Check className="h-5 w-5 text-destructive" />
                  ) : (
                    <X className="h-5 w-5 text-muted-foreground/40" />
                  )}
                </div>
                <div className="flex justify-center">
                  {row.agency ? (
                    <Check className="h-5 w-5 text-primary" />
                  ) : (
                    <X className="h-5 w-5 text-muted-foreground/40" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEES */}
      <section className="py-16 lg:py-20">
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
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Preguntas frecuentes
            </h2>
          </div>
          <Accordion className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index}`}
                className="rounded-xl border bg-card px-5"
              >
                <AccordionTrigger className="py-4 text-left font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FORM */}
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
          <InlineContactForm origen={ORIGEN} servicioPrellenado="Viaje a Europa" />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden py-16 lg:py-20 bg-gradient-to-br from-secondary via-secondary to-primary text-white">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Tu próximo viaje empieza con un mensaje
          </h2>
          <p className="text-lg text-white/85 mb-8">
            Sin compromiso, sin formularios largos. Solo dinos a dónde quieres ir.
          </p>
          <Button
            nativeButton={false}
            render={
              <a
                href={whatsappLinkWithText(FOOTER_WHATSAPP_TEXT)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackConversion("whatsapp_click")}
              />
            }
            className="bg-warning text-warning-foreground hover:bg-warning/90 h-14 px-10 gap-2 text-base shadow-strong"
          >
            <MessageCircle className="h-5 w-5" />
            Cotizar mi viaje a Europa
          </Button>
        </div>
      </section>
    </>
  );
}

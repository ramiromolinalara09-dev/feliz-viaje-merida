import type { Metadata } from "next";
import Image from "next/image";
import { MessageCircle, MapPin, Award, Plane, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WHATSAPP_LINK_WITH_MESSAGE, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Nosotros`,
  description:
    "Conoce a Feliz Viaje Mérida. Más de 13 años organizando viajes a Europa, Asia, Medio Oriente y más. Tu agencia de viajes de confianza.",
};

const credentials = [
  { icon: Award, value: "13+", label: "Años de experiencia" },
  { icon: Plane, value: "500+", label: "Viajes organizados" },
  { icon: Globe, value: "50+", label: "Destinos" },
  { icon: MapPin, value: "4", label: "Continentes visitados" },
];

const destinations = [
  "Europa: España, Italia, Francia, Alemania, Suiza, Portugal, Grecia",
  "Asia: Tailandia, Japón, Turquía, Emiratos Árabes",
  "Medio Oriente: Israel, Jordania, Egipto",
  "Sudamérica: Perú, Argentina, Chile, Colombia",
  "Norteamérica: Estados Unidos, Canadá",
];

export default function NosotrosPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 lg:py-20">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1920&q=80"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/55" />

        <div className="container relative z-10 text-center text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Tu agencia de viajes de confianza en Mérida
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Viajamos contigo desde 2011 — conoce a quien está detrás de tus
            viajes
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {credentials.map((cred, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <cred.icon className="h-7 w-7 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground">
                  {cred.value}
                </p>
                <p className="text-sm text-muted-foreground">{cred.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Nuestra pasión es viajar
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg">
                  <span className="text-foreground font-medium">
                    &quot;Me gusta que la gente cumpla su sueño y pueda hacer lo
                    que quiera, sin limitantes, cuando realiza su primer viaje al
                    extranjero.&quot;
                  </span>
                </p>
                <p>
                  Así define Patricio, fundador de Feliz Viaje Mérida, su
                  motivación para dedicarse a organizar viajes. Con más de 13
                  años de experiencia, ha ayudado a cientos de familias yucatecas
                  a conocer Europa, Asia, Medio Oriente y Sudamérica.
                </p>
                <p>
                  Nuestro enfoque es simple: entender qué quieres vivir, diseñar
                  un itinerario a tu medida, y acompañarte en cada paso del
                  proceso. No vendemos paquetes genéricos; creamos experiencias
                  personalizadas.
                </p>
                <p>
                  Hemos viajado personalmente a los destinos que recomendamos.
                  Conocemos los mejores hoteles, los tours más valiosos, y los
                  secretos que solo un viajero experimentado puede compartir.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/patricio.jpeg"
                alt="Patricio, fundador de Feliz Viaje Mérida"
                width={600}
                height={400}
                className="rounded-2xl shadow-strong"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-medium">
                <p className="text-sm text-muted-foreground">Fundador</p>
                <p className="font-semibold text-foreground">Patricio</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-center">
              Destinos que conocemos
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              Hemos viajado a estos lugares y podemos asesorarte con
              conocimiento de primera mano:
            </p>
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {destinations.map((dest, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{dest}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Destination image */}
            <div className="mt-10 relative aspect-[3/1] w-full">
              <Image
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80"
                alt="Destinos de viaje alrededor del mundo"
                fill
                className="object-cover rounded-2xl shadow-strong"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-secondary to-primary text-white">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            ¿Listo para conocernos?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Escríbenos y cuéntanos sobre el viaje de tus sueños
          </p>
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
        </div>
      </section>
    </>
  );
}

import { Users, Shield, BadgeCheck, Clock, Headphones, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: Headphones,
    title: "Acompañamiento personalizado",
    description: "Te guiamos antes, durante y después de tu viaje. Siempre tendrás a alguien que te respalde.",
  },
  {
    icon: BadgeCheck,
    title: "Propuesta a tu medida",
    description: "Diseñamos tu itinerario según tus gustos, presupuesto y tiempo disponible.",
  },
  {
    icon: Shield,
    title: "Acceso a mejores opciones",
    description: "Trabajamos con proveedores que ofrecen promociones exclusivas no disponibles al público.",
  },
  {
    icon: Clock,
    title: "Ahorra tiempo",
    description: "Nos encargamos de todo: vuelos, hoteles, tours, traslados. Tú solo disfruta.",
  },
  {
    icon: CreditCard,
    title: "Sin imprevistos",
    description: "Evita gastos inesperados y malas decisiones. Planificamos cada detalle.",
  },
  {
    icon: Users,
    title: "13 años de experiencia",
    description: "Más de una década organizando viajes exitosos a Europa, Asia, Medio Oriente y más.",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            ¿Por qué contratar una agencia?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Viajar por tu cuenta puede parecer más barato, pero con nosotros ahorras tiempo, dinero y preocupaciones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => {
            const isAccent = index % 2 === 1;
            return (
              <Card
                key={index}
                className={`group border-border/50 hover:shadow-medium transition-all duration-300 ${isAccent ? 'hover:border-accent/30' : 'hover:border-primary/30'}`}
              >
                <CardContent className="p-6 lg:p-8">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${isAccent ? 'bg-accent/10 group-hover:bg-accent/20' : 'bg-primary/10 group-hover:bg-primary/20'}`}>
                    <benefit.icon className={`h-6 w-6 ${isAccent ? 'text-accent' : 'text-primary'}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

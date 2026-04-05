import { Calendar, FileSearch, Plane, Hotel, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Calendar,
    step: 1,
    title: "Definimos fechas y destinos",
    description: "Elegimos el mes, días disponibles y los lugares que sueñas visitar.",
  },
  {
    icon: FileSearch,
    step: 2,
    title: "Elaboramos tu propuesta",
    description: "Creamos un itinerario personalizado basado en tus preferencias.",
  },
  {
    icon: Plane,
    step: 3,
    title: "Buscamos tu vuelo ideal",
    description: "Encontramos las mejores opciones de vuelos con escalas convenientes.",
  },
  {
    icon: Hotel,
    step: 4,
    title: "Hospedaje y experiencias",
    description: "Reservamos hoteles, traslados, tours y excursiones incluidas.",
  },
  {
    icon: CheckCircle,
    step: 5,
    title: "Tú eliges y confirmas",
    description: "Te presentamos opciones y tú decides. Sin presiones, a tu ritmo.",
  },
];

export function ProcessSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            ¿Cómo trabajamos?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un proceso simple y transparente para que tu viaje sea perfecto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center bg-card rounded-xl p-6 shadow-sm border border-border/50 hover:shadow-medium transition-shadow"
            >
              <div className="relative w-14 h-14 rounded-full bg-primary flex items-center justify-center mb-4">
                <step.icon className="h-6 w-6 text-primary-foreground" />
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                  {step.step}
                </span>
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

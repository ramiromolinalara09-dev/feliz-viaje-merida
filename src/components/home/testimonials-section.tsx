import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "María García",
    location: "Mérida, Yucatán",
    rating: 5,
    text: "Excelente servicio. Patricio nos ayudó a planear nuestro primer viaje a Europa y todo salió perfecto. La atención personalizada hizo toda la diferencia.",
    trip: "Europa Clásica 2024",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    location: "Mérida, Yucatán",
    rating: 5,
    text: "Viajamos en familia con dos niños pequeños. Nos recomendaron los mejores hoteles y actividades para toda la familia. Sin duda volveremos a reservar con ellos.",
    trip: "Italia en Familia 2024",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
  },
  {
    id: 3,
    name: "Ana Martínez",
    location: "Cancún, Q. Roo",
    rating: 5,
    text: "Contraté un crucero por el Mediterráneo y fue la mejor decisión. Todo estuvo coordinado perfectamente. La comunicación por WhatsApp fue inmediata siempre.",
    trip: "Crucero Mediterráneo 2024",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Lo que dicen nuestros viajeros
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Más de 13 años ayudando a personas a cumplir su sueño de viajar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="border-border/50 hover:shadow-medium transition-all duration-300"
            >
              <CardContent className="p-6 lg:p-8">
                <Quote className="h-8 w-8 text-accent/40 mb-4" />

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>

                <p className="text-foreground mb-6 leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    <p className="text-xs text-primary mt-1">{testimonial.trip}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

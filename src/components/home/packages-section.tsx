import Link from "next/link";
import Image from "next/image";
import { MessageCircle, ArrowRight, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WHATSAPP_LINK_WITH_MESSAGE } from "@/lib/constants";
import allPackages from "@/data/packages.json";

// Show up to 6 featured packages (one per continent, then fill with cheapest)
function getFeaturedPackages() {
  if (allPackages.length === 0) return [];

  const continents = [...new Set(allPackages.map((p: any) => p.continent))];
  const featured: any[] = [];

  // Pick one from each continent (cheapest)
  for (const continent of continents) {
    const fromContinent = allPackages
      .filter((p: any) => p.continent === continent && p.price)
      .sort((a: any, b: any) => a.price - b.price);
    if (fromContinent[0]) featured.push(fromContinent[0]);
  }

  // Fill remaining slots up to 6 with cheapest not already included
  const remaining = allPackages
    .filter((p: any) => !featured.find((f: any) => f.id === p.id) && p.price)
    .sort((a: any, b: any) => a.price - b.price);

  for (const pkg of remaining) {
    if (featured.length >= 6) break;
    featured.push(pkg);
  }

  return featured;
}

const CONTINENT_LABELS: Record<string, string> = {
  europa: "Europa",
  asia: "Asia",
  "medio-oriente": "Medio Oriente",
  america: "América",
};

export function PackagesSection() {
  const packages = getFeaturedPackages();

  if (packages.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Paquetes destacados
            </h2>
            <p className="text-lg text-muted-foreground">
              Descubre nuestros viajes más solicitados
            </p>
          </div>
          <Button render={<Link href="/paquetes-de-viaje" />} variant="outline" className="w-fit gap-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
            Ver todos los paquetes
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg: any) => (
            <Card
              key={pkg.id}
              className="group overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-strong transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={pkg.flyerImage}
                  alt={pkg.title}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground z-10">
                  {CONTINENT_LABELS[pkg.continent] || pkg.continent}
                </Badge>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <p className="text-white font-bold text-xl">
                    Desde ${pkg.price?.toLocaleString()} {pkg.currency}
                  </p>
                </div>
              </div>

              <CardContent className="p-5">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {pkg.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {pkg.destinations?.slice(0, 4).join(", ")}
                    {pkg.destinations?.length > 4 ? "..." : ""}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4" />
                  {pkg.duration}
                </div>

                <div className="flex gap-3">
                  <Button render={<a href={WHATSAPP_LINK_WITH_MESSAGE} target="_blank" rel="noopener noreferrer" />} size="sm" className="flex-1 bg-gradient-primary gap-2">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </Button>
                  <Button render={<Link href="/paquetes-de-viaje" />} size="sm" variant="outline" className="flex-1 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                    Ver más
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

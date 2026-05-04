"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { MessageCircle, MapPin, Clock, Hotel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WHATSAPP_LINK_WITH_MESSAGE } from "@/lib/constants";
import { trackConversion } from "@/lib/conversion";
import allPackages from "@/data/packages.json";
import {
  PackageFilters,
  DEFAULT_FILTER_VALUES,
  CONTINENT_LABELS,
  applyPackageFilters,
  type FilterValues,
} from "@/components/packages/package-filters";

export function PaquetesClient() {
  const [filterValues, setFilterValues] = useState<FilterValues>(DEFAULT_FILTER_VALUES);

  const filteredPackages = useMemo(
    () => applyPackageFilters(allPackages, filterValues),
    [filterValues],
  );

  const clearFilters = () => setFilterValues(DEFAULT_FILTER_VALUES);

  const hasFilters =
    filterValues.continent !== "all" || filterValues.departureCity !== "all";

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 lg:py-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="container relative z-10 text-center text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Nuestros paquetes de viaje
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Explora destinos increíbles con todo incluido. Viajes a Europa, Asia, Medio Oriente y América con el respaldo de expertos.
          </p>
        </div>
      </section>

      {/* Filters */}
      {allPackages.length > 0 && (
        <section className="py-6 border-b bg-background sticky top-16 lg:top-[104px] z-30">
          <div className="container">
            <PackageFilters
              packages={allPackages}
              enabled={["continent", "departureCity"]}
              values={filterValues}
              onChange={setFilterValues}
            />
          </div>
        </section>
      )}

      {/* Packages Grid */}
      <section className="py-12 lg:py-16">
        <div className="container">
          {filteredPackages.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">
                {allPackages.length === 0
                  ? "Los paquetes se están actualizando. Contáctanos por WhatsApp para cotizar."
                  : "No hay paquetes que coincidan con los filtros."}
              </p>
              {hasFilters && (
                <Button onClick={clearFilters}>Ver todos los paquetes</Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredPackages.map((pkg: any) => (
                <Card
                  key={pkg.id}
                  className="group overflow-hidden hover:shadow-strong transition-all"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={pkg.flyerImage}
                      alt={pkg.title}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 z-10 flex gap-2">
                      <Badge className="bg-accent text-accent-foreground">
                        {CONTINENT_LABELS[pkg.continent] || pkg.continent}
                      </Badge>
                      {pkg.departureCity && (
                        <Badge className="bg-secondary text-secondary-foreground">
                          Desde {pkg.departureCity}
                        </Badge>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 z-10">
                      <p className="text-white font-bold text-xl">
                        Desde ${pkg.price?.toLocaleString()} {pkg.currency}
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="text-lg font-semibold mb-2">{pkg.title}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">
                        {pkg.destinations?.slice(0, 4).join(", ")}
                        {pkg.destinations?.length > 4 ? "..." : ""}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Clock className="h-4 w-4" />
                      {pkg.duration}
                    </div>
                    <div className="mb-4" />
                    <div className="flex gap-3">
                      <Button
                        render={<a href={WHATSAPP_LINK_WITH_MESSAGE} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion("whatsapp_click")} />}
                        size="sm"
                        className="flex-1 bg-gradient-primary gap-2"
                      >
                        <MessageCircle className="h-4 w-4" /> Cotizar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Hoteles Todo Incluido */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Hotel className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">Hoteles Todo Incluido</h2>
            <p className="text-muted-foreground mb-6">
              ¿Buscas un hotel todo incluido en playa? Tenemos opciones en Cancún, Riviera Maya, Los Cabos y más destinos nacionales e internacionales. Escríbenos para cotizar.
            </p>
            <Button
              render={<a href={WHATSAPP_LINK_WITH_MESSAGE} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion("whatsapp_click")} />}
              size="lg"
              className="bg-gradient-primary gap-2"
            >
              <MessageCircle className="h-5 w-5" /> Cotizar hotel todo incluido
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-secondary to-primary text-white">
        <div className="container text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-white/80 mb-6">
            Diseñamos paquetes personalizados según tus preferencias.
          </p>
          <Button
            render={<a href={WHATSAPP_LINK_WITH_MESSAGE} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion("whatsapp_click")} />}
            size="lg"
            className="bg-warning text-warning-foreground hover:bg-warning/90 gap-2"
          >
            <MessageCircle className="h-5 w-5" /> Cotizar viaje personalizado
          </Button>
        </div>
      </section>
    </>
  );
}

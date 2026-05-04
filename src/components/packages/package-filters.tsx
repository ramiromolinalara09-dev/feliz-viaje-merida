"use client";

import { useMemo } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type FilterDimension = "continent" | "departureCity" | "country";

export type FilterValues = {
  continent: string;
  departureCity: string;
  country: string;
};

export const DEFAULT_FILTER_VALUES: FilterValues = {
  continent: "all",
  departureCity: "all",
  country: "all",
};

export const CONTINENT_LABELS: Record<string, string> = {
  europa: "Europa",
  asia: "Asia",
  "medio-oriente": "Medio Oriente",
  america: "América",
};

type PackageLike = {
  continent?: string;
  departureCity?: string;
  countries?: string[];
};

type Props<T extends PackageLike> = {
  packages: T[];
  enabled: FilterDimension[];
  values: FilterValues;
  onChange: (values: FilterValues) => void;
};

export function applyPackageFilters<T extends PackageLike>(
  packages: T[],
  values: FilterValues,
): T[] {
  return packages.filter((pkg) => {
    if (values.continent !== "all" && pkg.continent !== values.continent) return false;
    if (values.departureCity !== "all" && pkg.departureCity !== values.departureCity) return false;
    if (values.country !== "all" && !(pkg.countries ?? []).includes(values.country)) return false;
    return true;
  });
}

export function PackageFilters<T extends PackageLike>({
  packages,
  enabled,
  values,
  onChange,
}: Props<T>) {
  const continents = useMemo(
    () =>
      [...new Set(packages.map((p) => p.continent).filter(Boolean))] as string[],
    [packages],
  );
  const departureCities = useMemo(
    () =>
      [...new Set(packages.map((p) => p.departureCity).filter(Boolean))] as string[],
    [packages],
  );
  const countries = useMemo(
    () =>
      ([...new Set(packages.flatMap((p) => p.countries ?? []).filter(Boolean))] as string[]).sort(
        (a, b) => a.localeCompare(b, "es"),
      ),
    [packages],
  );

  const filtered = useMemo(
    () => applyPackageFilters(packages, values),
    [packages, values],
  );

  const update = (key: FilterDimension, value: string | null | undefined) => {
    onChange({ ...values, [key]: value ?? "all" });
  };

  const clear = () => onChange(DEFAULT_FILTER_VALUES);

  const hasActiveFilter =
    (enabled.includes("continent") && values.continent !== "all") ||
    (enabled.includes("departureCity") && values.departureCity !== "all") ||
    (enabled.includes("country") && values.country !== "all");

  if (packages.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Filter className="h-4 w-4" />
        <span className="text-sm font-medium">Filtrar:</span>
      </div>

      {enabled.includes("continent") && continents.length > 0 && (
        <Select
          value={values.continent}
          onValueChange={(v) => update("continent", v)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Continente" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los destinos</SelectItem>
            {continents.map((c) => (
              <SelectItem key={c} value={c}>
                {CONTINENT_LABELS[c] || c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {enabled.includes("departureCity") && departureCities.length > 0 && (
        <Select
          value={values.departureCity}
          onValueChange={(v) => update("departureCity", v)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ciudad de salida" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las salidas</SelectItem>
            {departureCities.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {enabled.includes("country") && countries.length > 0 && (
        <Select
          value={values.country}
          onValueChange={(v) => update("country", v)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="País" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los países</SelectItem>
            {countries.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {hasActiveFilter && (
        <Button variant="ghost" size="sm" onClick={clear} className="gap-1">
          <X className="h-4 w-4" /> Limpiar
        </Button>
      )}

      <span className="ml-auto text-sm text-muted-foreground">
        {filtered.length} paquete{filtered.length !== 1 ? "s" : ""}
      </span>
    </div>
  );
}

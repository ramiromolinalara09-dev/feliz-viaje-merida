import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/viaje-a-europa-todo-incluido",
    "/paquetes-de-viaje",
    "/cruceros",
    "/nosotros",
    "/contacto",
    "/blog",
    "/aviso-de-privacidad",
    "/terminos",
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}

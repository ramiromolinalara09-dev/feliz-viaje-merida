import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: `Blog de Viajes`,
  description:
    "Tips de viaje, experiencias de clientes y rutas recomendadas. Aprende a viajar mejor con los consejos de Feliz Viaje Mérida.",
};

const categories = [
  { slug: "tips-presupuesto", name: "Tips de presupuesto", count: 5 },
  {
    slug: "experiencias-clientes",
    name: "Experiencias de clientes",
    count: 3,
  },
  { slug: "rutas-vividas", name: "Rutas vividas", count: 4 },
];

const posts = [
  {
    id: 1,
    title: "Cómo viajar a Europa con menos de $50,000 pesos",
    excerpt:
      "Te compartimos los mejores consejos para planear un viaje a Europa sin gastar de más. Desde elegir la temporada correcta hasta encontrar vuelos baratos.",
    category: "tips-presupuesto",
    categoryName: "Tips de presupuesto",
    date: "15 de enero, 2025",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
    readTime: "5 min",
  },
  {
    id: 2,
    title: "Mi experiencia viajando a Italia con Feliz Viaje",
    excerpt:
      "María nos comparte su experiencia de 12 días recorriendo Roma, Florencia y Venecia. Un viaje que superó todas sus expectativas.",
    category: "experiencias-clientes",
    categoryName: "Experiencias de clientes",
    date: "10 de enero, 2025",
    image:
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=600&q=80",
    readTime: "8 min",
  },
  {
    id: 3,
    title: "Ruta por España: Madrid, Barcelona y Sevilla",
    excerpt:
      "Descubre el itinerario perfecto para conocer las tres ciudades más emblemáticas de España en 14 días inolvidables.",
    category: "rutas-vividas",
    categoryName: "Rutas vividas",
    date: "5 de enero, 2025",
    image:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80",
    readTime: "10 min",
  },
  {
    id: 4,
    title: "5 errores que debes evitar al planear tu viaje",
    excerpt:
      "Después de más de 13 años organizando viajes, te compartimos los errores más comunes que cometen los viajeros primerizos.",
    category: "tips-presupuesto",
    categoryName: "Tips de presupuesto",
    date: "28 de diciembre, 2024",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80",
    readTime: "6 min",
  },
  {
    id: 5,
    title: "Crucero por el Mediterráneo: Lo que nadie te cuenta",
    excerpt:
      "Carlos y su familia vivieron la experiencia de un crucero de 8 días. Aquí sus tips y recomendaciones para quienes viajan por primera vez.",
    category: "experiencias-clientes",
    categoryName: "Experiencias de clientes",
    date: "20 de diciembre, 2024",
    image:
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=80",
    readTime: "7 min",
  },
  {
    id: 6,
    title: "Guía completa: Documentos para viajar a Europa",
    excerpt:
      "Todo lo que necesitas saber sobre pasaporte, ETIAS, seguros de viaje y requisitos para ingresar a la zona Schengen desde México.",
    category: "tips-presupuesto",
    categoryName: "Tips de presupuesto",
    date: "15 de diciembre, 2024",
    image:
      "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=600&q=80",
    readTime: "8 min",
  },
];

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 lg:py-20">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80"
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
            Blog de viajes
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Tips, experiencias y rutas para que viajes mejor informado
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b">
        <div className="container">
          <div className="flex flex-wrap gap-3 justify-center">
            <Badge
              variant="secondary"
              className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Todos
            </Badge>
            {categories.map((cat) => (
              <Badge
                key={cat.slug}
                variant="outline"
                className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                {cat.name} ({cat.count})
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="group overflow-hidden hover:shadow-strong transition-all"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <Badge className="absolute top-4 left-4 bg-accent">
                    {post.categoryName}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </span>
                    <span>{post.readTime} lectura</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-1 text-primary font-medium text-sm hover:gap-2 transition-all"
                  >
                    Leer más <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            ¿Quieres más tips de viaje?
          </h2>
          <p className="text-muted-foreground mb-6">
            Síguenos en redes sociales para más contenido
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="https://instagram.com/felizviaje_merida"
              target="_blank"
              className="text-primary hover:text-accent transition-colors"
            >
              @felizviaje_merida
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

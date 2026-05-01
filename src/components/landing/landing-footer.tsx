import Link from "next/link";
import {
  EMAIL,
  PHONE_DISPLAY,
  ADDRESS,
  SITE_NAME,
} from "@/lib/constants";

export function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-muted/30 py-8 text-sm text-muted-foreground">
      <div className="container flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <p className="font-semibold text-foreground">{SITE_NAME}</p>
          <p>{ADDRESS.full}</p>
          <p>
            <a
              href={`mailto:${EMAIL}`}
              className="hover:text-primary transition-colors"
            >
              {EMAIL}
            </a>
            <span className="mx-2">·</span>
            <a
              href={`tel:${PHONE_DISPLAY.replace(/\D/g, "")}`}
              className="hover:text-primary transition-colors"
            >
              {PHONE_DISPLAY}
            </a>
          </p>
        </div>
        <div className="flex flex-col gap-2 md:items-end">
          <Link
            href="/aviso-de-privacidad"
            className="hover:text-primary transition-colors"
          >
            Aviso de privacidad
          </Link>
          <Link
            href="/terminos"
            className="hover:text-primary transition-colors"
          >
            Términos y condiciones
          </Link>
          <p className="text-xs">
            © {year} {SITE_NAME}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Contact Information
export const WHATSAPP_NUMBER = "529999011919";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
export const WHATSAPP_MESSAGE = "Hola, me interesa obtener información sobre sus servicios de viaje.";
export const WHATSAPP_LINK_WITH_MESSAGE = `${WHATSAPP_LINK}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export function whatsappLinkWithText(text: string): string {
  return `${WHATSAPP_LINK}?text=${encodeURIComponent(text)}`;
}

export function whatsappLinkForPackage(packageTitle: string): string {
  return whatsappLinkWithText(
    `Hola, vi su anuncio de "${packageTitle}" y me gustaría más información.`,
  );
}

export const PHONE_NUMBER = "9999011919";
export const PHONE_DISPLAY = "(999) 901-1919";
export const EMAIL = "reservaciones@merida.felizviaje.mx";

export const ADDRESS = {
  street: "Calle 19a No. 116 Depto X 22",
  neighborhood: "Col. Chuburná de Hidalgo",
  postalCode: "CP 97208",
  city: "Mérida, Yucatán",
  full: "Calle 19a No. 116 Depto X 22, Col. Chuburná de Hidalgo, CP 97208, Mérida, Yucatán",
};

export const HOURS = {
  online: "Atención en línea 24/7",
  physical: "Mié–Vie 3:30pm–7:30pm, Sáb–Dom 10am–2pm",
};

// Social Media
export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/felizviaje_merida",
  instagramHandle: "@felizviaje_merida",
  facebook: "https://facebook.com/felizviajemérida",
  facebookName: "Feliz Viaje Mérida",
};

// SEO
export const SITE_NAME = "Feliz Viaje Mérida";
export const SITE_DOMAIN = "felizviajemérida.com";
export const SITE_URL = `https://${SITE_DOMAIN}`;
export const SITE_DESCRIPTION = "Agencia de viajes en Mérida. Viaja a Europa con $50,000 pesos con acompañamiento personalizado. Paquetes, cruceros y más.";

// Navigation
export const NAV_LINKS = [
  { href: "/viaje-a-europa-todo-incluido", label: "Viaje a Europa", icon: "Plane" },
  { href: "/paquetes-de-viaje", label: "Nuestros paquetes", icon: "Package" },
  { href: "/nosotros", label: "Nosotros", icon: "Users" },
  { href: "/contacto", label: "Contacto", icon: "Mail" },
] as const;

// Services for contact form
export const SERVICES = [
  "Viaje a Europa",
  "Paquetes nacionales",
  "Paquetes internacionales",
  "Cruceros",
  "Vuelos",
  "Hoteles",
  "Tours y excursiones",
  "Otro",
] as const;

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "set" | "consent",
      action: string,
      params?: Record<string, unknown>,
    ) => void;
    dataLayer?: unknown[];
  }
}

type ConversionEvent = "whatsapp_click" | "form_submit";

const GADS_CONVERSION_ID = process.env.NEXT_PUBLIC_GADS_CONVERSION_ID;
const GADS_CONVERSION_LABEL = process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL;

export function trackConversion(event: ConversionEvent, value?: number): void {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", event, {
    event_category: "lead",
    event_label: event,
    value: value ?? 1,
  });

  if (GADS_CONVERSION_ID && GADS_CONVERSION_LABEL) {
    window.gtag("event", "conversion", {
      send_to: `${GADS_CONVERSION_ID}/${GADS_CONVERSION_LABEL}`,
      value: value ?? 1,
      currency: "MXN",
    });
  }
}

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
const GADS_FORM_LABEL = process.env.NEXT_PUBLIC_GADS_FORM_LABEL;
const GADS_WHATSAPP_LABEL = process.env.NEXT_PUBLIC_GADS_WHATSAPP_LABEL;

const labelByEvent: Record<ConversionEvent, string | undefined> = {
  form_submit: GADS_FORM_LABEL,
  whatsapp_click: GADS_WHATSAPP_LABEL,
};

const valueByEvent: Record<ConversionEvent, number> = {
  form_submit: 500,
  whatsapp_click: 200,
};

export function trackConversion(event: ConversionEvent, value?: number): void {
  if (typeof window === "undefined" || !window.gtag) return;

  const label = labelByEvent[event];
  if (!GADS_CONVERSION_ID || !label) return;

  window.gtag("event", "conversion", {
    send_to: `${GADS_CONVERSION_ID}/${label}`,
    value: value ?? valueByEvent[event],
    currency: "MXN",
  });
}

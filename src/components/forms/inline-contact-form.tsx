"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { whatsappLinkWithText } from "@/lib/constants";
import { trackConversion } from "@/lib/conversion";

const FALLBACK_WHATSAPP_TEXT =
  "Hola, vi su anuncio de paquetes a Europa y me gustaría más información.";

type Props = {
  origen: string;
  servicioPrellenado: string;
};

export function InlineContactForm({ origen, servicioPrellenado }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const update = (field: keyof typeof data) => (value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submitting) return;

    if (!data.nombre || !data.email || !data.telefono) {
      toast.error("Por favor completa nombre, email y teléfono.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      toast.error("El correo electrónico no es válido.");
      return;
    }

    const phoneDigits = data.telefono.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      toast.error("Ingresa un teléfono válido (mínimo 10 dígitos).");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          servicio: servicioPrellenado,
          origen,
        }),
      });

      if (!response.ok) throw new Error("send-failed");

      setSubmitted(true);
      trackConversion("form_submit");
      toast.success("¡Recibido! Te contactamos en breve.");
    } catch {
      toast.error("Hubo un error. Mejor escríbenos por WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border bg-card p-8 text-center shadow-soft">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h3 className="mb-2 text-xl font-semibold">¡Gracias por contactarnos!</h3>
        <p className="mb-6 text-muted-foreground">
          Recibimos tu mensaje. Te escribimos en menos de 1 hora hábil.
        </p>
        <Button
          nativeButton={false}
          render={
            <a
              href={whatsappLinkWithText(FALLBACK_WHATSAPP_TEXT)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackConversion("whatsapp_click")}
            />
          }
          className="bg-warning text-warning-foreground hover:bg-warning/90 h-12 px-6 gap-2"
        >
          <MessageCircle className="h-4 w-4" />
          Mejor respuesta inmediata por WhatsApp
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border bg-card p-6 sm:p-8 shadow-soft"
    >
      <div className="space-y-2">
        <Label htmlFor="nombre">Nombre completo *</Label>
        <Input
          id="nombre"
          placeholder="Tu nombre"
          value={data.nombre}
          onChange={(e) => update("nombre")(e.target.value)}
          maxLength={100}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico *</Label>
          <Input
            id="email"
            type="email"
            placeholder="tu@email.com"
            value={data.email}
            onChange={(e) => update("email")(e.target.value)}
            maxLength={255}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefono">WhatsApp / Teléfono *</Label>
          <Input
            id="telefono"
            type="tel"
            placeholder="(999) 123-4567"
            value={data.telefono}
            onChange={(e) => update("telefono")(e.target.value)}
            maxLength={20}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="mensaje">¿Tienes alguna preferencia? (opcional)</Label>
        <Textarea
          id="mensaje"
          placeholder="Ej: Vamos 2 personas en julio, nos interesa Italia..."
          rows={3}
          value={data.mensaje}
          onChange={(e) => update("mensaje")(e.target.value)}
          maxLength={1000}
        />
      </div>

      <Button
        type="submit"
        className="w-full h-12 gap-2 bg-warning text-warning-foreground hover:bg-warning/90 shadow-medium"
        disabled={submitting}
      >
        {submitting ? (
          "Enviando..."
        ) : (
          <>
            <Send className="h-4 w-4" />
            Quiero información de paquetes a Europa
          </>
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Al enviar aceptas nuestro{" "}
        <Link href="/aviso-de-privacidad" className="underline hover:text-primary">
          aviso de privacidad
        </Link>
        . Sin compromiso.
      </p>
    </form>
  );
}

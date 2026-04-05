"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { WHATSAPP_LINK_WITH_MESSAGE, PHONE_DISPLAY, EMAIL, ADDRESS, HOURS, SERVICES } from "@/lib/constants";

export function ContactoClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    servicio: "",
    mensaje: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre || !formData.email || !formData.telefono || !formData.servicio) {
      toast.error("Por favor completa todos los campos obligatorios.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Por favor ingresa un correo electrónico válido.");
      return;
    }

    const phoneDigits = formData.telefono.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      toast.error("Por favor ingresa un número de teléfono válido (mínimo 10 dígitos).");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send");
      }

      setIsSubmitted(true);
      toast.success("¡Mensaje enviado! Nos pondremos en contacto contigo pronto.");
    } catch {
      toast.error("Hubo un error al enviar el mensaje. Intenta por WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 lg:py-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="container relative z-10 text-center text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Contáctanos</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Estamos listos para ayudarte a planear el viaje de tus sueños
          </p>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-8 bg-primary">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-primary-foreground text-center md:text-left">
              <p className="font-semibold text-lg">La forma más rápida de cotizar es por WhatsApp</p>
              <p className="text-primary-foreground/80">Respuesta inmediata &bull; Atención personalizada</p>
            </div>
            <Button
              render={<a href={WHATSAPP_LINK_WITH_MESSAGE} target="_blank" rel="noopener noreferrer" />}
              size="lg"
              className="bg-white text-primary hover:bg-warning hover:text-warning-foreground gap-2 shadow-medium"
            >
              <MessageCircle className="h-5 w-5" />
              Enviar WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Envíanos un mensaje</CardTitle>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">¡Gracias por contactarnos!</h3>
                      <p className="text-muted-foreground mb-6">
                        Hemos recibido tu mensaje. Nos pondremos en contacto contigo lo antes posible.
                      </p>
                      <Button
                        render={<a href={WHATSAPP_LINK_WITH_MESSAGE} target="_blank" rel="noopener noreferrer" />}
                        className="gap-2"
                      >
                        <MessageCircle className="h-4 w-4" />
                        O escríbenos por WhatsApp para respuesta inmediata
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre completo *</Label>
                        <Input
                          id="nombre"
                          placeholder="Tu nombre"
                          value={formData.nombre}
                          onChange={(e) => handleInputChange("nombre", e.target.value)}
                          required
                          maxLength={100}
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Correo electrónico *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="tu@email.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            required
                            maxLength={255}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telefono">Teléfono *</Label>
                          <Input
                            id="telefono"
                            type="tel"
                            placeholder="(999) 123-4567"
                            value={formData.telefono}
                            onChange={(e) => handleInputChange("telefono", e.target.value)}
                            required
                            maxLength={20}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="servicio">Servicio de interés *</Label>
                        <Select value={formData.servicio} onValueChange={(value) => handleInputChange("servicio", value ?? "")}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un servicio" />
                          </SelectTrigger>
                          <SelectContent>
                            {SERVICES.map((service) => (
                              <SelectItem key={service} value={service}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="mensaje">Mensaje (opcional)</Label>
                        <Textarea
                          id="mensaje"
                          placeholder="Cuéntanos más sobre el viaje que tienes en mente..."
                          rows={4}
                          value={formData.mensaje}
                          onChange={(e) => handleInputChange("mensaje", e.target.value)}
                          maxLength={1000}
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full bg-gradient-primary gap-2" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>Enviando...</>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Enviar mensaje
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        Al enviar este formulario, aceptas nuestro{" "}
                        <Link href="/aviso-de-privacidad" className="underline hover:text-primary">
                          aviso de privacidad
                        </Link>
                        .
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Información de contacto</h2>
                <div className="space-y-4">
                  <a
                    href={WHATSAPP_LINK_WITH_MESSAGE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-primary/5 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-muted-foreground">{PHONE_DISPLAY}</p>
                    </div>
                  </a>

                  <a
                    href={`tel:${PHONE_DISPLAY.replace(/[^0-9]/g, "")}`}
                    className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-primary/5 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Teléfono</p>
                      <p className="text-muted-foreground">{PHONE_DISPLAY}</p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-primary/5 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">{EMAIL}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Dirección</p>
                      <p className="text-muted-foreground">{ADDRESS.full}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Horarios</p>
                      <p className="text-muted-foreground">{HOURS.online}</p>
                      <p className="text-muted-foreground text-sm mt-1">
                        Atención física: {HOURS.physical}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div>
                <h3 className="font-semibold mb-4">Ubicación</h3>
                <div className="rounded-lg overflow-hidden border h-[300px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.5!2d-89.6175!3d20.9917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQ2FsbGUgMTlhIE5vLiAxMTYsIENodWJ1cm7DoSBkZSBIaWRhbGdvLCBNw6lyaWRh!5e0!3m2!1ses!2smx!4v1700000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de Feliz Viaje Mérida"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 bg-muted/30">
        <div className="container text-center">
          <p className="text-muted-foreground mb-4">¿Prefieres una respuesta inmediata?</p>
          <Button
            render={<a href={WHATSAPP_LINK_WITH_MESSAGE} target="_blank" rel="noopener noreferrer" />}
            size="lg"
            className="bg-gradient-primary gap-2"
          >
            <MessageCircle className="h-5 w-5" />
            Enviar WhatsApp
          </Button>
        </div>
      </section>
    </>
  );
}

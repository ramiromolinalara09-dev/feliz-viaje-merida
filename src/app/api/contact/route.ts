import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, email, telefono, servicio, mensaje, origen } = body;

    const resend = new Resend(process.env.RESEND_API_KEY);

    if (!nombre || !email || !telefono || !servicio) {
      return NextResponse.json(
        { error: "Campos requeridos faltantes" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    const origenLabel = origen || "sitio-principal";

    const result = await resend.emails.send({
      from: "Feliz Viaje Web <noreply@felizviajemerida.com>",
      to: ["felizviajemerida1@gmail.com", "ramiromolinalara09@gmail.com"],
      replyTo: email,
      subject: `Nuevo contacto: ${nombre} - ${servicio} (${origenLabel})`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Origen:</strong> ${origenLabel}</p>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Servicio:</strong> ${servicio}</p>
        <p><strong>Mensaje:</strong> ${mensaje || "Sin mensaje"}</p>
      `,
    });

    console.log("[contact] Resend response:", JSON.stringify(result));

    if (result.error) {
      console.error("[contact] Resend rejected send:", result.error);
      return NextResponse.json(
        { error: "Resend rejected send", details: result.error },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, id: result.data?.id });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Error al enviar el mensaje" },
      { status: 500 }
    );
  }
}

import type { Metadata } from "next";
import { EMAIL, ADDRESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Términos y Condiciones`,
  description:
    "Términos y condiciones de uso del sitio web y servicios de Feliz Viaje Mérida.",
};

export default function TerminosPage() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <h1>Términos y Condiciones</h1>
          <p className="text-muted-foreground">
            Última actualización: Enero 2025
          </p>

          <h2>1. Aceptación de los Términos</h2>
          <p>
            Al acceder y utilizar el sitio web de Feliz Viaje Mérida, usted
            acepta estar sujeto a estos términos y condiciones de uso. Si no
            está de acuerdo con alguno de estos términos, le solicitamos no
            utilizar nuestro sitio web.
          </p>

          <h2>2. Servicios</h2>
          <p>
            Feliz Viaje Mérida es una agencia de viajes que ofrece servicios de
            asesoría, planeación y reservación de viajes nacionales e
            internacionales, incluyendo pero no limitado a:
          </p>
          <ul>
            <li>Paquetes de viaje</li>
            <li>Reservación de vuelos</li>
            <li>Reservación de hoteles</li>
            <li>Cruceros</li>
            <li>Tours y excursiones</li>
            <li>Seguros de viaje</li>
          </ul>

          <h2>3. Reservaciones y Pagos</h2>
          <p>
            Las reservaciones están sujetas a disponibilidad. Los precios
            mostrados en el sitio web son referenciales y pueden cambiar sin
            previo aviso. El precio final será confirmado al momento de la
            cotización.
          </p>
          <p>
            Los pagos se realizarán según las políticas establecidas para cada
            servicio. Generalmente se requiere un anticipo para asegurar la
            reservación.
          </p>

          <h2>4. Cancelaciones y Reembolsos</h2>
          <p>
            Las políticas de cancelación varían según el proveedor y tipo de
            servicio. Cada reservación tendrá sus propias condiciones de
            cancelación que serán informadas antes de la confirmación.
          </p>

          <h2>5. Responsabilidad</h2>
          <p>
            Feliz Viaje Mérida actúa como intermediario entre el cliente y los
            proveedores de servicios turísticos. No somos responsables por:
          </p>
          <ul>
            <li>
              Cambios de itinerario por parte de aerolíneas u otros proveedores
            </li>
            <li>Eventos de fuerza mayor</li>
            <li>Pérdida de equipaje</li>
            <li>Problemas de salud durante el viaje</li>
            <li>Decisiones de inmigración de otros países</li>
          </ul>

          <h2>6. Documentación</h2>
          <p>
            Es responsabilidad del viajero contar con la documentación necesaria
            (pasaporte, visas, etc.) vigente y en regla para su viaje. Feliz
            Viaje Mérida puede asesorar pero no es responsable por la falta de
            documentación.
          </p>

          <h2>7. Propiedad Intelectual</h2>
          <p>
            Todo el contenido del sitio web, incluyendo textos, imágenes, logos y
            diseño, es propiedad de Feliz Viaje Mérida y está protegido por las
            leyes de propiedad intelectual.
          </p>

          <h2>8. Modificaciones</h2>
          <p>
            Nos reservamos el derecho de modificar estos términos en cualquier
            momento. Los cambios entrarán en vigor inmediatamente después de su
            publicación en el sitio web.
          </p>

          <h2>9. Contacto</h2>
          <p>
            Para cualquier consulta sobre estos términos, puede contactarnos en:
          </p>
          <ul>
            <li>Email: {EMAIL}</li>
            <li>Dirección: {ADDRESS.full}</li>
          </ul>

          <h2>10. Legislación Aplicable</h2>
          <p>
            Estos términos se regirán e interpretarán de acuerdo con las leyes de
            los Estados Unidos Mexicanos. Cualquier disputa será sometida a los
            tribunales competentes de la ciudad de Mérida, Yucatán.
          </p>
        </div>
      </div>
    </section>
  );
}

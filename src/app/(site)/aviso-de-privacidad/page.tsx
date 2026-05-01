import type { Metadata } from "next";
import { EMAIL, ADDRESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Aviso de Privacidad`,
  description:
    "Aviso de privacidad de Feliz Viaje Mérida. Conoce cómo protegemos y utilizamos tu información personal.",
};

export default function AvisoPrivacidadPage() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <h1>Aviso de Privacidad</h1>
          <p className="text-muted-foreground">
            Última actualización: Enero 2025
          </p>

          <h2>Identidad y Domicilio del Responsable</h2>
          <p>
            Feliz Viaje Mérida, con domicilio en {ADDRESS.full}, es responsable
            del tratamiento de sus datos personales.
          </p>

          <h2>Datos Personales que Recabamos</h2>
          <p>
            Para las finalidades señaladas en el presente aviso de privacidad,
            podemos recabar sus datos personales de distintas formas: cuando
            usted nos los proporciona directamente, cuando visita nuestro sitio
            web o utiliza nuestros servicios en línea, y cuando obtenemos
            información a través de otras fuentes que están permitidas por la
            ley.
          </p>
          <p>Los datos personales que podemos recabar incluyen:</p>
          <ul>
            <li>Nombre completo</li>
            <li>Correo electrónico</li>
            <li>Número de teléfono</li>
            <li>Datos de pasaporte (cuando aplique)</li>
            <li>Preferencias de viaje</li>
            <li>Información de pago</li>
          </ul>

          <h2>Finalidades del Tratamiento</h2>
          <p>Sus datos personales serán utilizados para:</p>
          <h3>Finalidades Primarias:</h3>
          <ul>
            <li>Cotizar y reservar servicios de viaje</li>
            <li>Gestionar pagos y facturación</li>
            <li>Proporcionar asistencia durante su viaje</li>
            <li>Dar seguimiento a sus solicitudes</li>
            <li>Cumplir con obligaciones legales</li>
          </ul>

          <h3>Finalidades Secundarias:</h3>
          <ul>
            <li>Enviar promociones y ofertas especiales</li>
            <li>Realizar encuestas de satisfacción</li>
            <li>Mejorar nuestros servicios</li>
          </ul>

          <h2>Transferencia de Datos</h2>
          <p>
            Sus datos personales pueden ser transferidos a proveedores de
            servicios turísticos (aerolíneas, hoteles, navieras, etc.) con el
            único fin de gestionar sus reservaciones. Estas transferencias no
            requieren de su consentimiento conforme a la Ley Federal de
            Protección de Datos Personales en Posesión de los Particulares.
          </p>

          <h2>Derechos ARCO</h2>
          <p>
            Usted tiene derecho a conocer qué datos personales tenemos de usted,
            para qué los utilizamos y las condiciones del uso que les damos
            (Acceso). Asimismo, es su derecho solicitar la corrección de su
            información personal en caso de que esté desactualizada, sea inexacta
            o incompleta (Rectificación); que la eliminemos de nuestros registros
            o bases de datos cuando considere que la misma no está siendo
            utilizada conforme a los principios, deberes y obligaciones previstas
            en la normativa (Cancelación); así como oponerse al uso de sus datos
            personales para fines específicos (Oposición).
          </p>
          <p>
            Para ejercer cualquiera de los derechos ARCO, puede enviar un correo
            electrónico a {EMAIL}.
          </p>

          <h2>Uso de Cookies</h2>
          <p>
            Nuestro sitio web utiliza cookies y otras tecnologías de seguimiento
            para mejorar su experiencia de navegación. Puede configurar su
            navegador para rechazar todas las cookies, aunque esto puede afectar
            la funcionalidad del sitio.
          </p>

          <h2>Cambios al Aviso de Privacidad</h2>
          <p>
            Nos reservamos el derecho de efectuar modificaciones o
            actualizaciones al presente aviso de privacidad. Cualquier cambio
            será publicado en nuestro sitio web.
          </p>

          <h2>Contacto</h2>
          <p>
            Si tiene alguna duda sobre este aviso de privacidad, puede
            contactarnos:
          </p>
          <ul>
            <li>Email: {EMAIL}</li>
            <li>Dirección: {ADDRESS.full}</li>
          </ul>

          <h2>Consentimiento</h2>
          <p>
            Al proporcionar sus datos personales a través de nuestro sitio web o
            de manera directa, usted otorga su consentimiento para que sean
            tratados conforme a lo establecido en el presente aviso de
            privacidad.
          </p>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import LegalPageLayout from './LegalPageLayout';
import { BUSINESS } from '../../data/legalBusiness';

const Ph = ({ children }) => <span className="placeholder">{children}</span>;

export default function AvisoLegalPage() {
  return (
    <LegalPageLayout eyebrow="Información legal" title="AVISO" titleAccent="LEGAL" updated="por confirmar">
      <section>
        <h2>1. Datos identificativos</h2>
        <p>
          En cumplimiento del deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de
          julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se informa
          de los siguientes datos: el presente sitio web (malibutattoostudio.es) es titularidad de:
        </p>
        <ul>
          <li>Nombre / Razón social: <Ph>{BUSINESS.legalName}</Ph></li>
          <li>NIF / CIF: <Ph>{BUSINESS.taxId}</Ph></li>
          <li>Domicilio: <Ph>{BUSINESS.address}</Ph></li>
          <li>Email de contacto: <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></li>
          <li>Teléfono: <Ph>{BUSINESS.phone}</Ph></li>
          <li>Datos registrales: <Ph>{BUSINESS.registry}</Ph></li>
        </ul>
        <p>En adelante, «Malibu Tattoo Studio» o «el titular».</p>
      </section>

      <section>
        <h2>2. Objeto</h2>
        <p>
          Este aviso legal regula el acceso y uso del sitio web, cuyo objeto es dar a conocer los estudios de
          tatuaje y piercing de Malibu Tattoo Studio en Santa Cruz de Tenerife y Tabaiba Baja, así como el
          servicio TattooTruck, permitir la consulta de los trabajos del equipo y facilitar el contacto para
          solicitar cita. El acceso al sitio web es gratuito y su uso atribuye la condición de usuario, que
          implica la aceptación de todas las condiciones incluidas en este aviso legal.
        </p>
      </section>

      <section>
        <h2>3. Condiciones de acceso y uso</h2>
        <p>
          El usuario se compromete a hacer un uso adecuado y lícito del sitio web, así como de sus
          contenidos, de conformidad con la legislación vigente, la buena fe, el orden público y el presente
          aviso legal. Queda prohibido el uso del sitio web con fines ilícitos o lesivos, o que de cualquier
          forma puedan causar perjuicio o impedir el normal funcionamiento del sitio web.
        </p>
      </section>

      <section>
        <h2>4. Propiedad intelectual e industrial</h2>
        <p>
          Todos los contenidos del sitio web —textos, fotografías (incluidos los trabajos de tatuaje del
          equipo), diseños, logotipos, iconos, código fuente y demás elementos— son propiedad de Malibu
          Tattoo Studio o de terceros que han autorizado su uso, y están protegidos por la normativa de
          propiedad intelectual e industrial. Queda prohibida su reproducción, distribución o comunicación
          pública total o parcial sin autorización expresa del titular, salvo para uso privado y no comercial.
        </p>
        <p>
          Las fotografías de tatuajes mostradas son trabajo original del equipo de artistas de Malibu Tattoo
          Studio, publicadas con el consentimiento de los clientes retratados cuando corresponde.
        </p>
      </section>

      <section>
        <h2>5. Enlaces externos</h2>
        <p>
          El sitio web puede incluir enlaces a Instagram, Google Maps, WhatsApp u otros servicios de
          terceros para facilitar el contacto y la localización de los estudios. El titular no se hace
          responsable del contenido de dichos sitios de terceros, ajenos a su control.
        </p>
      </section>

      <section>
        <h2>6. Exclusión de responsabilidad</h2>
        <p>
          El titular no garantiza la disponibilidad y continuidad ininterrumpida del sitio web, ni se hace
          responsable de los daños causados por un uso inadecuado del mismo. El titular se reserva el
          derecho a modificar los contenidos del sitio web sin previo aviso.
        </p>
      </section>

      <section>
        <h2>7. Legislación aplicable</h2>
        <p>
          Las presentes condiciones se rigen por la legislación española. Para cualquier controversia
          derivada del acceso o uso de este sitio web, las partes se someten a los juzgados y tribunales que
          correspondan conforme a derecho.
        </p>
      </section>
    </LegalPageLayout>
  );
}

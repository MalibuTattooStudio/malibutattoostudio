import React from 'react';
import { Link } from 'react-router-dom';
import LegalPageLayout from './LegalPageLayout';
import { BUSINESS } from '../../data/legalBusiness';

const Ph = ({ children }) => <span className="placeholder">{children}</span>;

export default function PrivacidadPage() {
  return (
    <LegalPageLayout eyebrow="Protección de datos" title="POLÍTICA DE" titleAccent="PRIVACIDAD" updated="por confirmar">
      <section>
        <h2>1. Responsable del tratamiento</h2>
        <ul>
          <li>Responsable: <Ph>{BUSINESS.legalName}</Ph></li>
          <li>NIF / CIF: <Ph>{BUSINESS.taxId}</Ph></li>
          <li>Domicilio: <Ph>{BUSINESS.address}</Ph></li>
          <li>Contacto para temas de privacidad: <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></li>
        </ul>
      </section>

      <section>
        <h2>2. Qué datos recogemos y cómo</h2>
        <h3>Formulario de reserva de cita</h3>
        <p>
          Al rellenar el formulario de «Pedir Cita» (estudio o TattooTruck) puedes indicar nombre, teléfono,
          email, fecha orientativa y notas sobre la idea del tatuaje o evento. <strong>Estos datos no se
          envían a ningún servidor de Malibu Tattoo Studio.</strong> El formulario solo compone un mensaje
          de WhatsApp con esa información; eres tú, desde tu propio teléfono, quien decide enviarlo al
          pulsar «Enviar por WhatsApp». Si cierras el formulario sin enviarlo, esos datos simplemente
          desaparecen del navegador.
        </p>
        <p>
          Una vez enviado el mensaje por WhatsApp, esa conversación pasa a estar sujeta a las condiciones
          de privacidad de WhatsApp / Meta, no a esta política.
        </p>
        <h3>Panel interno de gestión</h3>
        <p>
          El equipo de Malibu Tattoo Studio usa un panel privado (<code>/admin</code>) para gestionar la
          galería, las fichas de artistas y las reseñas. El acceso requiere usuario y contraseña; al iniciar
          sesión se guarda un token técnico en el almacenamiento local del navegador para mantener la
          sesión iniciada. Esto solo afecta al personal autenticado, nunca a los visitantes de la web
          pública.
        </p>
      </section>

      <section>
        <h2>3. Finalidad y base legal</h2>
        <p>
          Los datos que nos facilitas voluntariamente a través de WhatsApp se usan exclusivamente para
          gestionar tu solicitud de cita o presupuesto. La base legal es tu propio consentimiento, expresado
          al rellenar y enviar el formulario.
        </p>
      </section>

      <section>
        <h2>4. Conservación de datos</h2>
        <p>
          Al no almacenarse en ningún servidor propio, los datos del formulario no tienen un periodo de
          conservación por nuestra parte: existen únicamente en tu navegador hasta que se envían por
          WhatsApp o se descartan. La conversación de WhatsApp resultante se conserva según tus propios
          ajustes de esa aplicación.
        </p>
      </section>

      <section>
        <h2>5. Destinatarios y terceros</h2>
        <ul>
          <li>
            <strong>WhatsApp / Meta:</strong> receptor del mensaje que tú mismo envías al confirmar una
            solicitud de cita.
          </li>
          <li>
            <strong>Google Fonts:</strong> las tipografías de la web se cargan desde los servidores de
            Google (fonts.googleapis.com / fonts.gstatic.com), lo que implica el envío de tu dirección IP a
            Google al visitar cualquier página.
          </li>
          <li>
            <strong>Vercel:</strong> aloja el sitio web y proporciona una analítica de visitas agregada y sin
            cookies (Vercel Web Analytics), que no identifica individualmente a los visitantes.
          </li>
          <li>
            <strong>Supabase:</strong> almacena las fotos, fichas de artistas y reseñas públicas del sitio, y
            gestiona el acceso del personal al panel interno. No procesa datos de visitantes del sitio
            público.
          </li>
        </ul>
      </section>

      <section>
        <h2>6. Tus derechos</h2>
        <p>
          Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del
          tratamiento y portabilidad escribiendo a{' '}
          <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>. También tienes derecho a
          presentar una reclamación ante la Agencia Española de Protección de Datos (
          <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>) si
          consideras que el tratamiento de tus datos no se ajusta a la normativa.
        </p>
      </section>

      <section>
        <h2>7. Menores de edad</h2>
        <p>
          Los servicios de tatuaje y piercing están sujetos a los requisitos de edad y, en su caso,
          autorización de madres, padres o tutores legales que exige la normativa sanitaria aplicable en
          Canarias. No es intención de este sitio recabar datos de menores sin dicha autorización.
        </p>
      </section>

      <section>
        <h2>8. Más información</h2>
        <p>
          Para cualquier duda sobre esta política, consulta también nuestra <Link to="/cookies">Política
          de Cookies</Link> o el <Link to="/aviso-legal">Aviso Legal</Link>.
        </p>
      </section>
    </LegalPageLayout>
  );
}

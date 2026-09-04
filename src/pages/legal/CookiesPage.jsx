import React from 'react';
import { Link } from 'react-router-dom';
import LegalPageLayout from './LegalPageLayout';

export default function CookiesPage() {
  return (
    <LegalPageLayout eyebrow="Rastreo y almacenamiento" title="POLÍTICA DE" titleAccent="COOKIES" updated="por confirmar">
      <section>
        <h2>1. Qué son las cookies</h2>
        <p>
          Las cookies son pequeños archivos que un sitio web puede guardar en tu navegador para recordar
          información entre visitas. También existen otras formas de almacenamiento local con un
          funcionamiento similar (como <code>localStorage</code>).
        </p>
      </section>

      <section>
        <h2>2. Este sitio no usa cookies de rastreo ni publicidad</h2>
        <p>
          Malibu Tattoo Studio no utiliza cookies de analítica de terceros, publicidad ni redes sociales para
          rastrear tu navegación. No hay banner de aceptación de cookies porque no hay nada de ese tipo
          que aceptar.
        </p>
      </section>

      <section>
        <h2>3. Lo que sí carga o guarda esta web</h2>
        <ul>
          <li>
            <strong>Vercel Web Analytics</strong> — mide páginas vistas de forma agregada y anónima, sin
            cookies ni identificadores que permitan reconocerte entre visitas.
          </li>
          <li>
            <strong>Google Fonts</strong> — las tipografías de la web se sirven desde los servidores de
            Google. Esto no instala cookies, pero sí supone una conexión directa a Google que expone tu
            dirección IP, como al cargar cualquier recurso externo.
          </li>
          <li>
            <strong>Sesión del panel interno (<code>/admin</code>)</strong> — si eres del equipo y accedes al
            panel de gestión, se guarda un token de sesión en el almacenamiento local de tu navegador para
            mantenerte identificado. No afecta a quienes solo visitan la web pública.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Cómo gestionar el almacenamiento de tu navegador</h2>
        <p>
          Aunque este sitio no depende de cookies para funcionar, puedes revisar o borrar en cualquier
          momento lo que tu navegador guarda desde la configuración de privacidad de Chrome, Firefox,
          Safari o Edge — buscando «cookies y datos de sitios» en sus ajustes.
        </p>
      </section>

      <section>
        <h2>5. Más información</h2>
        <p>
          Consulta también nuestra <Link to="/privacidad">Política de Privacidad</Link> o el{' '}
          <Link to="/aviso-legal">Aviso Legal</Link>.
        </p>
      </section>
    </LegalPageLayout>
  );
}

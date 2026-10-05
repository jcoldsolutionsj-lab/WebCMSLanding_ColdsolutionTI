import { Navbar } from '@/components/Navbar';
import { Footer } from '@/sections/Footer';

export const metadata = {
  title: 'Políticas de Privacidad | ColdSolutions TI',
  description: 'Políticas de privacidad y tratamiento de datos de ColdSolutions TI.',
};

export default function PrivacidadPage() {
  return (
    <main>
      <Navbar />
      
      <section style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', padding: '140px 20px 80px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ 
          backgroundColor: '#ffffff', 
          color: '#111827', 
          maxWidth: '850px', 
          width: '100%', 
          padding: '60px', 
          borderRadius: '4px', 
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          fontFamily: 'Arial, Helvetica, sans-serif',
          lineHeight: '1.6'
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '1rem' }}>
            Política de Privacidad
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '2rem' }}>
            Última actualización: 5 de octubre de 2026 · Versión: 2026-10-v1
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1rem' }}>
            <p>En <strong>ColdSolutions TI</strong> respetamos tu privacidad. Esta política explica qué datos personales recopilamos a través de https://coldsolutionsti.com, para qué los usamos, con quién los compartimos y cómo puedes ejercer tus derechos.</p>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937' }}>1. Quién es el responsable de tus datos</h2>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <li><strong>Nombre comercial:</strong> ColdSolutions TI</li>
              <li><strong>RUC:</strong> 10482568811</li>
              <li><strong>Domicilio:</strong> San Juan de Miraflores, Lima, Perú</li>
              <li><strong>Correo para temas de datos personales:</strong> privacidad@coldsolutionsti.com</li>
            </ul>
            <p>Estamos iniciando nuestras actividades y operamos actualmente como persona natural con negocio. Si en el futuro cambiamos de forma legal (por ejemplo, constituyendo una empresa), lo informaremos en esta misma página.</p>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937' }}>2. Normativa aplicable</h2>
            <p>Tratamos tus datos conforme a la <strong>Ley N.º 29733</strong>, Ley de Protección de Datos Personales del Perú, y su reglamento vigente.</p>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937' }}>3. Qué datos recopilamos</h2>
            <p><strong>Los que nos das tú</strong>, al completar el formulario de contacto: nombre, empresa, teléfono, correo electrónico, servicio de interés y el mensaje con la descripción de tu necesidad.</p>
            <p><strong>Los que recopilamos al visitar el sitio:</strong></p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Origen de tu visita:</strong> parámetros de campañas (UTM), identificador de clic de Google Ads, página de entrada y página de referencia.</li>
              <li><strong>Datos técnicos y de seguridad:</strong> tipo de dispositivo, navegador y <strong>dirección IP</strong>. La dirección IP se registra y almacena en nuestra base de datos al momento de enviar el formulario como medida de seguridad, prevención de fraude y registro de consentimiento.</li>
              <li><strong>Información obtenida mediante cookies</strong> (ver sección 9).</li>
            </ul>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937' }}>4. Para qué usamos tus datos</h2>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Responder tu consulta y preparar un diagnóstico o propuesta de servicios.</li>
              <li>Gestionar el contacto comercial y su seguimiento.</li>
              <li>Medir el rendimiento de nuestras campañas y mejorar el sitio.</li>
              <li>Enviarte comunicaciones comerciales, solo si lo has consentido.</li>
            </ul>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937' }}>5. Cómo das tu consentimiento</h2>
            <p>Al marcar la casilla del formulario y enviarlo, aceptas esta política y el tratamiento de tus datos para las finalidades indicadas. Puedes retirar tu consentimiento en cualquier momento escribiéndonos al correo indicado en la sección 1.</p>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937' }}>6. Con quién compartimos tus datos</h2>
            <p>No vendemos tus datos. Algunos proveedores los procesan por encargo nuestro para que el sitio y la atención funcionen:</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Google</strong> (Analytics, Tag Manager, Ads, Gmail y Calendar): medición, gestión de campañas y comunicaciones internas.</li>
              <li><strong>Telegram:</strong> avisos internos al equipo cuando recibimos un nuevo contacto.</li>
              <li><strong>Render:</strong> alojamiento del sitio y almacenamiento de la base de datos (Backend y PostgreSQL).</li>
              <li><strong>Cloudflare:</strong> dominio y entrega de contenido.</li>
            </ul>
            <p>Algunos de estos proveedores están fuera del Perú, por lo que tus datos pueden ser transferidos y tratados en otros países de forma segura.</p>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937' }}>7. Cuánto tiempo conservamos tus datos</h2>
            <p>Conservamos los datos de contacto durante <strong>24 meses</strong> desde nuestra última comunicación contigo, o hasta que solicites su eliminación, lo que ocurra primero. Luego los eliminamos o anonimizamos, salvo que la ley nos obligue a conservarlos.</p>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937' }}>8. Seguridad</h2>
            <p>Aplicamos medidas técnicas y organizativas razonables para proteger tus datos contra accesos no autorizados, pérdida o alteración. Ningún sistema es completamente seguro, pero trabajamos arduamente para reducir los riesgos.</p>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937' }}>9. Cookies</h2>
            <p>Usamos cookies y tecnologías similares para medir el uso del sitio y el rendimiento de nuestra publicidad (Google Analytics y Google Ads). Puedes bloquearlas o eliminarlas desde la configuración de tu navegador; si lo haces, algunas funciones de medición dejarán de operar, pero el sitio seguirá funcionando.</p>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937' }}>10. Tus derechos (ARCO)</h2>
            <p>Puedes solicitar Acceso, Rectificación, Cancelación y Oposición sobre tus datos personales, y retirar tu consentimiento. Para ejercerlos, escríbenos a <strong>privacidad@coldsolutionsti.com</strong> indicando tu nombre y qué solicitas. Te responderemos dentro de los plazos que establece la ley.</p>
            <p>Si consideras que no atendimos tu solicitud, puedes presentar un reclamo ante la Autoridad Nacional de Protección de Datos Personales del Perú.</p>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937' }}>11. Menores de edad</h2>
            <p>Este sitio no está dirigido a menores de 18 años y no recopilamos datos de menores de manera intencional.</p>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937' }}>12. Mensajería (WhatsApp y Telegram)</h2>
            <p>Si nos escribes por WhatsApp u otras plataformas de mensajería, también se aplican las políticas de privacidad de esas plataformas.</p>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937' }}>13. Cambios en esta política</h2>
            <p>Somos un negocio que recién comienza y esta política se irá actualizando a medida que crezcamos o cambien nuestros servicios o proveedores. Cada versión se publica aquí con su fecha y número de versión. Si hacemos un cambio importante, lo comunicaremos en el sitio.</p>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937' }}>14. Contacto</h2>
            <p>Para cualquier consulta sobre esta política, contáctanos a: <strong>privacidad@coldsolutionsti.com</strong>.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

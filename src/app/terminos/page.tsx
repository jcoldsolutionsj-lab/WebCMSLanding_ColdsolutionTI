import { Navbar } from '@/components/Navbar';
import { Footer } from '@/sections/Footer';

export const metadata = {
  title: 'Términos y Condiciones | ColdSolutions TI',
  description: 'Términos y condiciones de uso de los servicios de ColdSolutions TI.',
};

export default function TerminosPage() {
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
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '1rem', textTransform: 'none', WebkitTextFillColor: 'initial' }}>
            Términos y Condiciones de Uso
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '2rem' }}>
            Última actualización: 5 de octubre de 2026 · Versión: 2026-10-v1
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1rem' }}>
            
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937', WebkitTextFillColor: 'initial', background: 'none', textTransform: 'none' }}>1. Quiénes somos y aceptación</h2>
            <p>Este sitio, https://coldsolutionsti.com, es operado bajo el nombre comercial <strong>ColdSolutions TI</strong> con RUC <strong>10482568811</strong>, domicilio en <strong>San Juan de Miraflores, Lima, Perú</strong> (en adelante, "ColdSolutions TI", "nosotros").</p>
            <p>Al acceder y usar este sitio aceptas estos Términos y nuestra Política de Privacidad. Si no estás de acuerdo, te pedimos que no uses el sitio.</p>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937', WebkitTextFillColor: 'initial', background: 'none', textTransform: 'none' }}>2. Qué es este sitio</h2>
            <p>Este sitio presenta nuestros servicios de consultoría tecnológica, desarrollo de software a medida, automatización de procesos y análisis de datos, entre otros, y te permite contactarnos.</p>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937', WebkitTextFillColor: 'initial', background: 'none', textTransform: 'none' }}>3. Los servicios se contratan por separado</h2>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>La información del sitio es referencial y no constituye una oferta vinculante.</li>
              <li>Alcance, precios, plazos y condiciones de cada servicio se acuerdan por escrito en una propuesta o contrato.</li>
              <li>Enviar el formulario no genera una relación contractual ni nos obliga a prestarte un servicio.</li>
              <li>El diagnóstico inicial es <strong>gratuito y sin compromiso</strong>.</li>
              <li>Nuestro tiempo de respuesta es un objetivo de atención de <strong>15 minutos en horario de atención</strong> y no una garantía.</li>
            </ul>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937', WebkitTextFillColor: 'initial', background: 'none', textTransform: 'none' }}>4. Uso del formulario de contacto</h2>
            <p>Al usar el formulario te comprometes a:</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Proporcionar datos verdaderos y actuales.</li>
              <li>No enviar spam, contenido ilegal ni material ofensivo.</li>
              <li>No incluir contraseñas, claves de acceso ni información confidencial de terceros. Si hace falta compartirlas, lo coordinaremos por un canal seguro.</li>
            </ul>
            <p>El tratamiento de tus datos se explica en la Política de Privacidad.</p>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937', WebkitTextFillColor: 'initial', background: 'none', textTransform: 'none' }}>5. Uso permitido del sitio</h2>
            <p>No está permitido:</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Intentar vulnerar la seguridad del sitio o interferir con su funcionamiento.</li>
              <li>Extraer contenido de forma automatizada o masiva.</li>
              <li>Usar el sitio para actividades ilegales o para suplantar a otras personas.</li>
            </ul>
            <p>Podemos bloquear el acceso a quien incumpla estas reglas.</p>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937', WebkitTextFillColor: 'initial', background: 'none', textTransform: 'none' }}>6. Información y disponibilidad</h2>
            <p>Procuramos que la información sea exacta y esté actualizada, pero no garantizamos que esté libre de errores ni que el sitio funcione de forma ininterrumpida. Puede haber interrupciones por mantenimiento o por causas ajenas a nosotros.</p>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937', WebkitTextFillColor: 'initial', background: 'none', textTransform: 'none' }}>7. Propiedad intelectual</h2>
            <p>Los textos, diseños, logotipos, imágenes y demás contenido del sitio pertenecen a ColdSolutions TI o a quienes nos lo licencian, y están protegidos por la ley. No puedes copiarlos, modificarlos ni distribuirlos sin nuestra autorización escrita.</p>
            <p>Los nombres y marcas de terceros que aparezcan en el sitio pertenecen a sus respectivos titulares. Los derechos sobre los trabajos entregados a clientes se rigen por el contrato de cada proyecto.</p>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937', WebkitTextFillColor: 'initial', background: 'none', textTransform: 'none' }}>8. Enlaces y servicios de terceros</h2>
            <p>El sitio puede contener enlaces o botones hacia servicios de terceros (por ejemplo, WhatsApp). No controlamos esos servicios ni somos responsables de su contenido o sus políticas.</p>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937', WebkitTextFillColor: 'initial', background: 'none', textTransform: 'none' }}>9. Limitación de responsabilidad</h2>
            <p>En la medida que la ley lo permita, ColdSolutions TI no será responsable por daños indirectos, incidentales o consecuentes derivados del uso del sitio o de la imposibilidad de usarlo. Nada en estos Términos excluye la responsabilidad que la ley no permite excluir.</p>
            <p>La responsabilidad por los servicios contratados se rige por el contrato o propuesta aceptada en cada caso.</p>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937', WebkitTextFillColor: 'initial', background: 'none', textTransform: 'none' }}>10. Cambios</h2>
            <p>Somos un negocio que recién comienza y estos Términos se irán actualizando a medida que cambien nuestros servicios o nuestra forma legal. Cada versión se publica aquí con su fecha y número de versión. Si sigues usando el sitio después de un cambio, entendemos que aceptas la versión vigente.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main >
  );
}

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
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '1rem' }}>
            Términos y Condiciones
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '2rem' }}>
            Última actualización: 5 de octubre de 2026 · Versión: 2026-10-v1
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1rem' }}>
            
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937' }}>1. Aceptación de los Términos</h2>
            <p>Al acceder y utilizar este sitio web (https://coldsolutionsti.com), usted acepta estar sujeto a estos Términos y Condiciones de uso, a todas las leyes y regulaciones aplicables, y acepta que es responsable del cumplimiento de las leyes locales de la República del Perú.</p>
            
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937' }}>2. Servicios Ofrecidos</h2>
            <p>ColdSolutions TI proporciona servicios de consultoría tecnológica, desarrollo de software a medida, automatización de procesos y análisis de datos. Nos reservamos el derecho de modificar, suspender o discontinuar cualquier servicio o promoción mostrada en el sitio web en cualquier momento sin previo aviso.</p>
            
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937' }}>3. Uso de la Información y Diagnóstico Gratuito</h2>
            <p>La información proporcionada en este sitio es para fines informativos y comerciales. La oferta de "Diagnóstico gratuito" está sujeta a la evaluación previa de ColdSolutions TI, quien se reserva el derecho de aceptar o rechazar solicitudes basándose en la viabilidad técnica y operativa del proyecto.</p>
            
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937' }}>4. Propiedad Intelectual</h2>
            <p>Todo el contenido incluido en este sitio, como texto, gráficos, logotipos, imágenes, videos y código fuente, es propiedad de ColdSolutions TI o de sus proveedores de contenido, y está protegido por las leyes de propiedad intelectual del Perú e internacionales.</p>
            
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937' }}>5. Limitación de Responsabilidad</h2>
            <p>En ningún caso ColdSolutions TI será responsable de daños directos, indirectos, incidentales, especiales o consecuentes que resulten del uso o la incapacidad de usar nuestros servicios web o de decisiones de negocio tomadas basadas en el contenido del sitio.</p>
            
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937' }}>6. Modificaciones a los Términos</h2>
            <p>ColdSolutions TI puede revisar estos términos de uso para su sitio web en cualquier momento sin previo aviso. Al usar este sitio web, usted acepta estar sujeto a la versión actual de estos Términos y Condiciones.</p>
            
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937' }}>7. Ley Aplicable y Jurisdicción</h2>
            <p>Estos términos y condiciones se rigen e interpretan de acuerdo con las leyes vigentes de la República del Perú. Ante cualquier controversia, usted se somete irrevocablemente a la jurisdicción exclusiva de los tribunales competentes de la ciudad de Lima.</p>
            
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', color: '#1f2937' }}>8. Contacto</h2>
            <p>Si tiene alguna pregunta sobre estos Términos y Condiciones, puede contactarnos a través de los canales oficiales mostrados en el sitio web o al correo: <strong>privacidad@coldsolutionsti.com</strong>.</p>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

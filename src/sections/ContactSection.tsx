'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Building2, 
  Phone, 
  Mail, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Clock,
  Briefcase,
  Loader2
} from 'lucide-react';
import { Turnstile } from '@marsidev/react-turnstile';
import styles from './ContactSection.module.css';
import { MagneticButton } from '@/components/MagneticButton';
import { getStoredUTMs, trackEvent } from '@/lib/analytics';

interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  orden: number;
}

export const ContactSection = () => {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    telefono: '',
    correo: '',
    servicio_id: '',
    problema: '',
    consentimiento: false,
  });
  
  const [captchaToken, setCaptchaToken] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch servicios al cargar el componente
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
    fetch(`${apiUrl}/api/servicios`)
      .then(res => res.json())
      .then(data => setServicios(data))
      .catch(err => console.error("Error al cargar servicios:", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const utms = getStoredUTMs();

    // 1. Disparar evento form_submit (intento de envío)
    trackEvent('form_submit', {
      servicio_id: formData.servicio_id,
      has_company: !!formData.empresa,
      has_email: !!formData.correo,
      source: utms.utm_source,
      campaign: utms.utm_campaign,
    });

    try {
      const payload = {
        ...formData,
        servicio_id: parseInt(formData.servicio_id),
        captcha_token: captchaToken || 'dummy-token-for-now',
        utm_source: utms.utm_source,
        utm_medium: utms.utm_medium,
        utm_campaign: utms.utm_campaign,
        utm_term: utms.utm_term,
        utm_content: utms.utm_content,
        gclid: utms.gclid,
      };

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      const response = await fetch(`${apiUrl}/api/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const detailMsg = errorData.detail || 'Error al enviar el formulario.';
        setStatus('error');
        setErrorMessage(detailMsg);
        trackEvent('form_error', {
          error_message: detailMsg,
        });
        return;
      }

      const responseData = await response.json();

      setStatus('success');
      setFormData({ nombre: '', empresa: '', telefono: '', correo: '', servicio_id: '', problema: '', consentimiento: false });
      
      // 2. Disparar evento de conversión principal lead_created
      trackEvent('lead_created', {
        lead_id: responseData.lead_id,
        servicio_id: payload.servicio_id,
        source: utms.utm_source,
        campaign: utms.utm_campaign,
      });

    } catch (error: any) {
      console.error('Submit network error:', error);
      setStatus('error');
      setErrorMessage('Error de conexión con el servidor. Por favor, intenta de nuevo.');
      
      // 3. Disparar evento de error en formulario
      trackEvent('form_error', {
        error_message: error.message || 'Error de conexión',
      });
    }
  };

  return (
    <section className={styles.container} id="contacto">
      {/* Background Full-Width Video */}
      <video 
        src="/images/videos/Robot_gesturing_formulario.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline 
        className={styles.bgVideo}
      />
      
      {/* Dark Ambient Overlay */}
      <div className={styles.bgOverlay} />
      <div className={styles.ambientGlow} />
      
      <div className={styles.content}>
        {/* Main Centered Glass Form Container */}
        <motion.div 
          className={styles.formContainer}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header Badges */}
          <div className={styles.badgeRow}>
            <div className={styles.pillBadge}>
              <Clock size={13} className={styles.badgeIcon} />
              <span>Respuesta en &lt;15 min</span>
            </div>
            <div className={styles.pillBadge}>
              <ShieldCheck size={13} className={styles.badgeIcon} />
              <span>Sin Compromiso</span>
            </div>
          </div>

          <h2 className={styles.heading}>
            <span className="pulseDot" />Cuéntanos tu problema
          </h2>
          <p className={styles.description}>
            Explícanos qué está pasando en tu negocio y te ayudaremos a encontrar la solución tecnológica proporcional a tu necesidad.
          </p>

          
          {status === 'success' ? (
            <motion.div 
              className={styles.successMessage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <CheckCircle2 size={48} className={styles.successIcon} />
              <h3>¡Mensaje enviado exitosamente!</h3>
              <p>Nuestro equipo técnico analizará tu caso y se pondrá en contacto contigo de inmediato.</p>
              <button onClick={() => setStatus('idle')} className={styles.secondaryCta}>
                Enviar otro mensaje
              </button>
            </motion.div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="nombre">
                    <User size={14} className={styles.inputIcon} /> Tu Nombre *
                  </label>
                  <input 
                    type="text" 
                    id="nombre" 
                    name="nombre" 
                    placeholder="Ej. Juan Pérez"
                    required 
                    value={formData.nombre} 
                    onChange={handleChange} 
                    disabled={status === 'loading'} 
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="empresa">
                    <Building2 size={14} className={styles.inputIcon} /> Empresa / Negocio
                  </label>
                  <input 
                    type="text" 
                    id="empresa" 
                    name="empresa" 
                    placeholder="Nombre de tu empresa (opcional)"
                    value={formData.empresa} 
                    onChange={handleChange} 
                    disabled={status === 'loading'} 
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="telefono">
                    <Phone size={14} className={styles.inputIcon} /> Teléfono / WhatsApp *
                  </label>
                  <input 
                    type="tel" 
                    id="telefono" 
                    name="telefono" 
                    placeholder="Ej. 945 430 381"
                    required 
                    value={formData.telefono} 
                    onChange={handleChange} 
                    disabled={status === 'loading'} 
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="correo">
                    <Mail size={14} className={styles.inputIcon} /> Correo electrónico
                  </label>
                  <input 
                    type="email" 
                    id="correo" 
                    name="correo" 
                    placeholder="correo@empresa.com (opcional)"
                    value={formData.correo} 
                    onChange={handleChange} 
                    disabled={status === 'loading'} 
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="servicio_id">
                  <Briefcase size={14} className={styles.inputIcon} /> Servicio de interés *
                </label>
                <select 
                  id="servicio_id" 
                  name="servicio_id" 
                  required 
                  value={formData.servicio_id} 
                  onChange={handleChange} 
                  disabled={status === 'loading' || servicios.length === 0}
                  className={styles.selectInput}
                >
                  <option value="" disabled>Selecciona el servicio que necesitas</option>
                  {servicios.map(servicio => (
                    <option key={servicio.id} value={servicio.id}>
                      {servicio.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="problema">
                  <MessageSquare size={14} className={styles.inputIcon} /> ¿Qué está pasando en tu negocio? *
                </label>
                <textarea 
                  id="problema" 
                  name="problema" 
                  rows={4} 
                  placeholder="Describe brevemente tus procesos manuales, excesos de Excel, falta de reportes o la solución que requieres..."
                  required 
                  value={formData.problema} 
                  onChange={handleChange} 
                  disabled={status === 'loading'}
                ></textarea>
              </div>

              <div className={styles.checkboxGroup}>
                <input 
                  type="checkbox" 
                  id="consentimiento" 
                  name="consentimiento" 
                  required 
                  checked={formData.consentimiento} 
                  onChange={handleChange} 
                  disabled={status === 'loading'}
                />
                <label htmlFor="consentimiento">
                  Acepto las <a href="/privacidad" target="_blank" rel="noopener noreferrer">políticas de privacidad</a> y el tratamiento de mis datos. *
                </label>
              </div>
              
              <div style={{ margin: '15px 0' }}>
                <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
                  onSuccess={(token) => setCaptchaToken(token)}
                  options={{ theme: 'dark' }}
                />
              </div>
              
              {status === 'error' && (
                <div className={styles.errorMessage}>{errorMessage}</div>
              )}
              
              <MagneticButton 
                type="submit" 
                className={styles.submitButton} 
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={18} className={styles.spinner} />
                    <span>Enviando Solicitud...</span>
                  </>
                ) : (
                  <>
                    <span>Solicitar diagnóstico gratuito</span>
                    <Send size={18} className={styles.sendIcon} />
                  </>
                )}
              </MagneticButton>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

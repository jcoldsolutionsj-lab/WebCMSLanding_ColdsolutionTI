'use client';

import { useState } from 'react';
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
  Clock 
} from 'lucide-react';
import styles from './ContactSection.module.css';
import { MagneticButton } from '@/components/MagneticButton';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    problem: '',
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const payload = {
        ...formData,
        captcha_token: 'dummy-token-for-now',
        utm_source: typeof window !== 'undefined' ? sessionStorage.getItem('utm_source') : null,
        utm_medium: typeof window !== 'undefined' ? sessionStorage.getItem('utm_medium') : null,
        utm_campaign: typeof window !== 'undefined' ? sessionStorage.getItem('utm_campaign') : null,
      };

      const response = await fetch('http://localhost:8000/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Error al enviar el formulario.');
      }

      setStatus('success');
      setFormData({ name: '', company: '', phone: '', email: '', problem: '' });
      
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({ event: 'lead_created' });
      }

    } catch (error: any) {
      console.error('Submit error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Ocurrió un error inesperado. Por favor, intenta de nuevo.');
      
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({ event: 'form_error' });
      }
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
                  <label htmlFor="name">
                    <User size={14} className={styles.inputIcon} /> Tu Nombre *
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Ej. Juan Pérez"
                    required 
                    value={formData.name} 
                    onChange={handleChange} 
                    disabled={status === 'loading'} 
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="company">
                    <Building2 size={14} className={styles.inputIcon} /> Empresa / Negocio
                  </label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company" 
                    placeholder="Nombre de tu empresa (opcional)"
                    value={formData.company} 
                    onChange={handleChange} 
                    disabled={status === 'loading'} 
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">
                    <Phone size={14} className={styles.inputIcon} /> Teléfono / WhatsApp *
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    placeholder="Ej. 963 478 502"
                    required 
                    value={formData.phone} 
                    onChange={handleChange} 
                    disabled={status === 'loading'} 
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email">
                    <Mail size={14} className={styles.inputIcon} /> Correo electrónico
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="correo@empresa.com (opcional)"
                    value={formData.email} 
                    onChange={handleChange} 
                    disabled={status === 'loading'} 
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="problem">
                  <MessageSquare size={14} className={styles.inputIcon} /> ¿Qué está pasando en tu negocio? *
                </label>
                <textarea 
                  id="problem" 
                  name="problem" 
                  rows={4} 
                  placeholder="Describe brevemente tus procesos manuales, excesos de Excel, falta de reportes o la solución que requieres..."
                  required 
                  value={formData.problem} 
                  onChange={handleChange} 
                  disabled={status === 'loading'}
                ></textarea>
              </div>
              
              {status === 'error' && (
                <div className={styles.errorMessage}>{errorMessage}</div>
              )}
              
              <MagneticButton type="submit" className={styles.submitButton} disabled={status === 'loading'}>
                <span>{status === 'loading' ? 'Enviando Solicitud...' : 'Solicitar diagnóstico gratuito'}</span>
                <Send size={18} className={styles.sendIcon} />
              </MagneticButton>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};


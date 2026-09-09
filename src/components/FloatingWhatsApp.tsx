'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ArrowUpRight, 
  Code, 
  Globe, 
  Bot, 
  Database, 
  Smartphone, 
  Megaphone,
  MessageSquare,
  ArrowLeft,
  Send,
  CheckCircle2
} from 'lucide-react';
import styles from './FloatingWhatsApp.module.css';
import { contactChannels } from '@/content';

const chatOptions = [
  {
    id: 'software',
    title: 'Quiero un Software o Sistema a medida',
    subtitle: 'Sistemas web, usuarios, procesos y control operativo',
    icon: <Code className={styles.optionIcon} />,
    subOptions: [
      'CRM a medida',
      'Integracion de nuevos modulos',
      'Soporte tecnico de sistemas',
      'Consultoria TI',
      'No estoy seguro, necesito asesoría'
    ],
    message: '¡Hola! Quisiera información y cotización sobre un Software o Sistema a medida para mi empresa.',
  },
  {
    id: 'web',
    title: 'Quiero una Página Web / CMS',
    subtitle: 'Web corporativa, landing page o tienda virtual',
    icon: <Globe className={styles.optionIcon} />,
    subOptions: [
      'Landing page (1 página)',
      'Web corporativa completa',
      'Web + blog o catálogo',
      'No sé, necesito orientación'
    ],
    message: '¡Hola! Me gustaría cotizar el desarrollo de una Página Web o plataforma CMS profesional.',
  },
  {
    id: 'ads',
    title: 'Publicidad en Google / Meta Ads',
    subtitle: 'Campañas de captación de clientes y tráfico digital',
    icon: <Megaphone className={styles.optionIcon} />,
    subOptions: [
      'Google Ads (Búsqueda)',
      'Meta Ads (Facebook/Instagram)',
      'Publicidad en TikTok/LinkedIn',
      'Remarketing y Seguimiento',
      'Estrategia integral'
    ],
    message: '¡Hola! Quisiera información y asesoría sobre campañas de Publicidad en Google Ads / Meta Ads.',
  },
  {
    id: 'rpa',
    title: 'Automatizar tareas y procesos (RPA)',
    subtitle: 'Bots con Python para Excel, reportes y tareas repetitivas',
    icon: <Bot className={styles.optionIcon} />,
    subOptions: [
      'Automatizar Excel / Reportes',
      'Extracción de datos (Web Scraping)',
      'Bots para tareas repetitivas',
      'Otra automatización'
    ],
    message: '¡Hola! Necesito automatizar procesos manuales y reportes en mi empresa con RPA/Python.',
  },
  {
    id: 'data',
    title: 'Datos, Power BI y Dashboards',
    subtitle: 'Integración ETL, reportes automáticos y métricas',
    icon: <Database className={styles.optionIcon} />,
    subOptions: [
      'Dashboards Operativos',
      'Dashboards Ventas/Comerciales',
      'Dashboards Analíticos',
      'Dashboards de Campañas',
      'Automatización de reportes',
      'Consultoría de datos'
    ],
    message: '¡Hola! Quisiera ordenar la información de mi negocio y visualizar dashboards en Power BI.',
  },
  {
    id: 'mobile',
    title: 'Desarrollar una App Móvil',
    subtitle: 'Aplicaciones Android para vendedores o técnicos de campo',
    icon: <Smartphone className={styles.optionIcon} />,
    subOptions: [
      'App Logistica',
      'App Restaurantes',
      'App locales emprendedoras',
      'App Android'
    ],
    message: '¡Hola! Quisiera desarrollar una Aplicación Móvil Android para el equipo de mi empresa.',
  },
  {
    id: 'consulting',
    title: 'Tengo otra consulta tecnológica',
    subtitle: 'Cuéntanos tu problema y encontramos la solución adecuada',
    icon: <MessageSquare className={styles.optionIcon} />,
    subOptions: [], // Vacío pasa directo al paso 2
    message: '¡Hola ColdSolution TI! Tengo un problema en mi negocio y quisiera asesoría tecnológica.',
  },
];

export const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  // Estados del embudo conversacional
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState<typeof chatOptions[0] | null>(null);
  const [selectedSubOption, setSelectedSubOption] = useState<string>('');
  const [formData, setFormData] = useState({ name: '', company: '', email: '' });
  const [greeting, setGreeting] = useState('¡Hola! 👋');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('¡Buenos días! ☀️');
    } else if (hour >= 12 && hour < 19) {
      setGreeting('¡Buenas tardes! 🌤️');
    } else {
      setGreeting('¡Buenas noches! 🌙');
    }
  }, []);

  const chatBodyRef = useRef<HTMLDivElement>(null);

  const mainPhone = contactChannels.find(c => c.type === 'whatsapp' || c.type === 'comercial')?.phone_number || '963478502';
  const cleanPhone = `51${mainPhone.replace(/\s/g, '')}`;

  // Web Audio API helper for notification ring (rin rin sound)
  const playNotificationSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Ring tone 1
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(650, ctx.currentTime);
      gain1.gain.setValueAtTime(0.12, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.15);

      // Ring tone 2 (rin rin)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, ctx.currentTime + 0.12);
      gain2.gain.setValueAtTime(0.15, ctx.currentTime + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime + 0.12);
      osc2.stop(ctx.currentTime + 0.35);
    } catch (e) {}
  };

  useEffect(() => {
    // Cycle: Tooltip appears at 4s, disappears at 8s. Badge appears at 10s (plays sound), disappears at 15s.
    const runCycle = () => {
      const t1 = setTimeout(() => setShowTooltip(true), 4000);
      const t2 = setTimeout(() => setShowTooltip(false), 8000);
      const t3 = setTimeout(() => {
        setShowBadge(true);
        playNotificationSound();
      }, 10000);
      const t4 = setTimeout(() => setShowBadge(false), 15000);
      return [t1, t2, t3, t4];
    };

    let timers = runCycle();
    const cycleInterval = setInterval(() => {
      timers.forEach(clearTimeout);
      setShowTooltip(false);
      setShowBadge(false);
      timers = runCycle();
    }, 18000);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(cycleInterval);
    };
  }, []);

  // Cargar datos guardados previamente para no hacerle tipear de nuevo al usuario
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cs_ti_lead_data');
      if (saved) {
        try { setFormData(JSON.parse(saved)); } catch (e) {}
      }
    }
  }, []);

  // Scroll to bottom when step changes
  useEffect(() => {
    if (chatBodyRef.current) {
      setTimeout(() => {
        chatBodyRef.current?.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: 'smooth' });
      }, 100);
    }
  }, [step]);

  const handleToggle = () => {
    playNotificationSound();
    setIsOpen(prev => {
      if (!prev) {
        if (step === 3) resetAllFlow();
      }
      return !prev;
    });
    setShowTooltip(false);
    setShowBadge(false);
  };

  const handleServiceSelect = (e: React.MouseEvent, opt: typeof chatOptions[0]) => {
    e.preventDefault();
    setSelectedService(opt);
    if (opt.subOptions && opt.subOptions.length > 0) {
      setStep(1);
    } else {
      setSelectedSubOption('');
      setStep(2);
    }
  };

  const handleSubOptionSelect = (sub: string) => {
    setSelectedSubOption(sub);
    setStep(2);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cs_ti_lead_data', JSON.stringify(newFormData));
    }
  };

  const buildFinalMessage = () => {
    let msg = selectedService?.message || '¡Hola ColdSolution TI!';
    
    if (selectedSubOption) {
      msg += `\n\n*Tipo:* ${selectedSubOption}`;
    }
    
    msg += `\n\n*Datos del contacto:*`;
    msg += `\n- *Nombre:* ${formData.name}`;
    if (formData.company) msg += `\n- *Empresa:* ${formData.company}`;
    if (formData.email) msg += `\n- *Email:* ${formData.email}`;
    
    return msg;
  };

  const resetAllFlow = () => {
    setStep(0);
    setSelectedService(null);
    setSelectedSubOption('');
    setFormData({ name: '', company: '', email: '' });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cs_ti_lead_data');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    
    const finalMessage = buildFinalMessage();
    window.open(getWhatsAppLink(finalMessage), '_blank');
    
    // Clear form and localStorage so next time it starts clean
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cs_ti_lead_data');
    }
    setFormData({ name: '', company: '', email: '' });
    setStep(3); // Mostrar éxito
  };

  const handleDirectWhatsApp = () => {
    const msg = selectedService?.message || '¡Hola ColdSolution TI!';
    window.open(getWhatsAppLink(msg), '_blank');
  };
  
  const handleBack = () => {
    if (step === 1) {
      setStep(0);
      setSelectedService(null);
    } else if (step === 2) {
      if (selectedService?.subOptions && selectedService.subOptions.length > 0) {
        setStep(1);
      } else {
        setStep(0);
        setSelectedService(null);
      }
    } else if (step === 3) {
      resetAllFlow();
      setIsOpen(false);
    }
  };

  const getWhatsAppLink = (message: string) => {
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className={styles.widgetWrapper}>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.chatWindow}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={styles.chatHeader}>
              <div className={styles.headerInfo}>
                {step > 0 && step < 3 && (
                  <button onClick={handleBack} className={styles.backBtn} aria-label="Volver">
                    <ArrowLeft size={18} />
                  </button>
                )}
                
                <div className={styles.avatarGroup}>
                  <div className={styles.avatarLogo}>
                    <img src="/images/logoCompleto.png" alt="ColdSolution TI" className={styles.avatarImg} />
                  </div>
                  <span className={styles.statusDot} />
                </div>
                <div>
                  <h3 className={styles.teamTitle}>Equipo ColdSolution TI</h3>
                  <p className={styles.teamStatus}>
                    <span className={styles.onlineBadge}>• En línea</span> - responde en &lt;15 min
                  </p>
                </div>
              </div>
            </div>

            {/* Render Steps */}
            {step === 0 && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={styles.stepContainer}
              >
                <div className={styles.greetingBox}>
                  <h4 className={styles.greetingTitle}>{greeting}</h4>
                  <p className={styles.greetingText}>
                    ¿Cómo podemos ayudarte hoy? Selecciona una opción para guiarte mejor:
                  </p>
                </div>
                <div className={styles.optionsList}>
                  {chatOptions.map((opt) => (
                    <a
                      key={opt.id}
                      href="#"
                      onClick={(e) => handleServiceSelect(e, opt)}
                      className={styles.optionCard}
                    >
                      <div className={styles.optionIconWrapper}>{opt.icon}</div>
                      <div className={styles.optionTextContent}>
                        <h5 className={styles.optionTitle}>{opt.title}</h5>
                        <p className={styles.optionSubtitle}>{opt.subtitle}</p>
                      </div>
                      <div className={styles.arrowWrapper}>
                        <ArrowUpRight size={16} />
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && selectedService && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={styles.chatBody}
                ref={chatBodyRef}
              >
                <div className={styles.userBubble}>
                  {selectedService.title}
                </div>
                
                <div className={styles.botBubbleWrapper}>
                  <img src="/images/logoCompleto.png" alt="Bot" className={styles.botAvatarSmall} />
                  <div className={styles.botBubble}>
                    ¡Entendido! ¿Qué tipo de solución tienes en mente?
                  </div>
                </div>

                <div className={styles.chipsContainer}>
                  {selectedService.subOptions.map((sub, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => handleSubOptionSelect(sub)}
                      className={styles.chipBtn}
                    >
                      {sub} <ArrowUpRight size={14} />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && selectedService && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={styles.chatBody}
                ref={chatBodyRef}
              >
                <div className={styles.userBubble}>
                  {selectedSubOption || selectedService.title}
                </div>
                
                <div className={styles.botBubbleWrapper}>
                  <img src="/images/logoCompleto.png" alt="Bot" className={styles.botAvatarSmall} />
                  <div className={styles.botBubble}>
                    ¡Perfecto! 🎉 Déjanos tus datos para agilizar tu consulta. Al enviar, nos conectaremos directamente por WhatsApp.
                  </div>
                </div>

                <form onSubmit={handleSubmit} className={styles.formContainer}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Tu Nombre *</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleFormChange}
                      className={styles.formInput} 
                      placeholder="Ej. Juan Pérez" 
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Empresa (Opcional)</label>
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleFormChange}
                      className={styles.formInput} 
                      placeholder="Tu negocio" 
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Correo (Opcional)</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className={styles.formInput} 
                      placeholder="correo@empresa.com" 
                    />
                  </div>
                  
                  <button type="submit" className={styles.submitBtn}>
                    Enviar por WhatsApp <Send size={16} />
                  </button>
                  
                  <button type="button" onClick={handleDirectWhatsApp} className={styles.secondaryBtn}>
                    Prefiero escribir directo sin llenar esto
                  </button>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={styles.successContainer}
              >
                <CheckCircle2 className={styles.successIcon} />
                <h3 className={styles.successTitle}>¡Recibido, {formData.name || 'gracias'}!</h3>
                <p className={styles.successText}>
                  Te hemos redirigido a WhatsApp para continuar la conversación. Nuestro equipo te responderá de inmediato.
                </p>
                <button onClick={handleBack} className={styles.submitBtn} style={{ marginTop: '24px' }}>
                  Cerrar
                </button>
              </motion.div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div 
            className={styles.speechBubble}
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={handleToggle}
          >
            <span>¿Necesitas ayuda con tu negocio? 💬</span>
            <button 
              className={styles.bubbleClose} 
              onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
            >
              <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.buttonContainer}>
        {!isOpen && <div className={styles.radarRing} />}
        {!isOpen && <div className={styles.radarRingSecondary} />}

        <AnimatePresence>
          {showBadge && !isOpen && (
            <motion.span 
              className={styles.notificationBadge}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              1
            </motion.span>
          )}
        </AnimatePresence>

        <button 
          onClick={handleToggle}
          className={`${styles.floatingButton} ${isOpen ? styles.isOpen : ''}`}
          aria-label={isOpen ? "Cerrar chat" : "Abrir chat de WhatsApp"}
        >
          {isOpen ? (
            <X size={26} />
          ) : (
            <img 
              src="/images/whatsap_transparent.png" 
              alt="WhatsApp" 
              className={styles.whatsappImgIcon} 
            />
          )}
        </button>
      </div>
    </div>
  );
};

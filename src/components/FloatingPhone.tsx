'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  MessageCircle, 
  Users, 
  Briefcase, 
  Cpu, 
  Wrench, 
  X,
  Headphones
} from 'lucide-react';
import styles from './FloatingPhone.module.css';

const phoneChannels = [
  {
    id: 'general',
    label: 'WhatsApp General',
    phone: '963 478 502',
    cleanPhone: '51963478502',
    icon: <Users size={18} />,
    wsMessage: '¡Hola! Quisiera información general sobre ColdSolution TI y sus servicios.',
  },
  {
    id: 'comercial',
    label: 'Comercial y Ventas',
    phone: '963 478 502',
    cleanPhone: '51963478502',
    icon: <Briefcase size={18} />,
    wsMessage: '¡Hola Comercial y Ventas! Quisiera asesoría sobre planes, cotizaciones y servicios para mi empresa.',
  },
  {
    id: 'tecnologia',
    label: 'Consultor Tecnología',
    phone: '945 430 358',
    cleanPhone: '51945430358',
    icon: <Cpu size={18} />,
    wsMessage: '¡Hola! Quisiera hablar con un Consultor de Tecnología para evaluar una arquitectura o proyecto.',
  },
  {
    id: 'soporte',
    label: 'Soporte Aplicaciones',
    phone: '992 609 046',
    cleanPhone: '51992609046',
    icon: <Wrench size={18} />,
    wsMessage: '¡Hola Soporte TI! Requiero asistencia técnica para una aplicación o sistema.',
  },
];

export const FloatingPhone = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Timing cycle: Phone tooltip appears at 6s, disappears at 10s.
    const runCycle = () => {
      const t1 = setTimeout(() => setShowTooltip(true), 6000);
      const t2 = setTimeout(() => setShowTooltip(false), 10000);
      return [t1, t2];
    };

    let timers = runCycle();
    const cycleInterval = setInterval(() => {
      timers.forEach(clearTimeout);
      setShowTooltip(false);
      timers = runCycle();
    }, 18000);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(cycleInterval);
    };
  }, []);

  const playClickSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(500, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {}
  };

  const handleToggle = () => {
    playClickSound();
    setIsOpen(prev => !prev);
    setShowTooltip(false);
  };

  return (
    <div className={styles.widgetWrapper}>
      {/* Phone Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.phoneWindow}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={styles.phoneHeader}>
              <div className={styles.headerIconWrapper}>
                <Headphones size={22} />
              </div>
              <div>
                <h3 className={styles.headerTitle}>Central Telefónica y WhatsApp</h3>
                <p className={styles.headerSubtitle}>Atención directa con nuestro equipo</p>
              </div>
            </div>

            {/* Channels List */}
            <div className={styles.channelsList}>
              {phoneChannels.map((channel) => (
                <div key={channel.id} className={styles.channelRow}>
                  <div className={styles.channelIconBg}>
                    {channel.icon}
                  </div>
                  <div className={styles.channelInfo}>
                    <h4 className={styles.channelLabel}>{channel.label}</h4>
                    <p className={styles.channelPhone}>{channel.phone}</p>
                  </div>
                  <div className={styles.actionsGroup}>
                    <a 
                      href={`tel:+${channel.cleanPhone}`}
                      className={styles.callIconBtn}
                      title={`Llamar a ${channel.label} (${channel.phone})`}
                      aria-label={`Llamar a ${channel.label}`}
                    >
                      <Phone size={15} />
                    </a>
                    <a 
                      href={`https://wa.me/${channel.cleanPhone}?text=${encodeURIComponent(channel.wsMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.wsIconBtn}
                      title={`Escribir por WhatsApp a ${channel.label}`}
                      aria-label={`WhatsApp a ${channel.label}`}
                    >
                      <MessageCircle size={15} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Speech Bubble / Tooltip */}
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
            <span>¿Prefieres una llamada directa? 📞</span>
            <button 
              className={styles.bubbleClose} 
              onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
            >
              <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <div className={styles.buttonContainer}>
        {!isOpen && <div className={styles.radarRing} />}

        <button 
          onClick={handleToggle}
          className={`${styles.floatingButton} ${isOpen ? styles.isOpen : ''}`}
          aria-label={isOpen ? "Cerrar canales de atención" : "Abrir canales de llamada y WhatsApp"}
        >
          {isOpen ? (
            <X size={24} />
          ) : (
            <img 
              src="/images/telefono_transparent.png" 
              alt="Teléfono de contacto" 
              className={styles.phoneImgIcon} 
            />
          )}
        </button>
      </div>
    </div>
  );
};

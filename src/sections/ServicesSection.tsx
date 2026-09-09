'use client';

import React, { useState } from 'react';
import styles from './ServicesSection.module.css';
import { services, solutionTiers } from '@/content';
import { motion, AnimatePresence } from 'framer-motion';
import { TiltCard } from '@/components/TiltCard';
import { BeforeAfterTicker } from '@/components/BeforeAfterTicker';
import { 
  SoftwareIcon,
  WebIcon,
  AutomationIcon,
  DataIcon,
  MobileIcon,
  AiIcon,
  IntegrationIcon,
  ConsultingIcon
} from '@/components/BrandIcons';
import { 
  ChevronDown
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  software: <SoftwareIcon size={40} />,
  web: <WebIcon size={40} />,
  rpa: <AutomationIcon size={40} />,
  automation: <AutomationIcon size={40} />,
  data: <DataIcon size={40} />,
  mobile: <MobileIcon size={40} />,
  ai: <AiIcon size={40} />,
  integration: <IntegrationIcon size={40} />,
  consulting: <ConsultingIcon size={40} />
};

// Motion Variants for Staggered Evolutive Micro-Interactions (1ra -> 2da -> 3ra)
const tiersContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.22,
      delayChildren: 0.35
    }
  }
};

const tierItemVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.9 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.55, 
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

export const ServicesSection = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => {
      const isOpening = prev !== id;
      if (isOpening) {
        setTimeout(() => {
          const section = document.getElementById('servicios');
          if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 50);
        return id;
      }
      return null;
    });
  };

  return (
    <section className={styles.container} id="servicios">
      <div className={styles.content}>
        <motion.h2 
          className={styles.heading}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="pulseDot" />Así podemos ayudarte
        </motion.h2>

        <div className={styles.showcaseWrapper}>
          {/* Quick Switcher Side Dock ÚNICO y ESTÁTICO */}
          <AnimatePresence>
            {expandedId && (
              <motion.aside
                className={styles.sideDock}
                initial={{ opacity: 0, x: -30, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.dockTrack}>
                  {services.map((s) => {
                    const isActive = expandedId === s.id;
                    return (
                      <motion.button
                        key={s.id}
                        className={`${styles.dockButton} ${isActive ? styles.dockButtonActive : ''}`}
                        onClick={() => toggleExpand(s.id)}
                        whileHover={{ scale: 1.2, x: 4 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        aria-label={s.name}
                      >
                        <span className={styles.dockIcon}>
                          {iconMap[s.icon] || <span className={styles.fallbackIcon}>{s.name.substring(0, 2).toUpperCase()}</span>}
                        </span>
                        <span className={styles.dockTooltip}>
                          {s.name}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          <div className={styles.grid}>
            {services.map((service, index) => {
              const isExpanded = expandedId === service.id;

              return (
                <TiltCard 
                  layout
                  transition={{
                    layout: { type: "spring", stiffness: 300, damping: 32 }
                  }}
                  key={service.id} 
                  className={`${styles.card} ${isExpanded ? styles.cardExpanded : ''}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-50px" }}
                  whileHover={{ y: isExpanded ? 0 : -6, scale: isExpanded ? 1 : 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleExpand(service.id)}
                >
                  {isExpanded ? (
                    /* Layout Expandido con Imagen a la Derecha */
                    <div className={styles.expandedHeaderGrid}>
                      <div className={styles.expandedHeaderLeft}>
                        <motion.div 
                          className={styles.iconWrapper}
                          whileHover={{ rotate: 12, scale: 1.15 }}
                          whileTap={{ rotate: -15, scale: 0.9 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          <span className={styles.iconText}>
                            {iconMap[service.icon] || <span className={styles.fallbackIcon}>{service.name.substring(0, 2).toUpperCase()}</span>}
                          </span>
                        </motion.div>
                        <h3 className={styles.cardTitle}>{service.name}</h3>
                        <p className={styles.cardDescription}>{service.description}</p>
                        
                        <div className={styles.expandIndicator}>
                          <span className={styles.expandText}>Ocultar niveles</span>
                          <motion.div animate={{ rotate: 180 }} transition={{ duration: 0.4 }}>
                            <ChevronDown size={20} className={styles.chevronIcon} />
                          </motion.div>
                        </div>
                      </div>

                      <div className={styles.expandedHeaderRight}>
                        {/* Cuadro Rojo Grande: Imagen Ilustrativa del Servicio */}
                        <img 
                          src={`/images/sections/services/${service.id}.svg`} 
                          onError={(e) => { e.currentTarget.src = '/images/sections/services/software.svg'; }}
                          alt={service.name} 
                          className={styles.showcaseImg}
                        />
                      </div>
                    </div>
                  ) : (
                    /* Layout Colapsado Estándar */
                    <>
                      <motion.div 
                        className={styles.iconWrapper}
                        whileHover={{ rotate: 12, scale: 1.15 }}
                        whileTap={{ rotate: -15, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <span className={styles.iconText}>
                          {iconMap[service.icon] || <span className={styles.fallbackIcon}>{service.name.substring(0, 2).toUpperCase()}</span>}
                        </span>
                      </motion.div>
                      <h3 className={styles.cardTitle}>{service.name}</h3>
                      <p className={styles.cardDescription}>{service.description}</p>
                      
                      <div className={styles.expandIndicator}>
                        <span className={styles.expandText}>Ver escalabilidad</span>
                        <motion.div animate={{ rotate: 0 }} transition={{ duration: 0.4 }}>
                          <ChevronDown size={20} className={styles.chevronIcon} />
                        </motion.div>
                      </div>
                    </>
                  )}

                  <AnimatePresence mode="wait">
                    {isExpanded && (
                      <motion.div
                        className={styles.expandedPanel}
                        initial={{ opacity: 0, scaleY: 0, height: 0 }}
                        animate={{ opacity: 1, scaleY: 1, height: 'auto', marginTop: '1.5rem' }}
                        exit={{ opacity: 0, scaleY: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                        style={{ transformOrigin: "top" }}
                      >
                        <motion.div 
                          className={styles.tiersContainer}
                          variants={tiersContainerVariants}
                          initial="hidden"
                          animate="show"
                        >
                          <h4 className={styles.tiersHeading}>Cómo escala tu producto:</h4>
                          {solutionTiers.map((tier) => (
                            <motion.div 
                              key={tier.id} 
                              className={styles.tierItem}
                              variants={tierItemVariants}
                              whileHover={{ y: -6, scale: 1.03, transition: { duration: 0.2 } }}
                              whileTap={{ y: [-4, 0], scale: 0.97 }}
                            >
                              <div className={styles.tierHeader}>
                                <h5 className={styles.tierName}>{tier.name}</h5>
                                {/* Cuadro Rojo Pequeño: Badge/Ícono de Nivel */}
                                <img 
                                  src={`/images/sections/services/tiers/${tier.id}.svg`} 
                                  alt={tier.name} 
                                  className={styles.tierBadgeImg} 
                                />
                              </div>
                              <p className={styles.tierDescription}>{tier.description}</p>
                            </motion.div>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </TiltCard>
              );
            })}
          </div>
        </div>

        <BeforeAfterTicker />

        <motion.div 
          className={styles.ctaContainer}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a href="#contacto" className={styles.secondaryCta}>
            Solicitar diagnóstico
          </a>
        </motion.div>
      </div>
    </section>
  );
};

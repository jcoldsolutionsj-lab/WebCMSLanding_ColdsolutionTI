'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './ValuePropositionSection.module.css';
import { RocketIcon, TargetIcon, ShieldIcon } from '@/components/BrandIcons';
import { ScrollReveal } from '@/components/ScrollReveal';

interface FeatureItem {
  id: string;
  title: string;
  text: string;
  icon: React.ReactNode;
}

const features: FeatureItem[] = [
  {
    id: 'rapido',
    title: 'Rápido',
    text: 'Soluciones ágiles y efectivas.',
    icon: <RocketIcon size={44} strokeWidth={2} />,
  },
  {
    id: 'medida',
    title: 'A tu medida',
    text: 'Adaptado a tu negocio, no al revés.',
    icon: <TargetIcon size={44} strokeWidth={2} />,
  },
  {
    id: 'confiable',
    title: 'Confiable',
    text: 'Tecnología segura, soporte real.',
    icon: <ShieldIcon size={44} strokeWidth={2} />,
  },
];

// Typewriter component for typewriter keyboard text animation
const TypewriterText = ({ text, isActive }: { text: string; isActive: boolean }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!isActive) {
      setDisplayedText(text);
      return;
    }

    setDisplayedText('');
    let i = 0;
    const speed = 40; // Ms per character
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isActive, text]);

  return (
    <p className={styles.featureText}>
      {isActive ? displayedText : text}
      {isActive && displayedText.length < text.length && (
        <span className={styles.typewriterCaret}>|</span>
      )}
    </p>
  );
};

export const ValuePropositionSection = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Rotate spotlight every 3 seconds
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <section className={styles.container} id="propuesta-valor">
      <div className={styles.content}>
        <ScrollReveal direction="left" delay={0.1}>
          <h2 className={styles.heading}>
            <span className="pulseDot" />Empezamos por el problema, no por la herramienta
          </h2>
        </ScrollReveal>
        
        <ScrollReveal direction="right" delay={0.2}>
          <p className={styles.description}>
            No necesitas saber qué tecnología necesitas. Cuéntanos qué está pasando en tu negocio y te ayudamos a encontrar una solución.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.3}>        <div 
          className={styles.features}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {features.map((feature, idx) => {
            const isActive = activeIndex === idx;

            return (
              <motion.div
                key={feature.id}
                onClick={() => setActiveIndex(idx)}
                className={`${styles.feature} ${isActive ? styles.featureSpotlight : ''}`}
                animate={isActive ? { scale: 1.04, y: -4 } : { scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Spotlight Light Cone Header Overlay */}
                {isActive && <div className={styles.spotlightBeam} />}



                <span className={`${styles.featureIcon} ${isActive ? styles.iconIlluminated : ''}`}>
                  {feature.icon}
                </span>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                
                <TypewriterText text={feature.text} isActive={isActive} />
              </motion.div>
            );
          })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

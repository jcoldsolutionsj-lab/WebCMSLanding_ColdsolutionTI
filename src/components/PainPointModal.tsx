'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { PainPoint } from '@/content';
import styles from './PainPointModal.module.css';

interface PainPointModalProps {
  isOpen: boolean;
  onClose: () => void;
  activePoint: PainPoint | null;
}

const videoMap: Record<string, { video: string; poster: string }> = {
  excel:     { video: '/asset/CarruselDolores/painpoint-excel.mp4',       poster: '/asset/CarruselDolores/painpoint-excel-poster.webp' },
  manual:    { video: '/asset/CarruselDolores/painpoint-procesos.mp4',    poster: '/asset/CarruselDolores/painpoint-procesos-poster.webp' },
  downloads: { video: '/asset/CarruselDolores/painpoint-descargas.mp4',   poster: '/asset/CarruselDolores/painpoint-descargas-poster.webp' },
  numbers:   { video: '/asset/CarruselDolores/painpoint-numeros.mp4',     poster: '/asset/CarruselDolores/painpoint-numeros-poster.webp' },
  whatsapp:  { video: '/asset/CarruselDolores/painpoint-whatsapp.mp4',    poster: '/asset/CarruselDolores/painpoint-whatsapp-poster.webp' },
  mobility:  { video: '/asset/CarruselDolores/painpoint-movilidad.mp4',   poster: '/asset/CarruselDolores/painpoint-movilidad-poster.webp' },
  automate:  { video: '/asset/CarruselDolores/painpoint-automatizar.mp4', poster: '/asset/CarruselDolores/painpoint-automatizar-poster.webp' },
  presence:  { video: '/asset/CarruselDolores/painpoint-presencia.mp4',   poster: '/asset/CarruselDolores/painpoint-presencia-poster.webp' },
};

export const PainPointModal: React.FC<PainPointModalProps> = ({ isOpen, onClose, activePoint }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Reset video when activePoint changes
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.load();
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [isOpen, activePoint]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: shouldReduceMotion ? 1 : 0.95 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: 'spring' as const,
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0, 
      scale: shouldReduceMotion ? 1 : 0.95,
      transition: { duration: 0.2 }
    }
  };

  const media = activePoint ? videoMap[activePoint.id] : null;

  return (
    <AnimatePresence>
      {isOpen && activePoint && (
        <motion.div
          ref={overlayRef}
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
        >
          <motion.div
            className={styles.modal}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >

            <div className={styles.carouselContainer}>
              {media && (
                <video
                  key={media.video}
                  ref={videoRef}
                  src={media.video}
                  poster={media.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className={styles.mediaElement}
                />
              )}
            </div>

            <div className={styles.contentContainer}>
              <h3 className={styles.title}>{activePoint.title}</h3>
              <p className={styles.header}>Así se ve típicamente este problema</p>
              
              {activePoint.scenarioText && (
                <>
                  <h4 className={styles.scenarioTitle}>El Escenario</h4>
                  <p className={styles.scenarioText}>{activePoint.scenarioText}</p>
                </>
              )}
              
              {activePoint.solutionText && (
                <>
                  <h4 className={styles.solutionTitle}>La Solución</h4>
                  <p className={styles.solutionText}>{activePoint.solutionText}</p>
                </>
              )}

              <a href="#contacto" className={styles.ctaButton} onClick={onClose}>
                Solicitar diagnóstico
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

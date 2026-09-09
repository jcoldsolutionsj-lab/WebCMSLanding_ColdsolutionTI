'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { beforeAfterExamples, beforeAfterExample } from '@/content';
import styles from './BeforeAfterTicker.module.css';

export const BeforeAfterTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = beforeAfterExamples.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Automatic 5-second rotator (pauses on hover)
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused, nextSlide]);

  const currentItem = beforeAfterExamples[currentIndex];

  return (
    <div 
      className={styles.tickerBlock}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ticker Header / Informative News Bar */}
      <div className={styles.tickerHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.liveTag}>
            <span className={`${styles.pulseDot} ${isPaused ? styles.pulseDotPaused : ''}`} />
            <span className={styles.liveText}>IMPACTO REAL</span>
          </div>

          <span className={styles.categoryBadge}>
            {currentItem.category}
          </span>
        </div>

        <div className={styles.headerRight}>
          {isPaused ? (
            <span className={styles.pauseBadge} title="Temporizador pausado para lectura">
              <Pause size={12} />
              <span>Lectura activa</span>
            </span>
          ) : (
            <span className={styles.playBadge} title="Cambiando cada 5 segundos">
              <Play size={12} className={styles.playIcon} />
              <span>Auto 5s</span>
            </span>
          )}

          <div className={styles.counter}>
            <span className={styles.currentNum}>{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className={styles.divider}>/</span>
            <span className={styles.totalNum}>{String(total).padStart(2, '0')}</span>
          </div>

          <div className={styles.navControls}>
            <button 
              className={styles.navBtn} 
              onClick={prevSlide} 
              aria-label="Ejemplo anterior"
              type="button"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              className={styles.navBtn} 
              onClick={nextSlide} 
              aria-label="Ejemplo siguiente"
              type="button"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar (resets every 5s when active) */}
      <div className={styles.progressTrack}>
        <motion.div 
          key={`${currentIndex}-${isPaused}`}
          className={styles.progressBar}
          initial={{ width: "0%" }}
          animate={{ width: isPaused ? "100%" : "100%" }}
          transition={{ duration: isPaused ? 0 : 5, ease: "linear" }}
        />
      </div>

      {/* Animated Translucent Content Block */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.id}
          className={styles.contentGrid}
          initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.beforeCard}>
            <div className={styles.cardHeader}>
              <span className={styles.beforeBadge}>Antes</span>
              <span className={styles.cardSubtext}>Proceso Manual / Tradicional</span>
            </div>
            <p className={styles.cardText}>{currentItem.before}</p>
          </div>

          <div className={styles.afterCard}>
            <div className={styles.cardHeader}>
              <span className={styles.afterBadge}>Después</span>
              <span className={styles.cardSubtext}>Con Solución Tecnológica</span>
            </div>
            <p className={styles.cardText}>{currentItem.after}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots Indicator */}
      <div className={styles.dotsRow}>
        {beforeAfterExamples.map((item, idx) => (
          <button
            key={item.id}
            className={`${styles.dot} ${idx === currentIndex ? styles.dotActive : ''}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Ver ejemplo ${idx + 1}: ${item.category}`}
            type="button"
          />
        ))}
      </div>

      {/* Closing Philosophy */}
      <p className={styles.closingText}>
        {beforeAfterExample.closing}
      </p>
    </div>
  );
};

'use client';

import { useState, useEffect } from 'react';
import styles from './ProcessSection.module.css';
import { processSteps } from '@/content';
import { motion } from 'framer-motion';
import { Wifi } from 'lucide-react';

export const ProcessSection = () => {
  const [activeDesktopIndex, setActiveDesktopIndex] = useState(0);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [shufflingIdx, setShufflingIdx] = useState<number | null>(null);

  // Auto 3-second ticker for desktop wireless highlight rotation
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveDesktopIndex((prev) => (prev + 1) % processSteps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, activeDesktopIndex]);

  // Auto 3-second ticker for mobile card deck
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNextMobile();
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, activeMobileIndex]);

  const handleNextMobile = () => {
    setShufflingIdx(activeMobileIndex);
    setTimeout(() => {
      setActiveMobileIndex((prev) => (prev + 1) % processSteps.length);
      setShufflingIdx(null);
    }, 220);
  };

  const handleSelectMobile = (idx: number) => {
    if (idx === activeMobileIndex) return;
    setShufflingIdx(activeMobileIndex);
    setTimeout(() => {
      setActiveMobileIndex(idx);
      setShufflingIdx(null);
    }, 220);
  };

  return (
    <section className={styles.container} id="proceso">
      <div className={styles.content}>
        <motion.h2 
          className={styles.heading}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="pulseDot" />Nuestro proceso es simple
        </motion.h2>

        {/* Desktop View: Interactive 5-Step Grid with Wireless Signal Connection */}
        <div 
          className={styles.desktopGrid}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {processSteps.map((step, idx) => {
            const isActive = idx === activeDesktopIndex;
            const isPassed = idx < activeDesktopIndex;

            return (
              <div key={step.order} className={styles.desktopStepWrapper}>
                <motion.div 
                  className={`${styles.stepCard} ${styles.desktopCard} ${isActive ? styles.activeDesktopCard : ''} ${isPassed ? styles.passedDesktopCard : ''}`}
                  onClick={() => setActiveDesktopIndex(idx)}
                  onMouseEnter={() => setActiveDesktopIndex(idx)}
                  animate={{
                    scale: isActive ? 1.04 : 1,
                    y: isActive ? -6 : 0,
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {/* Active Wireless Beam Header Overlay */}
                  {isActive && <div className={styles.activeSpotlightBeam} />}

                  <div className={`${styles.stepNumber} ${isActive ? styles.activeNumber : ''}`}>
                    {step.order}
                  </div>

                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </motion.div>

                {/* Linear Laser Energy Ray Connector between card i and i+1 */}
                {idx < processSteps.length - 1 && (
                  <div 
                    className={`${styles.laserRayConnector} ${
                      idx === activeDesktopIndex - 1 
                        ? styles.laserActive 
                        : idx < activeDesktopIndex - 1 
                        ? styles.laserConnected 
                        : styles.laserHidden
                    }`}
                  >
                    <div className={styles.laserBeamLine}>
                      <span className={styles.laserEnergyPulse} />
                    </div>
                    <div className={styles.laserArrowHead} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile View: 3D Stacked Casino Shuffle Card Deck */}
        <div 
          className={styles.mobileStackWrapper}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className={styles.mobileTimerHeader}>
            <div className={styles.liveBadge}>
              <span className={styles.liveDot} />
              <span>PASO {activeMobileIndex + 1} DE {processSteps.length}</span>
            </div>
          </div>

          <div className={styles.stackCardDeck}>
            {processSteps.map((step, idx) => {
              const total = processSteps.length;
              const offset = (idx - activeMobileIndex + total) % total;
              const isShufflingOut = shufflingIdx === idx;

              if (offset > 2 && !isShufflingOut) return null;

              return (
                <motion.div
                  key={step.order}
                  className={`${styles.stepCard} ${styles.mobileStackCard}`}
                  style={{
                    zIndex: isShufflingOut ? 12 : 10 - offset,
                  }}
                  animate={
                    isShufflingOut
                      ? {
                          x: 170,
                          rotate: 16,
                          scale: 1.03,
                          opacity: 0,
                          y: -5,
                        }
                      : {
                          x: 0,
                          rotate: 0,
                          y: offset * 8,
                          scale: 1 - offset * 0.04,
                          opacity: offset === 0 ? 1 : offset === 1 ? 0.75 : 0.4,
                        }
                  }
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => handleNextMobile()}
                >
                  <div className={styles.stepNumber}>
                    {step.order}
                  </div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Dots Pagination Navigation */}
          <div className={styles.dotsPagination}>
            {processSteps.map((step, idx) => (
              <button
                key={step.order}
                className={`${styles.dot} ${idx === activeMobileIndex ? styles.activeDot : ''}`}
                onClick={() => handleSelectMobile(idx)}
                aria-label={`Ir al paso ${step.order}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};




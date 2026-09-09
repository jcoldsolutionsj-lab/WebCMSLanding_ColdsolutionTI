'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './DeepDiveSection.module.css';
import { services } from '@/content';
import { ScrollReveal } from '@/components/ScrollReveal';

export const DeepDiveSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const matchMedia = window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 768px)');
    setIsMobile(matchMedia.matches);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  // Duplicate services to create a seamless loop
  const duplicatedServices = [...services, ...services];

  return (
    <section className={styles.container} id="especialidades" ref={containerRef}>
      <motion.div 
        className={styles.parallaxBg}
        style={{ y: isMobile ? 0 : y }}
      />
      
      <div className={styles.header}>
        <ScrollReveal direction="left">
          <h2 className={styles.sectionTitle}><span className="pulseDot" />Nuestras Especialidades</h2>
        </ScrollReveal>
      </div>

      <div className={styles.carouselContainer}>
        <motion.div 
          className={styles.carouselTrack}
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 35, // Adjust speed (higher is slower)
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedServices.map((service, index) => (
            <motion.div 
              key={`${service.id}-${index}`} 
              className={styles.card}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className={styles.title}>{service.name}</h3>
              <p className={styles.description}>{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

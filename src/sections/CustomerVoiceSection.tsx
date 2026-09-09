'use client';

import styles from './CustomerVoiceSection.module.css';
import { customerVoices } from '@/content';
import { motion } from 'framer-motion';
import { MessageSquareQuote, CheckCircle2 } from 'lucide-react';
import { TiltCard } from '@/components/TiltCard';

export const CustomerVoiceSection = () => {
  return (
    <section className={styles.container} id="voz-del-cliente">
      <div className={styles.content}>
        <motion.h2 
          className={styles.heading}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="pulseDot" />¿Qué está pasando en tu negocio?
        </motion.h2>
        <div className={styles.grid}>
          {customerVoices.map((voice, index) => (
            <TiltCard 
              key={voice.id} 
              className={styles.card}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.quoteBlock}>
                <MessageSquareQuote className={styles.quoteIcon} size={24} />
                <p className={styles.quoteText}>"{voice.quote}"</p>
              </div>
              <div className={styles.responseBlock}>
                <CheckCircle2 className={styles.responseIcon} size={20} />
                <p className={styles.responseText}>{voice.response}</p>
              </div>
            </TiltCard>
          ))}
        </div>
        <motion.div 
          className={styles.closingMessage}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          El objetivo no es venderte una tecnología porque sí. Es encontrar el nivel de solución que realmente necesitas.
        </motion.div>
      </div>
    </section>
  );
};

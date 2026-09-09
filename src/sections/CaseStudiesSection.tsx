'use client';

import styles from './CaseStudiesSection.module.css';
import { caseStudies } from '@/content';
import { motion } from 'framer-motion';
import { Lock, Briefcase } from 'lucide-react';
import { TiltCard } from '@/components/TiltCard';

export const CaseStudiesSection = () => {
  return (
    <section className={styles.container} id="casos-de-exito">
      <div className={styles.content}>
        <motion.h2 
          className={styles.heading}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="pulseDot" />Proyectos que hablan de nosotros
        </motion.h2>
        <div className={styles.grid}>
          {caseStudies.map((study, index) => (
            <TiltCard 
              key={study.id} 
              className={styles.card}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.cardHeader}>
                {study.is_confidential_placeholder ? (
                  <span className={styles.icon}><Lock /></span>
                ) : (
                  <span className={styles.icon}><Briefcase /></span>
                )}
                <h3 className={styles.clientName}>{study.client_name}</h3>
              </div>
              <p className={styles.summary}>{study.summary}</p>
              {study.highlights && study.highlights.length > 0 && (
                <ul className={styles.highlights}>
                  {study.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

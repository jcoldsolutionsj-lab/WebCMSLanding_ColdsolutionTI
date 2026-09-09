import styles from './FinalCtaSection.module.css';
import { closingMessages } from '@/content';
import { ScrollReveal } from '@/components/ScrollReveal';

export const FinalCtaSection = () => {
  return (
    <section className={styles.container} id="cierre">
      <div className={styles.content}>
        <ScrollReveal direction="up" delay={0.1}>
          <h2 className={styles.heading}><span className="pulseDot" />{closingMessages.secondary}</h2>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.2}>
          <div className={styles.ctaGroup}>
            <a href="#contacto" className={styles.primaryCta}>
              Escríbenos ahora
            </a>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.3}>
          <div className={styles.philosophy}>
            <p>{closingMessages.philosophy1}</p>
            <p>{closingMessages.philosophy2}</p>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.4}>
          <div className={styles.slogan}>
            {closingMessages.slogan}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

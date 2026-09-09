import styles from './SolutionTiersSection.module.css';
import { solutionTiers } from '@/content';

export const SolutionTiersSection = () => {
  return (
    <section className={styles.container} id="soluciones">
      <div className={styles.content}>
        <div className={styles.grid}>
          {solutionTiers.map((tier) => (
            <div key={tier.id} className={styles.card}>
              <h3 className={styles.cardTitle}>{tier.name}</h3>
              <p className={styles.cardDescription}>{tier.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

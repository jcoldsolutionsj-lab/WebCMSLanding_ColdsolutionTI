'use client';

import { useState } from 'react';
import styles from './PainPointsSection.module.css';
import { painPoints, PainPoint } from '@/content';
import { motion } from 'framer-motion';
import { 
  ExcelIcon,
  ManualProcessIcon,
  DownloadIcon,
  DataIcon,
  WhatsAppIcon,
  MobileIcon,
  AutomationIcon,
  WebIcon 
} from '@/components/BrandIcons';
import { PainPointModal } from '@/components/PainPointModal';

const iconMap: Record<string, React.ReactNode> = {
  excel: <ExcelIcon size={40} strokeWidth={2} />,
  manual: <ManualProcessIcon size={40} strokeWidth={2} />,
  download: <DownloadIcon size={40} strokeWidth={2} />,
  chart: <DataIcon size={40} strokeWidth={2} />,
  whatsapp: <WhatsAppIcon size={40} strokeWidth={2} />,
  mobile: <MobileIcon size={40} strokeWidth={2} />,
  robot: <AutomationIcon size={40} strokeWidth={2} />,
  web: <WebIcon size={40} strokeWidth={2} />
};

export const PainPointsSection = () => {
  const [activePointId, setActivePointId] = useState<string | null>(null);

  const activePoint = activePointId 
    ? painPoints.find(p => p.id === activePointId) || null 
    : null;

  return (
    <section className={styles.container} id="dolores">
      <div className={styles.content}>
        <motion.h2 
          className={styles.heading}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="pulseDot" />¿Tal vez esto te esté pasando... ?
        </motion.h2>
        <div className={styles.grid}>
          {painPoints.map((point, index) => (
            <motion.div 
              key={point.id} 
              className={styles.card}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setActivePointId(point.id)}
            >
              <div className={styles.iconWrapper}>
                <span className={styles.iconText}>
                  {iconMap[point.icon] || <span className={styles.fallbackIcon}>{point.title[0]}</span>}
                </span>
              </div>
              <h3 className={styles.cardTitle}>{point.title}</h3>
              <p className={styles.cardDescription}>{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <PainPointModal 
        isOpen={activePointId !== null} 
        onClose={() => setActivePointId(null)} 
        activePoint={activePoint} 
      />
    </section>
  );
};

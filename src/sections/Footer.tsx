'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  FileText,
  Phone,
  Info,
  X,
  MapPin,
  Award,
  Sparkles
} from 'lucide-react';
import styles from './Footer.module.css';
import { contactChannels, closingMessages } from '@/content';
import { BrandLogo } from '@/components/BrandLogo';

export const Footer = () => {
  const [showDomainTooltip, setShowDomainTooltip] = useState(false);

  const handleDomainClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowDomainTooltip(prev => !prev);
  };

  useEffect(() => {
    if (showDomainTooltip) {
      const timer = setTimeout(() => {
        setShowDomainTooltip(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showDomainTooltip]);

  return (
    <footer className={styles.container}>
      <div className={styles.glowOverlay} aria-hidden="true" />

      <div className={styles.content}>
        {/* Col 1: Brand & About Us Story */}
        <div className={styles.brandSection}>
          <div className={styles.brandLogoContainer}>
            <BrandLogo animate={false} />
          </div>

          {/* About Us Story Card */}
          <div className={styles.aboutCard}>
            <div className={styles.aboutHeader}>
              <Sparkles size={14} className={styles.aboutIcon} />
              <span>Quiénes Somos</span>
            </div>
            <p className={styles.aboutText}>
              Somos una empresa peruana de soluciones tecnológicas fundada por 2 Ingenieros Informáticos con más de 15 años de trayectoria en la industria de software. Hoy ponemos toda esa experiencia acumulada al servicio de tu negocio con soluciones a medida, ágiles y accesibles.
            </p>
            <div className={styles.expBadgeRow}>
              <span className={styles.expBadge}>🇵🇪 Empresa Peruana - lima</span>
              <span className={styles.expBadge}>⭐ +15 Años en Soluciones Digitales</span>
            </div>
          </div>

          <div className={styles.metaBox}>
            {/* RUC Info */}
            <div className={styles.metaRow}>
              <FileText size={14} className={styles.metaIcon} aria-hidden="true" />
              <span className={styles.metaLabel}>RUC:</span>
              <span className={styles.metaValue}>10477365596</span>
            </div>

            {/* Domain with Interactive Tooltip */}
            <div className={styles.domainWrapper}>
              <button
                onClick={handleDomainClick}
                className={styles.domainBtn}
                title="Haz clic para ver el estado del dominio"
                type="button"
              >
                <Globe size={14} className={styles.metaIcon} aria-hidden="true" />
                <span className={styles.domainText}>www.coldsolutionti.com</span>
                <span className={styles.domainTag}>En proceso</span>
              </button>

              <AnimatePresence>
                {showDomainTooltip && (
                  <motion.div
                    className={styles.tooltipCard}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className={styles.tooltipHeader}>
                      <div className={styles.tooltipTitleGroup}>
                        <Info size={15} className={styles.tooltipIcon} />
                        <span>Dominio en preparación</span>
                      </div>
                      <button
                        onClick={() => setShowDomainTooltip(false)}
                        className={styles.tooltipCloseBtn}
                        aria-label="Cerrar notificación"
                        type="button"
                      >
                        <X size={13} />
                      </button>
                    </div>
                    <p className={styles.tooltipBody}>
                      Actualmente estamos adquiriendo y vinculando el dominio <strong>www.coldsolutionti.com</strong>. ¡Muy pronto estará 100% visible en línea!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div className={styles.linksSection}>
          <h3 className={styles.sectionTitle}>Navegación</h3>
          <ul className={styles.linksList}>
            <li><a href="#hero">Inicio</a></li>
            <li><a href="#dolores">Problemas comunes</a></li>
            <li><a href="#servicios">Servicios &amp; Capacidad</a></li>
            <li><a href="#soluciones">Niveles de Solución</a></li>
            <li><a href="#proceso">Proceso de Trabajo</a></li>
            <li><a href="#casos-de-exito">Casos de Éxito</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </div>

        {/* Col 3: Contact Channels */}
        <div className={styles.contactSection}>
          <h3 className={styles.sectionTitle}>Canales de Atención</h3>
          <ul className={styles.contactList}>
            {contactChannels.map(c => (
              <li key={c.type} className={styles.contactItem}>
                <Phone size={14} className={styles.contactIcon} aria-hidden="true" />
                <div className={styles.contactDetails}>
                  <span className={styles.contactLabel}>{c.label}:</span>
                  <a href={`tel:+51${c.phone_number.replace(/\s+/g, '')}`} className={styles.contactPhone}>
                    {c.phone_number}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Trust & Slogan */}
        <div className={styles.trustSection}>
          <h3 className={styles.sectionTitle}>Nuestra Garantía</h3>
          <p className={styles.sloganText}>{closingMessages.slogan}</p>
          <p className={styles.philosophyText}>
            "{closingMessages.philosophy1}"
          </p>

          <div className={styles.nationalBadge}>
            <MapPin size={14} className={styles.nationalIcon} />
            <span>Atención &amp; Soluciones a Nivel Nacional</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBarContainer}>
        <div className={styles.bottomBar}>
          <p>&copy; {new Date().getFullYear()} ColdSolutions TI. Todos los derechos reservados.</p>
          <div className={styles.legalLinks}>
            <a href="#contacto">Términos y condiciones</a>
            <span className={styles.legalDot}>•</span>
            <a href="#contacto">Política de privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

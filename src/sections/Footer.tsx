import {
  Globe,
  FileText,
  Phone,
  MapPin,
  Sparkles
} from 'lucide-react';
import styles from './Footer.module.css';
import { contactChannels, closingMessages } from '@/content';
import { BrandLogo } from '@/components/BrandLogo';

export const Footer = () => {

  return (
    <footer className={styles.container}>
      <div className={styles.glowOverlay} aria-hidden="true" />

      <div className={styles.content}>
        {/* Col 1: Brand & About Us Story */}
        <div className={styles.brandSection}>
          <div className={styles.brandLogoContainer}>
            <a href="/" title="ColdSolutions TI" style={{ display: 'inline-block' }}>
              <BrandLogo animate={false} />
            </a>
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
              <span className={styles.metaValue}>10482568811</span>
            </div>

            {/* Domain Link */}
            <a
              href="https://coldsolutionsti.com"
              className={styles.domainBtn}
              title="Sitio web oficial de ColdSolutions TI"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe size={14} className={styles.metaIcon} aria-hidden="true" />
              <span className={styles.domainText}>https://coldsolutionsti.com</span>
            </a>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div className={styles.linksSection}>
          <h3 className={styles.sectionTitle}>Navegación</h3>
          <ul className={styles.linksList}>
            <li><a href="/#hero">Inicio</a></li>
            <li><a href="/#dolores">Problemas comunes</a></li>
            <li><a href="/#servicios">Servicios &amp; Capacidad</a></li>
            <li><a href="/#soluciones">Niveles de Solución</a></li>
            <li><a href="/#proceso">Proceso de Trabajo</a></li>
            <li><a href="/#casos-de-exito">Casos de Éxito</a></li>
            <li><a href="/#contacto">Contacto</a></li>
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
            <a href="/terminos">Términos y condiciones</a>
            <span className={styles.legalDot}>•</span>
            <a href="/privacidad">Política de privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

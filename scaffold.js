const fs = require('fs');
const path = require('path');

const sections = [
  'HeroSection',
  'PainPointsSection',
  'ValuePropositionSection',
  'ServicesSection',
  'DeepDiveSection',
  'SolutionTiersSection',
  'ProcessSection',
  'CaseStudiesSection',
  'FinalCtaSection',
  'ContactSection',
  'Footer'
];

const components = ['FloatingWhatsApp'];

function createComponent(name, dir) {
  const tsxContent = `import styles from './${name}.module.css';

export const ${name} = () => {
  return (
    <section className={styles.container} id="${name.toLowerCase()}">
      <div className={styles.content}>
        <h2>${name}</h2>
      </div>
    </section>
  );
};
`;

  const cssContent = `.container {
  padding: 4rem 2rem;
  width: 100%;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
}
`;

  fs.writeFileSync(path.join(dir, `${name}.tsx`), tsxContent);
  fs.writeFileSync(path.join(dir, `${name}.module.css`), cssContent);
}

sections.forEach(s => createComponent(s, 'src/sections'));
components.forEach(c => createComponent(c, 'src/components'));

// Specially for FloatingWhatsApp which is a div not section
const waTsx = `import styles from './FloatingWhatsApp.module.css';
import { contactChannels } from '@/content';

export const FloatingWhatsApp = () => {
  const whatsappNumber = contactChannels.find(c => c.type === 'whatsapp')?.phone_number || '';
  
  return (
    <a 
      href={\`https://wa.me/\${whatsappNumber.replace(/\\s/g, '')}\`}
      target="_blank" 
      rel="noopener noreferrer"
      className={styles.floatingButton}
      aria-label="Contactar por WhatsApp"
    >
      {/* PENDIENTE: Replace with actual icon */}
      <span className={styles.icon}>W</span>
    </a>
  );
};
`;

const waCss = `.floatingButton {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: var(--cta-whatsapp);
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  z-index: 1000;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.floatingButton:hover {
  transform: scale(1.1);
  background-color: var(--cta-whatsapp-hover);
}

.icon {
  font-size: 24px;
  font-weight: bold;
}
`;

fs.writeFileSync('src/components/FloatingWhatsApp.tsx', waTsx);
fs.writeFileSync('src/components/FloatingWhatsApp.module.css', waCss);

console.log('Components generated.');

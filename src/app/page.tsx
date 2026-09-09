import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/sections/HeroSection';
import { PainPointsSection } from '@/sections/PainPointsSection';
import { CustomerVoiceSection } from '@/sections/CustomerVoiceSection';
import { ValuePropositionSection } from '@/sections/ValuePropositionSection';
import { ServicesSection } from '@/sections/ServicesSection';
import { DeepDiveSection } from '@/sections/DeepDiveSection';
import { SolutionTiersSection } from '@/sections/SolutionTiersSection';
import { ProcessSection } from '@/sections/ProcessSection';
import { CaseStudiesSection } from '@/sections/CaseStudiesSection';
import { FinalCtaSection } from '@/sections/FinalCtaSection';
import { ContactSection } from '@/sections/ContactSection';
import { Footer } from '@/sections/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { FloatingPhone } from '@/components/FloatingPhone';
import { UtmTracker } from '@/components/UtmTracker';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main>
      <Suspense fallback={null}>
        <UtmTracker />
      </Suspense>
      <Navbar />
      <HeroSection />
      <PainPointsSection />
      <CustomerVoiceSection />
      <ValuePropositionSection />
      <ServicesSection />
      <DeepDiveSection />
      <SolutionTiersSection />
      <ProcessSection />
      <CaseStudiesSection />
      <FinalCtaSection />
      <ContactSection />
      <Footer />
      <FloatingPhone />
      <FloatingWhatsApp />
    </main>
  );
}

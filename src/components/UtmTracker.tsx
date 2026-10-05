'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { trackEvent, captureAndPersistUTMs } from '@/lib/analytics';

function UtmTrackerInternal() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams) return;

    const utms = captureAndPersistUTMs();

    // Disparar evento de página vista atribuida
    trackEvent('page_view_attributed', {
      source: utms.utm_source,
      medium: utms.utm_medium,
      campaign: utms.utm_campaign,
      gclid: utms.gclid,
    });

    // Tracking de scroll 75%
    let scrollTracked = false;
    const handleScroll = () => {
      if (scrollTracked) return;
      const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrollPercent >= 0.75) {
        scrollTracked = true;
        trackEvent('scroll_75');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchParams]);

  return null;
}

export const UtmTracker = () => {
  return (
    <Suspense fallback={null}>
      <UtmTrackerInternal />
    </Suspense>
  );
};

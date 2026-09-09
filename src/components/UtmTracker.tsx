'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export const UtmTracker = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams) return;

    // Solo guardar si hay utm_source en la URL, o si es la primera vez que entra y no hay UTMs
    const utmSource = searchParams.get('utm_source');
    const hasUtms = !!utmSource;

    if (hasUtms) {
      sessionStorage.setItem('utm_source', utmSource);
      sessionStorage.setItem('utm_medium', searchParams.get('utm_medium') || '');
      sessionStorage.setItem('utm_campaign', searchParams.get('utm_campaign') || '');
      sessionStorage.setItem('utm_content', searchParams.get('utm_content') || '');
      sessionStorage.setItem('utm_term', searchParams.get('utm_term') || '');
    } else {
      // Si no hay UTM en URL y no hay en session, marcar como organic/direct
      if (!sessionStorage.getItem('utm_source')) {
        sessionStorage.setItem('utm_source', 'direct_or_organic');
      }
    }
  }, [searchParams]);

  return null;
};

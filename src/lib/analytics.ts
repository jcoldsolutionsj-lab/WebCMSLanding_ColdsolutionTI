/**
 * Utilidades de Analítica, Google Tag Manager y Tracking de Campañas (UTMs y GCLID)
 * Cumple con la regla 07_ANALYTICS_TRACKING y 08_ADS_INTEGRATION.
 */

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

export interface UTMParams {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  gclid: string | null;
}

const STORAGE_KEY = 'coldsolutions_utm_tracking';

/**
 * Captura los parámetros UTM y gclid de la URL al momento del aterrizaje
 * y los almacena en sessionStorage de forma persistente.
 */
export function captureAndPersistUTMs(): UTMParams {
  if (typeof window === 'undefined') {
    return {
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_term: null,
      utm_content: null,
      gclid: null,
    };
  }

  const urlParams = new URLSearchParams(window.location.search);

  // Extraer parámetros
  const incomingParams: Partial<UTMParams> = {
    utm_source: urlParams.get('utm_source'),
    utm_medium: urlParams.get('utm_medium'),
    utm_campaign: urlParams.get('utm_campaign'),
    utm_term: urlParams.get('utm_term'),
    utm_content: urlParams.get('utm_content'),
    gclid: urlParams.get('gclid'),
  };

  const hasAnyParam = Object.values(incomingParams).some(val => val !== null && val !== '');

  if (hasAnyParam) {
    const toStore: UTMParams = {
      utm_source: incomingParams.utm_source || null,
      utm_medium: incomingParams.utm_medium || null,
      utm_campaign: incomingParams.utm_campaign || null,
      utm_term: incomingParams.utm_term || null,
      utm_content: incomingParams.utm_content || null,
      gclid: incomingParams.gclid || null,
    };
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
      return toStore;
    } catch (e) {
      console.warn('No se pudo guardar en sessionStorage:', e);
      return toStore;
    }
  }

  // Si no hay nuevos, recuperar los que ya teníamos en la sesión
  return getStoredUTMs();
}

/**
 * Recupera los parámetros UTM guardados previamente en sessionStorage.
 */
export function getStoredUTMs(): UTMParams {
  if (typeof window === 'undefined') {
    return {
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_term: null,
      utm_content: null,
      gclid: null,
    };
  }

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Error leyendo sessionStorage:', e);
  }

  // Atribución por defecto si es tráfico directo u orgánico
  return {
    utm_source: 'direct',
    utm_medium: 'organic',
    utm_campaign: null,
    utm_term: null,
    utm_content: null,
    gclid: null,
  };
}

/**
 * Dispara eventos estructurados hacia Google Tag Manager (dataLayer).
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      timestamp: new Date().toISOString(),
      ...params,
    });
  }
}

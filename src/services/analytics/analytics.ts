/**
 * OrigoHOST Privacy-First Telemetry & Analytics Abstraction
 * Designed for future plug-and-play integration with Google Analytics 4, Plausible, or PostHog.
 */

export type AnalyticsEventType =
  | 'page_view'
  | 'cta_click'
  | 'event_registration'
  | 'join_application'
  | 'contact_submission'
  | 'resource_open'
  | 'article_open'
  | 'search'
  | 'filter_use';

export interface AnalyticsPayload {
  category?: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
}

/**
 * Dispatches a client-side telemetry event without blocking UI or throwing errors.
 */
export function trackEvent(eventType: AnalyticsEventType, payload: AnalyticsPayload = {}) {
  if (typeof window === 'undefined') return;

  // In development, log cleanly to console in dev mode
  if (process.env.NODE_ENV === 'development') {
    // console.debug(`[Analytics] ${eventType}:`, payload);
  }

  try {
    // Check for standard dataLayer (Google Tag Manager / GA4)
    if (Array.isArray((window as unknown as { dataLayer?: unknown[] }).dataLayer)) {
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
        event: eventType,
        ...payload,
        timestamp: Date.now(),
      });
    }

    // Check for Plausible Analytics
    if (typeof (window as unknown as { plausible?: (event: string, options?: { props: unknown }) => void }).plausible === 'function') {
      (window as unknown as { plausible: (event: string, options?: { props: unknown }) => void }).plausible(eventType, {
        props: payload,
      });
    }
  } catch {
    // Fail silently to never disrupt user experience
  }
}

export function trackPageView(url: string) {
  trackEvent('page_view', { page_path: url });
}

export function trackCtaClick(label: string, destination: string) {
  trackEvent('cta_click', { label, destination });
}

export function trackSearch(query: string, resultCount: number) {
  trackEvent('search', { search_term: query, result_count: resultCount });
}

export function trackFilterUse(filterType: string, selectedValue: string) {
  trackEvent('filter_use', { filter_type: filterType, selected_value: selectedValue });
}

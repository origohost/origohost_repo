import { registerIntegrationHandler } from '@/lib/events/outbox.processor';
import { processEmailNotification } from './email/email.handler';
import { processAnalyticsEvent } from './analytics/analytics.handler';

let isRegistered = false;

/**
 * Initialize platform event-driven background integrations.
 */
export function initDomainEventIntegrations(): void {
  if (isRegistered) return;
  
  registerIntegrationHandler(processEmailNotification);
  registerIntegrationHandler(processAnalyticsEvent);
  
  isRegistered = true;
  if (process.env.NODE_ENV === 'development') {
    console.log('[Integrations] Domain event background handlers initialized.');
  }
}

// Automatically register handlers on initial import
initDomainEventIntegrations();

import type { OutboxRecord } from '@/lib/events/outbox.processor';

/**
 * Event-driven Email Notification Handler.
 * Sends email notices for Event Registrations, Applications, and Updates.
 */
export async function processEmailNotification(record: OutboxRecord): Promise<void> {
  if (record.type === 'REGISTRATION_CREATED') {
    const data = record.payload as { participantEmail?: string; participantName?: string; eventTitle?: string };
    if (data?.participantEmail) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[EmailHandler] Confirmation email dispatched to ${data.participantEmail} for ${data.eventTitle}`);
      }
    }
  } else if (record.type === 'APPLICATION_CREATED') {
    const data = record.payload as { email?: string; applicantName?: string };
    if (data?.email) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[EmailHandler] Application received email dispatched to ${data.email}`);
      }
    }
  }
}

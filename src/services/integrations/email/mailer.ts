/**
 * OrigoHOST Email Service Integration Adapter
 * Provides an abstract interface for sending system notifications, registration confirmations, and CRM communications.
 */

export interface EmailPayload {
  to: string;
  subject: string;
  bodyHtml: string;
  replyTo?: string;
}

export async function sendEmail(payload: EmailPayload): Promise<{ success: boolean; id?: string }> {
  // Integration boundary adapter for Resend / SendGrid / AWS SES
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Email Integration] Sending email to ${payload.to}: ${payload.subject}`);
  }
  return { success: true, id: `msg_${Date.now()}` };
}

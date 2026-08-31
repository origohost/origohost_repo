export type CommChannel = 'Email' | 'SMS' | 'WhatsApp' | 'Notification';
export type CommStatus = 'Sent' | 'Delivered' | 'Failed' | 'Draft' | 'Scheduled';

export interface CrmCommunicationItem {
  id: string;
  recipientId: string;
  recipientName: string;
  recipientEmail: string;
  channel: CommChannel;
  subject: string;
  snippet: string;
  status: CommStatus;
  sentAt: string;
  templateId?: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  category: string;
  subject: string;
  bodyPreview: string;
  variables: string[];
}

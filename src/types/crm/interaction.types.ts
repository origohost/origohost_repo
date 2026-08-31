export type InteractionType = 
  | 'Email Sent'
  | 'Email Received'
  | 'Call Logged'
  | 'Meeting Held'
  | 'Form Submitted'
  | 'Event Registered'
  | 'Attended Session'
  | 'Program Applied'
  | 'Note Added';

export interface CrmInteraction {
  id: string;
  contactId: string;
  contactName: string;
  type: InteractionType;
  title: string;
  description: string;
  recordedBy?: string;
  timestamp: string;
}

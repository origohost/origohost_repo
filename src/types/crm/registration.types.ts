export type RegistrationStatus = 'Registered' | 'Confirmed' | 'Waitlisted' | 'Cancelled' | 'Attended' | 'No-show';

export interface CrmRegistrationItem {
  id: string;
  eventId: string;
  eventTitle: string;
  contactId: string;
  participantName: string;
  participantEmail: string;
  organizationName?: string;
  registrationDate: string;
  status: RegistrationStatus;
  ticketCategory: string;
  checkedIn: boolean;
  checkedInAt?: string;
  notes?: string;
}

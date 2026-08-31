export type RegistrationStatus = 'Pending' | 'Confirmed' | 'Waitlisted' | 'Cancelled' | 'Attended';

export interface EventRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  fullName: string;
  email: string;
  institutionOrCompany?: string;
  role: 'Student' | 'Professional' | 'Educator' | 'Other';
  status: RegistrationStatus;
  ticketCode: string;
  registeredAt: string;
}

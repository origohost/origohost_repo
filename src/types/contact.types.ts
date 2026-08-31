export type ContactCategory =
  | 'Community / Campus Event'
  | 'Partnership'
  | 'Sponsorship'
  | 'Enterprise / Custom Program'
  | 'General Inquiry'
  | 'Press / Media';

export interface ContactInquiry {
  id?: string;
  category: ContactCategory;
  name: string;
  email: string;
  organization?: string;
  subject: string;
  message: string;
  consentGiven: boolean;
  submittedAt?: string;
}

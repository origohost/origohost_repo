export type FAQCategory = 'General' | 'Community' | 'Events' | 'Programs' | 'Participation' | 'Partnerships' | 'Sponsorship' | 'Contact' | 'Policies';

export interface FAQRelatedLink {
  label: string;
  url: string;
}

export interface FAQItem {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
  order: number;
  relatedLinks: FAQRelatedLink[];
}

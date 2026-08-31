export type PartnerCategory = 'Technology' | 'Academic' | 'Industry' | 'Knowledge' | 'Hiring' | 'Media' | 'Strategic' | 'Ecosystem';
export type PartnerStatus = 'Active' | 'Past';

export interface Partner {
  id: string;
  slug: string;
  name: string;
  category: PartnerCategory;
  relationshipRole: string[];
  description: string;
  logo: string;
  website?: string;
  status: PartnerStatus;
  featured: boolean;
}

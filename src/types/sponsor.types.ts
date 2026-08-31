export type SponsorStatus = 'Active' | 'Past';

export interface Sponsor {
  id: string;
  slug: string;
  name: string;
  tier?: string;
  description: string;
  logo: string;
  website?: string;
  status: SponsorStatus;
  featured: boolean;
}

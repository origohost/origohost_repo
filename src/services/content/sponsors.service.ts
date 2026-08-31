import { sponsors } from '@/data/sponsors/sponsors.data';
import type { Sponsor } from '@/types';

export async function getSponsors(tier?: string): Promise<Sponsor[]> {
  if (!tier || tier === 'All') {
    return sponsors;
  }
  return sponsors.filter((s) => s.tier && s.tier.toLowerCase() === tier.toLowerCase());
}

export async function getSponsorById(id: string): Promise<Sponsor | null> {
  const sponsor = sponsors.find((s) => s.id === id);
  return sponsor || null;
}

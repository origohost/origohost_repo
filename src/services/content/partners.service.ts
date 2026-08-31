import { partners } from '@/data/partners/partners.data';
import type { Partner, PartnerCategory } from '@/types';

export async function getPartners(category?: PartnerCategory | string): Promise<Partner[]> {
  if (!category || category === 'All') {
    return partners;
  }
  return partners.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export async function getPartnerById(id: string): Promise<Partner | null> {
  const partner = partners.find((p) => p.id === id);
  return partner || null;
}

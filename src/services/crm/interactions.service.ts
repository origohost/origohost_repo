import { mockInteractions } from '@/data/crm/interactions.data';
import type { CrmInteraction } from '@/types/crm';

export async function getCrmInteractions(contactId?: string): Promise<CrmInteraction[]> {
  if (contactId) {
    return mockInteractions.filter((act) => act.contactId === contactId);
  }
  return mockInteractions;
}

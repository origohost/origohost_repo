import type { Contact } from '@/types/crm';
import { getContacts, updateContact, deleteContact } from './contacts.service';
import type { ServiceResult } from './base.service';

export interface DuplicateMatchGroup {
  confidence: 'HIGH' | 'MEDIUM';
  matchReason: string;
  records: Contact[];
}

export async function findDuplicateContacts(): Promise<ServiceResult<DuplicateMatchGroup[]>> {
  const res = await getContacts();
  const contacts = res.data || [];
  const matchGroups: DuplicateMatchGroup[] = [];
  const processedIds = new Set<string>();

  for (let i = 0; i < contacts.length; i++) {
    const current = contacts[i];
    if (processedIds.has(current.id)) continue;

    const matches: Contact[] = [current];

    for (let j = i + 1; j < contacts.length; j++) {
      const target = contacts[j];
      if (processedIds.has(target.id)) continue;

      let isMatch = false;
      let reason = '';

      // High confidence match on email
      if (current.email && target.email && current.email.toLowerCase() === target.email.toLowerCase()) {
        isMatch = true;
        reason = `Matching email address (${current.email})`;
      }
      // Phone match
      else if (current.phone && target.phone && current.phone === target.phone) {
        isMatch = true;
        reason = `Matching phone number (${current.phone})`;
      }
      // Name + Org match
      else if (
        current.firstName.toLowerCase() === target.firstName.toLowerCase() &&
        current.lastName.toLowerCase() === target.lastName.toLowerCase() &&
        current.organizationId &&
        target.organizationId &&
        current.organizationId.toLowerCase() === target.organizationId.toLowerCase()
      ) {
        isMatch = true;
        reason = `Identical name & organization (${current.firstName} ${current.lastName} at ${current.organizationId})`;
      }

      if (isMatch) {
        matches.push(target);
        processedIds.add(target.id);
      }
    }

    if (matches.length > 1) {
      processedIds.add(current.id);
      matchGroups.push({
        confidence: matches.some((m) => m.email === current.email) ? 'HIGH' : 'MEDIUM',
        matchReason: `Duplicates detected based on email/phone/name matching`,
        records: matches,
      });
    }
  }

  return { success: true, data: matchGroups };
}

export async function mergeDuplicateContacts(
  primaryId: string,
  secondaryId: string,
  operatorId = 'usr-operator-01'
): Promise<ServiceResult<Contact>> {
  const contactsRes = await getContacts();
  const contacts = contactsRes.data || [];
  const primary = contacts.find((c) => c.id === primaryId);
  const secondary = contacts.find((c) => c.id === secondaryId);

  if (!primary || !secondary) {
    return { success: false, error: 'Primary or secondary contact record not found' };
  }

  // Merge tags, notes, and fields
  const mergedTags = Array.from(new Set([...(primary.tags || []), ...(secondary.tags || [])]));
  const mergedNotes = `${primary.notes || ''}\n--- Merged from Duplicate (${secondary.id}) ---\n${secondary.notes || ''}`.trim();

  const updatedRes = await updateContact(primaryId, {
    tags: mergedTags,
    notes: mergedNotes,
    phone: primary.phone || secondary.phone,
    jobTitle: primary.jobTitle || secondary.jobTitle,
    organizationId: primary.organizationId || secondary.organizationId,
  }, operatorId);

  if (updatedRes.success) {
    // Soft delete secondary duplicate record
    await deleteContact(secondaryId, operatorId);
  }

  return updatedRes;
}

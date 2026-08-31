import type { CrmRegistrationItem } from '@/types/crm';
import { RegistrationsRepository } from '@/repositories/crm/registrations.repository';
import { emitDomainEvent } from '@/lib/events/domainEvents';
import type { ServiceResult } from './base.service';
import { createContact, getContacts } from './contacts.service';

export async function getCrmRegistrations(
  query?: string,
  statusFilter?: string,
  eventId?: string
): Promise<ServiceResult<CrmRegistrationItem[]>> {
  const data = await RegistrationsRepository.findAll(query, { status: statusFilter, eventId });
  return { success: true, data };
}

export async function getCrmRegistrationById(id: string): Promise<ServiceResult<CrmRegistrationItem | null>> {
  const data = await RegistrationsRepository.findById(id);
  return { success: !!data, data, error: data ? undefined : 'Registration record not found' };
}

export async function createCrmRegistration(
  data: Partial<CrmRegistrationItem>,
  operatorId = 'usr-operator-01'
): Promise<ServiceResult<CrmRegistrationItem>> {
  // 1. Link / Create Contact Record to avoid duplicate contact identities
  if (data.participantEmail) {
    const existing = await getContacts(data.participantEmail);
    if (!existing.data || existing.data.length === 0) {
      const names = (data.participantName || 'Event Attendee').split(' ');
      const firstName = names[0] || 'Attendee';
      const lastName = names.slice(1).join(' ') || '';
      await createContact({
        firstName,
        lastName,
        email: data.participantEmail,
        role: 'Event Attendee',
        source: 'Event Registration',
        status: 'Active',
      });
    }
  }

  // 2. Persist registration record
  const newReg = await RegistrationsRepository.create(data);

  // 3. Emit Domain Event for audit trail & downstream notifications
  await emitDomainEvent('REGISTRATION_CREATED', newReg.id, 'Registration', {
    operatorId,
    data: newReg,
  });

  return { success: true, data: newReg };
}

export async function updateCrmRegistration(
  id: string,
  data: Partial<CrmRegistrationItem>,
  operatorId = 'usr-operator-01'
): Promise<ServiceResult<CrmRegistrationItem>> {
  const updated = await RegistrationsRepository.update(id, data);
  await emitDomainEvent('REGISTRATION_UPDATED', id, 'Registration', {
    operatorId,
    data: updated,
  });
  return { success: true, data: updated };
}

export async function deleteCrmRegistration(
  id: string,
  operatorId = 'usr-operator-01'
): Promise<ServiceResult<boolean>> {
  const success = await RegistrationsRepository.softDelete(id);
  if (success) {
    await emitDomainEvent('REGISTRATION_UPDATED', id, 'Registration', { operatorId });
  }
  return { success, data: success };
}

export async function toggleRegistrationCheckIn(
  id: string,
  operatorId = 'usr-operator-01'
): Promise<ServiceResult<CrmRegistrationItem>> {
  const updated = await RegistrationsRepository.toggleCheckIn(id);
  await emitDomainEvent('REGISTRATION_UPDATED', id, 'RegistrationCheckIn', { operatorId, data: updated });
  return { success: true, data: updated };
}

export const registrationsService = {
  getCrmRegistrations,
  getCrmRegistrationById,
  createCrmRegistration,
  updateCrmRegistration,
  deleteCrmRegistration,
  toggleRegistrationCheckIn,
};

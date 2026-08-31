import type { CrmRegistrationItem } from '@/types/crm';
import { RegistrationsRepository } from '@/repositories/crm/registrations.repository';
import { logAuditEvent } from './audit.service';
import type { ServiceResult } from './base.service';

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
  const newReg = await RegistrationsRepository.create(data);
  await logAuditEvent(operatorId, 'System Operator', 'CREATE', 'Registration', newReg.id);
  return { success: true, data: newReg };
}

export async function updateCrmRegistration(
  id: string,
  data: Partial<CrmRegistrationItem>,
  operatorId = 'usr-operator-01'
): Promise<ServiceResult<CrmRegistrationItem>> {
  const updated = await RegistrationsRepository.update(id, data);
  await logAuditEvent(operatorId, 'System Operator', 'UPDATE', 'Registration', id);
  return { success: true, data: updated };
}

export async function deleteCrmRegistration(
  id: string,
  operatorId = 'usr-operator-01'
): Promise<ServiceResult<boolean>> {
  const success = await RegistrationsRepository.softDelete(id);
  if (success) {
    await logAuditEvent(operatorId, 'System Operator', 'DELETE', 'Registration', id);
  }
  return { success, data: success };
}

export async function toggleRegistrationCheckIn(
  id: string,
  operatorId = 'usr-operator-01'
): Promise<ServiceResult<CrmRegistrationItem>> {
  const updated = await RegistrationsRepository.toggleCheckIn(id);
  await logAuditEvent(operatorId, 'System Operator', 'UPDATE', 'RegistrationCheckIn', id);
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

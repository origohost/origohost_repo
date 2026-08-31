import type { CrmContact } from '@/types/crm';
import { ContactsRepository } from '@/repositories/crm/contacts.repository';
import { logAuditEvent } from './audit.service';
import type { ServiceResult } from './base.service';

/**
 * Standardized Contact Domain Service.
 * Implements Create, Read (List & Detail), Update, Soft Delete, Archive, Restore, and Audit Logging.
 */

export async function getContacts(query?: string, roleFilter?: string, statusFilter?: string): Promise<ServiceResult<CrmContact[]>> {
  const filter: Record<string, unknown> = {};
  if (roleFilter && roleFilter !== 'All') filter.role = roleFilter;
  if (statusFilter && statusFilter !== 'All') filter.status = statusFilter;

  const contacts = await ContactsRepository.findAll(query, filter);
  return {
    success: true,
    data: contacts,
  };
}

export async function getContactById(id: string): Promise<ServiceResult<CrmContact | null>> {
  const contact = await ContactsRepository.findById(id);
  return {
    success: !!contact,
    data: contact,
    error: contact ? undefined : 'Contact not found',
  };
}

export async function createContact(data: Partial<CrmContact>, operatorId = 'usr-operator-01'): Promise<ServiceResult<CrmContact>> {
  const newContact = await ContactsRepository.create(data);
  await logAuditEvent(operatorId, 'System Operator', 'CREATE', 'Contact', newContact.id);

  return {
    success: true,
    data: newContact,
  };
}

export async function updateContact(id: string, data: Partial<CrmContact>, operatorId = 'usr-operator-01'): Promise<ServiceResult<CrmContact>> {
  const existing = await ContactsRepository.findById(id);
  if (!existing) {
    return { success: false, error: 'Contact not found' };
  }

  const updated = await ContactsRepository.update(id, data);
  await logAuditEvent(operatorId, 'System Operator', 'UPDATE', 'Contact', id, {
    status: { old: existing.status, new: updated.status },
  });

  return {
    success: true,
    data: updated,
  };
}

export async function deleteContact(id: string, operatorId = 'usr-operator-01'): Promise<ServiceResult<boolean>> {
  const success = await ContactsRepository.softDelete(id);
  if (success) {
    await logAuditEvent(operatorId, 'System Operator', 'DELETE', 'Contact', id);
  }
  return { success, data: success };
}

export async function archiveContact(id: string, operatorId = 'usr-operator-01'): Promise<ServiceResult<boolean>> {
  const success = await ContactsRepository.archive(id);
  if (success) {
    await logAuditEvent(operatorId, 'System Operator', 'ARCHIVE', 'Contact', id);
  }
  return { success, data: success };
}

export async function restoreContact(id: string, operatorId = 'usr-operator-01'): Promise<ServiceResult<boolean>> {
  const success = await ContactsRepository.restore(id);
  if (success) {
    await logAuditEvent(operatorId, 'System Operator', 'RESTORE', 'Contact', id);
  }
  return { success, data: success };
}

export const contactService = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  archiveContact,
  restoreContact,
};

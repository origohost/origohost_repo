import type { CrmCommunicationItem, EmailTemplate } from '@/types/crm';
import { CommunicationsRepository } from '@/repositories/crm/communications.repository';
import { logAuditEvent } from './audit.service';
import type { ServiceResult } from './base.service';

export async function getCrmCommunications(
  query?: string,
  statusFilter?: string,
  channelFilter?: string
): Promise<ServiceResult<CrmCommunicationItem[]>> {
  const data = await CommunicationsRepository.findAll(query, { status: statusFilter, channel: channelFilter });
  return { success: true, data };
}

export async function getEmailTemplates(): Promise<ServiceResult<EmailTemplate[]>> {
  const data = await CommunicationsRepository.findTemplates();
  return { success: true, data };
}

export async function sendCrmCommunication(
  data: Partial<CrmCommunicationItem>,
  operatorId = 'usr-operator-01'
): Promise<ServiceResult<CrmCommunicationItem>> {
  const newComm = await CommunicationsRepository.create(data);
  await logAuditEvent(operatorId, 'System Operator', 'CREATE', 'Communication', newComm.id);
  return { success: true, data: newComm };
}

export async function deleteCrmCommunication(
  id: string,
  operatorId = 'usr-operator-01'
): Promise<ServiceResult<boolean>> {
  const success = await CommunicationsRepository.softDelete(id);
  if (success) {
    await logAuditEvent(operatorId, 'System Operator', 'DELETE', 'Communication', id);
  }
  return { success, data: success };
}

export const communicationsService = {
  getCrmCommunications,
  getEmailTemplates,
  sendCrmCommunication,
  deleteCrmCommunication,
};

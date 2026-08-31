import type { Lead } from '@/types/crm';
import { LeadsRepository } from '@/repositories/crm/leads.repository';
import { logAuditEvent } from './audit.service';
import type { ServiceResult } from './base.service';

export async function getLeads(query?: string, statusFilter?: string): Promise<ServiceResult<Lead[]>> {
  const leads = await LeadsRepository.findAll(query, { status: statusFilter });
  return { success: true, data: leads };
}

export async function getLeadById(id: string): Promise<ServiceResult<Lead | null>> {
  const lead = await LeadsRepository.findById(id);
  return { success: !!lead, data: lead, error: lead ? undefined : 'Lead not found' };
}

export async function createLead(data: Partial<Lead>, operatorId = 'usr-operator-01'): Promise<ServiceResult<Lead>> {
  const newLead = await LeadsRepository.create(data);
  await logAuditEvent(operatorId, 'System Operator', 'CREATE', 'Lead', newLead.id);
  return { success: true, data: newLead };
}

export async function updateLead(id: string, data: Partial<Lead>, operatorId = 'usr-operator-01'): Promise<ServiceResult<Lead>> {
  const updated = await LeadsRepository.update(id, data);
  await logAuditEvent(operatorId, 'System Operator', 'UPDATE', 'Lead', id);
  return { success: true, data: updated };
}

export async function deleteLead(id: string, operatorId = 'usr-operator-01'): Promise<ServiceResult<boolean>> {
  const success = await LeadsRepository.softDelete(id);
  if (success) {
    await logAuditEvent(operatorId, 'System Operator', 'DELETE', 'Lead', id);
  }
  return { success, data: success };
}

// Named alias for leadService export
export const leadService = {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
};

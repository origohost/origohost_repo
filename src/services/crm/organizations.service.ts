import type { CrmOrganization } from '@/types/crm';
import { OrganizationsRepository } from '@/repositories/crm/organizations.repository';
import { logAuditEvent } from './audit.service';
import type { ServiceResult } from './base.service';

export async function getOrganizations(query?: string): Promise<ServiceResult<CrmOrganization[]>> {
  const orgs = await OrganizationsRepository.findAll(query);
  return { success: true, data: orgs };
}

export async function getOrganizationById(id: string): Promise<ServiceResult<CrmOrganization | null>> {
  const org = await OrganizationsRepository.findById(id);
  return { success: !!org, data: org, error: org ? undefined : 'Organization not found' };
}

export async function createOrganization(data: Partial<CrmOrganization>, operatorId = 'usr-operator-01'): Promise<ServiceResult<CrmOrganization>> {
  const newOrg = await OrganizationsRepository.create(data);
  await logAuditEvent(operatorId, 'System Operator', 'CREATE', 'Organization', newOrg.id);
  return { success: true, data: newOrg };
}

export async function updateOrganization(id: string, data: Partial<CrmOrganization>, operatorId = 'usr-operator-01'): Promise<ServiceResult<CrmOrganization>> {
  const updated = await OrganizationsRepository.update(id, data);
  await logAuditEvent(operatorId, 'System Operator', 'UPDATE', 'Organization', id);
  return { success: true, data: updated };
}

export async function deleteOrganization(id: string, operatorId = 'usr-operator-01'): Promise<ServiceResult<boolean>> {
  const success = await OrganizationsRepository.softDelete(id);
  if (success) {
    await logAuditEvent(operatorId, 'System Operator', 'DELETE', 'Organization', id);
  }
  return { success, data: success };
}

export const organizationService = {
  getOrganizations,
  getOrganizationById,
  createOrganization,
  updateOrganization,
  deleteOrganization,
};

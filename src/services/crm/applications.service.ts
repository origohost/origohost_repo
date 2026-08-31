import type { CrmApplication } from '@/types/crm';
import { ApplicationsRepository } from '@/repositories/crm/applications.repository';
import type { ServiceResult } from './base.service';
import { emitDomainEvent } from '@/lib/events/domainEvents';

export async function getApplications(
  query?: string,
  statusFilter?: string,
  pathwayFilter?: string
): Promise<ServiceResult<CrmApplication[]>> {
  const data = await ApplicationsRepository.findAll(query, {
    status: statusFilter,
    pathway: pathwayFilter,
  });
  return { success: true, data };
}

export async function getApplicationById(id: string): Promise<ServiceResult<CrmApplication | null>> {
  const data = await ApplicationsRepository.findById(id);
  return { success: !!data, data, error: data ? undefined : 'Application not found' };
}

export async function createApplication(
  data: Partial<CrmApplication>,
  operatorId = 'usr-operator-01'
): Promise<ServiceResult<CrmApplication>> {
  const newApp = await ApplicationsRepository.create(data);
  await emitDomainEvent('APPLICATION_CREATED', newApp.id, 'Application', {
    operatorId,
    data: newApp,
  });
  return { success: true, data: newApp };
}

export async function updateApplicationStatus(
  id: string,
  status: CrmApplication['status'],
  reviewer = 'usr-operator-01',
  notes?: string
): Promise<ServiceResult<CrmApplication>> {
  const updated = await ApplicationsRepository.update(id, {
    status,
    reviewedBy: reviewer,
    notes: notes ? `${notes}` : undefined,
  });

  await emitDomainEvent('APPLICATION_UPDATED', id, 'Application', {
    operatorId: reviewer,
    data: updated,
  });

  return { success: true, data: updated };
}


export async function deleteApplication(
  id: string,
  operatorId = 'usr-operator-01'
): Promise<ServiceResult<boolean>> {
  const success = await ApplicationsRepository.delete(id);
  if (success) {
    await emitDomainEvent('APPLICATION_UPDATED', id, 'Application', { operatorId });
  }
  return { success, data: success };
}


export const applicationsService = {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplicationStatus,
  deleteApplication,
};

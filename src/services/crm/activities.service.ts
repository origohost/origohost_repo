import type { Activity } from '@/types/crm';
import { ActivitiesRepository } from '@/repositories/crm/activities.repository';
import { logAuditEvent } from './audit.service';
import type { ServiceResult } from './base.service';

export async function getActivities(query?: string, typeFilter?: string): Promise<ServiceResult<Activity[]>> {
  const activities = await ActivitiesRepository.findAll(query, { type: typeFilter });
  return { success: true, data: activities };
}

export async function getActivityById(id: string): Promise<ServiceResult<Activity | null>> {
  const act = await ActivitiesRepository.findById(id);
  return { success: !!act, data: act, error: act ? undefined : 'Activity not found' };
}

export async function createActivity(data: Partial<Activity>, operatorId = 'usr-operator-01'): Promise<ServiceResult<Activity>> {
  const newAct = await ActivitiesRepository.create(data);
  await logAuditEvent(operatorId, 'System Operator', 'CREATE', 'Activity', newAct.id);
  return { success: true, data: newAct };
}

export async function updateActivity(id: string, data: Partial<Activity>, operatorId = 'usr-operator-01'): Promise<ServiceResult<Activity>> {
  const updated = await ActivitiesRepository.update(id, data);
  await logAuditEvent(operatorId, 'System Operator', 'UPDATE', 'Activity', id);
  return { success: true, data: updated };
}

export async function deleteActivity(id: string, operatorId = 'usr-operator-01'): Promise<ServiceResult<boolean>> {
  const success = await ActivitiesRepository.softDelete(id);
  if (success) {
    await logAuditEvent(operatorId, 'System Operator', 'DELETE', 'Activity', id);
  }
  return { success, data: success };
}

// Named alias for activityService export
export const activityService = {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
};

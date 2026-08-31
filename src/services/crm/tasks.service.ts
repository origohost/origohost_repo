import type { CrmTaskItem } from '@/types/crm';
import { TasksRepository } from '@/repositories/crm/tasks.repository';
import { logAuditEvent } from './audit.service';
import type { ServiceResult } from './base.service';

export async function getCrmTasks(
  query?: string,
  statusFilter?: string,
  priorityFilter?: string
): Promise<ServiceResult<CrmTaskItem[]>> {
  const data = await TasksRepository.findAll(query, { status: statusFilter, priority: priorityFilter });
  return { success: true, data };
}

export async function getCrmTaskById(id: string): Promise<ServiceResult<CrmTaskItem | null>> {
  const data = await TasksRepository.findById(id);
  return { success: !!data, data, error: data ? undefined : 'Task not found' };
}

export async function createCrmTask(
  data: Partial<CrmTaskItem>,
  operatorId = 'usr-operator-01'
): Promise<ServiceResult<CrmTaskItem>> {
  const newTask = await TasksRepository.create(data);
  await logAuditEvent(operatorId, 'System Operator', 'CREATE', 'Task', newTask.id);
  return { success: true, data: newTask };
}

export async function updateCrmTask(
  id: string,
  data: Partial<CrmTaskItem>,
  operatorId = 'usr-operator-01'
): Promise<ServiceResult<CrmTaskItem>> {
  const updated = await TasksRepository.update(id, data);
  await logAuditEvent(operatorId, 'System Operator', 'UPDATE', 'Task', id);
  return { success: true, data: updated };
}

export async function toggleCrmTaskStatus(
  id: string,
  operatorId = 'usr-operator-01'
): Promise<ServiceResult<CrmTaskItem>> {
  const updated = await TasksRepository.toggleComplete(id);
  await logAuditEvent(operatorId, 'System Operator', 'UPDATE', 'TaskStatus', id);
  return { success: true, data: updated };
}

export async function deleteCrmTask(
  id: string,
  operatorId = 'usr-operator-01'
): Promise<ServiceResult<boolean>> {
  const success = await TasksRepository.softDelete(id);
  if (success) {
    await logAuditEvent(operatorId, 'System Operator', 'DELETE', 'Task', id);
  }
  return { success, data: success };
}

export const tasksService = {
  getCrmTasks,
  getCrmTaskById,
  createCrmTask,
  updateCrmTask,
  toggleCrmTaskStatus,
  deleteCrmTask,
};

export { getCrmTasks as getTasks };


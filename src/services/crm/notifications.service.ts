import { getCrmTasks } from './tasks.service';
import { getApplications } from './applications.service';
import type { ServiceResult } from './base.service';

export interface CrmNotificationAlert {
  id: string;
  title: string;
  message: string;
  type: 'TASK_DUE' | 'APPLICATION_PENDING' | 'AUTOMATION_ALERT' | 'SYSTEM';
  severity: 'high' | 'medium' | 'info';
  timestamp: string;
  href: string;
}

export async function getCrmNotifications(): Promise<ServiceResult<CrmNotificationAlert[]>> {
  const [tasksRes, appsRes] = await Promise.all([
    getCrmTasks(),
    getApplications(),
  ]);

  const tasks = tasksRes.data || [];
  const apps = appsRes.data || [];
  const alerts: CrmNotificationAlert[] = [];

  // 1. Task overdue/due alerts
  tasks.filter((t) => t.status !== 'Completed').forEach((t) => {
    alerts.push({
      id: `notif-t-${t.id}`,
      title: `Task Due: ${t.title}`,
      message: `Assigned to ${t.assignedToName || t.assignee}. Priority: ${t.priority}`,
      type: 'TASK_DUE',
      severity: t.priority === 'Urgent' || t.priority === 'High' ? 'high' : 'medium',
      timestamp: t.dueDate || 'Today',
      href: `/crm/tasks`,
    });
  });

  // 2. Pending applications alerts
  apps.filter((a) => a.status === 'PENDING' || a.status === 'REVIEW').forEach((a) => {
    alerts.push({
      id: `notif-a-${a.id}`,
      title: `Application Review: ${a.applicantName}`,
      message: `Pathway: ${a.pathway.replace('_', ' ')} • Org: ${a.organizationName || 'Independent'}`,
      type: 'APPLICATION_PENDING',
      severity: 'medium',
      timestamp: new Date(a.submittedAt).toLocaleDateString(),
      href: `/crm/applications/${a.id}`,
    });
  });

  return { success: true, data: alerts };
}

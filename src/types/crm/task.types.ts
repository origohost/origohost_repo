export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type TaskStatus = 'Pending' | 'To Do' | 'In Progress' | 'Completed' | 'Cancelled';

export interface CrmTaskItem {
  id: string;
  title: string;
  description?: string;
  assignee: string;
  assignedToName?: string;
  assignedToId?: string;
  contactId?: string;
  contactName?: string;
  organizationId?: string;
  organizationName?: string;
  dueDate: string;
  dueAt?: string;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: string;
  updatedAt?: string;
}

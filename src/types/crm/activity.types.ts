export type ActivityType = 'Call' | 'Email' | 'Meeting' | 'Note' | 'Task';
export type ActivityStatus = 'Pending' | 'Completed' | 'Cancelled';

export interface Activity {
  id: string;
  contactId?: string;
  organizationId?: string;
  type: ActivityType;
  subject: string;
  description?: string;
  status: ActivityStatus;
  dueAt?: string;
  completedAt?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

// Backward compatibility alias
export type CrmActivity = Activity;

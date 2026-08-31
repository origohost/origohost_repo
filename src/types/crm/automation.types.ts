export type AutomationTrigger =
  | 'NEW_APPLICATION'
  | 'NEW_REGISTRATION'
  | 'NEW_CONTACT'
  | 'EVENT_ATTENDED'
  | 'LEAD_STATUS_CHANGED';

export type AutomationAction =
  | 'CREATE_TASK'
  | 'UPDATE_CONTACT_STATUS'
  | 'SEND_NOTIFICATION_EMAIL'
  | 'ASSIGN_OWNER'
  | 'ADD_TAG';

export interface CrmAutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: AutomationTrigger;
  action: AutomationAction;
  actionPayload?: Record<string, unknown>;
  isActive: boolean;
  lastExecutedAt?: string;
  executionCount: number;
}

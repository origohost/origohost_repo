export type AuditAction = 
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'ARCHIVE'
  | 'RESTORE'
  | 'EXPORT'
  | 'LOGIN';

export interface AuditLogEntry {
  id: string;
  operatorId: string;
  operatorName: string;
  action: AuditAction;
  entityType: string;
  entityId: string;
  changes?: Record<string, { old: unknown; new: unknown }>;
  timestamp: string;
}

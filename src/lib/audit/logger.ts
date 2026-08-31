import { logger } from '../logger';

export type EditorialAction =
  | 'CREATE'
  | 'UPDATE'
  | 'SUBMIT_REVIEW'
  | 'APPROVE'
  | 'PUBLISH'
  | 'UNPUBLISH'
  | 'ARCHIVE'
  | 'RESTORE';

export interface EditorialAuditEntry {
  action: EditorialAction;
  collection: string;
  documentId: string;
  userId?: string;
  timestamp?: string;
  metadata?: Record<string, unknown>;
}

export function logEditorialAction(entry: EditorialAuditEntry) {
  logger.info(`[Editorial Audit] ${entry.action} on ${entry.collection}:${entry.documentId}`, {
    action: entry.action,
    collection: entry.collection,
    documentId: entry.documentId,
    userId: entry.userId || 'system',
    timestamp: entry.timestamp || new Date().toISOString(),
    ...(entry.metadata ? { metadata: entry.metadata } : {}),
  });
}

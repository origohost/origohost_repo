import { AuditRepository } from '@/repositories/crm/audit.repository';
import type { AuditAction, AuditLogEntry } from '@/types/crm/audit.types';

export async function logAuditEvent(
  operatorId: string,
  operatorName: string,
  action: AuditAction,
  entityType: string,
  entityId: string,
  changes?: Record<string, { old: unknown; new: unknown }>
): Promise<AuditLogEntry> {
  return AuditRepository.log({
    operatorId,
    operatorName,
    action,
    entityType,
    entityId,
    changes,
  });
}

export async function getAuditLogs(entityType?: string, entityId?: string): Promise<AuditLogEntry[]> {
  return AuditRepository.findAll(entityType, entityId);
}

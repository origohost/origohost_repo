import type { AuditLogEntry } from '@/types/crm/audit.types';

class AuditRepositoryImpl {
  private logsStore: AuditLogEntry[] = [];

  async log(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): Promise<AuditLogEntry> {
    const newEntry: AuditLogEntry = {
      ...entry,
      id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
    };
    this.logsStore.unshift(newEntry);
    return newEntry;
  }

  async findAll(entityType?: string, entityId?: string): Promise<AuditLogEntry[]> {
    let result = [...this.logsStore];
    if (entityType) {
      result = result.filter((l) => l.entityType === entityType);
    }
    if (entityId) {
      result = result.filter((l) => l.entityId === entityId);
    }
    return result;
  }
}

export const AuditRepository = new AuditRepositoryImpl();

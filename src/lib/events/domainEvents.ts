import {
  revalidateEventCache,
  revalidateProgramCache,
  revalidateResourceCache,
  revalidateCommunityCache,
} from '@/lib/cache/revalidate';
import { logAuditEvent } from '@/services/crm/audit.service';

export type DomainEventType =
  | 'EVENT_CREATED'
  | 'EVENT_UPDATED'
  | 'EVENT_DELETED'
  | 'PROGRAM_PUBLISHED'
  | 'PROGRAM_UPDATED'
  | 'RESOURCE_PUBLISHED'
  | 'RESOURCE_UPDATED'
  | 'REGISTRATION_CREATED'
  | 'REGISTRATION_UPDATED'
  | 'APPLICATION_CREATED'
  | 'APPLICATION_UPDATED'
  | 'CONTACT_CREATED'
  | 'CONTACT_UPDATED';

export interface DomainEventPayload<T = unknown> {
  type: DomainEventType;
  entityId: string;
  entityType: string;
  operatorId?: string;
  slug?: string;
  data?: T;
  timestamp: string;
}

type DomainEventHandler<T = unknown> = (payload: DomainEventPayload<T>) => Promise<void> | void;

const eventListeners: Partial<Record<DomainEventType, DomainEventHandler[]>> = {};

/**
 * Registers an asynchronous listener for domain events.
 */
export function registerDomainEventListener<T = unknown>(
  type: DomainEventType,
  handler: DomainEventHandler<T>
): void {
  if (!eventListeners[type]) {
    eventListeners[type] = [];
  }
  eventListeners[type]!.push(handler as DomainEventHandler);
}

/**
 * Emits a domain event across the platform, triggering cache revalidation,
 * security audit logging, and downstream integrations asynchronously.
 */
export async function emitDomainEvent<T = unknown>(
  type: DomainEventType,
  entityId: string,
  entityType: string,
  options: { operatorId?: string; slug?: string; data?: T } = {}
): Promise<void> {
  const payload: DomainEventPayload<T> = {
    type,
    entityId,
    entityType,
    operatorId: options.operatorId || 'usr-operator-01',
    slug: options.slug,
    data: options.data,
    timestamp: new Date().toISOString(),
  };

  if (process.env.NODE_ENV === 'development') {
    console.log(`[DomainEvent] Emitted ${type} for ${entityType}:${entityId}`);
  }

  // 1. Core Platform Handlers: Automatic Cache Tag Revalidation
  try {
    if (type.startsWith('EVENT_')) {
      await revalidateEventCache(options.slug);
    } else if (type.startsWith('PROGRAM_')) {
      await revalidateProgramCache(options.slug);
    } else if (type.startsWith('RESOURCE_')) {
      await revalidateResourceCache(options.slug);
    } else if (type.startsWith('REGISTRATION_') || type.startsWith('APPLICATION_') || type.startsWith('CONTACT_')) {
      await revalidateCommunityCache();
    }
  } catch (err) {
    console.error('[DomainEvent] Cache revalidation exception:', err);
  }

  // 2. Core Security Audit Trail Logger
  try {
    const actionMap: Record<string, 'CREATE' | 'UPDATE' | 'DELETE'> = {
      CREATED: 'CREATE',
      PUBLISHED: 'CREATE',
      UPDATED: 'UPDATE',
      DELETED: 'DELETE',
    };
    const actionKey = type.split('_')[1] || 'UPDATE';
    const auditAction = actionMap[actionKey] || 'UPDATE';
    await logAuditEvent(payload.operatorId!, 'System Operator', auditAction, entityType, entityId);
  } catch (err) {
    console.error('[DomainEvent] Audit logging exception:', err);
  }

  // 3. Custom Registered Listeners
  const handlers = eventListeners[type] || [];
  for (const handler of handlers) {
    try {
      await handler(payload);
    } catch (err) {
      console.error(`[DomainEvent] Listener exception for ${type}:`, err);
    }
  }
}

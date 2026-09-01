import {
  revalidateEventCache,
  revalidateProgramCache,
  revalidateResourceCache,
  revalidateCommunityCache,
} from '@/lib/cache/revalidate';
import { logAuditEvent } from '@/services/crm/audit.service';
import { enqueueOutboxEvent } from './outbox.processor';
import '@/integrations';

export type DomainEventType =
  | 'EVENT_CREATED'
  | 'EVENT_UPDATED'
  | 'EVENT_DELETED'
  | 'EVENT_PUBLISHED'
  | 'EVENT_UNPUBLISHED'
  | 'EVENT_CANCELLED'
  | 'PROGRAM_PUBLISHED'
  | 'PROGRAM_UPDATED'
  | 'RESOURCE_PUBLISHED'
  | 'RESOURCE_UPDATED'
  | 'REGISTRATION_CREATED'
  | 'REGISTRATION_UPDATED'
  | 'REGISTRATION_CANCELLED'
  | 'APPLICATION_CREATED'
  | 'APPLICATION_UPDATED'
  | 'CONTACT_CREATED'
  | 'CONTACT_UPDATED'
  | 'LEAD_CREATED'
  | 'LEAD_UPDATED';

export interface DomainEventPayload<T = unknown> {
  type: DomainEventType;
  entityId: string;
  entityType: string;
  operatorId?: string;
  slug?: string;
  data?: T;
  timestamp: string;
  correlationId?: string;
  idempotencyKey?: string;
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
 * security audit logging, and outbox background processing asynchronously.
 */
export async function emitDomainEvent<T = unknown>(
  type: DomainEventType,
  entityId: string,
  entityType: string,
  options: { operatorId?: string; slug?: string; data?: T; correlationId?: string } = {}
): Promise<void> {
  const correlationId = options.correlationId || `corr-${Date.now()}`;
  const payload: DomainEventPayload<T> = {
    type,
    entityId,
    entityType,
    operatorId: options.operatorId || 'usr-operator-01',
    slug: options.slug,
    data: options.data,
    timestamp: new Date().toISOString(),
    correlationId,
  };

  if (process.env.NODE_ENV === 'development') {
    console.log(`[DomainEvent] Emitted ${type} for ${entityType}:${entityId} Correlation:${correlationId}`);
  }

  // 1. Transactional Outbox Enqueueing
  try {
    await enqueueOutboxEvent(type, entityId, entityType, options.data, {
      correlationId,
      idempotencyKey: `${type}:${entityId}:${options.slug || 'base'}`,
    });
  } catch (err) {
    console.error('[DomainEvent] Outbox enqueue exception:', err);
  }

  // 2. Immediate Cache Tag Revalidation (Non-blocking)
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

  // 3. Security Audit Logger (Non-blocking)
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

  // 4. Custom Registered Listeners
  const handlers = eventListeners[type] || [];
  for (const handler of handlers) {
    try {
      await handler(payload);
    } catch (err) {
      console.error(`[DomainEvent] Listener exception for ${type}:`, err);
    }
  }
}

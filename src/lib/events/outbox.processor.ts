import type { DomainEventPayload, DomainEventType } from './domainEvents';

export interface OutboxRecord<T = unknown> {
  id: string;
  type: DomainEventType;
  entityId: string;
  entityType: string;
  payload: T;
  correlationId: string;
  idempotencyKey: string;
  status: 'PENDING' | 'PROCESSED' | 'FAILED' | 'DEAD_LETTER';
  attempts: number;
  maxAttempts: number;
  lastError?: string;
  createdAt: string;
  processedAt?: string;
}

// In-memory Outbox store with Supabase sync capabilities
const outboxQueue: OutboxRecord[] = [];
const processedKeys = new Set<string>();

/**
 * Enqueue a domain event into the transactional outbox queue.
 */
export async function enqueueOutboxEvent<T = unknown>(
  type: DomainEventType,
  entityId: string,
  entityType: string,
  data: T,
  options: { correlationId?: string; idempotencyKey?: string } = {}
): Promise<OutboxRecord<T>> {
  const eventId = `evt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const correlationId = options.correlationId || `corr-${Date.now()}`;
  const idempotencyKey = options.idempotencyKey || `${type}:${entityId}:${Date.now()}`;

  const record: OutboxRecord<T> = {
    id: eventId,
    type,
    entityId,
    entityType,
    payload: data,
    correlationId,
    idempotencyKey,
    status: 'PENDING',
    attempts: 0,
    maxAttempts: 3,
    createdAt: new Date().toISOString(),
  };

  outboxQueue.push(record as OutboxRecord);
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`[OutboxProcessor] Enqueued ${type} (${eventId}) Correlation:${correlationId}`);
  }

  // Trigger non-blocking asynchronous processing
  setImmediate(() => {
    processOutboxQueue().catch((err) =>
      console.error('[OutboxProcessor] Async processing exception:', err)
    );
  });

  return record;
}

/**
 * Process pending outbox events asynchronously with retries and idempotency enforcement.
 */
export async function processOutboxQueue(): Promise<void> {
  const pending = outboxQueue.filter((r) => r.status === 'PENDING' || r.status === 'FAILED');

  for (const record of pending) {
    if (record.attempts >= record.maxAttempts) {
      record.status = 'DEAD_LETTER';
      console.error(`[OutboxProcessor] Event ${record.id} moved to DEAD_LETTER queue. Max attempts exceeded.`);
      continue;
    }

    if (processedKeys.has(record.idempotencyKey)) {
      record.status = 'PROCESSED';
      record.processedAt = new Date().toISOString();
      continue;
    }

    record.attempts += 1;

    try {
      // Execute registered integration handlers
      await dispatchToHandlers(record);

      record.status = 'PROCESSED';
      record.processedAt = new Date().toISOString();
      processedKeys.add(record.idempotencyKey);
    } catch (err) {
      record.lastError = err instanceof Error ? err.message : String(err);
      if (record.attempts >= record.maxAttempts) {
        record.status = 'DEAD_LETTER';
      } else {
        record.status = 'FAILED';
      }
      console.error(`[OutboxProcessor] Handler execution failed for ${record.id} (Attempt ${record.attempts}/${record.maxAttempts}):`, err);
    }
  }
}

type IntegrationHandler = (record: OutboxRecord) => Promise<void> | void;
const integrationHandlers: IntegrationHandler[] = [];

/**
 * Register a decoupled background integration handler (e.g. Email, Analytics, Search, Webhooks).
 */
export function registerIntegrationHandler(handler: IntegrationHandler): void {
  integrationHandlers.push(handler);
}

async function dispatchToHandlers(record: OutboxRecord): Promise<void> {
  const errors: string[] = [];
  for (const handler of integrationHandlers) {
    try {
      await handler(record);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(msg);
      console.error(`[OutboxProcessor:HandlerError] ${record.type} ->`, msg);
    }
  }
  if (errors.length > 0 && errors.length === integrationHandlers.length) {
    throw new Error(`All handlers failed: ${errors.join('; ')}`);
  }
}

/**
 * Retrieve status of pending/processed/dead-letter outbox items for Admin monitoring.
 */
export function getOutboxMetrics(): {
  pending: number;
  processed: number;
  failed: number;
  deadLetter: number;
  total: number;
} {
  return {
    pending: outboxQueue.filter((r) => r.status === 'PENDING').length,
    processed: outboxQueue.filter((r) => r.status === 'PROCESSED').length,
    failed: outboxQueue.filter((r) => r.status === 'FAILED').length,
    deadLetter: outboxQueue.filter((r) => r.status === 'DEAD_LETTER').length,
    total: outboxQueue.length,
  };
}

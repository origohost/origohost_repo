import type { Event } from '@/types';
import { EventsRepository } from '@/repositories/crm/events.repository';
import type { ServiceResult } from './base.service';
import { emitDomainEvent } from '@/lib/events/domainEvents';


export async function getEvents(
  query?: string,
  statusFilter?: string,
  formatFilter?: string
): Promise<ServiceResult<Event[]>> {
  const events = await EventsRepository.findAll(query, {
    status: statusFilter,
    format: formatFilter,
  });
  return { success: true, data: events };
}

export const getCrmEvents = getEvents;

export async function getEventById(id: string): Promise<ServiceResult<Event | null>> {
  const event = await EventsRepository.findById(id);
  return { success: !!event, data: event, error: event ? undefined : 'Event not found' };
}

export async function createEvent(
  data: Partial<Event>,
  operatorId = 'usr-operator-01'
): Promise<ServiceResult<Event>> {
  const newEvent = await EventsRepository.create(data);
  await emitDomainEvent('EVENT_CREATED', newEvent.id, 'Event', {
    operatorId,
    slug: newEvent.slug,
    data: newEvent,
  });
  return { success: true, data: newEvent };
}

export async function updateEvent(
  id: string,
  data: Partial<Event>,
  operatorId = 'usr-operator-01'
): Promise<ServiceResult<Event>> {
  const updated = await EventsRepository.update(id, data);
  await emitDomainEvent('EVENT_UPDATED', id, 'Event', {
    operatorId,
    slug: updated.slug,
    data: updated,
  });
  return { success: true, data: updated };
}

export async function deleteEvent(
  id: string,
  operatorId = 'usr-operator-01'
): Promise<ServiceResult<boolean>> {
  const success = await EventsRepository.softDelete(id);
  if (success) {
    await emitDomainEvent('EVENT_DELETED', id, 'Event', { operatorId });
  }
  return { success, data: success };
}



export const eventService = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};

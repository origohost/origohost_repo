import type { Program } from '@/types';
import { ProgramsRepository } from '@/repositories/crm/programs.repository';
import type { ServiceResult } from './base.service';
import { emitDomainEvent } from '@/lib/events/domainEvents';

export async function getPrograms(
  query?: string,
  statusFilter?: string
): Promise<ServiceResult<Program[]>> {
  const data = await ProgramsRepository.findAll(query, { status: statusFilter });
  return { success: true, data };
}

export const getCrmProgramsDomain = getPrograms;

export async function getProgramById(id: string): Promise<ServiceResult<Program | null>> {
  const data = await ProgramsRepository.findById(id);
  return { success: !!data, data, error: data ? undefined : 'Program not found' };
}

export async function createProgram(
  data: Partial<Program>,
  operatorId = 'usr-operator-01'
): Promise<ServiceResult<Program>> {
  const newProg = await ProgramsRepository.create(data);
  await emitDomainEvent('PROGRAM_PUBLISHED', newProg.id, 'Program', {
    operatorId,
    slug: newProg.slug,
    data: newProg,
  });
  return { success: true, data: newProg };
}

export async function updateProgram(
  id: string,
  data: Partial<Program>,
  operatorId = 'usr-operator-01'
): Promise<ServiceResult<Program>> {
  const updated = await ProgramsRepository.update(id, data);
  await emitDomainEvent('PROGRAM_UPDATED', id, 'Program', {
    operatorId,
    slug: updated.slug,
    data: updated,
  });
  return { success: true, data: updated };
}

export async function deleteProgram(
  id: string,
  operatorId = 'usr-operator-01'
): Promise<ServiceResult<boolean>> {
  const success = await ProgramsRepository.softDelete(id);
  if (success) {
    await emitDomainEvent('PROGRAM_UPDATED', id, 'Program', { operatorId });
  }
  return { success, data: success };
}



export const programsService = {
  getPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
};

import { ProgramsRepository } from '@/repositories/crm/programs.repository';
import type { Program, ProgramStatus } from '@/types';

export interface ProgramFilterOptions {
  status?: ProgramStatus | 'All';
  search?: string;
  limit?: number;
}

/**
 * Retrieves all programs matching optional criteria from ProgramsRepository single source of truth.
 */
export async function getPrograms(options: ProgramFilterOptions = {}): Promise<Program[]> {
  const allProgs = await ProgramsRepository.findAll(options.search, {
    status: options.status,
  });

  let filtered = [...allProgs];

  if (options.limit && options.limit > 0) {
    filtered = filtered.slice(0, options.limit);
  }

  return filtered;
}

/**
 * Retrieves a single program by its URL slug or ID from ProgramsRepository.
 */
export async function getProgramBySlug(slug: string): Promise<Program | null> {
  return ProgramsRepository.findById(slug);
}

/**
 * Retrieves featured programs for the homepage from ProgramsRepository.
 */
export async function getFeaturedPrograms(limit = 2): Promise<Program[]> {
  const allProgs = await ProgramsRepository.findAll();
  const featured = allProgs.filter((p) => p.featured);
  return featured.slice(0, limit);
}


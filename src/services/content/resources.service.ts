import { ResourcesRepository } from '@/repositories/crm/resources.repository';
import type { Resource, ResourceCategory, ResourceType } from '@/types';

export interface ResourceFilterOptions {
  category?: ResourceCategory | string | 'All';
  type?: ResourceType | 'All';
  search?: string;
  limit?: number;
}

/**
 * Retrieves all resources matching optional criteria from ResourcesRepository single source of truth.
 */
export async function getResources(options: ResourceFilterOptions = {}): Promise<Resource[]> {
  const allRes = await ResourcesRepository.findAll(options.search, {
    category: options.category,
    type: options.type,
  });

  let filtered = [...allRes];

  if (options.limit && options.limit > 0) {
    filtered = filtered.slice(0, options.limit);
  }

  return filtered;
}

/**
 * Retrieves a single resource by its slug or ID from ResourcesRepository.
 */
export async function getResourceBySlug(slug: string): Promise<Resource | null> {
  return ResourcesRepository.findById(slug);
}

/**
 * Retrieves featured resources from ResourcesRepository.
 */
export async function getFeaturedResources(limit = 2): Promise<Resource[]> {
  const allRes = await ResourcesRepository.findAll();
  const featured = allRes.filter((r) => r.featured);
  return featured.slice(0, limit);
}


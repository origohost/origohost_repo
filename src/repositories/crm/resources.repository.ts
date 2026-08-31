import type { Resource } from '@/types';
import { resources as seedResources } from '@/data/resources/resources.data';
import type { BaseRepositoryContract } from './base.repository';

class ResourcesRepositoryImpl implements BaseRepositoryContract<Resource> {
  private resourcesStore: Resource[] = [...seedResources];

  async findAll(query?: string, filter?: Record<string, unknown>): Promise<Resource[]> {
    let result = [...this.resourcesStore];

    if (filter?.category && filter.category !== 'All' && filter.category !== 'All Categories') {
      result = result.filter((r) => r.category.toLowerCase() === String(filter.category).toLowerCase());
    }
    if (filter?.type && filter.type !== 'All' && filter.type !== 'All Types') {
      result = result.filter((r) => r.type.toLowerCase() === String(filter.type).toLowerCase());
    }


    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }

  async findById(id: string): Promise<Resource | null> {
    return this.resourcesStore.find((r) => r.id === id || r.slug === id) || null;
  }

  async create(data: Partial<Resource>): Promise<Resource> {
    const newRes: Resource = {
      id: data.id || `res-${Date.now()}`,
      slug: data.slug || `resource-${Date.now()}`,
      title: data.title || 'New Resource Guide',
      description: data.description || '',
      category: data.category || 'Guide',
      type: data.type || 'Internal',
      url: data.url || `/resources/${data.slug || 'guide'}`,
      source: data.source || 'OrigoHOST Knowledge Base',
      focusAreas: data.focusAreas || ['Infrastructure'],
      tags: data.tags || ['guide'],
      publicationDate: data.publicationDate || new Date().toISOString().slice(0, 10),
      featured: Boolean(data.featured),
      createdAt: new Date().toISOString(),
    };
    this.resourcesStore.unshift(newRes);
    return newRes;
  }


  async update(id: string, data: Partial<Resource>): Promise<Resource> {
    const idx = this.resourcesStore.findIndex((r) => r.id === id || r.slug === id);
    if (idx === -1) throw new Error(`Resource ${id} not found`);

    const updated = {
      ...this.resourcesStore[idx],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    this.resourcesStore[idx] = updated;
    return updated;
  }

  async softDelete(id: string): Promise<boolean> {
    const idx = this.resourcesStore.findIndex((r) => r.id === id || r.slug === id);
    if (idx === -1) return false;
    this.resourcesStore.splice(idx, 1);
    return true;
  }

  async restore(): Promise<boolean> {
    return true;
  }

  async archive(): Promise<boolean> {
    return true;
  }
}

export const ResourcesRepository = new ResourcesRepositoryImpl();

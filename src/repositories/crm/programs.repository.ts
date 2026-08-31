import type { Program } from '@/types';
import { programs as seedPrograms } from '@/data/programs/programs.data';
import type { BaseRepositoryContract } from './base.repository';

class ProgramsRepositoryImpl implements BaseRepositoryContract<Program> {
  private programsStore: Program[] = [...seedPrograms];

  async findAll(query?: string, filter?: Record<string, unknown>): Promise<Program[]> {
    let result = [...this.programsStore];

    if (filter?.status && filter.status !== 'All Statuses' && filter.status !== 'All') {
      result = result.filter((p) => p.status === filter.status);
    }


    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.purpose.toLowerCase().includes(q) ||
          p.focusAreas.some((f) => f.toLowerCase().includes(q))
      );
    }
    return result;
  }

  async findById(id: string): Promise<Program | null> {
    return this.programsStore.find((p) => p.id === id || p.slug === id) || null;
  }

  async create(data: Partial<Program>): Promise<Program> {
    const newProg: Program = {
      id: data.id || `prog-${Date.now()}`,
      slug: data.slug || `program-${Date.now()}`,
      name: data.name || 'New Educational Program',
      purpose: data.purpose || '',
      description: data.description || '',
      audience: data.audience || ['Students', 'Developers'],
      focusAreas: data.focusAreas || ['Technology'],
      status: data.status || 'Active',
      tags: data.tags || ['program'],
      coverImage: data.coverImage || '/images/programs/kss2026.webp',
      relatedEvents: data.relatedEvents || [],
      featured: Boolean(data.featured),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.programsStore.unshift(newProg);
    return newProg;
  }

  async update(id: string, data: Partial<Program>): Promise<Program> {
    const idx = this.programsStore.findIndex((p) => p.id === id || p.slug === id);
    if (idx === -1) throw new Error(`Program ${id} not found`);

    const updated = {
      ...this.programsStore[idx],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    this.programsStore[idx] = updated;
    return updated;
  }

  async softDelete(id: string): Promise<boolean> {
    const idx = this.programsStore.findIndex((p) => p.id === id || p.slug === id);
    if (idx === -1) return false;
    this.programsStore.splice(idx, 1);
    return true;
  }

  async restore(): Promise<boolean> {
    return true;
  }

  async archive(): Promise<boolean> {
    return true;
  }
}

export const ProgramsRepository = new ProgramsRepositoryImpl();

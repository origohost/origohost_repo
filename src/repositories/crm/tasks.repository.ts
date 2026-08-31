import type { CrmTaskItem } from '@/types/crm';
import { mockTasks } from '@/data/crm/tasks.data';
import type { BaseRepositoryContract } from './base.repository';

class TasksRepositoryImpl implements BaseRepositoryContract<CrmTaskItem> {
  private tasksStore: CrmTaskItem[] = [...mockTasks];

  async findAll(query?: string, filter?: Record<string, unknown>): Promise<CrmTaskItem[]> {
    let result = [...this.tasksStore];

    if (filter?.status && filter.status !== 'All Statuses') {
      result = result.filter((t) => t.status === filter.status);
    }
    if (filter?.priority && filter.priority !== 'All Priorities') {
      result = result.filter((t) => t.priority === filter.priority);
    }

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.assignedToName && t.assignedToName.toLowerCase().includes(q))
      );
    }
    return result;
  }

  async findById(id: string): Promise<CrmTaskItem | null> {
    return this.tasksStore.find((t) => t.id === id) || null;
  }

  async create(data: Partial<CrmTaskItem>): Promise<CrmTaskItem> {
    const newTask: CrmTaskItem = {
      id: `task-${Date.now()}`,
      title: data.title || 'New Operational Task',
      description: data.description || '',
      assignee: data.assignedToName || data.assignee || 'System Operator',
      assignedToId: data.assignedToId || 'usr-operator-01',
      assignedToName: data.assignedToName || data.assignee || 'System Operator',
      status: data.status || 'Pending',
      priority: data.priority || 'Medium',
      dueDate: data.dueAt || data.dueDate || new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10),
      dueAt: data.dueAt || data.dueDate || new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.tasksStore.unshift(newTask);
    return newTask;
  }

  async update(id: string, data: Partial<CrmTaskItem>): Promise<CrmTaskItem> {
    const idx = this.tasksStore.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error(`Task ${id} not found`);

    const updated = {
      ...this.tasksStore[idx],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    this.tasksStore[idx] = updated;
    return updated;
  }

  async toggleComplete(id: string): Promise<CrmTaskItem> {
    const idx = this.tasksStore.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error(`Task ${id} not found`);

    const item = this.tasksStore[idx];
    const isCompleted = item.status === 'Completed';
    const updated: CrmTaskItem = {
      ...item,
      status: isCompleted ? 'Pending' : 'Completed',
      updatedAt: new Date().toISOString(),
    };
    this.tasksStore[idx] = updated;
    return updated;
  }

  async softDelete(id: string): Promise<boolean> {
    const idx = this.tasksStore.findIndex((t) => t.id === id);
    if (idx === -1) return false;
    this.tasksStore.splice(idx, 1);
    return true;
  }

  async restore(): Promise<boolean> {
    return true;
  }

  async archive(): Promise<boolean> {
    return true;
  }
}

export const TasksRepository = new TasksRepositoryImpl();

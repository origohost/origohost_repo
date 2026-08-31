import type { ServiceResult } from './base.service';

export interface CrmSavedView {
  id: string;
  name: string;
  module: 'contacts' | 'leads' | 'organizations' | 'applications' | 'tasks' | 'events';
  filters: Record<string, unknown>;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  isDefault?: boolean;
}

const memorySavedViews: CrmSavedView[] = [
  {
    id: 'view-1',
    name: 'Active Ecosystem Contacts',
    module: 'contacts',
    filters: { status: 'Active' },
    sortField: 'firstName',
    sortOrder: 'asc',
  },
  {
    id: 'view-2',
    name: 'Pending Inbound Applications',
    module: 'applications',
    filters: { status: 'PENDING' },
    sortField: 'submittedAt',
    sortOrder: 'desc',
  },
  {
    id: 'view-3',
    name: 'High Priority Tasks',
    module: 'tasks',
    filters: { priority: 'High', status: 'To Do' },
    sortField: 'dueDate',
    sortOrder: 'asc',
  },
];

let viewsStore: CrmSavedView[] = [...memorySavedViews];

export async function getSavedViews(module?: CrmSavedView['module']): Promise<ServiceResult<CrmSavedView[]>> {
  const views = module ? viewsStore.filter((v) => v.module === module) : viewsStore;
  return { success: true, data: views };
}

export async function createSavedView(data: Partial<CrmSavedView>): Promise<ServiceResult<CrmSavedView>> {
  const newView: CrmSavedView = {
    id: `view-${Date.now()}`,
    name: data.name || 'Custom View',
    module: data.module || 'contacts',
    filters: data.filters || {},
    sortField: data.sortField,
    sortOrder: data.sortOrder || 'asc',
    isDefault: false,
  };
  viewsStore.push(newView);
  return { success: true, data: newView };
}

export async function deleteSavedView(id: string): Promise<ServiceResult<boolean>> {
  const len = viewsStore.length;
  viewsStore = viewsStore.filter((v) => v.id !== id);
  return { success: viewsStore.length < len, data: viewsStore.length < len };
}

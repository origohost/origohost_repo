import type { CRMRole, CRMAction } from '@/types/crm/auth.types';

const roleActionMatrix: Record<CRMRole, CRMAction[]> = {
  CRM_ADMIN: [
    'contacts.read', 'contacts.create', 'contacts.update', 'contacts.delete', 'contacts.archive', 'contacts.restore',
    'organizations.read', 'organizations.create', 'organizations.update', 'organizations.delete',
    'leads.read', 'leads.create', 'leads.update', 'leads.delete',
    'members.read', 'members.create', 'members.update', 'members.delete',
    'events.read', 'events.create', 'events.update', 'events.delete',
    'registrations.read', 'registrations.create', 'registrations.update', 'registrations.delete',
    'programs.read', 'programs.create', 'programs.update', 'programs.delete',
    'tasks.read', 'tasks.create', 'tasks.update', 'tasks.delete',
    'communications.read', 'communications.create', 'communications.update',
    'audit.read',
  ],
  CRM_MANAGER: [
    'contacts.read', 'contacts.create', 'contacts.update', 'contacts.archive', 'contacts.restore',
    'organizations.read', 'organizations.create', 'organizations.update',
    'leads.read', 'leads.create', 'leads.update',
    'members.read', 'members.create', 'members.update',
    'events.read', 'events.create', 'events.update',
    'registrations.read', 'registrations.create', 'registrations.update',
    'programs.read', 'programs.create', 'programs.update',
    'tasks.read', 'tasks.create', 'tasks.update', 'tasks.delete',
    'communications.read', 'communications.create',
  ],
  COMMUNITY_MANAGER: [
    'contacts.read', 'contacts.create', 'contacts.update',
    'members.read', 'members.create', 'members.update',
    'leads.read', 'leads.create',
    'tasks.read', 'tasks.create', 'tasks.update',
    'communications.read', 'communications.create',
  ],
  EVENT_MANAGER: [
    'contacts.read',
    'events.read', 'events.create', 'events.update',
    'registrations.read', 'registrations.create', 'registrations.update',
    'tasks.read', 'tasks.create', 'tasks.update',
  ],
  PROGRAM_MANAGER: [
    'contacts.read',
    'programs.read', 'programs.create', 'programs.update',
    'tasks.read', 'tasks.create', 'tasks.update',
  ],
  VIEWER: [
    'contacts.read',
    'organizations.read',
    'leads.read',
    'members.read',
    'events.read',
    'registrations.read',
    'programs.read',
    'tasks.read',
    'communications.read',
  ],
};

export function hasCRMRole(userRoles: CRMRole[], requiredRole: CRMRole): boolean {
  if (userRoles.includes('CRM_ADMIN')) return true;
  return userRoles.includes(requiredRole);
}

export function canAccessCRMModule(userRoles: CRMRole[], requiredRoles?: CRMRole[]): boolean {
  if (!requiredRoles || requiredRoles.length === 0) return true;
  if (userRoles.includes('CRM_ADMIN')) return true;
  return requiredRoles.some((role) => userRoles.includes(role));
}

export function canPerformCRMAction(userRoles: CRMRole[], action: CRMAction): boolean {
  if (userRoles.includes('CRM_ADMIN')) return true;
  return userRoles.some((role) => roleActionMatrix[role]?.includes(action));
}

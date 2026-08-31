export type CRMRole = 
  | 'CRM_ADMIN'
  | 'CRM_MANAGER'
  | 'COMMUNITY_MANAGER'
  | 'EVENT_MANAGER'
  | 'PROGRAM_MANAGER'
  | 'VIEWER';

export type CRMAction =
  | 'contacts.read'
  | 'contacts.create'
  | 'contacts.update'
  | 'contacts.delete'
  | 'contacts.archive'
  | 'contacts.restore'
  | 'organizations.read'
  | 'organizations.create'
  | 'organizations.update'
  | 'organizations.delete'
  | 'leads.read'
  | 'leads.create'
  | 'leads.update'
  | 'leads.delete'
  | 'members.read'
  | 'members.create'
  | 'members.update'
  | 'members.delete'
  | 'events.read'
  | 'events.create'
  | 'events.update'
  | 'events.delete'
  | 'registrations.read'
  | 'registrations.create'
  | 'registrations.update'
  | 'registrations.delete'
  | 'programs.read'
  | 'programs.create'
  | 'programs.update'
  | 'programs.delete'
  | 'tasks.read'
  | 'tasks.create'
  | 'tasks.update'
  | 'tasks.delete'
  | 'communications.read'
  | 'communications.create'
  | 'communications.update'
  | 'audit.read';

export interface CRMUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  roles: CRMRole[];
}

export interface CRMSession {
  user: CRMUser;
  isAuthenticated: boolean;
  isPlaceholderAuth: boolean;
  expiresAt: string;
}

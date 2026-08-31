export type UserRole =
  | 'super_admin'
  | 'admin'
  | 'crm_manager'
  | 'event_manager'
  | 'community_manager'
  | 'content_manager'
  | 'marketing_manager'
  | 'analyst'
  | 'editor'
  | 'member'
  | 'viewer';

export interface UserPermission {
  action: 'create' | 'read' | 'update' | 'delete' | 'manage';
  resource:
    | 'users'
    | 'roles'
    | 'contacts'
    | 'organizations'
    | 'events'
    | 'registrations'
    | 'programs'
    | 'cms'
    | 'blog'
    | 'settings'
    | 'all';
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: UserRole;
  permissions: UserPermission[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  user: UserProfile;
  accessToken: string;
  expiresAt: string;
}

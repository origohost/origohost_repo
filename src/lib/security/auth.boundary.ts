import type { CRMSession, CRMUser } from '@/types/crm/auth.types';

/**
 * Phase 0 Development Auth Boundary Stub.
 * In Phase 7 (Supabase Integration), this stub will be replaced with live Supabase session validation.
 */
const devDefaultUser: CRMUser = {
  id: 'usr-dev-01',
  name: 'OrigoHOST Operator',
  email: 'operator@origohost.com',
  roles: ['CRM_ADMIN', 'COMMUNITY_MANAGER'],
};

export async function getCRMSession(): Promise<CRMSession> {
  return {
    user: devDefaultUser,
    isAuthenticated: true,
    isPlaceholderAuth: true,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };
}

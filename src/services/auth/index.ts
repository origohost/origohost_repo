/**
 * Auth Domain Service Boundary
 * Manages user authentication, session validation, and authorization checks.
 */

export interface UserSession {
  userId: string;
  email: string;
  role: 'ADMIN' | 'MEMBER' | 'GUEST';
}

export class AuthService {
  public async getSession(): Promise<UserSession | null> {
    // Phase 0 placeholder - returns null until auth provider is wired
    return null;
  }

  public async validatePermission(session: UserSession | null, action: string): Promise<boolean> {
    if (!session) return false;
    if (session.role === 'ADMIN') return true;
    return false;
  }
}

export const authService = new AuthService();

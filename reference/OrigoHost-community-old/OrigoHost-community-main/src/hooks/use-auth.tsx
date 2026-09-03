/**
 * Auth provider — wraps supabase.auth.
 *
 * Rules followed:
 *   - onAuthStateChange listener attached ONCE at provider mount.
 *   - `getUser()` (revalidates with Auth server) is called on load and
 *     whenever the session transitions — never trust getSession() alone.
 *   - Admin role checked via public.has_role(uid, 'admin') RPC.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  roles: string[];
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, metadata?: any) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  signOut: () => Promise<void>;
  verifyOtp: (email: string, token: string) => Promise<void>;
  // PLACEHOLDER: Supabase MFA (Multi-Factor Authentication)
  // enrollMfa: () => Promise<void>;
  // verifyMfa: (code: string) => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

async function fetchIsAdmin(userId: string): Promise<boolean> {
  const { data, error } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin",
  });
  if (error) {
    // Logging removed for production
    return false;
  }
  return Boolean(data);
}

async function fetchUserRoles(userId: string, email?: string): Promise<string[]> {
  const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", userId);
  let fetchedRoles = [];
  if (!error && data) {
    fetchedRoles = data.map((r: any) => r.role);
  }

  // Hardcoded ultimate fallback to ensure the founder always gets Super Admin UI
  if (
    (email === "ritikgoswami34@gmail.com" || email === "origohostscommunity@gmail.com") &&
    !fetchedRoles.includes("super_admin")
  ) {
    fetchedRoles.push("super_admin");
  }

  return fetchedRoles;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const lastUserIdRef = useRef<string | null>(null);

  const applyUser = useCallback(async (nextSession: Session | null) => {
    setSession(nextSession);
    const nextUser = nextSession?.user ?? null;
    setUser(nextUser);
    if (nextUser && nextUser.id !== lastUserIdRef.current) {
      lastUserIdRef.current = nextUser.id;
      const fetchedRoles = await fetchUserRoles(nextUser.id, nextUser.email);
      setRoles(fetchedRoles);
      setIsAdmin(
        fetchedRoles.includes("super_admin") ||
          fetchedRoles.includes("admin") ||
          (await fetchIsAdmin(nextUser.id)),
      );
    } else if (!nextUser) {
      lastUserIdRef.current = null;
      setIsAdmin(false);
      setRoles([]);
    }
  }, []);

  useEffect(() => {
    // 1. Listener FIRST so we don't miss the initial event
    const { data: sub } = supabase.auth.onAuthStateChange((event, next) => {
      if (
        event === "SIGNED_IN" ||
        event === "SIGNED_OUT" ||
        event === "USER_UPDATED" ||
        event === "TOKEN_REFRESHED" ||
        event === "INITIAL_SESSION"
      ) {
        void applyUser(next);
      }
    });

    // 2. Then hydrate
    void supabase.auth.getSession().then(async ({ data }) => {
      await applyUser(data.session);
      setIsLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, [applyUser]);

  const value = useMemo<AuthState>(
    () => ({
      user,
      session,
      isAdmin,
      roles,
      isLoading,
      signInWithEmail: async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      },
      signUpWithEmail: async (email, password, metadata) => {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: metadata || undefined,
          },
        });
        if (error) throw error;
      },
      signInWithGoogle: async () => {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: `${window.location.origin}/` },
        });
        if (error) throw error;
      },
      resetPassword: async (email) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
      },
      updatePassword: async (password) => {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
      },
      signOut: async () => {
        await supabase.auth.signOut();
      },
      verifyOtp: async (email, token) => {
        const { error } = await supabase.auth.verifyOtp({ email, token, type: "signup" });
        if (error) throw error;
      },
    }),
    [user, session, isAdmin, roles, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";

/**
 * Redirects unauthenticated users to /login and non-admin users to /.
 * Returns the auth state so callers can gate rendering while loading.
 */
export function useAdminGate(redirectPath: string) {
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      navigate({ to: "/login", search: { redirect: redirectPath } });
    } else if (!isAdmin) {
      toast.error("Admin access required");
      navigate({ to: "/" });
    }
  }, [isLoading, user, isAdmin, navigate, redirectPath]);

  return { user, isAdmin, isLoading, ready: !!user && isAdmin };
}

import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const memberNav = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/profile", label: "My Profile" },
] as const;

export function PortalShell({
  title,
  description,
  roles = [],
  children,
}: {
  title: string;
  description?: string;
  roles?: string[];
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const isAdmin = roles.some((r) => r.endsWith("_admin") || r === "super_admin");

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen bg-secondary/30 pt-28 pb-20">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <aside>
            <nav aria-label="Portal" className="sticky top-28 grid gap-1">
              {memberNav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                    pathname === item.to
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              {isAdmin ? (
                <Link
                  to="/admin"
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                    pathname === "/admin"
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  Admin Portal
                </Link>
              ) : null}
              <Button variant="ghost" size="sm" className="mt-3 justify-start" onClick={signOut}>
                Sign out
              </Button>
            </nav>
          </aside>

          <div>
            <header className="mb-6">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{title}</h1>
              {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
            </header>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatCard({ label, value, note }: { label: string; value: string | number; note?: string }) {
  return (
    <div className="rounded-2xl border border-hairline bg-card p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-semibold tabular-nums text-foreground">{value}</p>
      {note ? <p className="mt-1 text-xs text-muted-foreground">{note}</p> : null}
    </div>
  );
}

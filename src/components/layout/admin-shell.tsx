import type { ReactNode } from "react";
import { useNavigate, useLocation, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, ChevronRight, Bell } from "lucide-react";
import { AdminSidebar } from "../admin/admin-sidebar";
import { MobileAdminSidebar } from "../admin/mobile-admin-sidebar";
import { CommandPalette } from "../admin/command-palette";

interface AdminShellProps {
  title: string;
  description?: string;
  children: ReactNode;
}

/**
 * Enterprise wrapper for all /admin/* routes.
 * Enforces admin authorization, implements the sidebar layout,
 * and mounts the global Command Palette.
 */
export function AdminShell({ title, description, children }: AdminShellProps) {
  const { user, roles, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthorized = Boolean(
    user && (isAdmin || roles.includes("admin") || roles.includes("super_admin")),
  );

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      navigate({ to: "/login", search: { redirect: window.location.pathname } });
    } else if (!isAuthorized) {
      toast.error("Admin access required");
      navigate({ to: "/" });
    }
  }, [isLoading, user, isAuthorized, navigate]);

  if (isLoading || (!isAuthorized && user)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--brand-orange)]" />
      </div>
    );
  }

  // Generate dynamic breadcrumb from pathname
  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <AdminSidebar />
      <CommandPalette />

      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--brand-ink)]/5 bg-white px-8">
          <div className="flex items-center text-sm font-medium text-[var(--brand-ink)]/50">
            {paths.map((p, i) => (
              <span key={p} className="flex items-center">
                {i > 0 && <ChevronRight className="mx-2 h-4 w-4" />}
                <span
                  className={
                    i === paths.length - 1 ? "text-[var(--brand-ink)] capitalize" : "capitalize"
                  }
                >
                  {p.replace("-", " ")}
                </span>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <MobileAdminSidebar />
            <button className="grid h-9 w-9 place-items-center rounded-full hover:bg-[var(--brand-ink)]/5">
              <Bell className="h-4 w-4 text-[var(--brand-ink)]/60" />
            </button>
            <div className="h-8 w-8 overflow-hidden rounded-full border border-[var(--brand-ink)]/10 bg-[var(--brand-ink)]">
              <img
                src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user?.email}`}
                alt="Avatar"
                className="h-full w-full object-cover"
                decoding="async"
                loading="lazy"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <h1 className="text-3xl font-black tracking-tight text-[var(--brand-ink)]">
                {title}
              </h1>
              {description && (
                <p className="mt-2 text-sm text-[var(--brand-ink)]/60">{description}</p>
              )}
            </div>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

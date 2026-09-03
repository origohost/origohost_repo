import type { ReactNode } from "react";
import { useNavigate, useLocation, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import {
  Loader2,
  ChevronRight,
  Bell,
  LayoutDashboard,
  Calendar,
  BookOpen,
  Gift,
  ShieldCheck,
  GraduationCap,
  Users,
  Briefcase,
} from "lucide-react";
import { CommandPalette } from "../admin/command-palette";

interface DashboardShellProps {
  title: string;
  description?: string;
  children: ReactNode;
}

const DASHBOARD_NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/dashboard/events", label: "My Events", icon: Calendar },
  { to: "/dashboard/learning", label: "Learning Hub", icon: BookOpen },
  { to: "/dashboard/rewards", label: "Rewards & XP", icon: Gift },
  { to: "/dashboard/certificates", label: "Certificates", icon: GraduationCap },
  { to: "/dashboard/proposals", label: "My Proposals", icon: Briefcase },
  { to: "/dashboard/community", label: "Community", icon: Users },
];

export function DashboardShell({ title, description, children }: DashboardShellProps) {
  const { user, roles, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      navigate({ to: "/login", search: { redirect: window.location.pathname } });
    }
  }, [isLoading, user, navigate]);

  if (isLoading || !user) {
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
      {/* Sidebar */}
      <aside className="hidden md:block w-64 flex-shrink-0 border-r border-[var(--brand-ink)]/5 bg-white">
        <div className="flex h-16 items-center px-6 border-b border-[var(--brand-ink)]/5">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-[var(--brand-blue)]" />
            <span className="font-bold text-[var(--brand-ink)]">OrigoHOST</span>
          </Link>
        </div>

        <div className="p-4 flex flex-col gap-1">
          <div className="px-2 pb-4 pt-2 text-xs font-semibold uppercase tracking-wider text-[var(--brand-ink)]/40">
            Member Portal
          </div>
          {DASHBOARD_NAV.map((item) => {
            const isActive = location.pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[var(--brand-blue)]/10 text-[var(--brand-blue)]"
                    : "text-[var(--brand-ink)]/60 hover:bg-[var(--brand-ink)]/5 hover:text-[var(--brand-ink)]"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}

          {(roles.includes("admin") || roles.includes("super_admin")) && (
            <>
              <div className="px-2 pb-2 pt-6 text-xs font-semibold uppercase tracking-wider text-[var(--brand-ink)]/40">
                Staff Options
              </div>
              <Link
                to="/admin"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-[var(--brand-ink)]/60 transition-colors hover:bg-[var(--brand-ink)]/5 hover:text-[var(--brand-ink)]"
              >
                <ShieldCheck className="h-4 w-4 text-[var(--brand-orange)]" />
                Admin Panel
              </Link>
            </>
          )}
        </div>
      </aside>

      <CommandPalette />

      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--brand-ink)]/5 bg-white px-4 md:px-8">
          <div className="flex items-center overflow-x-auto hide-scrollbar whitespace-nowrap text-sm font-medium text-[var(--brand-ink)]/50 mr-4">
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
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
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

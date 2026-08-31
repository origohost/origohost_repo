import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  LayoutDashboard, Users, Shield, FileText, Calendar,
  Building2, Award, Settings, Activity, ArrowLeft
} from 'lucide-react';
import { LogoMark } from '@/components/shared/LogoMark';

export const metadata: Metadata = {
  title: 'Admin Control Center — OrigoHOST',
  description: 'Centralized administration for OrigoHOST platform, CMS, users, and ecosystem configuration.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const adminNav = [
    { label: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Users & Roles', href: '/admin/users', icon: Users },
    { label: 'CMS & Pages', href: '/admin/cms', icon: FileText },
    { label: 'Events', href: '/admin/events', icon: Calendar },
    { label: 'Community', href: '/admin/community', icon: Building2 },
    { label: 'Partners & Sponsors', href: '/admin/partners', icon: Award },
    { label: 'System Settings', href: '/admin/settings', icon: Settings },
    { label: 'Audit Logs', href: '/admin/audit-logs', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020817] text-foreground flex flex-col">
      {/* ── Admin Header ────────────────────────────────────────────── */}
      <header className="bg-white dark:bg-[#07101F] border-b border-[#E2E8F0] dark:border-border/60 sticky top-0 z-40 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" aria-label="OrigoHOST Admin">
            <LogoMark variant="full" className="h-8" />
          </Link>
          <span className="px-2.5 py-1 text-xs font-mono font-bold uppercase rounded-md bg-[#FFF7ED] text-[#FF7316] border border-[#FDBA74]/40">
            Admin Control Plane
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-body-sm font-medium text-foreground-muted hover:text-brand-primary transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="h-4 w-4" /> Exit to Public Web
          </Link>
        </div>
      </header>

      {/* ── Admin Main Area ──────────────────────────────────────────── */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-[#07101F] border-r border-[#E2E8F0] dark:border-border/60 p-4 shrink-0 hidden md:block">
          <nav className="space-y-1">
            {adminNav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3.5 py-2.5 text-body-sm font-medium rounded-lg text-foreground-muted hover:text-foreground hover:bg-[#F1F5F9] dark:hover:bg-[#0B1628] transition-colors"
                >
                  <Icon className="h-4 w-4 text-brand-primary shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Workspace */}
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}

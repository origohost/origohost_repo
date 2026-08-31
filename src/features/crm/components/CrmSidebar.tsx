'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { crmNavConfig } from '@/config/crmNav.config';
import { canAccessCRMModule } from '@/lib/security/permissions';
import type { CRMRole } from '@/types/crm/auth.types';

interface CrmSidebarProps {
  userRoles?: CRMRole[];
}

export function CrmSidebar({ userRoles = ['CRM_ADMIN'] }: CrmSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-surface border-r border-border p-4 shrink-0 hidden md:block select-none">
      <div className="space-y-6">
        {crmNavConfig.map((section) => {
          const visibleItems = section.items.filter((item) =>
            canAccessCRMModule(userRoles, item.requiredRoles)
          );

          if (visibleItems.length === 0) return null;

          return (
            <div key={section.title} className="space-y-1.5">
              <span className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-ink-muted/80">
                {section.title}
              </span>
              <nav className="space-y-0.5">
                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`flex items-center justify-between px-3 py-2 text-body-sm font-medium rounded-btn transition-colors duration-150 outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                        isActive
                          ? 'bg-primary/10 text-primary font-semibold'
                          : 'text-ink-secondary hover:text-ink hover:bg-surface-elevated'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-primary' : 'text-ink-muted'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-surface-elevated text-ink-muted">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

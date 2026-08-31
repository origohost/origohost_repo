'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export function CrmBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length <= 1) return null;

  const breadcrumbs = segments.map((seg, idx) => {
    const href = '/' + segments.slice(0, idx + 1).join('/');
    const label = seg.charAt(0).toUpperCase() + seg.slice(1);
    return { href, label };
  });

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-body-xs font-medium text-ink-muted mb-4">
      <Link href="/crm/dashboard" className="hover:text-ink transition-colors flex items-center gap-1">
        <Home className="h-3.5 w-3.5" />
        <span>CRM</span>
      </Link>
      {breadcrumbs.map((crumb, idx) => (
        <React.Fragment key={crumb.href}>
          <ChevronRight className="h-3 w-3 text-border-strong shrink-0" />
          {idx === breadcrumbs.length - 1 ? (
            <span className="text-ink font-semibold">{crumb.label}</span>
          ) : (
            <Link href={crumb.href} className="hover:text-ink transition-colors">
              {crumb.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

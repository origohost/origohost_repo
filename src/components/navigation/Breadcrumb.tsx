import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface BreadcrumbProps {
  items: readonly BreadcrumbItem[] | BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('text-body-sm text-ink-secondary py-3', className)}>
      <ol className="inline-flex items-center flex-wrap gap-1 sm:gap-1.5">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center text-ink-muted hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded-xs outline-none"
          >
            <Home className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="inline-flex items-center">
              <ChevronRight className="h-3.5 w-3.5 text-ink-muted/50 mx-1 shrink-0" aria-hidden="true" />
              {isLast ? (
                <span
                  className="text-ink font-semibold truncate max-w-[200px] sm:max-w-xs"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-ink-muted hover:text-primary truncate max-w-[150px] sm:max-w-xs transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded-xs outline-none"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

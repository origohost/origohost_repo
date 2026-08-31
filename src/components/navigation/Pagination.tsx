import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Pagination Navigation"
      className={cn('flex items-center justify-center gap-1.5', className)}
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Go to previous page"
        className="inline-flex items-center justify-center h-9 w-9 rounded-btn border border-border text-ink hover:bg-surface-elevated disabled:opacity-40 disabled:pointer-events-none transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </button>

      {pages.map((p) => {
        const isCurrent = p === currentPage;
        return (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            aria-current={isCurrent ? 'page' : undefined}
            aria-label={`Page ${p}`}
            className={cn(
              'inline-flex items-center justify-center h-9 min-w-[2.25rem] px-2 rounded-btn text-body-sm font-semibold transition-colors outline-none select-none',
              'focus-visible:ring-2 focus-visible:ring-primary',
              isCurrent
                ? 'bg-primary text-white shadow-xs'
                : 'border border-border text-ink hover:bg-surface-elevated'
            )}
          >
            {p}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Go to next page"
        className="inline-flex items-center justify-center h-9 w-9 rounded-btn border border-border text-ink hover:bg-surface-elevated disabled:opacity-40 disabled:pointer-events-none transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>
  );
}

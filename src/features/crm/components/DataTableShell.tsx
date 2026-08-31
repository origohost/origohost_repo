import React from 'react';

interface DataTableShellProps {
  children: React.ReactNode;
  headerActions?: React.ReactNode;
  footer?: React.ReactNode;
}

export function DataTableShell({ children, headerActions, footer }: DataTableShellProps) {
  return (
    <div className="rounded-card bg-surface border border-border overflow-hidden shadow-xs">
      {headerActions && (
        <div className="p-4 bg-surface-elevated border-b border-border flex items-center justify-between gap-4">
          {headerActions}
        </div>
      )}
      <div className="overflow-x-auto">{children}</div>
      {footer && (
        <div className="p-3 bg-surface-elevated border-t border-border text-body-xs text-ink-muted">
          {footer}
        </div>
      )}
    </div>
  );
}

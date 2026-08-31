import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  subtext?: string;
  isPlaceholder?: boolean;
}

export function MetricCard({ label, value, icon: Icon, subtext, isPlaceholder = true }: MetricCardProps) {
  return (
    <div className="p-4 rounded-card bg-surface border border-border shadow-xs flex flex-col justify-between space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-body-xs font-medium text-ink-muted truncate">{label}</span>
        <div className="p-1.5 rounded-lg bg-surface-elevated text-primary border border-border/60">
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-heading-xl font-bold font-mono text-ink tracking-tight">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </span>
          {isPlaceholder && (
            <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              Mock
            </span>
          )}
        </div>
        {subtext && <p className="text-[11px] text-ink-muted mt-0.5">{subtext}</p>}
      </div>
    </div>
  );
}

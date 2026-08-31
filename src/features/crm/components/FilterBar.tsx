'use client';

import React from 'react';
import { Search, Filter } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterBarProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  filterLabel?: string;
  filterValue?: string;
  filterOptions?: FilterOption[];
  onFilterChange?: (val: string) => void;
}

export function FilterBar({
  searchPlaceholder = 'Search records...',
  searchValue = '',
  onSearchChange,
  filterLabel,
  filterValue = 'All',
  filterOptions = [],
  onFilterChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 bg-surface p-3.5 rounded-card border border-border">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-ink-muted" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="w-full pl-9 pr-3 py-1.5 text-body-sm bg-surface-elevated border border-border/80 rounded-btn text-ink placeholder:text-ink-muted focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {filterOptions.length > 0 && (
        <div className="flex items-center gap-2 shrink-0">
          <Filter className="h-3.5 w-3.5 text-ink-muted" />
          {filterLabel && <span className="text-body-xs font-semibold text-ink-muted">{filterLabel}:</span>}
          <select
            value={filterValue}
            onChange={(e) => onFilterChange?.(e.target.value)}
            className="px-3 py-1.5 text-body-sm bg-surface-elevated border border-border/80 rounded-btn text-ink focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {filterOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-white text-slate-900 dark:bg-[#0b1628] dark:text-white">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

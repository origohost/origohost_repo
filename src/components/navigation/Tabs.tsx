'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: readonly TabItem[] | TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
  variant?: 'pills' | 'underline';
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  className,
  variant = 'pills',
}: TabsProps) {
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      const nextIndex = (index + 1) % tabs.length;
      onChange(tabs[nextIndex].id);
    } else if (e.key === 'ArrowLeft') {
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      onChange(tabs[prevIndex].id);
    }
  };

  if (variant === 'underline') {
    return (
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={cn('flex items-center gap-6 border-b border-border', className)}
      >
        {tabs.map((tab, idx) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={cn(
                'flex items-center gap-2 pb-3 text-body-sm font-semibold transition-colors duration-150 relative outline-none',
                'focus-visible:ring-2 focus-visible:ring-primary rounded-xs',
                isActive
                  ? 'text-primary'
                  : 'text-ink-secondary hover:text-ink'
              )}
            >
              {tab.icon}
              {tab.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={cn(
        'inline-flex items-center p-1 rounded-card bg-surface-elevated border border-border/80 gap-1',
        className
      )}
    >
      {tabs.map((tab, idx) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            type="button"
            id={`tab-${tab.id}`}
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-btn text-body-sm font-semibold transition-all duration-150 outline-none select-none',
              'focus-visible:ring-2 focus-visible:ring-primary',
              isActive
                ? 'bg-surface text-primary shadow-xs border border-border/60'
                : 'text-ink-secondary hover:text-ink hover:bg-surface/50 border border-transparent'
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

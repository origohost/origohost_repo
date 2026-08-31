'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import type { Event } from '@/types';
import { EventCard } from '@/components/cards/EventCard';
import { Input } from '@/components/forms/Input';
import { EmptyState } from '@/components/shared/EmptyState';
import { trackFilterUse } from '@/lib/analytics';

export interface EventDirectoryProps {
  initialEvents: Event[];
}

export function EventDirectory({ initialEvents }: EventDirectoryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlTab = (searchParams?.get('tab') as 'All' | 'Upcoming' | 'Past') || 'All';
  const urlDelivery = (searchParams?.get('delivery') as 'All' | 'Online' | 'Offline') || 'All';

  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Upcoming' | 'Past'>(urlTab);
  const [delivery, setDelivery] = useState<'All' | 'Online' | 'Offline'>(urlDelivery);

  useEffect(() => {
    if (searchParams) {
      const t = searchParams.get('tab') as 'All' | 'Upcoming' | 'Past';
      const d = searchParams.get('delivery') as 'All' | 'Online' | 'Offline';
      if (t) setActiveTab(t);
      if (d) setDelivery(d);
    }
  }, [searchParams]);

  const updateFilters = (newTab: 'All' | 'Upcoming' | 'Past', newDelivery: 'All' | 'Online' | 'Offline') => {
    setActiveTab(newTab);
    setDelivery(newDelivery);

    const params = new URLSearchParams();
    if (newTab !== 'All') params.set('tab', newTab);
    if (newDelivery !== 'All') params.set('delivery', newDelivery);
    const queryString = params.toString();

    router.replace(queryString ? `/events?${queryString}` : '/events', { scroll: false });
    trackFilterUse('event_tab', newTab);
  };

  const filtered = useMemo(() => {
    return initialEvents.filter((ev) => {
      const matchTab =
        activeTab === 'All' ||
        (activeTab === 'Upcoming' && ev.status === 'Upcoming') ||
        (activeTab === 'Past' && ev.status === 'Past');

      const matchDelivery = delivery === 'All' || ev.delivery === delivery;

      const q = search.toLowerCase().trim();
      const matchSearch =
        q === '' ||
        ev.title.toLowerCase().includes(q) ||
        ev.summary.toLowerCase().includes(q) ||
        ev.location.name.toLowerCase().includes(q) ||
        ev.focusAreas.some((fa) => fa.toLowerCase().includes(q));

      return matchTab && matchDelivery && matchSearch;
    });
  }, [initialEvents, activeTab, delivery, search]);

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* ── Search & Filter Controls ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-card bg-surface border border-border shadow-xs">
        {/* Search input */}
        <div className="w-full sm:max-w-xs">
          <Input
            placeholder="Search events, topics, locations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            startIcon={<Search className="h-4 w-4" aria-hidden="true" />}
          />
        </div>

        {/* Tab filters */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {(['All', 'Upcoming', 'Past'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => updateFilters(tab, delivery)}
              className={`px-3.5 py-1.5 rounded-btn text-body-sm font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                activeTab === tab
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-ink-secondary hover:text-ink hover:bg-surface-elevated'
              }`}
            >
              {tab}
            </button>
          ))}

          <span className="h-4 w-px bg-border mx-1 hidden sm:block" />

          {/* Delivery mode */}
          {(['All', 'Online', 'Offline'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => updateFilters(activeTab, mode)}
              className={`px-3 py-1.5 rounded-btn text-body-xs font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                delivery === mode
                  ? 'bg-surface-elevated text-primary border border-border font-semibold'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* ── Results Count ────────────────────────────────────────────── */}
      <div className="flex items-center justify-between text-body-xs text-ink-muted">
        <span>
          Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? 'event' : 'events'}
        </span>
        {(search || activeTab !== 'All' || delivery !== 'All') && (
          <button
            type="button"
            onClick={() => {
              setSearch('');
              updateFilters('All', 'All');
            }}
            className="text-primary hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* ── Grid or Empty State ──────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No events match your criteria"
          description="Try adjusting your keywords or clearing the status filters to browse all sessions."
          actionLabel="Reset Filters"
          onActionClick={() => {
            setSearch('');
            updateFilters('All', 'All');
          }}
        />
      )}
    </div>
  );
}

'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import type { Resource } from '@/types';
import { ResourceCard } from '@/components/cards/ResourceCard';
import { Input } from '@/components/forms/Input';
import { EmptyState } from '@/components/shared/EmptyState';
import { trackFilterUse } from '@/lib/analytics';

export interface ResourceDirectoryProps {
  initialResources: Resource[];
}

export function ResourceDirectory({ initialResources }: ResourceDirectoryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlCategory = searchParams?.get('category') || 'All';

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(urlCategory);

  const categories = ['All', 'Guide', 'Documentation', 'Starter Kit', 'Chapter Handbook'];

  useEffect(() => {
    if (searchParams) {
      const c = searchParams.get('category');
      if (c) setActiveCategory(c);
    }
  }, [searchParams]);

  const updateCategory = (cat: string) => {
    setActiveCategory(cat);
    const params = new URLSearchParams();
    if (cat !== 'All') params.set('category', cat);
    const queryString = params.toString();

    router.replace(queryString ? `/resources?${queryString}` : '/resources', { scroll: false });
    trackFilterUse('resource_category', cat);
  };

  const filtered = useMemo(() => {
    return initialResources.filter((r) => {
      const matchCat =
        activeCategory === 'All' ||
        r.category.toLowerCase() === activeCategory.toLowerCase();

      const q = search.toLowerCase().trim();
      const matchSearch =
        q === '' ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        (r.focusAreas && r.focusAreas.some((fa) => fa.toLowerCase().includes(q)));

      return matchCat && matchSearch;
    });
  }, [initialResources, activeCategory, search]);

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* ── Search & Categories ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-card bg-surface border border-border shadow-xs">
        <div className="w-full sm:max-w-xs">
          <Input
            placeholder="Search guides, docs, roadmaps..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            startIcon={<Search className="h-4 w-4" aria-hidden="true" />}
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => updateCategory(cat)}
              className={`px-3.5 py-1.5 rounded-btn text-body-sm font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                activeCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-ink-secondary hover:text-ink hover:bg-surface-elevated'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Results Count ────────────────────────────────────────────── */}
      <div className="flex items-center justify-between text-body-xs text-ink-muted">
        <span>
          Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? 'resource' : 'resources'}
        </span>
        {(search || activeCategory !== 'All') && (
          <button
            type="button"
            onClick={() => {
              setSearch('');
              updateCategory('All');
            }}
            className="text-primary hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* ── Grid or Empty State ──────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((res) => (
            <ResourceCard key={res.id} resource={res} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No resources found"
          description="Try searching for a different keyword or select 'All' to browse our full repository."
          actionLabel="Reset Search"
          onActionClick={() => {
            setSearch('');
            updateCategory('All');
          }}
        />
      )}
    </div>
  );
}

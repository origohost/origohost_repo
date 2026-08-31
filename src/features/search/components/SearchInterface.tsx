'use client';

import React, { useState, useMemo, useEffect, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Search as SearchIcon,
  Calendar,
  Layers,
  FileText,
  Newspaper,
  HelpCircle,
  ArrowRight,
  X,
  ExternalLink,
} from 'lucide-react';
import type { SearchResult, SearchResultType } from '@/services/search/search.service';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/shared/EmptyState';
import { trackSearch } from '@/lib/analytics';

export interface SearchInterfaceProps {
  initialQuery?: string;
  initialType?: SearchResultType | 'all';
  allResults: SearchResult[];
}

const typeIcons: Record<SearchResultType, React.ReactNode> = {
  event: <Calendar className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />,
  program: <Layers className="h-4 w-4 text-accent-cyan shrink-0" aria-hidden="true" />,
  resource: <FileText className="h-4 w-4 text-accent-purple shrink-0" aria-hidden="true" />,
  article: <Newspaper className="h-4 w-4 text-accent-orange shrink-0" aria-hidden="true" />,
  faq: <HelpCircle className="h-4 w-4 text-accent-green shrink-0" aria-hidden="true" />,
};

const filterTabs: { label: string; value: SearchResultType | 'all' }[] = [
  { label: 'All Results', value: 'all' },
  { label: 'Events', value: 'event' },
  { label: 'Programs', value: 'program' },
  { label: 'Resources', value: 'resource' },
  { label: 'Articles', value: 'article' },
  { label: 'FAQ', value: 'faq' },
];

export function SearchInterface({
  initialQuery = '',
  initialType = 'all',
  allResults,
}: SearchInterfaceProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [inputVal, setInputVal] = useState(initialQuery);
  const [activeType, setActiveType] = useState<SearchResultType | 'all'>(initialType);

  // Sync state if URL query changes externally
  useEffect(() => {
    const qParam = searchParams.get('q') || '';
    const typeParam = (searchParams.get('type') || 'all') as SearchResultType | 'all';
    setInputVal(qParam);
    setActiveType(typeParam);
  }, [searchParams]);

  const updateUrl = (q: string, type: SearchResultType | 'all') => {
    const params = new URLSearchParams();
    if (q.trim()) params.set('q', q.trim());
    if (type !== 'all') params.set('type', type);

    startTransition(() => {
      router.push(`/search?${params.toString()}`);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrl(inputVal, activeType);
    trackSearch(inputVal, filteredResults.length);
  };

  const handleTypeSelect = (type: SearchResultType | 'all') => {
    setActiveType(type);
    updateUrl(inputVal, type);
  };

  const handleClear = () => {
    setInputVal('');
    setActiveType('all');
    router.push('/search');
  };

  // Filter based on active type
  const filteredResults = useMemo(() => {
    if (activeType === 'all') return allResults;
    return allResults.filter((r) => r.type === activeType);
  }, [allResults, activeType]);

  const popularQueries = [
    'CyberForge',
    'Knowledge Sharing Series',
    'DevOps',
    'Cloud VPS',
    'Chapter Handbook',
    'AI Foundation',
  ];

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* ── Search Input Form ────────────────────────────────────────── */}
      <form onSubmit={handleSearchSubmit} className="relative w-full max-w-2xl mx-auto">
        <div className="relative flex items-center rounded-btn bg-surface border border-border shadow-xs focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <SearchIcon className="h-5 w-5 text-ink-muted ml-4 shrink-0" aria-hidden="true" />
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Search events, programs, guides, articles, faqs..."
            className="w-full bg-transparent px-4 py-3.5 text-body-md text-ink placeholder:text-ink-muted outline-none"
            aria-label="Search across OrigoHOST"
          />
          {inputVal && (
            <button
              type="button"
              onClick={handleClear}
              className="p-2 mr-2 text-ink-muted hover:text-ink transition-colors rounded-btn outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Clear search query"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
          <button
            type="submit"
            className="px-5 py-2.5 mr-2 rounded-btn bg-primary text-white font-semibold text-body-sm hover:bg-primary/90 transition-colors shadow-xs shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Search
          </button>
        </div>
      </form>

      {/* ── Popular Quick Queries (when query is empty) ──────────────── */}
      {!initialQuery && (
        <div className="flex flex-wrap items-center justify-center gap-2 text-body-xs text-ink-muted">
          <span>Popular searches:</span>
          {popularQueries.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => {
                setInputVal(term);
                updateUrl(term, 'all');
              }}
              className="px-2.5 py-1 rounded-btn bg-surface border border-border hover:border-primary/40 hover:text-primary transition-colors font-medium text-ink-secondary"
            >
              {term}
            </button>
          ))}
        </div>
      )}

      {/* ── Type Filter Tabs ─────────────────────────────────────────── */}
      {initialQuery && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 justify-start sm:justify-center">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => handleTypeSelect(tab.value)}
              className={`px-3.5 py-1.5 rounded-btn text-body-sm font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                activeType === tab.value
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-ink-secondary hover:text-ink hover:bg-surface-elevated'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* ── Results Count ────────────────────────────────────────────── */}
      {initialQuery && (
        <div className="flex items-center justify-between text-body-xs text-ink-muted border-b border-border/60 pb-3">
          <span>
            Found <strong>{filteredResults.length}</strong> {filteredResults.length === 1 ? 'match' : 'matches'} for &ldquo;{initialQuery}&rdquo;
          </span>
          <button
            type="button"
            onClick={handleClear}
            className="text-primary hover:underline"
          >
            Clear search
          </button>
        </div>
      )}

      {/* ── Results List ─────────────────────────────────────────────── */}
      {initialQuery && filteredResults.length > 0 && (
        <div className="flex flex-col gap-4">
          {filteredResults.map((result) => {
            const isExternal = result.url.startsWith('http') || result.url.endsWith('.pdf');
            return (
              <div
                key={result.id}
                className="p-6 rounded-card bg-surface border border-border shadow-xs hover:shadow-card hover:border-primary/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    {typeIcons[result.type]}
                    <span className="text-caption font-mono uppercase tracking-wider text-ink-muted">
                      {result.type}
                    </span>
                    <span className="text-ink-muted/40">•</span>
                    <Badge variant="outline">{result.category}</Badge>
                    {result.badge && (
                      <span className="text-caption text-ink-muted">
                        ({result.badge})
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-heading-md text-ink">
                    <Link
                      href={result.url}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="hover:text-primary transition-colors outline-none"
                    >
                      {result.title}
                    </Link>
                  </h3>
                  <p className="text-body-sm text-ink-secondary line-clamp-2 leading-relaxed">
                    {result.description}
                  </p>
                </div>

                <div className="shrink-0">
                  <Link
                    href={result.url}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1.5 text-primary text-body-sm font-semibold hover:gap-2 transition-all outline-none"
                  >
                    View
                    {isExternal ? (
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Empty State ──────────────────────────────────────────────── */}
      {initialQuery && filteredResults.length === 0 && (
        <EmptyState
          title={`No matches found for "${initialQuery}"`}
          description="Try checking for spelling errors, using more general keywords, or browsing our primary directories."
          actionLabel="Reset Search"
          onActionClick={handleClear}
        />
      )}
    </div>
  );
}

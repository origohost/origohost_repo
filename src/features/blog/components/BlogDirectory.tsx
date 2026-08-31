'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import type { Article } from '@/types';
import { ArticleCard } from '@/components/cards/ArticleCard';
import { Input } from '@/components/forms/Input';
import { EmptyState } from '@/components/shared/EmptyState';
import { trackFilterUse } from '@/lib/analytics';

export interface BlogDirectoryProps {
  initialArticles: Article[];
}

export function BlogDirectory({ initialArticles }: BlogDirectoryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlCategory = searchParams?.get('category') || 'All';

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>(urlCategory);

  const categories = ['All', 'News', 'Case Study', 'Tutorial', 'Announcement', 'Insight'];

  useEffect(() => {
    if (searchParams) {
      const c = searchParams.get('category');
      if (c) setCategory(c);
    }
  }, [searchParams]);

  const updateCategory = (cat: string) => {
    setCategory(cat);
    const params = new URLSearchParams();
    if (cat !== 'All') params.set('category', cat);
    const queryString = params.toString();

    router.replace(queryString ? `/blog?${queryString}` : '/blog', { scroll: false });
    trackFilterUse('article_category', cat);
  };

  const filtered = useMemo(() => {
    return initialArticles.filter((article) => {
      const matchCategory =
        category === 'All' ||
        article.category.toLowerCase() === category.toLowerCase();

      const q = search.toLowerCase().trim();
      const matchSearch =
        q === '' ||
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        (article.tags && article.tags.some((t) => t.toLowerCase().includes(q)));

      return matchCategory && matchSearch;
    });
  }, [initialArticles, category, search]);

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* ── Filter & Search Bar ──────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-card bg-surface border border-border shadow-xs">
        <div className="w-full sm:max-w-xs">
          <Input
            placeholder="Search articles, topics..."
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
                category.toLowerCase() === cat.toLowerCase()
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
          Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? 'article' : 'articles'}
        </span>
        {(search || category !== 'All') && (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No articles match your search"
          description="Try broadening your keywords or select 'All' to browse all news and announcements."
          actionLabel="Reset Filters"
          onActionClick={() => {
            setSearch('');
            updateCategory('All');
          }}
        />
      )}
    </div>
  );
}

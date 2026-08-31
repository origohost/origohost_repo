'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import type { FAQItem } from '@/types';
import { Input } from '@/components/forms/Input';
import { Accordion } from '@/components/ui/Accordion';
import { EmptyState } from '@/components/shared/EmptyState';
import { trackFilterUse } from '@/lib/analytics';

export interface FAQDirectoryProps {
  initialFaqs: FAQItem[];
}

export function FAQDirectory({ initialFaqs }: FAQDirectoryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlCategory = searchParams?.get('category') || 'All';

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>(urlCategory);

  const categories = [
    'All',
    'General',
    'Community',
    'Events',
    'Programs',
    'Participation',
    'Partnerships',
    'Sponsorship',
  ];

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

    router.replace(queryString ? `/faq?${queryString}` : '/faq', { scroll: false });
    trackFilterUse('faq_category', cat);
  };

  const filtered = useMemo(() => {
    return initialFaqs.filter((faq) => {
      const matchCat =
        category === 'All' ||
        faq.category.toLowerCase() === category.toLowerCase();

      const q = search.toLowerCase().trim();
      const matchSearch =
        q === '' ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q);

      return matchCat && matchSearch;
    });
  }, [initialFaqs, category, search]);

  const accordionItems = useMemo(() => {
    return filtered.map((faq) => ({
      id: faq.id,
      title: faq.question,
      content: faq.answer,
    }));
  }, [filtered]);

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Search & Categories */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-card bg-surface border border-border shadow-xs">
        <div className="w-full sm:max-w-xs">
          <Input
            placeholder="Search questions, keywords..."
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

      {/* Results counter */}
      <div className="flex items-center justify-between text-body-xs text-ink-muted">
        <span>
          Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? 'question' : 'questions'}
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

      {/* Accordion list */}
      {accordionItems.length > 0 ? (
        <Accordion items={accordionItems} allowMultiple />
      ) : (
        <EmptyState
          title="No questions found"
          description="Try broadening your search query or contact our team directly for assistance."
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

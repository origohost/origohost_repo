'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import type { GalleryItem } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/shared/EmptyState';

export interface GalleryGridProps {
  initialItems: GalleryItem[];
}

export function GalleryGrid({ initialItems }: GalleryGridProps) {
  const [selectedCollection, setSelectedCollection] = useState<string>('All');

  const collections = useMemo(() => {
    const list = initialItems.map((item) => item.collection);
    return ['All', ...Array.from(new Set(list))];
  }, [initialItems]);

  const filtered = useMemo(() => {
    return initialItems.filter((item) => {
      return selectedCollection === 'All' || item.collection === selectedCollection;
    });
  }, [initialItems, selectedCollection]);

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {collections.map((col) => (
          <button
            key={col}
            type="button"
            onClick={() => setSelectedCollection(col)}
            className={`px-3.5 py-1.5 rounded-btn text-body-sm font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              selectedCollection === col
                ? 'bg-primary text-white shadow-xs'
                : 'text-ink-secondary hover:text-ink hover:bg-surface-elevated'
            }`}
          >
            {col}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group rounded-card bg-surface border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col"
            >
              <div className="relative aspect-[16/10] bg-surface-elevated overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-102"
                  loading="lazy"
                  unoptimized
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="primary" className="!bg-[#001857]/80 !text-white !border-white/20 backdrop-blur-sm">
                    {item.collection}
                  </Badge>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <h4 className="font-display font-bold text-heading-md text-ink mb-1">
                    {item.title}
                  </h4>
                  {item.caption && (
                    <p className="text-body-sm text-ink-secondary line-clamp-2">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No media found"
          description="No photographs uploaded under this collection category yet."
          actionLabel="View All Photos"
          onActionClick={() => setSelectedCollection('All')}
        />
      )}
    </div>
  );
}

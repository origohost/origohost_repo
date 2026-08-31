'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import type { Article } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';

export interface ArticleCardProps {
  article: Article;
}

const categoryGradients: Record<string, string> = {
  News:         'linear-gradient(135deg, #001857 0%, #1468FF 100%)',
  'Case Study': 'linear-gradient(135deg, #065F46 0%, #001857 100%)',
  Tutorial:     'linear-gradient(135deg, #001857 0%, #7C3AED 100%)',
  Announcement: 'linear-gradient(135deg, #001857 0%, #0055FF 100%)',
  Insight:      'linear-gradient(135deg, #001857 0%, #A15C00 100%)',
  default:      'linear-gradient(135deg, #001857 0%, #0055FF 100%)',
};

export function ArticleCard({ article }: ArticleCardProps) {
  const isReducedMotion = useReducedMotion();
  const banner = categoryGradients[article.category] ?? categoryGradients.default;

  return (
    <motion.div
      whileHover={isReducedMotion ? {} : { y: -3 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col h-full bg-white dark:bg-surface rounded-card border border-[#E2E8F0] dark:border-border overflow-hidden shadow-xs hover:border-primary/40 transition-all duration-200"
    >
      {/* ── Banner ───────────────────────────────────────────────────── */}
      <div
        className="relative aspect-[16/8] flex items-center justify-center overflow-hidden"
        style={{ background: banner }}
      >
        <span className="font-display font-bold text-white/20 text-4xl select-none tracking-tight">
          {article.category}
        </span>
        <div className="absolute top-3 left-3">
          <Badge variant="primary" className="!bg-brand-navy/80 !text-white !border-white/20 backdrop-blur-sm">
            {article.category}
          </Badge>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-grow p-5">
        <div className="flex items-center gap-2 mb-2.5 text-ink-muted text-body-xs">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{formatDate(article.publishedAt)}</span>
          </div>
          {article.author && (
            <>
              <span className="text-ink-muted/40">·</span>
              <div className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="truncate max-w-[120px]">{article.author.name}</span>
              </div>
            </>
          )}
        </div>

        <Link href={`/blog/${article.slug}`} className="group/title block mb-2 outline-none">
          <h3 className="font-display font-bold text-heading-md line-clamp-2 text-ink group-hover/title:text-primary transition-colors duration-150">
            {article.title}
          </h3>
        </Link>

        <p className="text-body-sm text-ink-secondary line-clamp-3 mb-5 flex-grow leading-relaxed">
          {article.excerpt}
        </p>

        <div className="pt-3.5 border-t border-border/60 mt-auto">
          <Link
            href={`/blog/${article.slug}`}
            className="inline-flex items-center gap-1 text-primary font-semibold text-body-sm hover:gap-1.5 transition-all duration-150 outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-xs"
          >
            Read Article
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FileText, Download, ExternalLink, ArrowRight } from 'lucide-react';
import type { Resource } from '@/types';
import { Badge } from '@/components/ui/Badge';

export interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const isReducedMotion = useReducedMotion();
  const isExternal = resource.type === 'External' || resource.url.startsWith('http');
  const isPdf = resource.url.endsWith('.pdf');

  return (
    <motion.div
      whileHover={isReducedMotion ? {} : { y: -3 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col h-full bg-white dark:bg-surface rounded-card border border-[#E2E8F0] dark:border-border overflow-hidden shadow-xs hover:border-primary/40 transition-all duration-200 p-6"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center justify-center h-10 w-10 rounded-btn bg-primary/10 text-primary shrink-0">
          {isPdf ? <Download className="h-5 w-5" aria-hidden="true" /> : <FileText className="h-5 w-5" aria-hidden="true" />}
        </div>
        <div className="flex items-center gap-1.5">
          <Badge variant="outline">{resource.category}</Badge>
          <Badge variant="secondary">{resource.type}</Badge>
        </div>
      </div>

      <a
        href={resource.url}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="group/title block mb-2 outline-none"
      >
        <h3 className="font-display font-bold text-heading-md line-clamp-2 text-ink group-hover/title:text-primary transition-colors duration-150">
          {resource.title}
        </h3>
      </a>

      <p className="text-body-sm text-ink-secondary line-clamp-3 mb-6 flex-grow leading-relaxed">
        {resource.description}
      </p>

      {/* Focus Area Tags */}
      {resource.focusAreas && resource.focusAreas.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-5">
          {resource.focusAreas.map((area) => (
            <span
              key={area}
              className="inline-flex items-center px-2 py-0.5 rounded-btn text-body-xs font-medium bg-surface-elevated text-ink-muted border border-border"
            >
              {area}
            </span>
          ))}
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-3.5 border-t border-border/60 mt-auto flex items-center justify-between">
        <span className="text-body-xs text-ink-muted">
          {isPdf ? 'PDF Document' : 'Resource Link'}
        </span>
        <a
          href={resource.url}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="inline-flex items-center gap-1 text-primary font-semibold text-body-sm hover:gap-1.5 transition-all duration-150 outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-xs"
        >
          {isPdf ? 'Download Guide' : 'Access Resource'}
          {isExternal ? (
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          )}
        </a>
      </div>
    </motion.div>
  );
}

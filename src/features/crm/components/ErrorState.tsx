'use client';

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Heading, Text } from '@/components/ui';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'An Error Occurred',
  message = 'Failed to load operational data. Please check your credentials or network connection.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="p-8 rounded-card bg-rose-500/5 border border-rose-500/20 text-center space-y-3 flex flex-col items-center justify-center">
      <div className="p-2.5 rounded-full bg-rose-500/10 text-rose-500">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <Heading as="h3" size="sm" className="text-ink">
        {title}
      </Heading>
      <Text size="xs" variant="secondary" className="max-w-md mx-auto">
        {message}
      </Text>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn bg-surface border border-border text-body-xs font-semibold text-ink hover:bg-surface-elevated transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Retry Action
        </button>
      )}
    </div>
  );
}

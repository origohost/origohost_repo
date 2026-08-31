'use client';

import React, { useEffect } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Heading, Text } from '@/components/ui';
import { Button } from '@/components/buttons/Button';
import { Container } from '@/components/layout';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('[ErrorBoundary] Caught runtime exception:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center flex-grow text-center px-4 py-24 sm:py-32 bg-bg">
      <Container size="sm" className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-card bg-accent-orange/10 text-accent-orange flex items-center justify-center mb-6 border border-accent-orange/20">
          <AlertCircle className="h-8 w-8" aria-hidden="true" />
        </div>

        <span className="text-caption font-mono text-accent-orange uppercase font-bold tracking-wider mb-2">
          System Notice
        </span>

        <Heading as="h1" size="xl" className="text-ink mb-3">
          Something Went Wrong
        </Heading>

        <Text size="md" variant="secondary" className="max-w-md mb-8 mx-auto leading-relaxed">
          An unexpected error occurred during execution. Our engineering team has been notified. You can retry the request or return to the main dashboard.
        </Text>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button onClick={reset} variant="primary" size="lg">
            <RefreshCw className="h-4 w-4 mr-1.5" aria-hidden="true" />
            Try Again
          </Button>
          <Button href="/" variant="secondary" size="lg">
            <Home className="h-4 w-4 mr-1.5" aria-hidden="true" />
            Return Home
          </Button>
        </div>
      </Container>
    </div>
  );
}

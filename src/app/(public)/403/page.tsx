import React from 'react';
import type { Metadata } from 'next';
import { ShieldAlert, ArrowRight, Home } from 'lucide-react';
import { Heading, Text } from '@/components/ui';
import { Button } from '@/components/buttons/Button';
import { Container } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Access Forbidden (403) — OrigoHOST',
  description: 'You do not have permission to access the requested resource.',
};

export default function ForbiddenPage() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow text-center px-4 py-24 sm:py-32 bg-bg">
      <Container size="sm" className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-card bg-accent-orange/10 text-accent-orange flex items-center justify-center mb-6 border border-accent-orange/20">
          <ShieldAlert className="h-8 w-8" aria-hidden="true" />
        </div>

        <span className="text-caption font-mono text-accent-orange uppercase font-bold tracking-wider mb-2">
          Access Restricted
        </span>

        <Heading as="h1" size="xl" className="text-ink mb-3">
          403 — Forbidden
        </Heading>

        <Text size="md" variant="secondary" className="max-w-md mb-8 mx-auto leading-relaxed">
          You do not have sufficient permissions to access this administrative endpoint or private resource. Return to the public directory.
        </Text>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button href="/" variant="primary" size="lg">
            <Home className="h-4 w-4 mr-1.5" aria-hidden="true" />
            Return Home
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Contact Support
          </Button>
        </div>
      </Container>
    </div>
  );
}

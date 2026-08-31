import React from 'react';
import Link from 'next/link';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { Heading, Text } from '@/components/ui';
import { Button } from '@/components/buttons/Button';
import { Container } from '@/components/layout';

export const metadata = {
  title: 'Page Not Found (404) — OrigoHOST',
  description: 'The page you requested could not be found. Return to OrigoHOST home page.',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow text-center px-4 py-24 sm:py-32 bg-bg">
      <Container size="sm" className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-card bg-primary/10 text-primary flex items-center justify-center mb-6 border border-primary/20">
          <HelpCircle className="h-8 w-8" aria-hidden="true" />
        </div>

        <span className="text-caption font-mono text-primary uppercase font-bold tracking-wider mb-2">
          Error 404
        </span>

        <Heading as="h1" size="xl" className="text-ink mb-3">
          Page Not Found
        </Heading>

        <Text size="md" variant="secondary" className="max-w-md mb-8 mx-auto leading-relaxed">
          The requested URL or resource could not be found on this server. Check your link spelling or return to the main ecosystem directory.
        </Text>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button href="/" variant="primary" size="lg">
            Return Home
            <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
          </Button>
          <Button href="/search" variant="secondary" size="lg">
            Search Site
          </Button>
        </div>
      </Container>
    </div>
  );
}

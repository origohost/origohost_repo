import type { Metadata } from 'next';

export interface SEOOptions {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
}

const DEFAULT_SITE_NAME = 'OrigoHOST';
const DEFAULT_TAGLINE = 'Empowering Tech Communities, Startups & Developers';
const DEFAULT_OG_IMAGE = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&h=630&q=80';
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export function buildMetadata(options: SEOOptions = {}): Metadata {
  const metaTitle = options.title ? `${options.title} | ${DEFAULT_SITE_NAME}` : `${DEFAULT_SITE_NAME} — ${DEFAULT_TAGLINE}`;
  const metaDescription = options.description || DEFAULT_TAGLINE;
  const canonical = options.canonicalUrl || BASE_URL;
  const ogImage = options.ogImage || DEFAULT_OG_IMAGE;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonical,
      siteName: DEFAULT_SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [ogImage],
    },
    robots: options.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

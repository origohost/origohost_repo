import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/crm/',
        '/api/',
        '/preview',
        '/maintenance',
        '/403',
        '/500',
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

import { NextResponse } from 'next/server';
import { getArticles, getEvents } from '@/services';
import { getPrograms } from '@/services/content/programs.service';
import type { Article, Event, Program } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function GET() {
  const articles: Article[] = await getArticles();
  const events: Event[] = await getEvents();
  const programs: Program[] = await getPrograms();

  const staticUrls = [
    { loc: `${BASE_URL}/`, priority: '1.0', changefreq: 'daily' },
    { loc: `${BASE_URL}/about`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${BASE_URL}/blog`, priority: '0.9', changefreq: 'daily' },
    { loc: `${BASE_URL}/events`, priority: '0.9', changefreq: 'daily' },
    { loc: `${BASE_URL}/programs`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${BASE_URL}/resources`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${BASE_URL}/faq`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${BASE_URL}/community`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${BASE_URL}/contact`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${BASE_URL}/join`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${BASE_URL}/sitemap`, priority: '0.5', changefreq: 'monthly' },
  ];

  const articleUrls = articles.map((article) => ({
    loc: `${BASE_URL}/blog/${article.slug}`,
    lastmod: new Date(article.publishedAt).toISOString(),
    priority: '0.8',
    changefreq: 'weekly',
  }));

  const eventUrls = events.map((event) => ({
    loc: `${BASE_URL}/events/${event.slug}`,
    lastmod: new Date(event.startDate).toISOString(),
    priority: '0.8',
    changefreq: 'weekly',
  }));

  const programUrls = programs.map((program) => ({
    loc: `${BASE_URL}/programs/${program.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
  }));

  const allUrls = [...staticUrls, ...articleUrls, ...eventUrls, ...programUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (item) => `  <url>
    <loc>${item.loc}</loc>
    ${'lastmod' in item ? `<lastmod>${item.lastmod}</lastmod>` : `<lastmod>${new Date().toISOString()}</lastmod>`}
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}

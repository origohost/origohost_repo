import { events } from '@/data/events/events.data';
import { programs } from '@/data/programs/programs.data';
import { resources } from '@/data/resources/resources.data';
import { articles } from '@/data/blog/blog.data';
import { faqs } from '@/data/faq/faq.data';

export type SearchResultType = 'event' | 'program' | 'resource' | 'article' | 'faq';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: SearchResultType;
  url: string;
  category: string;
  badge?: string;
}

export interface SearchOptions {
  type?: SearchResultType | 'all';
  limit?: number;
}

export async function searchEcosystem(
  query: string,
  options: SearchOptions = {}
): Promise<{ results: SearchResult[]; total: number }> {
  const q = query.toLowerCase().trim();
  if (!q) {
    return { results: [], total: 0 };
  }

  const matches: SearchResult[] = [];
  const targetType = options.type || 'all';

  // 1. Events
  if (targetType === 'all' || targetType === 'event') {
    for (const e of events) {
      if (
        e.title.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q) ||
        e.location.name.toLowerCase().includes(q) ||
        e.focusAreas.some((fa) => fa.toLowerCase().includes(q))
      ) {
        matches.push({
          id: `event-${e.id}`,
          title: e.title,
          description: e.summary,
          type: 'event',
          url: `/events/${e.slug}`,
          category: e.format,
          badge: e.status,
        });
      }
    }
  }

  // 2. Programs
  if (targetType === 'all' || targetType === 'program') {
    for (const p of programs) {
      if (
        p.name.toLowerCase().includes(q) ||
        p.purpose.toLowerCase().includes(q) ||
        p.focusAreas.some((fa) => fa.toLowerCase().includes(q))
      ) {
        matches.push({
          id: `program-${p.id}`,
          title: p.name,
          description: p.purpose,
          type: 'program',
          url: `/programs/${p.slug}`,
          category: p.seriesStructure || 'Cohort',
          badge: p.status,
        });
      }
    }
  }

  // 3. Resources
  if (targetType === 'all' || targetType === 'resource') {
    for (const r of resources) {
      if (
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        (r.focusAreas && r.focusAreas.some((fa) => fa.toLowerCase().includes(q)))
      ) {
        matches.push({
          id: `resource-${r.id}`,
          title: r.title,
          description: r.description,
          type: 'resource',
          url: r.url,
          category: r.category,
          badge: r.type,
        });
      }
    }
  }

  // 4. Articles
  if (targetType === 'all' || targetType === 'article') {
    for (const a of articles) {
      if (
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        (a.tags && a.tags.some((t) => t.toLowerCase().includes(q)))
      ) {
        matches.push({
          id: `article-${a.id}`,
          title: a.title,
          description: a.excerpt,
          type: 'article',
          url: `/blog/${a.slug}`,
          category: a.category,
          badge: 'Article',
        });
      }
    }
  }

  // 5. FAQs
  if (targetType === 'all' || targetType === 'faq') {
    for (const f of faqs) {
      if (f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)) {
        matches.push({
          id: `faq-${f.id}`,
          title: f.question,
          description: f.answer,
          type: 'faq',
          url: `/faq#${f.id}`,
          category: f.category,
          badge: 'FAQ',
        });
      }
    }
  }

  const total = matches.length;
  const results = options.limit && options.limit > 0 ? matches.slice(0, options.limit) : matches;

  return { results, total };
}

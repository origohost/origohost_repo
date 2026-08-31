import { articles } from '@/data/blog/blog.data';
import type { Article, ArticleCategory } from '@/types';

export interface ArticleFilterOptions {
  category?: ArticleCategory | string | 'All';
  search?: string;
  limit?: number;
}

/**
 * Retrieves all articles matching optional criteria.
 */
export async function getArticles(options: ArticleFilterOptions = {}): Promise<Article[]> {
  let filtered = [...articles];

  if (options.category && options.category !== 'All') {
    filtered = filtered.filter(
      (a) => a.category.toLowerCase() === options.category!.toLowerCase()
    );
  }

  if (options.search) {
    const q = options.search.toLowerCase().trim();
    filtered = filtered.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        (a.tags && a.tags.some((t) => t.toLowerCase().includes(q)))
    );
  }

  if (options.limit && options.limit > 0) {
    filtered = filtered.slice(0, options.limit);
  }

  return filtered;
}

/**
 * Retrieves a single article by its URL slug.
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const article = articles.find((a) => a.slug === slug || a.id === slug);
  return article || null;
}

/**
 * Retrieves featured articles.
 */
export async function getFeaturedArticles(limit = 1): Promise<Article[]> {
  const featured = articles.filter((a) => a.featured);
  return featured.slice(0, limit);
}

/**
 * Retrieves related articles excluding the current slug.
 */
export async function getRelatedArticles(
  currentSlug: string,
  category: string,
  limit = 2
): Promise<Article[]> {
  const related = articles.filter(
    (a) => a.slug !== currentSlug && a.category.toLowerCase() === category.toLowerCase()
  );
  if (related.length >= limit) {
    return related.slice(0, limit);
  }
  // Fallback to any other articles if not enough in same category
  const fallback = articles.filter((a) => a.slug !== currentSlug);
  return fallback.slice(0, limit);
}

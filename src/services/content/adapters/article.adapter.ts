import type { Article } from '@/types';

export function mapBlogPostToArticle(data: any): Article {
  return {
    id: data.id || data.slug,
    title: data.title || '',
    slug: data.slug || '',
    excerpt: data.excerpt || '',
    body: data.content || '',
    category: typeof data.category === 'object' ? data.category?.name : data.category || 'Technology',
    author: {
      name: typeof data.author === 'object' ? data.author?.name : 'OrigoHOST Team',
      role: 'Contributor',
    },
    publishedAt: data.publishedAt || data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt,
    featuredImage: typeof data.featuredImage === 'object' ? data.featuredImage?.url : data.featuredImage || '/images/blog/default.webp',
    tags: data.tags || [],
    relatedEvents: data.relatedEvents || [],
    relatedPrograms: data.relatedPrograms || [],
    status: data.status || 'Published',
    featured: Boolean(data.featured),
  };
}

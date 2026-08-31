export type ArticleCategory = 'Community' | 'Events' | 'Technology' | 'Ecosystem' | 'News' | 'Announcements';
export type ArticleStatus = 'Published' | 'Draft' | 'Archived';

export interface ArticleAuthor {
  name: string;
  role?: string;
  avatar?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body?: string;
  category: ArticleCategory;
  author?: ArticleAuthor;
  publishedAt: string;
  updatedAt?: string;
  featuredImage: string;
  tags: string[];
  relatedEvents: string[];
  relatedPrograms: string[];
  status: ArticleStatus;
  featured: boolean;
}

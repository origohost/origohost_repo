export type ResourceCategory = 'Guide' | 'Documentation' | 'Video' | 'Tool' | 'Publication' | 'Article' | 'Course';
export type ResourceType = 'Internal' | 'External';

export interface Resource {
  id: string;
  slug: string;
  title: string;
  category: ResourceCategory;
  type: ResourceType;
  description: string;
  source?: string;
  url: string;
  focusAreas: string[];
  tags: string[];
  publicationDate?: string;
  featured: boolean;
  createdAt: string;
}

export type GalleryItemType = 'Image' | 'Video';

export interface GalleryItem {
  id: string;
  title: string;
  caption?: string;
  type: GalleryItemType;
  src: string;
  thumbnailSrc?: string;
  collection: string;
  eventSlug?: string;
  date?: string;
  tags: string[];
  order: number;
}

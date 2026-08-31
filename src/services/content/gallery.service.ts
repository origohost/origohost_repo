import { gallery } from '@/data/gallery/gallery.data';
import type { GalleryItem } from '@/types';

export async function getGalleryItems(collection?: string): Promise<GalleryItem[]> {
  if (!collection || collection === 'All') {
    return gallery;
  }
  return gallery.filter((item) => item.collection.toLowerCase() === collection.toLowerCase());
}

export async function getGalleryCollections(): Promise<string[]> {
  const list = gallery.map((item) => item.collection);
  return ['All', ...Array.from(new Set(list))];
}

import type { GalleryItem } from '@/types';

export const gallery: GalleryItem[] = [
  {
    id: 'gal-01',
    title: 'CyberForge 2026 Collaboration Session',
    caption: 'Developers working in teams during the 24-hour cybersecurity hackathon at GL Bajaj.',
    type: 'Image',
    src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800',
    collection: 'CyberForge 2026',
    eventSlug: 'cyberforge-2026',
    tags: ['hackathon', 'cybersecurity', 'gl-bajaj'],
    order: 1,
  },
  {
    id: 'gal-02',
    title: 'KSS2026 Panel Discussion',
    caption: 'Industry practitioners sharing insights during the webinar Q&A session.',
    type: 'Image',
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800',
    collection: 'KSS2026',
    eventSlug: 'kss2026-ep03-cybersecurity-ethical-hacking',
    tags: ['webinar', 'panel', 'kss2026'],
    order: 2,
  },
];

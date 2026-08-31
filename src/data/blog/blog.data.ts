import type { Article } from '@/types';

export const articles: Article[] = [
  {
    id: 'art-01',
    slug: 'launching-kss-2026-webinar-series',
    title: 'Launching KSS2026: Knowledge Sharing webinar Series for Builders',
    excerpt:
      'We are officially launching the Knowledge Sharing Series (KSS2026) webinar, designed to connect developers directly with technical experts and practitioners.',
    category: 'News',
    author: {
      name: 'Ritik Kumar',
      role: 'Community Director',
    },
    publishedAt: '2026-08-20',
    featuredImage: '/images/blog/kss-launch.webp',
    tags: ['kss2026', 'announcements', 'education'],
    relatedEvents: ['kss2026-ep03-cybersecurity-ethical-hacking'],
    relatedPrograms: ['knowledge-sharing-series-2026'],
    status: 'Published',
    featured: true,
  },
  {
    id: 'art-02',
    slug: 'cyberforge-2026-hackathon-highlights',
    title: 'CyberForge 2026 Hackathon: Concluded with Success at GL Bajaj',
    excerpt:
      'CyberForge 2026 brought together developers and cybersecurity enthusiasts for 24 hours of challenge solving and collaborative building.',
    category: 'Events',
    author: {
      name: 'Tarun Kumar',
      role: 'President',
    },
    publishedAt: '2026-06-15',
    featuredImage: '/images/blog/cyberforge-highlights.webp',
    tags: ['hackathon', 'cybersecurity', 'gl-bajaj'],
    relatedEvents: ['cyberforge-2026'],
    relatedPrograms: [],
    status: 'Published',
    featured: true,
  },
];

import type { Program } from '@/types';

export const programs: Program[] = [
  {
    id: 'kss-2026',
    slug: 'knowledge-sharing-series-2026',
    name: 'Knowledge Sharing Series 2026 (KSS2026)',
    purpose:
      'A structured, episode-based webinar series where technology practitioners share verified knowledge, practical insights and real-world experience with the OrigoHOST community.',
    description:
      'KSS2026 is OrigoHOST\'s flagship knowledge-sharing program for 2026. Delivered as a series of online episodes, each session focuses on a specific technology domain — presented by practitioners with direct experience. Topics span cybersecurity, cloud computing, DevOps, AI/ML, open source and more. KSS2026 is designed for students, learners and developers looking for practical, accessible knowledge beyond textbooks.',
    audience: ['Students', 'Learners', 'Developers', 'Professionals'],
    focusAreas: [
      'Cybersecurity',
      'Cloud Computing',
      'DevOps',
      'Artificial Intelligence',
      'Open Source',
    ],
    status: 'Active',
    seriesStructure: 'Episode-based webinar series — multiple episodes per year',
    relatedEvents: [
      'kss2026-ep03-cybersecurity-ethical-hacking',
      'kss2026-ep04-cloud-devops',
    ],
    participationCTA: {
      label: 'Register for the Next Episode',
      url: '/events/kss2026-ep04-cloud-devops',
    },
    coverImage: '/images/programs/kss2026.webp',
    tags: ['knowledge-sharing', 'webinar-series', 'education'],
    featured: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-28T00:00:00Z',
  },
  {
    id: 'origo-ai-foundation',
    slug: 'origo-ai-foundation-program',
    name: 'OrigoHOST AI Foundation Program',
    purpose:
      'An introductory program exploring artificial intelligence, machine learning and generative AI — designed to make AI accessible to builders at all levels.',
    description:
      'The OrigoHOST AI Foundation Program is an emerging initiative from OrigoHOST AI focused on making artificial intelligence concepts accessible, practical and applicable. The program includes workshops, hands-on build sessions, mentorship touchpoints and community discussions across AI sub-domains including generative AI, LLMs, computer vision and applied ML.',
    audience: ['Students', 'Developers', 'Researchers'],
    focusAreas: ['Artificial Intelligence', 'Machine Learning', 'Generative AI'],
    status: 'Upcoming',
    relatedEvents: ['generative-ai-workshop-2026'],
    participationCTA: {
      label: 'Join the Waitlist',
      url: '/join',
    },
    coverImage: '/images/programs/origo-ai-foundation.webp',
    tags: ['ai', 'machine-learning', 'generative-ai'],
    featured: true,
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-28T00:00:00Z',
  },
];

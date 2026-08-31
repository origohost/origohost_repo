import type { Resource } from '@/types';

export const resources: Resource[] = [
  {
    id: 'res-01',
    slug: 'git-github-guide-for-builders',
    title: 'Git & GitHub Version Control Guide',
    category: 'Guide',
    type: 'Internal',
    description: 'A practical, step-by-step documentation guide covering git flow, pull requests, commit guidelines and repository management for community projects.',
    url: '/documents/git-github-guide.pdf',
    focusAreas: ['Open Source', 'DevOps'],
    tags: ['git', 'github', 'version-control'],
    featured: true,
    createdAt: '2026-08-10T00:00:00Z',
  },
  {
    id: 'res-02',
    slug: 'cloud-hosting-basics-vps',
    title: 'Deploying to VPS & Bare-Metal Basics',
    category: 'Documentation',
    type: 'Internal',
    description: 'Practical guides from OrigoHOST Cloud on provisioning virtual private servers, configuring firewalls, setting reverse proxies and managing secure SSH access.',
    url: '/documents/cloud-vps-deployment.pdf',
    focusAreas: ['Cloud Computing', 'Infrastructure & Hosting'],
    tags: ['cloud', 'vps', 'linux'],
    featured: true,
    createdAt: '2026-08-15T00:00:00Z',
  },
];

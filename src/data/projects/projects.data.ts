import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'proj-01',
    slug: 'origo-cloud-dashboard',
    name: 'OrigoHOST Cloud Compute Dashboard',
    domain: 'Infrastructure & Cloud',
    description:
      'An open-source portal for provisioning virtual servers, monitoring CPU/RAM workloads and managing private subnet keys securely across the OrigoHOST Cloud environment.',
    contributors: ['Brajesh Kumar', 'Tarun Kumar'],
    technologies: ['React', 'TypeScript', 'Node.js', 'OrigoHOST Cloud VPS API'],
    status: 'Active',
    url: 'https://github.com/origohost/cloud-compute-dashboard',
    featured: true,
  },
  {
    id: 'proj-02',
    slug: 'cyberforge-security-auditor',
    name: 'CyberForge Vulnerability Scanner',
    domain: 'Cybersecurity',
    description:
      'An experimental security utility built during the CyberForge 2026 hackathon that performs automated network port scanning, service fingerprinting, and CVE mapping for unpatched services.',
    contributors: ['Ritik Kumar', 'Brajesh Kumar'],
    technologies: ['Python', 'Docker', 'Shell scripting'],
    status: 'Experimental',
    url: 'https://github.com/origohost/cyberforge-scanner',
    featured: true,
  },
  {
    id: 'proj-03',
    slug: 'origo-devkit',
    name: 'OrigoHOST DevKit — Starter Templates',
    domain: 'Developer Tooling',
    description:
      'A curated library of production-ready Next.js, Express, and FastAPI starter templates maintained by the OrigoHOST engineering team to accelerate community project scaffolding.',
    contributors: ['Tarun Kumar', 'Arjun Mehta'],
    technologies: ['Next.js', 'TypeScript', 'FastAPI', 'Docker', 'GitHub Actions'],
    status: 'Active',
    url: 'https://github.com/origohost/origo-devkit',
    featured: true,
  },
  {
    id: 'proj-04',
    slug: 'kss-ai-summarizer',
    name: 'KSS Session AI Summarizer',
    domain: 'Artificial Intelligence',
    description:
      'An open-source tool built by KSS cohort participants that uses open-weight LLMs to auto-generate structured technical summaries, Q&A transcripts, and chapter notes from OrigoHOST webinar recordings.',
    contributors: ['Priya Sharma', 'Ritik Kumar'],
    technologies: ['Python', 'Llama 3', 'LangChain', 'Whisper', 'FastAPI'],
    status: 'Experimental',
    url: 'https://github.com/origohost/kss-ai-summarizer',
    featured: false,
  },
  {
    id: 'proj-05',
    slug: 'origo-chapter-portal',
    name: 'Campus Chapter Management Portal',
    domain: 'Community Infrastructure',
    description:
      'An internal web portal enabling official OrigoHOST Campus Chapter leads to submit activity reports, download curriculum packages, request speaker nominations, and track membership metrics.',
    contributors: ['Brajesh Kumar', 'Priya Sharma'],
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'TypeScript', 'Resend'],
    status: 'Active',
    url: 'https://github.com/origohost/chapter-portal',
    featured: false,
  },
];

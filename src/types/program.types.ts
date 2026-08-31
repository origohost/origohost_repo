export type ProgramStatus = 'Active' | 'Completed' | 'Upcoming' | 'Paused';

export interface ProgramCTA {
  label: string;
  url: string;
}

export interface Program {
  id: string;
  slug: string;
  name: string;
  purpose: string;
  description?: string;
  audience: string[];
  focusAreas: string[];
  status: ProgramStatus;
  seriesStructure?: string;
  relatedEvents: string[];
  participationCTA?: ProgramCTA;
  coverImage: string;
  tags: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

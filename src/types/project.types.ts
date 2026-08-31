export type ProjectStatus = 'Active' | 'Completed' | 'In Progress' | 'Experimental';

export interface Project {
  id: string;
  slug: string;
  name: string;
  domain: string;
  description: string;
  contributors: string[];
  technologies: string[];
  status: ProjectStatus;
  url?: string;
  coverImage?: string;
  featured: boolean;
}

export interface CrmSegment {
  id: string;
  name: string;
  description: string;
  filters: {
    status?: string[];
    tags?: string[];
    role?: string[];
    pathway?: string[];
    searchQuery?: string;
  };
  memberCount: number;
  createdAt: string;
  updatedAt: string;
}

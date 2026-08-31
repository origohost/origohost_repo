export interface CommunityChapter {
  id: string;
  name: string;
  institution: string;
  leadName: string;
  status: 'active' | 'pending' | 'archived';
}

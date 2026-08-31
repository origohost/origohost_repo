export interface CommunityStory {
  id: string;
  name: string;
  role: 'Member' | 'Builder' | 'Speaker' | 'Mentor' | 'Chapter Lead';
  story: string;
  avatar?: string;
  projectName?: string;
  chapterName?: string;
  verified: boolean;
}

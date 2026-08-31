export type EventType = 'Institutional' | 'Open Community' | 'Collaborative';

export type EventFormat =
  | 'Meetup' | 'Workshop' | 'Webinar' | 'Hackathon' | 'Ideathon'
  | 'Buildathon' | 'Seminar' | 'Conference' | 'Training' | 'Panel'
  | 'Showcase' | 'Challenge' | 'Networking';

export type EventPurpose =
  | 'Learn' | 'Build' | 'Compete' | 'Innovate' | 'Connect'
  | 'Develop' | 'Showcase' | 'Solve' | 'Inspire'
  | 'Lead' | 'Collaborate';

export type EventDelivery = 'Online' | 'Offline' | 'Hybrid';

export type EventStatus = 'Upcoming' | 'Ongoing' | 'Past' | 'Cancelled';

export interface EventLocation {
  name: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  mapUrl?: string;
  platformUrl?: string;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description?: string;
  type: EventType;
  format: EventFormat;
  purpose: EventPurpose[];
  delivery: EventDelivery;
  status: EventStatus;
  startDate: string;
  endDate?: string;
  location: EventLocation;
  audience: string[];
  focusAreas: string[];
  registrationUrl?: string;
  registrationDeadline?: string;
  coverImage: string;
  gallery?: string[];
  relatedProgram?: string;
  partnerInstitution?: string;
  tags: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

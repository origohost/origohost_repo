export type EventMode = "online" | "offline" | "hybrid";
export type EventStatus = "Upcoming" | "Live" | "Past";

export interface EventSpeaker {
  id: string;
  name: string;
  designation: string;
  organization: string;
  bio?: string;
  avatar_url?: string;
  social_links?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
  session_title?: string;
  speaking_time?: string;
}

export interface EventOrganizer {
  id: string;
  name: string;
  role: string;
  logo_url?: string;
  website_url?: string;
}

export interface EventAgendaItem {
  id: string;
  start_time: string;
  title: string;
  description?: string;
}

export interface EventFAQ {
  id: string;
  question: string;
  answer: string;
}

export interface EventV2 {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  long_description?: string;
  banner_url?: string;
  thumbnail_url?: string;

  date: string;
  start_time: string;
  end_time: string;
  timezone: string;

  mode: EventMode;
  venue_name?: string;
  address?: string;
  google_maps_link?: string;

  registration_link?: string;
  registration_deadline?: string;
  max_seats?: number;
  price: number;

  category?: string;
  is_published: boolean;
  gallery?: { id: string; image_url: string; caption?: string }[];

  // Computed on frontend
  status?: EventStatus;

  speakers?: EventSpeaker[];
  organizers?: EventOrganizer[];
  agenda?: EventAgendaItem[];
  faqs?: EventFAQ[];
}

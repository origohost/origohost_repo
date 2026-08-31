// ─── Re-export all types ─────────────────────────────────────────────────
export type { Project, ProjectStatus } from './project.types';
export type { CommunityStory } from './story.types';
export type { Event, EventType, EventFormat, EventPurpose, EventDelivery, EventStatus, EventLocation } from './event.types';
export type { Program, ProgramStatus, ProgramCTA } from './program.types';
export type { Resource, ResourceCategory, ResourceType } from './resource.types';
export type { Article, ArticleCategory, ArticleStatus, ArticleAuthor } from './article.types';
export type { TeamMember, TeamMemberLinks } from './team.types';
export type { Partner, PartnerCategory, PartnerStatus } from './partner.types';
export type { Sponsor, SponsorStatus } from './sponsor.types';
export type { GalleryItem, GalleryItemType } from './gallery.types';
export type { FAQItem, FAQCategory, FAQRelatedLink } from './faq.types';
export type { ContactInquiry, ContactCategory } from './contact.types';
export type { UserRole, UserPermission, UserProfile, AuthSession } from './auth';
export * from './crm';

// ─── Common utility types ─────────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  external?: boolean;
}

export interface SocialLink {
  platform: string;
  href: string;
  label: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  nav: NavItem[];
  footerNav: FooterNavGroup[];
  social: SocialLink[];
}

export interface FooterNavGroup {
  heading: string;
  links: NavItem[];
}

export interface SEOMeta {
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
}

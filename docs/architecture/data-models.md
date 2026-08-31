# OrigoHOST — Data Models

Core content entity TypeScript types for the OrigoHOST website.
These definitions live in `src/types/` and drive both static data files and any future CMS/database schema.

---

## 1. Event

```ts
// src/types/event.types.ts

export type EventType = 'Institutional' | 'Open Community' | 'Collaborative';

export type EventFormat =
  | 'Meetup' | 'Workshop' | 'Webinar' | 'Hackathon' | 'Ideathon'
  | 'Buildathon' | 'Seminar' | 'Conference' | 'Training' | 'Panel'
  | 'Showcase' | 'Challenge' | 'Networking';

export type EventPurpose =
  | 'Learn' | 'Build' | 'Compete' | 'Innovate' | 'Connect'
  | 'Develop' | 'Showcase' | 'Solve' | 'Inspire';

export type EventDelivery = 'Online' | 'Offline' | 'Hybrid';

export type EventStatus = 'Upcoming' | 'Ongoing' | 'Past' | 'Cancelled';

export interface EventLocation {
  name: string;
  address?: string;
  city?: string;
  state?: string;
  country: string;
  mapUrl?: string;
  platformUrl?: string;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  summary: string;            // Max 200 chars
  description?: string;       // Long-form MDX content path or string
  type: EventType;
  format: EventFormat;
  purpose: EventPurpose[];
  delivery: EventDelivery;
  status: EventStatus;
  startDate: string;          // ISO 8601
  endDate?: string;           // ISO 8601
  location: EventLocation;
  audience: string[];
  focusAreas: string[];
  registrationUrl?: string;
  registrationDeadline?: string;
  coverImage: string;         // Path: /images/events/filename.webp
  gallery?: string[];
  relatedProgram?: string;    // Program slug
  partnerInstitution?: string;
  tags: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}
```

---

## 2. Program

```ts
// src/types/program.types.ts

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
  description?: string;       // Long-form MDX content path or string
  audience: string[];
  focusAreas: string[];
  status: ProgramStatus;
  seriesStructure?: string;   // e.g. "Episode-based"
  relatedEvents: string[];    // Event slugs
  participationCTA?: ProgramCTA;
  coverImage: string;
  tags: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}
```

---

## 3. Resource

```ts
// src/types/resource.types.ts

export type ResourceCategory =
  | 'Guide' | 'Documentation' | 'Video' | 'Tool' | 'Publication' | 'Article' | 'Course';

export type ResourceType = 'Internal' | 'External';

export interface Resource {
  id: string;
  slug: string;
  title: string;
  category: ResourceCategory;
  type: ResourceType;
  description: string;
  source?: string;
  url: string;
  focusAreas: string[];
  tags: string[];
  publicationDate?: string;   // ISO 8601
  featured: boolean;
  createdAt: string;
}
```

---

## 4. Article (Blog / News)

```ts
// src/types/article.types.ts

export type ArticleCategory =
  | 'Community' | 'Events' | 'Technology' | 'Ecosystem' | 'News' | 'Announcements';

export type ArticleStatus = 'Published' | 'Draft' | 'Archived';

export interface ArticleAuthor {
  name: string;
  role?: string;
  avatar?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;            // Max 250 chars
  body?: string;              // MDX content path or string
  category: ArticleCategory;
  author?: ArticleAuthor;
  publishedAt: string;        // ISO 8601
  updatedAt?: string;
  featuredImage: string;      // Path: /images/blog/filename.webp
  tags: string[];
  relatedEvents: string[];
  relatedPrograms: string[];
  status: ArticleStatus;
  featured: boolean;
}
```

---

## 5. Team Member

```ts
// src/types/team.types.ts

export interface TeamMemberLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  website?: string;
}

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  role: string;               // Approved official public role
  department?: string;
  biography: string;
  avatar: string;             // Path: /images/team/filename.webp
  approvedLinks: TeamMemberLinks;
  featured: boolean;
  order: number;
}
```

---

## 6. Partner

```ts
// src/types/partner.types.ts

export type PartnerCategory =
  | 'Technology' | 'Academic' | 'Industry' | 'Knowledge'
  | 'Hiring' | 'Media' | 'Strategic' | 'Ecosystem';

export type PartnerStatus = 'Active' | 'Past';

export interface Partner {
  id: string;
  slug: string;
  name: string;
  category: PartnerCategory;
  relationshipRole: string[];
  description: string;
  logo: string;               // Path: /images/partners/filename.svg
  website?: string;
  status: PartnerStatus;
  featured: boolean;
}
```

---

## 7. Sponsor

```ts
// src/types/sponsor.types.ts

export type SponsorStatus = 'Active' | 'Past';

export interface Sponsor {
  id: string;
  slug: string;
  name: string;
  tier?: string;
  description: string;
  logo: string;               // Path: /images/sponsors/filename.svg
  website?: string;
  status: SponsorStatus;
  featured: boolean;
}
```

---

## 8. Gallery Item

```ts
// src/types/gallery.types.ts

export type GalleryItemType = 'Image' | 'Video';

export interface GalleryItem {
  id: string;
  title: string;
  caption?: string;
  type: GalleryItemType;
  src: string;                // Path: /images/gallery/filename.webp or video URL
  thumbnailSrc?: string;
  collection: string;
  eventSlug?: string;
  date?: string;              // ISO 8601
  tags: string[];
  order: number;
}
```

---

## 9. FAQ Item

```ts
// src/types/faq.types.ts

export type FAQCategory =
  | 'General' | 'Community' | 'Events' | 'Programs' | 'Participation'
  | 'Partnerships' | 'Sponsorship' | 'Contact' | 'Policies';

export interface FAQRelatedLink {
  label: string;
  url: string;
}

export interface FAQItem {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;             // Markdown supported
  order: number;
  relatedLinks: FAQRelatedLink[];
}
```

---

## 10. Contact Inquiry

```ts
// src/types/contact.types.ts

export type ContactCategory =
  | 'Community / Campus Event'
  | 'Partnership'
  | 'Sponsorship'
  | 'Enterprise / Custom Program'
  | 'General Inquiry'
  | 'Press / Media';

export interface ContactInquiry {
  id: string;                 // Server-generated
  category: ContactCategory;
  name: string;
  email: string;
  organization?: string;
  subject: string;
  message: string;
  consentGiven: boolean;      // Privacy consent checkbox — required
  submittedAt: string;        // ISO 8601 — server timestamp
  ipHash?: string;            // Hashed for spam tracking only
}
```

---

## Data Rules

1. **No unconfirmed partnerships** — partner records require written confirmation.
2. **No invented statistics** — every metric needs source + methodology.
3. **Team records** must match current approved public information.
4. **Event `status`** must be kept current — stale "Upcoming" with past `startDate` is a content error.
5. All images must exist in the correct `public/images/` subdirectory before referencing.
6. All types are imported from `src/types/index.ts` — no local re-declaration in components.
7. **No `any` types** in data files — all records must match their TypeScript interface exactly.

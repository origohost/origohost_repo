# 08 — Content Architecture & Data Models

> **Phase:** Phase 0 — Foundation, Strategy, Structure, Content, UX, SEO & Technical Blueprint  
> **Status:** DECIDED (Typed Static Content Models in `src/data/`)  
> **Classification Standard:** DECIDED | PROPOSED | TBD | OPTIONAL | DEPENDENCY  

---

## 1. Storage & Management Strategy

In Phase 0, all content entities are managed as strictly typed TypeScript data modules located in `src/data/`.  
No heavy headless CMS (e.g. Sanity, Strapi) is introduced in Phase 0 to avoid unnecessary runtime dependencies, authentication overhead, and latency.

---

## 2. Core Entity Specifications

### 1. Events (`src/data/events/events.data.ts`) (`DECIDED`)
- **Required Fields:** `id`, `slug`, `title`, `summary` (max 200 chars), `type` (Institutional | Open Community | Collaborative), `format` (Meetup | Workshop | Webinar | Hackathon | etc.), `delivery` (Online | Offline | Hybrid), `status` (Upcoming | Ongoing | Past | Cancelled), `startDate` (ISO 8601), `location` (name, country), `coverImage`, `featured` (boolean).
- **Optional Fields:** `endDate`, `registrationUrl`, `registrationDeadline`, `gallery[]`, `relatedProgram`, `partnerInstitution`, `focusAreas[]`, `audience[]`, `tags[]`, `description` (long-form markdown).
- **Slug Requirements:** Strictly kebab-case (`kss2026-ep03-cybersecurity-ethical-hacking`).
- **SEO Metadata:** Injects OpenGraph image, Event schema (`startDate`, `location`, `offers`).
- **Image Requirements:** Aspect ratio `16:9`, WebP format, max 200KB, descriptive `altText`.
- **Publication Workflow:** Git pull request review; automated build verification.

### 2. Programs (`src/data/programs/programs.data.ts`) (`DECIDED`)
- **Required Fields:** `id`, `slug`, `name`, `purpose` (one sentence), `status` (Active | Completed | Upcoming | Paused), `description`, `coverImage`.
- **Optional Fields:** `audience[]`, `focusAreas[]`, `seriesStructure`, `relatedEvents[]` (array of event slugs), `participationCTA`, `tags[]`, `featured`.
- **Slug Requirements:** kebab-case (`knowledge-sharing-series-2026`).
- **Relationships:** Maps 1-to-many with events (e.g. KSS Program links to KSS episodes).

### 3. Blog / Articles (`src/data/blog/blog.data.ts`) (`DECIDED`)
- **Required Fields:** `id`, `slug`, `title`, `excerpt` (1–2 sentences, max 250 chars), `body` (structured markdown/MDX), `category`, `publishedAt` (ISO 8601), `status` (Published | Draft | Archived), `featuredImage`.
- **Optional Fields:** `author` (name, role, avatar), `updatedAt`, `tags[]`, `relatedEvents[]`, `relatedPrograms[]`.
- **SEO Metadata:** Article JSON-LD, OpenGraph `type: "article"`, author tags.

### 4. Resources (`src/data/resources/resources.data.ts`) (`DECIDED`)
- **Required Fields:** `id`, `slug`, `title`, `category` (Guide | Starter Kit | Tooling | Chapter Documents), `type` (Internal | External), `url` (valid absolute URL or internal PDF path), `description`.
- **Optional Fields:** `source`, `focusAreas[]`, `tags[]`, `publicationDate`, `featured`.
- **Integrity Rule:** All internal documents must physically exist in `public/documents/`.

### 5. Projects (`src/data/projects/projects.data.ts`) (`PROPOSED` — Phase 2)
- **Required Fields:** `id`, `slug`, `title`, `tagline`, `category`, `repositoryUrl`, `description`, `techStack[]`.
- **Optional Fields:** `demoUrl`, `contributors[]`, `screenshots[]`, `license`.
- **Relationship:** Connects to Origo Dev and hackathon winning submissions.

### 6. Team Members (`src/data/team/team.data.ts`) (`DECIDED`)
- **Required Fields:** `id`, `name`, `role`, `department` (Leadership | Technical Direction | Community | Advisory), `avatar`.
- **Optional Fields:** `bio`, `socials` (github, linkedin, twitter), `order`.
- **Integrity Rule:** Verified names and roles only. No stock avatars or pseudonyms.

### 7. Partners (`src/data/partners/partners.data.ts`) (`DECIDED`)
- **Required Fields:** `id`, `name`, `category` (Academic Institution | Technology Collaborator | Ecosystem Network), `logo`, `websiteUrl`.
- **Optional Fields:** `description`, `tier`, `activeSince`, `featured`.
- **Verification Rule:** Must have an active partnership agreement or MoU before listing.

### 8. Sponsors (`src/data/sponsors/sponsors.data.ts`) (`DECIDED`)
- **Required Fields:** `id`, `name`, `tier` (Strategic | Premier | Associate | Community), `logo`, `websiteUrl`.
- **Optional Fields:** `featuredEvent`, `activePeriod`.
- **Verification Rule:** Explicit sponsorship contract required.

### 9. FAQs (`src/data/faq/faq.data.ts`) (`DECIDED`)
- **Required Fields:** `id`, `question`, `answer`, `category` (General | Participation | Chapters | Events | Sponsorship).
- **SEO Metadata:** Powers `FAQPage` schema on `/faq`.

### 10. Impact Metrics (`src/data/site/site.config.ts`) (`DECIDED` — Guardrailed)
- **Required Fields:** `label`, `value`, `verifiedSource`, `lastAuditDate`.
- **Strict Guardrail:** If an impact metric cannot be substantiated by verified logs, it must NOT be rendered.

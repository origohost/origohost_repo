# OrigoHOST — Site Architecture

## 1. Overview

The OrigoHOST website is the central public-facing digital product for the OrigoHOST ecosystem.
It is organized around six primary journeys:

| Journey | Entry → Flow → Goal |
|---------|---------------------|
| Discover | Home → About / Community → Events / Programs → Join |
| Participate | Events → Event Detail → Registration → Participation |
| Institution | About → Programs → Partners → Contact |
| Sponsor | Sponsors → Opportunity → Inquiry |
| Partner | Partners → Collaboration → Inquiry |
| Learn | Resources / Blog → Article / Resource → Related Event / Program |

---

## 2. Page Inventory

### Core Public Pages (P0)

| Route | Page | Component File |
|-------|------|----------------|
| `/` | Home | `src/pages/home/HomePage.jsx` |
| `/about` | About | `src/pages/about/AboutPage.jsx` |
| `/community` | Community | `src/pages/community/CommunityPage.jsx` |
| `/events` | Events Listing | `src/pages/events/EventsPage.jsx` |
| `/events/:slug` | Event Detail | `src/pages/events/EventDetailsPage.jsx` |
| `/programs` | Programs Listing | `src/pages/programs/ProgramsPage.jsx` |
| `/programs/:slug` | Program Detail | `src/pages/programs/ProgramDetailsPage.jsx` |
| `/contact` | Contact | `src/pages/contact/ContactPage.jsx` |
| `/join` | Join / Get Involved | `src/pages/join/JoinPage.jsx` |
| `/privacy-policy` | Privacy Policy | `src/pages/legal/PrivacyPolicyPage.jsx` |
| `/terms` | Terms & Conditions | `src/pages/legal/TermsPage.jsx` |
| `/403` | Forbidden | `src/pages/system/403/` |
| `/404` | Not Found | `src/pages/system/404/` |
| `/500` | Server Error | `src/pages/system/500/` |
| `/maintenance` | Maintenance | `src/pages/system/maintenance/` |

### Secondary Pages (P1)

| Route | Page | Component File |
|-------|------|----------------|
| `/resources` | Resources | `src/pages/resources/ResourcesPage.jsx` |
| `/partners` | Partners | `src/pages/partners/PartnersPage.jsx` |
| `/sponsors` | Sponsors | `src/pages/sponsors/SponsorsPage.jsx` |
| `/team` | Team | `src/pages/team/TeamPage.jsx` |
| `/blog` | Blog / News | `src/pages/blog/BlogPage.jsx` |
| `/blog/:slug` | Article | `src/pages/blog/ArticlePage.jsx` |
| `/gallery` | Gallery / Media | `src/pages/gallery/GalleryPage.jsx` |
| `/faq` | FAQ | `src/pages/faq/FAQPage.jsx` |
| `/search` | Search Results | `src/pages/system/search/SearchPage.jsx` |
| `/sitemap` | Sitemap | `src/pages/system/sitemap/SitemapPage.jsx` |

---

## 3. Navigation Structure

### Primary Navigation (Header)
```
OrigoHOST [logo]
├── About
├── Community
├── Events
├── Programs
├── Resources
│   ├── Blog / News
│   ├── Gallery
│   └── FAQ
├── Partners
├── Sponsors
└── [Join Now — CTA button]
```

### Secondary Navigation (Footer)
```
Column 1: OrigoHOST
  About | Community | Team | Contact

Column 2: Participate
  Events | Programs | Join | Resources

Column 3: Ecosystem
  Partners | Sponsors | Blog | Gallery

Column 4: Legal & Info
  Privacy Policy | Terms & Conditions | Sitemap | FAQ
```

---

## 4. Ecosystem Entities (Origo Ecosystem)

The following six entities form the interconnected Origo ecosystem and must be
represented in the site architecture (About page / Ecosystem section):

| Entity | Focus | Site Reference |
|--------|-------|---------------|
| Origo Cloud | Infrastructure, cloud hosting, VPS, bare-metal | Ecosystem section |
| Origo Academy | Workshops, courses, technical training | Programs / Resources |
| Origo Community | Developer network across India | Community page |
| Origo Events | Hackathons and developer meetups | Events page |
| Origo AI | Generative AI and LLM research | Programs / About |
| Origo Dev | Open-source contributions and tooling | Community / Resources |

---

## 5. Content Classification Rules

### Program vs Event Format
A **Program** is a sustained initiative or series (e.g., Knowledge Sharing Series 2026).
An **Event** is a single occurrence within a format (e.g., KSS2026 Episode 03).
These must never be conflated in URLs, labels or data models.

### Event Taxonomy
- **Type:** Institutional | Open Community | Collaborative
- **Format:** Meetup | Workshop | Webinar | Hackathon | Ideathon | Buildathon | Seminar | Conference | Training | Panel | Showcase | Challenge
- **Purpose:** Learn | Build | Compete | Innovate | Connect | Develop | Showcase | Solve | Inspire
- **Delivery:** Online | Offline | Hybrid

---

## 6. Routing Conventions

- All routes use kebab-case: `/events`, `/privacy-policy`
- Dynamic routes use `:slug` suffix
- System/error pages use their HTTP status code as the directory name
- No trailing slashes on canonical URLs
- All public pages must be crawlable

---

## 7. SEO Requirements per Page

Every page must define:

```
<title>{Page Title} — OrigoHOST</title>
<meta name="description" content="{Unique 150–160 char description}" />
<link rel="canonical" href="{canonical URL}" />
<meta property="og:title" content="{Page Title}" />
<meta property="og:description" content="{Description}" />
<meta property="og:image" content="{OG image}" />
<meta property="og:url" content="{URL}" />
```

---

## 8. Accessibility Requirements

- Target: WCAG 2.2 AA
- All interactive elements must have unique, descriptive IDs
- Keyboard navigation must work for all primary journeys
- Focus indicators must be visible
- All images must have meaningful alt text
- All forms must have labeled fields and inline validation
- Reduced-motion support required for animations

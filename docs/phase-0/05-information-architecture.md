# 05 — Final Information Architecture

> **Phase:** Phase 0 — Foundation, Strategy, Structure, Content, UX, SEO & Technical Blueprint  
> **Status:** DECIDED (Baseline 22 Core Pages) + PROPOSED (Optional Modules)  
> **Classification Standard:** DECIDED | PROPOSED | TBD | OPTIONAL | DEPENDENCY  

---

## 1. Approved Architecture Matrix (22 Core Pages)

| # | Route | Page Name | Classification | Primary Intent | Conversion Role |
|---|-------|-----------|----------------|----------------|-----------------|
| 1 | `/` | Home | `DECIDED` | Understand platform & explore flagship initiatives | Ecosystem Portal |
| 2 | `/about` | About OrigoHOST | `DECIDED` | Institutional validation, vision, governance | Trust Building |
| 3 | `/community` | Community Network | `DECIDED` | Discover chapters, participation tracks | Contributor Acquisition |
| 4 | `/events` | Events & Hackathons | `DECIDED` | Find and register for active technical events | Event Registrations |
| 5 | `/programs` | Programs & Tracks | `DECIDED` | Apply for structured multi-week cohorts | Program Applications |
| 6 | `/resources` | Resource Library | `DECIDED` | Access engineering guides, roadmaps, tools | Value Demonstration |
| 7 | `/partners` | Institutional Partners | `DECIDED` | Evaluate collaboration frameworks | Institutional Intake |
| 8 | `/sponsors` | Corporate Sponsors | `DECIDED` | Review sponsorship tiers & ROI | Sponsorship Intake |
| 9 | `/team` | Leadership & Advisors | `DECIDED` | Verify organizer credentials & leadership | Accountability |
| 10 | `/contact` | Contact & Inquiries | `DECIDED` | Route specific operational inquiries | Direct Communication |
| 11 | `/join` | Join / Get Involved | `DECIDED` | Apply across 5 vetted participation pathways | Core Primary Conversion |
| 12 | `/blog` | Blog & News | `DECIDED` | Read technical recaps, reports, updates | Content Marketing & SEO |
| 13 | `/gallery` | Gallery & Media | `DECIDED` | Visual audit of real events & hackathons | Social Proof |
| 14 | `/faq` | Frequently Asked Questions | `DECIDED` | Self-serve resolution of common concerns | Friction Removal |
| 15 | `/privacy-policy` | Privacy Policy | `DECIDED` | Legal compliance & data protection rules | Compliance |
| 16 | `/terms` | Terms & Conditions | `DECIDED` | Code of conduct & site usage rules | Governance |
| 17 | `/_not-found` (`/404`) | Page Not Found | `DECIDED` | Gracefully recover from broken links | Retention |
| 18 | `/500` (`error.tsx`) | Server Error | `DECIDED` | Explain outage & provide recovery actions | System Reliability |
| 19 | `/403` | Access Forbidden | `DECIDED` | Clear messaging on restricted resources | Security Experience |
| 20 | `/maintenance` | Maintenance Mode | `DECIDED` | Scheduled downtime communication | System Continuity |
| 21 | `/search` | Search Directory | `DECIDED` | Multi-category content discovery | Internal Discovery |
| 22 | `/sitemap` | HTML Sitemap | `DECIDED` | Complete hierarchical human directory | Accessibility & Indexing |

---

## 2. Page Specifications (Core Public Pages)

### 1. Home (`/`)
- **Purpose:** Primary digital storefront and narrative introduction to the OrigoHOST ecosystem.
- **Target Audience:** All cohorts (Builders, Students, Partners, Sponsors, Media).
- **Primary User Intent:** "What is OrigoHOST and what can I do here right now?"
- **Primary CTA:** `Explore Programs` (`/programs`) | **Secondary CTA:** `Join Community` (`/join`)
- **Major Sections:** Hero Lockup, Ecosystem Entities Ribbon, Featured Programs, Upcoming Events Carousel, Community Impact Metrics (when verified), Testimonials/Stories, Master CTA Banner.
- **Required Content:** Official tagline, mission statement, at least 2 active events, 1 active program.
- **SEO Intent:** Target primary brand keywords ("OrigoHOST", "developer ecosystem India", "builder community").

### 2. About (`/about`)
- **Purpose:** Articulate the origins, philosophy, governance, and institutional legitimacy of OrigoHOST.
- **Target Audience:** Academic leaders, prospective partners, sponsors, senior engineers.
- **Primary User Intent:** Evaluate the organizational substance and principles behind OrigoHOST.
- **Primary CTA:** `Explore Ecosystem` (`/community`) | **Secondary CTA:** `Contact Leadership` (`/contact`)
- **Major Sections:** Origin & Mission, Master Brand Architecture (The 6 Entities), Operating Principles, Ethics & Conflict Registry, Call to Action.
- **Required Content:** Non-marketing narrative explaining why OrigoHOST was founded, master brand model description.
- **SEO Intent:** Branded informational queries ("about OrigoHOST", "OrigoHOST mission").

### 3. Community (`/community`)
- **Purpose:** Detail the grassroots network, developer pathways, and campus chapters.
- **Target Audience:** Students, local organizers, campus leads, developers.
- **Primary User Intent:** Find local chapters, understand builder tracks, and learn how to participate.
- **Primary CTA:** `Join a Pathway` (`/join`) | **Secondary CTA:** `Charter a Chapter` (`/join?pathway=campus-lead`)
- **Major Sections:** Community Overview, Builder Pathways (Learner, Contributor, Mentor, Organizer), Campus Chapter Network, Chapter Starter Guide.
- **Required Content:** Clear definitions of the 4 builder pathways, chapter requirements.
- **SEO Intent:** "student developer chapters", "campus tech community India".

### 4. Events (`/events` & `/events/[slug]`)
- **Purpose:** Showcase upcoming and archived technical hackathons, webinars, and workshops.
- **Target Audience:** Developers, students, competitors, sponsors.
- **Primary User Intent:** Discover, filter, and register for technical events.
- **Primary CTA:** `Register Now` (on detail page) | **Secondary CTA:** `Propose a Talk` (`/contact`)
- **Major Sections (Listing):** Filter Toolbar (Format, Type, Delivery), Featured Upcoming Event, Event Cards Grid, Past Events Archive.
- **Major Sections (Detail):** Event Hero, Key Details (Date, Mode, Venue), Agenda Schedule, Speakers/Judges, FAQs, Registration Action Box.
- **Required Content:** Format tags, delivery mode, registration status, speaker bios.
- **SEO Intent:** Event schema indexing, technical hackathon keywords ("CyberForge 2026", "KSS 2026 webinar").

### 5. Programs (`/programs` & `/programs/[slug]`)
- **Purpose:** Present structured learning initiatives (e.g., Knowledge Sharing Series, AI Foundation).
- **Target Audience:** Students, junior developers seeking structured skill development.
- **Primary User Intent:** Understand syllabus, schedule, prerequisites, and cohort application process.
- **Primary CTA:** `Apply for Cohort` | **Secondary CTA:** `Download Syllabus`
- **Major Sections:** Program Overview, Cohort Structure & Modules, Learning Outcomes, Mentorship Team, Application Intake.
- **Required Content:** Status (Active/Upcoming), module outlines, target audience criteria.
- **SEO Intent:** Technical training queries ("OrigoHOST Knowledge Sharing Series", "AI developer curriculum").

### 6. Resources (`/resources`)
- **Purpose:** Centralized repository of technical documentation, engineering guides, and open learning paths.
- **Target Audience:** Developers, builders, campus leads.
- **Primary User Intent:** Find practical, downloadable guides and technical roadmaps.
- **Primary CTA:** `Read Guide / Download` | **Secondary CTA:** `Contribute a Guide` (`/contact`)
- **Major Sections:** Category Tabs (Guides, Starter Kits, Tooling, Chapter Documents), Search Filter, Resource Cards.
- **Required Content:** Verified URLs and PDFs, categorical tags.
- **SEO Intent:** Evergreen educational search ("developer starter kits", "chapter organization guides").

### 7. Partners (`/partners`)
- **Purpose:** Institutional validation and partner intake framework.
- **Target Audience:** Universities, technical institutes, developer tool companies.
- **Primary User Intent:** Evaluate partnership models and submit formal inquiries.
- **Primary CTA:** `Inquire for Partnership` (`/contact`) | **Secondary CTA:** `View Case Studies` (`/blog`)
- **Major Sections:** Partnership Philosophy, Institutional Framework (MoUs), Technology Collaborators, Intake Process.
- **Required Content:** Verified partner listings, clear intake qualification criteria.
- **SEO Intent:** Academic collaboration, developer ecosystem partnerships.

### 8. Sponsors (`/sponsors`)
- **Purpose:** Commercial sponsorship transparency and corporate intake.
- **Target Audience:** Corporate sponsors, venture funds, tech recruiting teams.
- **Primary User Intent:** Review sponsorship benefits, demographics, and contact sponsorship leads.
- **Primary CTA:** `Request Sponsorship Deck` (`/contact`) | **Secondary CTA:** `Review Past Events` (`/events`)
- **Major Sections:** Value Proposition, Audience Reach Demographics, Sponsorship Tiers, Ethical Firewall Policy, Intake Form.
- **Required Content:** Explicit deliverables per tier, contact routing.
- **SEO Intent:** Tech event sponsorship, developer community sponsor India.

### 9. Team (`/team`)
- **Purpose:** Human face and organizational accountability of the OrigoHOST ecosystem.
- **Target Audience:** Community members, partners, press, prospective volunteers.
- **Primary User Intent:** Verify the background, credibility, and roles of the organizers.
- **Primary CTA:** `Join the Team` (`/join?pathway=volunteer`) | **Secondary CTA:** `Contact Team` (`/contact`)
- **Major Sections:** Core Leadership, Technical Directors, Advisory Board, Community Coordinators.
- **Required Content:** Verified names, roles, bios, and LinkedIn/GitHub links.
- **SEO Intent:** Entity credibility, branded team search.

### 10. Contact (`/contact`)
- **Purpose:** Official communication portal with categorized inquiry routing.
- **Target Audience:** All external inquiries (General, Institutional, Sponsor, Speaker, Press).
- **Primary User Intent:** Send an inquiry and receive a response from the correct department.
- **Primary CTA:** `Submit Message`
- **Major Sections:** Inquiry Form, Category Selector, Direct Email Directory, Office Location.
- **Required Content:** Working form validation, category routing, response SLA note.
- **SEO Intent:** Branded contact information.

### 11. Join (`/join`)
- **Purpose:** The core conversion hub for all participation pathways.
- **Target Audience:** Developers, volunteers, speakers, mentors, campus leads.
- **Primary User Intent:** Apply to become an active contributor or participant.
- **Primary CTA:** `Submit Application`
- **Major Sections:** Pathway Selector Tabs (Participant, Volunteer, Speaker, Mentor, Campus Lead), Dynamic Contextual Form Fields, Submission Feedback.
- **Required Content:** Explicit role descriptions, prerequisites, code of conduct acknowledgement.
- **SEO Intent:** "join OrigoHOST", "developer community application".

### 12. Blog / News (`/blog` & `/blog/[slug]`)
- **Purpose:** Official editorial publication for announcements, event recaps, and technical articles.
- **Target Audience:** Community members, tech industry, prospective attendees.
- **Primary User Intent:** Read authoritative updates and event post-mortems.
- **Primary CTA:** `Read Article` | **Secondary CTA:** `Share Article`
- **Major Sections:** Featured Article, Category Filter, Chronological Article Grid, Author Bio, Related Articles.
- **Required Content:** Real ISO dates, author attribution, reading time estimate, markdown/MDX rendering.
- **SEO Intent:** Long-tail organic search, technical content indexing (`Article` schema).

### 13. Gallery / Media (`/gallery`)
- **Purpose:** High-resolution photographic archive of real hackathons, workshops, and team gatherings.
- **Target Audience:** Press, prospective attendees, sponsors.
- **Primary User Intent:** Verify the visual reality and energy of in-person events.
- **Primary CTA:** `Download Media Kit` | **Secondary CTA:** `View Event Details`
- **Major Sections:** Event Album Grid, Lightbox Viewer, Press Download Assets.
- **Required Content:** High-resolution optimized WebP photography, descriptive alt text.
- **SEO Intent:** Image SEO, visual brand proof.

### 14. FAQ (`/faq`)
- **Purpose:** Self-serve answers to recurring community, partnership, and operational questions.
- **Target Audience:** First-time visitors, chapter applicants, parents, faculty.
- **Primary User Intent:** Quickly resolve doubts before applying or reaching out.
- **Primary CTA:** `Still Have Questions? Contact Us` (`/contact`)
- **Major Sections:** Accordion Categories (General, Participation, Campus Chapters, Events, Sponsorship).
- **Required Content:** Clear, concise, authoritative answers.
- **SEO Intent:** FAQPage schema, rich snippet search results.

### 15. Privacy Policy (`/privacy-policy`) & 16. Terms (`/terms`)
- **Purpose:** Legal and governance compliance.
- **Target Audience:** Legal advisors, corporate partners, all registered users.
- **Primary User Intent:** Understand data collection, cookie usage, intellectual property, and code of conduct.
- **Required Content:** Data controller identity, third-party disclosure, participant rights, code of conduct enforcement.
- **SEO Intent:** Trust signals, crawler compliance.

### 17–20. System States (`/404`, `error.tsx`, `/403`, `/maintenance`)
- **Purpose:** Graceful degradation and brand consistency during exceptions or downtime.
- **Required Content:** Clean explanation, actionable navigation links back to `/` or `/events`, system status links.

### 21. Search (`/search`)
- **Purpose:** Global keyword query resolution across events, programs, articles, and resources.
- **Target Audience:** Users seeking specific topics (e.g. "DevOps", "Cybersecurity", "Chapter Charter").
- **Required Content:** Filtered result cards, query highlighting, meaningful empty states.

### 22. Sitemap (`/sitemap`)
- **Purpose:** User-facing hierarchical directory for human navigation and assistive technologies.
- **Required Content:** Categorized tree links to all 22 public pages.

---

## 3. Proposed / Optional Additional Modules

### Proposed Module: Projects Directory (`/projects` & `/projects/[slug]`)
- **Classification:** `PROPOSED` / `OPTIONAL`
- **Strategic Rationale:**
  - OrigoHOST’s mission is *"Where Builders Become Innovators"*.
  - Showcasing open-source tools created under **Origo Dev** or winning hackathon projects from **CyberForge** provides definitive proof that builders actually launch software in this ecosystem.
- **Impact if Excluded:** Projects can be linked directly inside `/resources` or as highlight sections within `/events/[slug]` without requiring a standalone route.
- **Recommendation:** Maintain `/projects` as a future Phase 2 expansion once at least 3 production-grade open-source repositories or hackathon winner case studies are finalized. (`DECIDED`)

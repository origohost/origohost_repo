# 03 — Target Audiences Matrix

> **Phase:** Phase 0 — Foundation, Strategy, Structure, Content, UX, SEO & Technical Blueprint  
> **Status:** DECIDED (Audience Schema & Segmentation)  
> **Classification Standard:** DECIDED | PROPOSED | TBD | OPTIONAL | DEPENDENCY  

---

## 1. Audience Segmentation Overview

The OrigoHOST platform serves a multidimensional audience across grassroots learners, senior practitioners, academic leaders, and commercial partners. Every page layout must cater directly to one or more of these validated cohorts.

```
                              AUDIENCE SPECTRUM
 ┌──────────────────────────────────────┬──────────────────────────────────────┐
 │         COMMUNITY & TALENT           │        INSTITUTIONAL & INDUSTRY      │
 ├──────────────────────────────────────┼──────────────────────────────────────┤
 │ • Developers & Builders              │ • Educational Institutions           │
 │ • Engineering Students               │ • Technology Partners                │
 │ • Community Volunteers               │ • Ecosystem Partners                 │
 │ • Technical Speakers & Mentors       │ • Corporate & Venture Sponsors       │
 │ • Regional Organizers & Campus Reps  │ • Enterprise / Industry Leads        │
 │ • Technology Media & Press           │ • Academic Deans & Directors         │
 └──────────────────────────────────────┴──────────────────────────────────────┘
```

---

## 2. Audience Profiles & Requirements

### 1. Developers / Builders (`DECIDED`)
- **Primary Goal:** Level up engineering abilities, build real-world software, find co-founders, and compete in hackathons.
- **Main Questions:** "What technical stack is used? Are these actual coding events or just slide lectures? Can I build production projects here?"
- **Desired Action:** Register for upcoming hackathons/workshops (`/events`), access guides (`/resources`), apply to build (`/join`).
- **Important Content:** Event format details, tech stack tags, workshop prerequisites, GitHub repos.
- **Trust Signals:** Clean technical documentation, active GitHub organization, real code snippets, zero buzzword hype.
- **Likely Entry Points:** `/events/[slug]`, `/programs/[slug]`, `/resources`, `/blog`.

### 2. Engineering Students (`DECIDED`)
- **Primary Goal:** Transition from academic textbook theory to employable, hands-on engineering skills.
- **Main Questions:** "Is this beginner-friendly? Does participation provide verified credentials or certificates? How do I join?"
- **Desired Action:** Apply for the Knowledge Sharing Series (KSS), join a local campus chapter.
- **Important Content:** Free vs. paid status (transparently free for community), beginner tracks, chapter guides.
- **Trust Signals:** Academic partner validation, student testimonials, mentor credentials.
- **Likely Entry Points:** `/`, `/programs/knowledge-sharing-series-2026`, `/community`, `/join`.

### 3. Community Volunteers (`DECIDED`)
- **Primary Goal:** Gain leadership experience, contribute to event operations, and expand professional networks.
- **Main Questions:** "What roles exist? What is the weekly time commitment? How does selection work?"
- **Desired Action:** Submit a Volunteer Application on `/join`.
- **Important Content:** Clear volunteer pathways, operational areas (design, logistics, discord moderation).
- **Trust Signals:** Recognized team page (`/team`), transparent community governance.
- **Likely Entry Points:** `/community`, `/join`, `/team`.

### 4. Technical Speakers & Domain Experts (`DECIDED`)
- **Primary Goal:** Share expertise, mentor emerging engineers, establish domain thought leadership.
- **Main Questions:** "What is the audience caliber? What formats exist (webinar vs. keynotes)? Who else has spoken?"
- **Desired Action:** Apply via Speaker Pathway on `/join` or `/contact`.
- **Important Content:** Past speaker alumni, audience demographics, webinar series schedules.
- **Trust Signals:** High production standards, respected event topics (DevOps, GenAI, Cryptography).
- **Likely Entry Points:** `/events`, `/programs`, `/join`.

### 5. Industry Mentors (`DECIDED`)
- **Primary Goal:** Give back to the developer community, identify promising engineering talent.
- **Main Questions:** "How structured is the mentorship program? What is the expected time investment?"
- **Desired Action:** Register as an approved mentor via `/join`.
- **Important Content:** Mentorship scope, code review sessions, hackathon judging criteria.
- **Trust Signals:** Direct communication channels, organized cohort timelines.
- **Likely Entry Points:** `/programs`, `/about`, `/join`.

### 6. Regional Organizers & Core Leads (`DECIDED`)
- **Primary Goal:** Organize city meetups, coordinate technical workshops under the OrigoHOST banner.
- **Main Questions:** "What support (financial, logistical, branding) does OrigoHOST provide?"
- **Desired Action:** Submit organizer application via `/join`.
- **Important Content:** Master brand guidelines, event playbooks, sponsorship routing.
- **Trust Signals:** Clear hierarchy, official charter agreements.
- **Likely Entry Points:** `/about`, `/community`, `/join`.

### 7. Campus Representatives & Student Chapter Leads (`DECIDED`)
- **Primary Goal:** Establish an official OrigoHOST Student Chapter on their college campus.
- **Main Questions:** "How do we start an official chapter? What permissions from our college are required?"
- **Desired Action:** Download chapter charter and submit a Chapter Application on `/join`.
- **Important Content:** Campus Chapter Blueprint, event starter kits, faculty advisor requirements.
- **Trust Signals:** Verified active university chapters, institutional collaboration policies.
- **Likely Entry Points:** `/community`, `/resources`, `/join`.

### 8. Educational Institutions (Colleges & Universities) (`DECIDED`)
- **Primary Goal:** Offer industry-aligned technical hackathons and workshops to their students without administrative overhead.
- **Main Questions:** "What is the credibility of OrigoHOST? Is this non-profit/community aligned? Who handles event execution?"
- **Desired Action:** Submit an institutional partnership inquiry via `/contact` or `/partners`.
- **Important Content:** Institutional partnership structure, past academic event highlights, curriculum alignment.
- **Trust Signals:** Formal MoU frameworks, documented academic integrity standards.
- **Likely Entry Points:** `/partners`, `/about`, `/contact`.

### 9. Technology & Cloud Partners (`DECIDED`)
- **Primary Goal:** Drive developer adoption of their developer tools, SDKs, APIs, and cloud infrastructure.
- **Main Questions:** "What is the developer demographic? Can we provide API credits / bounties for hackathons?"
- **Desired Action:** Submit partnership inquiry on `/partners`.
- **Important Content:** Active builder count, hackathon challenge structures, technical track integrations.
- **Trust Signals:** Technical competence of organizers, strict data privacy standards.
- **Likely Entry Points:** `/partners`, `/events`, `/contact`.

### 10. Corporate & Venture Sponsors (`DECIDED`)
- **Primary Goal:** Talent acquisition, employer branding, and corporate social responsibility (CSR) in tech education.
- **Main Questions:** "What are the sponsorship tiers? What is the verifiable reach and ROI?"
- **Desired Action:** Download sponsor deck and submit sponsorship request on `/sponsors`.
- **Important Content:** Tiered deliverables (branding, keynote slots, hiring access, booth presence).
- **Trust Signals:** Transparent sponsorship criteria, ethical firewall between funding and governance.
- **Likely Entry Points:** `/sponsors`, `/`, `/contact`.

### 11. Enterprise / Industry Organizations (`DECIDED`)
- **Primary Goal:** Source specialized developer solutions, sponsor targeted innovation challenges.
- **Main Questions:** "Can OrigoHOST host a custom enterprise challenge or hackathon track?"
- **Desired Action:** Reach out via `/contact` under "Enterprise Collaboration".
- **Important Content:** CyberForge case studies, technical problem-solving capabilities.
- **Trust Signals:** Professional corporate communication, legal/terms compliance.
- **Likely Entry Points:** `/about`, `/events`, `/contact`.

### 12. Media, Press & Community Aggregators (`DECIDED`)
- **Primary Goal:** Report on major student innovation achievements, tech conferences, and regional developer initiatives.
- **Main Questions:** "Where are the official press releases, high-res logos, and media contacts?"
- **Desired Action:** Download press kit from `/gallery` or `/resources`, contact PR lead via `/contact`.
- **Important Content:** Press releases (`/blog`), official brand lockups (`/gallery`), spokesperson contacts.
- **Trust Signals:** Verified press releases with dates and high-resolution official photography.
- **Likely Entry Points:** `/gallery`, `/blog`, `/about`, `/contact`.

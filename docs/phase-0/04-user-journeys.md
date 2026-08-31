# 04 — Comprehensive User Journeys

> **Phase:** Phase 0 — Foundation, Strategy, Structure, Content, UX, SEO & Technical Blueprint  
> **Status:** DECIDED (Core Experience Flows)  
> **Classification Standard:** DECIDED | PROPOSED | TBD | OPTIONAL | DEPENDENCY  

---

## 1. Master Journey Flow

Every user session across OrigoHOST aligns with the 6-stage lifecycle model:

```
[DISCOVER] ────► [UNDERSTAND] ────► [EXPLORE] ────► [TRUST] ────► [PARTICIPATE] ────► [COLLABORATE]
Landing Page      About / Ecosystem  Events / Tracks  Team / Partners Application Flow Chapter / Sponsor
```

---

## 2. Detailed Audience Journey Blueprints

### 1. New Visitor Journey (`DECIDED`)
- **Entry Page:** `/` (Home)
- **Intermediate Pages:** `/about`, `/community`, `/events`
- **Decision Points:** "Is this an authentic technology ecosystem or marketing fluff? Is there an active event I can attend?"
- **Primary CTA:** "Explore Programs" or "Join Community"
- **Conversion Destination:** `/join` or `/events`
- **Potential Friction:** Too much text without clear structural visual hierarchy; unclear distinction between OrigoHOST and third-party event organizers.
- **Required Information:** Concise elevator pitch, active event cards with real dates, core ecosystem pillars.

### 2. Community Participant Journey (`DECIDED`)
- **Entry Page:** `/community` or `/`
- **Intermediate Pages:** `/resources`, `/events`, `/about`
- **Decision Points:** "What pathway matches my current skill level (Learner, Builder, Contributor)?"
- **Primary CTA:** "Apply for Pathway"
- **Conversion Destination:** `/join` (pre-selecting Participant pathway)
- **Potential Friction:** Long application forms without progress indicators; ambiguity on whether fees apply (must clearly state free community access).
- **Required Information:** Explicit pathway breakdown, prerequisite guidance, code of conduct link.

### 3. Event Attendee Journey (`DECIDED`)
- **Entry Page:** `/events` or direct link to `/events/[slug]` (e.g., CyberForge 2026)
- **Intermediate Pages:** `/events/[slug]`, `/about` (for organizer validation)
- **Decision Points:** "Are the dates, agenda, eligibility, and submission deadlines clear?"
- **Primary CTA:** "Register for Event"
- **Conversion Destination:** Event registration gateway (internal modal/form or verified external portal like Unstop/Devfolio).
- **Potential Friction:** Dead or missing registration links; ambiguous event delivery format (online vs. in-person venue).
- **Required Information:** Date/time with timezone, delivery mode (Online/Offline/Hybrid), speaker/mentor lineup, eligibility.

### 4. Program Applicant Journey (`DECIDED`)
- **Entry Page:** `/programs` or `/programs/[slug]` (e.g., Knowledge Sharing Series 2026)
- **Intermediate Pages:** `/programs/[slug]`, `/faq`, `/about`
- **Decision Points:** "Is this program active? How many weeks does it run? What will I build by the end?"
- **Primary CTA:** "Apply for Cohort"
- **Conversion Destination:** Cohort application form (`/join` or program-specific application form).
- **Potential Friction:** Unclear cohort deadlines or application acceptance criteria.
- **Required Information:** Curriculum syllabus, prerequisite technology stack, commitment hours/week, status badge (Active/Upcoming).

### 5. Volunteer Journey (`DECIDED`)
- **Entry Page:** `/community` or `/join`
- **Intermediate Pages:** `/about`, `/team`
- **Decision Points:** "What volunteer teams exist (Dev, Design, Operations, Content)? How is credit given?"
- **Primary CTA:** "Join as Volunteer"
- **Conversion Destination:** `/join` (Volunteer track)
- **Potential Friction:** Fear of being ignored; lack of response timelines.
- **Required Information:** Specific volunteer team descriptions, weekly commitment expectations, certificate/perk clarity.

### 6. Speaker Journey (`DECIDED`)
- **Entry Page:** `/events` or `/contact`
- **Intermediate Pages:** `/programs`, `/about`
- **Decision Points:** "Is the audience relevant to my expertise? Does the organization maintain high technical standards?"
- **Primary CTA:** "Propose a Session / Apply as Speaker"
- **Conversion Destination:** `/join` (Speaker track) or `/contact` (Category: Speaking / Session Proposal)
- **Potential Friction:** No clear Call for Speakers (CFS) form; tedious submission requirements.
- **Required Information:** Target audience demographics, webinar format details, past speaker showcase.

### 7. Mentor Journey (`DECIDED`)
- **Entry Page:** `/about` or `/programs`
- **Intermediate Pages:** `/programs/[slug]`, `/team`
- **Decision Points:** "How will my mentorship time be scheduled? Is this focused on real engineering mentorship?"
- **Primary CTA:** "Become a Mentor"
- **Conversion Destination:** `/join` (Mentor track)
- **Potential Friction:** Ambiguity regarding mentor time obligations during hackathons or cohorts.
- **Required Information:** Mentorship expectations, project evaluation criteria, mentor badge recognition.

### 8. Organizer Journey (`DECIDED`)
- **Entry Page:** `/community` or `/about`
- **Intermediate Pages:** `/events`, `/contact`
- **Decision Points:** "Can I lead an OrigoHOST chapter or organize an affiliated hackathon in my city?"
- **Primary CTA:** "Apply as City / Chapter Organizer"
- **Conversion Destination:** `/join` (Organizer pathway)
- **Potential Friction:** Lack of clarity on event funding and brand governance rules.
- **Required Information:** Master brand usage rules, operational playbook, organizer code of conduct.

### 9. Campus Representative Journey (`DECIDED`)
- **Entry Page:** `/community`
- **Intermediate Pages:** `/resources` (Chapter Handbook), `/about`, `/faq`
- **Decision Points:** "What are the requirements to start a chapter? Does my faculty need to sign off?"
- **Primary CTA:** "Charter a Campus Chapter"
- **Conversion Destination:** `/join` (Campus Lead track)
- **Potential Friction:** High administrative barriers; confusion between student clubs and OrigoHOST chapters.
- **Required Information:** Minimum chapter member requirements, faculty advisor guidelines, chapter benefits kit.

### 10. Partner (Academic / Tech) Journey (`DECIDED`)
- **Entry Page:** `/partners`
- **Intermediate Pages:** `/about`, `/programs`, `/contact`
- **Decision Points:** "What does OrigoHOST offer our students or developer ecosystem? Is there a formal MoU process?"
- **Primary CTA:** "Initiate Partnership"
- **Conversion Destination:** `/contact` (Category: Institutional / Campus Collaboration)
- **Potential Friction:** Generic contact forms with no designated corporate/academic intake channels.
- **Required Information:** Partnership tiers (Academic vs. Technology Ecosystem), past track record, mutual value proposition.

### 11. Sponsor Journey (`DECIDED`)
- **Entry Page:** `/sponsors`
- **Intermediate Pages:** `/events`, `/about`, `/contact`
- **Decision Points:** "What is the developer reach? What tier aligns with our hiring / brand awareness goals?"
- **Primary CTA:** "Request Sponsorship Deck"
- **Conversion Destination:** `/contact` (Category: Sponsorship / Corporate Partnership)
- **Potential Friction:** Lack of transparent deliverables or inability to download a formal deck.
- **Required Information:** Sponsorship tiers, verified attendee demographics, clear contact routing.

### 12. Media & Press Journey (`DECIDED`)
- **Entry Page:** `/blog` or `/gallery`
- **Intermediate Pages:** `/about`, `/contact`
- **Decision Points:** "Where are the official press releases, logo assets, and official leadership quotes?"
- **Primary CTA:** "Download Media Kit / Contact PR"
- **Conversion Destination:** `/contact` (Category: Press / Media Inquiries)
- **Potential Friction:** Low-resolution logo images; unverified information or missing publication dates.
- **Required Information:** SVG/PNG high-res brand logos, press releases with exact ISO dates, official leadership bios.

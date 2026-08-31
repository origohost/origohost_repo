# 21 — Phase 0 Open Questions & Stakeholder Inputs

> **Phase:** Phase 0 — Foundation, Strategy, Structure, Content, UX, SEO & Technical Blueprint  
> **Status:** OPEN (Awaiting Stakeholder Clarification)  
> **Classification Standard:** DECIDED | PROPOSED | TBD | OPTIONAL | DEPENDENCY  

---

## 1. Stakeholder Input Questions

The following items require formal confirmation from the OrigoHOST leadership and product team before or during Phase 1:

### 1. Brand Color Specifications (`TBD`)
- **Question:** What are the exact Pantone, CMYK, and verified hex codes for the OrigoHOST brand palette?
- **Current Baseline:** Observed approximations: Deep Blue (`#001858`), Electric Blue (`#0056FF`), and Surface (`#0A1128`).
- **Required Action:** Provide official brand style guide color codes if variations exist.

### 2. Leadership & Core Team Roster (`TBD` — Blocker for `/team`)
- **Question:** Who are the confirmed founders, directors, coordinators, and advisors to be published on `/team`?
- **Current Baseline:** Placeholder entries in `src/data/team/team.data.ts`.
- **Required Action:** Supply high-res headshots (WebP/PNG), exact job titles, short bios, and public LinkedIn/GitHub profile URLs.

### 3. Confirmed Academic Partner MoUs (`TBD` — Blocker for `/partners`)
- **Question:** Which colleges, universities, and technical institutes currently hold signed MoUs or formal partnership agreements?
- **Current Baseline:** Data models exist, but logos must only be displayed with explicit authorization.
- **Required Action:** Supply approved SVG/PNG logos and official institute names for active partners.

### 4. Confirmed Corporate Sponsors (`TBD` — Blocker for `/sponsors`)
- **Question:** Which commercial organizations have executed sponsorship contracts for upcoming 2026 initiatives?
- **Current Baseline:** Tiered structure defined (Strategic, Premier, Associate, Community).
- **Required Action:** Provide authorized partner logos and tier assignments.

### 5. Primary Community Chat Platform (`TBD`)
- **Question:** What is the primary real-time communication platform for the community (Discord, Slack, or Telegram)?
- **Current Baseline:** Generic social links.
- **Required Action:** Provide the permanent invite URL to be linked in the header, footer, and community page.

### 6. Transactional Form Email Dispatch Provider (`DEPENDENCY`)
- **Question:** Which email delivery infrastructure should process `/api/contact` and `/api/join` submissions (Resend, SendGrid, Postmark, AWS SES, or Discord/Slack webhooks)?
- **Current Baseline:** Next.js mock API route returning success payloads.
- **Required Action:** Provide API key or webhook endpoint in production environment variables.

### 7. Governance Sign-off on `/projects` Route (`PROPOSED`)
- **Question:** Should `/projects` be omitted from the primary sitemap in Phase 1 and deferred to Phase 2, highlighting projects inside `/resources` instead?
- **Recommended Option:** Defer to Phase 2 (`PROPOSED`).
- **Required Action:** Leadership approval of the 22-page baseline.

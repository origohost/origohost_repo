# OrigoHOST — Release Gates

A release gate is a condition that must be met before a deployment can proceed.
No deployment to production may occur if any P0 gate is open.

---

## Gate Levels

| Level | Meaning |
|-------|---------|
| **P0 — Hard block** | Deployment cannot proceed until resolved |
| **P1 — Soft block** | Must be resolved or explicitly waived by project lead |
| **P2 — Advisory** | Should be reviewed; documented if deferred |

---

## Code & Build Gates

| Gate | Level | Condition |
|------|-------|-----------|
| Build passes | P0 | `npm run build` (Next.js build) completes with no errors |
| TypeScript clean | P0 | `npx tsc --noEmit` returns zero errors |
| ESLint clean | P1 | `npm run lint` returns zero errors |
| Tests pass | P0 | All unit, integration and critical e2e tests pass |
| No critical defects | P0 | Zero unresolved Critical severity defects |
| No high defects unwaived | P1 | Zero unresolved High severity defects unless explicitly waived |
| No hardcoded secrets | P0 | No credentials, tokens or secrets in repository |
| No `any` types in prod | P1 | Zero undocumented `any` TypeScript types in production source |
| Dependency vulnerabilities | P1 | No critical/high `npm audit` vulnerabilities |

---

## Content Gates

| Gate | Level | Condition |
|------|-------|-----------|
| P0 page content approved | P0 | All P0 pages have stakeholder-approved content |
| Legal pages approved | P0 | Privacy Policy and Terms signed off by legal reviewer |
| No unconfirmed partnerships | P0 | No partner records without written confirmation |
| No unconfirmed sponsors | P0 | No sponsor records without confirmed agreement |
| No unsourced statistics | P0 | No statistics published without defined metric, period, source, methodology |
| Team records approved | P1 | All team member records approved by named individuals |
| No broken links | P1 | All internal and external links verified as resolving |

---

## SEO Gates

| Gate | Level | Condition |
|------|-------|-----------|
| Unique titles on all pages | P0 | Every page has unique, non-empty title tag |
| Meta descriptions present | P1 | Every P0 page has unique meta description |
| Canonical URLs correct | P0 | No self-referential canonical errors |
| Sitemap accessible | P1 | `/sitemap.xml` returns valid XML |
| `robots.txt` correct | P0 | Production `robots.txt` does not block all crawling |

---

## Accessibility Gates

| Gate | Level | Condition |
|------|-------|-----------|
| No critical a11y defects | P0 | Zero unresolved Critical accessibility failures |
| Keyboard navigation | P0 | All primary journeys completable by keyboard |
| Focus indicators visible | P0 | All interactive elements have visible focus indicators |
| Contrast ratio AA | P1 | All text/background combinations meet WCAG 2.2 AA contrast |
| Form labels | P0 | All form fields have programmatically associated labels |
| Alt text | P1 | All content images have meaningful alt text |

---

## Performance Gates

| Gate | Level | Condition |
|------|-------|-----------|
| LCP within budget | P1 | LCP < 2.5 seconds on mobile (staging measurement) |
| CLS within budget | P1 | CLS < 0.1 on key pages |
| Lighthouse performance | P2 | Lighthouse Performance Score ≥ 85 |
| No render-blocking resources | P2 | Critical path not blocked by unoptimized resources |

---

## Security Gates

| Gate | Level | Condition |
|------|-------|-----------|
| HTTPS enforced | P0 | All pages served over HTTPS; HTTP redirects to HTTPS |
| SSL certificate valid | P0 | Certificate valid and not expiring within 30 days |
| Security headers active | P0 | HSTS, X-Frame-Options, X-Content-Type-Options present |
| Form CSRF protection | P0 | State-changing form endpoints protected |
| Rate limiting on forms | P1 | Contact and join forms rate-limited |
| No secrets in repo | P0 | No credentials or tokens in repository history |

---

## Infrastructure Gates

| Gate | Level | Condition |
|------|-------|-----------|
| Error pages working | P0 | 404 and 500 pages render correctly in production |
| Rollback plan confirmed | P0 | Rollback procedure documented and tested in staging |
| Monitoring active | P1 | Uptime and error monitoring configured and alerting |
| Backups configured | P1 | Backup procedure confirmed for any stateful data |
| Analytics & consent | P0 | Analytics and cookie/consent handling approved |

---

## PWA Gates

| Gate | Level | Condition |
|------|-------|----------|
| Manifest valid | P0 | `public/manifest.json` passes PWA Manifest Validator |
| PWA icons present | P0 | 192×192 and 512×512 icons in `public/favicon/` |
| Service worker registered | P1 | Service worker registers successfully in production |
| Offline fallback working | P1 | Offline fallback page renders when network unavailable |
| Installable | P2 | App passes installability check on Chrome and Safari |

---

## Visual Quality Gates (Document 10)

| Gate | Level | Condition |
|------|-------|----------|
| No generic AI patterns | P0 | No equal-column card grids, excessive gradients or default typography |
| Framer Motion only | P0 | No raw CSS `@keyframes` on interactive or animated elements |
| Reduced motion support | P0 | `useReducedMotion()` applied to all animated components |
| Brand tokens only | P0 | No hardcoded hex color values in any component |
| Visual brand review | P0 | Project lead has reviewed and approved visual design |
| Magnetic buttons working | P1 | Magnetic CTA buttons verified on desktop |
| Page transitions working | P1 | All P0 route transitions work without layout shift |

---

## Stakeholder Approval Gates

| Gate | Level | Approver |
|------|-------|---------|
| Project lead sign-off | P0 | Project Lead (Ritik Kumar / Tarun Kumar) |
| Content approval | P0 | Content approver |
| Legal approval | P0 | Legal reviewer (Privacy Policy, Terms) |
| Security sign-off | P1 | Technical Lead or security reviewer |
| Accessibility sign-off | P1 | Designated accessibility reviewer |

---

## Defect Severity Definitions

| Severity | Definition | Release impact |
|----------|-----------|----------------|
| **Critical** | Site inaccessible; data exposed; core journey completely broken; legal/security risk | P0 — Hard block |
| **High** | Major feature non-functional; significant content error; serious a11y failure | P1 — Soft block |
| **Medium** | Feature degraded; minor content issue; usability problem | P2 — Advisory |
| **Low** | Cosmetic; minor layout inconsistency; non-critical content improvement | P2 — Advisory |

---

## Gate Waiver Process

A P1 gate may be waived only when:

1. The defect is documented with full description and impact assessment.
2. The project lead explicitly approves the waiver in writing.
3. A remediation ticket is created with a target date.
4. The waiver is recorded in the deployment record.

P0 gates may not be waived.

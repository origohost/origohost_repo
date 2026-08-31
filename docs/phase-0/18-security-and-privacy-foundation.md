# 18 — Security & Privacy Architecture

> **Phase:** Phase 0 — Foundation, Strategy, Structure, Content, UX, SEO & Technical Blueprint  
> **Status:** DECIDED (Data Protection & Security Baseline)  
> **Classification Standard:** DECIDED | PROPOSED | TBD | OPTIONAL | DEPENDENCY  

---

## 1. Security Engineering Baseline

The OrigoHOST platform follows the principle of **Defense in Depth** across client interactions, API route handlers, and infrastructure delivery.

```
                             SECURITY LAYERS
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. EDGE / TRANSPORT     Strict HTTPS • HSTS • Secure Security Headers       │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. INTAKE & API         Zod Schema Parsing • Honeypots • IP Rate Limiting   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. CONTENT SECURITY     Strict CSP • Sanitized Markdown • XSS Prevention    │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. DATA PRIVACY         Zero-PII Telemetry • Minimal Collection • DPDP Act  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. API Endpoints & Form Intake Security

### 1. Zod Schema Validation (`DECIDED`)
- Every incoming POST request to `/api/contact` and `/api/join` must parse and validate input through strict Zod schemas.
- Extra unexpected fields are stripped (`.strip()`) to prevent prototype pollution or parameter injection.

### 2. Spam & Bot Mitigation (`DECIDED`)
- **Zero Captcha Friction:** Avoid intrusive image captchas that hinder user experience.
- **Honeypot Strategy:** Invisible form input (`<input type="text" name="_hp_company" tabIndex={-1} autoComplete="off" className="hidden" />`). If populated by a bot, the submission is rejected silently.
- **Rate Limiting:** IP-based request throttling on API routes (maximum 5 submissions per 10-minute window).

### 3. HTTP Security Headers (`DECIDED`)
Configured in `next.config.ts`:
```ts
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];
```

---

## 3. Privacy & Data Protection (DPDP Act Alignment)

1. **Lawful Consent:** All application forms on `/join` and `/contact` require explicit checkbox consent agreeing to the Privacy Policy before submission. (`DECIDED`)
2. **Purpose Limitation:** Contact details collected during event registration or pathway intake are used strictly for OrigoHOST community communications and are never sold or shared with commercial advertisers. (`DECIDED`)
3. **Data Retention & Deletion:** Users may request full erasure of their application records by submitting a request to `privacy@origohost.com`. (`DECIDED`)
4. **Environment Variables:** All secrets, webhook URLs, and API keys are stored strictly in `.env.local` and never checked into source control or exposed via `NEXT_PUBLIC_` prefixes. (`DECIDED`)

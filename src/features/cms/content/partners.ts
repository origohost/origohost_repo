import type { PartnersContent } from "../types";
import { PartnersContentSchema, partnersContentOrderedSchema } from "../schema";

/**
 * The bundled defaults below seed the /partners page when nothing has been
 * saved by the admin UI yet. Order is now owned by the CMS (see
 * `partnersContentOrderedSchema` — enforces unique, non-empty names but no
 * fixed reference), so admins can freely reorder / add / remove entries.
 *
 * `partnersContentDefaultsRaw` is exported so the admin editor can "reset to
 * defaults" without duplicating the seed data.
 */

const raw: PartnersContent = {
  meta: {
    slug: "partners",
    title: "Partners",
    description:
      "Partner with OrigoHOST — schools, colleges, startups, industry, government, and NGO programs.",
    eyebrow: "Partnerships",
    heroTitle: "Grow with a nationwide hosting community",
    heroDescription:
      "Institutions, startups, industry leaders, and public organizations partner with OrigoHOST to reach India's most active operator community.",
  },
  tracks: [
    {
      icon: "GraduationCap",
      title: "Schools",
      body: "Bring modern computing and infrastructure fundamentals to K-12 classrooms.",
    },
    {
      icon: "Building2",
      title: "Colleges",
      body: "Campus chapters, ambassador programs, and industry-integrated workshops.",
    },
    {
      icon: "Rocket",
      title: "Startups",
      body: "Hiring pipelines, technical events, and DevRel programs tuned to early-stage teams.",
    },
    {
      icon: "Handshake",
      title: "Industry",
      body: "Co-branded events, executive briefings, and long-term platform engineering programs.",
    },
    {
      icon: "Landmark",
      title: "Government",
      body: "Skilling initiatives, digital-public-infra events, and public-sector collaborations.",
    },
    {
      icon: "Heart",
      title: "NGO & Non-profit",
      body: "Free workshops, mentorship, and access programs for underrepresented communities.",
    },
  ],
  // "Our Clientele" — order MUST match CLIENTELE_ORDER above.
  logos: [
    { name: "Google", domain: "google.com" },
    { name: "Microsoft", domain: "microsoft.com" },
    { name: "Meta", domain: "meta.com" },
    { name: "ICC", domain: "icc-cricket.com" },
    { name: "Amazon Alexa", domain: "alexa.com" },
    { name: "Samsung", domain: "samsung.com" },
    { name: "Uber", domain: "uber.com" },
    { name: "Snap", domain: "snap.com" },
    { name: "GitHub", domain: "github.com" },
    { name: "Singapore Airlines", domain: "singaporeair.com" },
    { name: "Adobe", domain: "adobe.com" },
    { name: "SEBI", domain: "sebi.gov.in" },
    { name: "Reserve Bank of India", domain: "rbi.org.in" },
    { name: "NPCI", domain: "npci.org.in" },
    { name: "FCC", domain: "fcc.gov" },
    { name: "PCI" },
    { name: "UPI", domain: "upichalega.com" },
    { name: "Ministry of Power", domain: "powermin.gov.in" },
    { name: "Intuit", domain: "intuit.com" },
    { name: "NTPC", domain: "ntpc.co.in" },
    { name: "HERE", domain: "here.com" },
    { name: "EESL", domain: "eeslindia.org" },
    { name: "Kimberly-Clark", domain: "kimberly-clark.com" },
    { name: "Karnataka State Police", domain: "ksp.gov.in" },
    { name: "Intel", domain: "intel.com" },
    { name: "Huawei", domain: "huawei.com" },
    { name: "Vistara", domain: "airvistara.com" },
    { name: "NASSCOM", domain: "nasscom.in" },
    { name: "10,000 Startups", domain: "10000startups.com" },
    { name: "ASSOCHAM", domain: "assocham.org" },
    { name: "Symphony", domain: "symphony.com" },
    { name: "Paytm", domain: "paytm.com" },
    { name: "Wipro", domain: "wipro.com" },
    { name: "IntelliSmart", domain: "intellismart.in" },
    { name: "HCL", domain: "hcltech.com" },
    { name: "DishTV", domain: "dishtv.in" },
    { name: "IndiGo", domain: "goindigo.in" },
    { name: "UiPath", domain: "uipath.com" },
    { name: "Polkadot", domain: "polkadot.com" },
    { name: "Larsen & Toubro", domain: "larsentoubro.com" },
    { name: "Tally", domain: "tallysolutions.com" },
    { name: "Awe" },
    { name: "Slack", domain: "slack.com" },
    { name: "Click2Cloud", domain: "click2cloud.net" },
    { name: "DigitalOcean", domain: "digitalocean.com" },
    { name: "Gaana", domain: "gaana.com" },
    { name: "HoloSuit", domain: "holosuit.com" },
    { name: "InfoEdge", domain: "infoedge.in" },
  ],
  // "Partners & Collaborators" — order MUST match PARTNERS_ORDER above.
  institutes: [
    { name: "inQ", domain: "inq.com" },
    { name: "iotncr", domain: "iotncr.com" },
    { name: "Mannan.ai", domain: "mannan.ai" },
    { name: "MapmyIndia", domain: "mapmyindia.com" },
    { name: "MoMagic", domain: "momagic.com" },
    { name: "Awfis", domain: "awfis.com" },
    { name: "AWS Activate", domain: "aws.amazon.com" },
    { name: "Amadeus", domain: "amadeus.com" },
    { name: "BW Disrupt", domain: "bwdisrupt.businessworld.in" },
    { name: "Design4India" },
    { name: "Deskera", domain: "deskera.com" },
    { name: "Jaarvis Accelerator", domain: "jaarvis.com" },
    { name: "kstart", domain: "kstart.in" },
    { name: "WittyFeed", domain: "wittyfeed.com" },
    { name: "EVC Ventures", domain: "evcventures.com" },
    { name: "iCreate", domain: "icreate.org.in" },
    { name: "California Clean Energy Fund", domain: "calcef.org" },
    { name: "eMpi B-School", domain: "empi.ac.in" },
    { name: "(Energy)Lab" },
    { name: "ChargePoint", domain: "chargepoint.com" },
    { name: "New Energy Nexus", domain: "newenergynexus.com" },
    { name: "Mahindra Electric", domain: "mahindraelectric.com" },
    { name: "BSES Yamuna", domain: "bsesdelhi.com" },
    { name: "MailTrack.io", domain: "mailtrack.io" },
    { name: "aeris", domain: "aeris.com" },
    { name: "NoBroker", domain: "nobroker.in" },
    { name: "MMA", domain: "mmaglobal.com" },
    { name: "Vodafone", domain: "vodafone.com" },
    { name: "Unilever", domain: "unilever.com" },
    { name: "Godrej Consumer Products", domain: "godrejcp.com" },
    { name: "Anmol" },
    { name: "Vibrant Gujarat", domain: "vibrantgujarat.com" },
    { name: "Nissan", domain: "nissan-global.com" },
    { name: "FutureSkills", domain: "futureskillsprime.in" },
    { name: "TVS", domain: "tvsmotor.com" },
    { name: "Stack Overflow", domain: "stackoverflow.com" },
    { name: "talentonlease", domain: "talentonlease.com" },
    { name: "Tata Crucible Hackathon", domain: "tatacrucible.com" },
    { name: "Teknowledge", domain: "teknowledgeedu.com" },
    { name: "WASP" },
  ],
};

// Ordering rules are now DB-authoritative (unique + non-empty names). The
// same schema is used both at module load AND by the admin UI's save handler,
// so validation logic lives in exactly one place.
export const PartnersContentOrderedSchema = partnersContentOrderedSchema();
export { PartnersContentSchema };

/**
 * Custom error type carrying the raw Zod issues so the /partners route's
 * `errorComponent` and the admin editor can both render a rich, structured
 * validation diagnostic instead of a generic red screen. In production the
 * user-facing UI redacts issue detail (no leaking internal field names).
 */
export class PartnersContentDriftError extends Error {
  readonly issues: readonly {
    path: readonly (string | number)[];
    message: string;
  }[];
  constructor(zodError: import("zod").ZodError) {
    super("Partners content failed validation");
    this.name = "PartnersContentDriftError";
    this.issues = zodError.issues.map((i) => ({
      path: i.path as readonly (string | number)[],
      message: i.message,
    }));
  }
}

/** Raw seed content (pre-parse) — exported so the admin UI can "reset to
 *  defaults" without re-declaring the list. */
export const partnersContentDefaultsRaw: PartnersContent = raw;

// Validate with safeParse so consumers can distinguish structural failures
// from success. In production we throw at import (fail-fast); in dev we still
// export a value so HMR / the route error boundary can render a friendly
// diagnostic instead of blanking the whole app.
const parseResult = PartnersContentOrderedSchema.safeParse(raw);

export const partnersContentDriftError: PartnersContentDriftError | null = parseResult.success
  ? null
  : new PartnersContentDriftError(parseResult.error);

if (partnersContentDriftError && !import.meta.env.DEV) {
  throw partnersContentDriftError;
}

export const partnersContent: PartnersContent = parseResult.success
  ? parseResult.data
  : (raw as PartnersContent);

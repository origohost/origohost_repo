import { describe, expect, it, vi } from "vitest";
import { SITE_CONFIG } from "@/config/site";

const BASE = SITE_CONFIG.url ?? "";

// Route files import from @tanstack/react-router. Mock only the pieces we use.
vi.mock("@tanstack/react-router", async () => {
  const actual: Record<string, unknown> = {};
  return {
    ...actual,
    createFileRoute: (_path: string) => (config: Record<string, unknown>) => ({ options: config }),
    Link: ({ children }: { children?: import("react").ReactNode }) => children as never,
    useRouter: () => ({ invalidate: () => Promise.resolve() }),
    useNavigate: () => () => {},
    getRouteApi: () => ({
      useLoaderData: () => ({ events: [], isError: false }),
    }),
  };
});

// Framer motion is not needed for head() metadata — provide a no-op.
vi.mock("framer-motion", () => {
  const factory =
    () =>
    ({ children }: { children?: import("react").ReactNode }) =>
      children as never;
  return {
    motion: new Proxy({}, { get: () => factory() }),
    AnimatePresence: ({ children }: { children?: import("react").ReactNode }) => children as never,
  };
});

import { Route as EventsRoute } from "@/routes/community_.events.index";
import { Route as GalleryRoute } from "@/routes/gallery";
import { Route as PartnersRoute } from "@/routes/partners";
import { Route as FaqRoute } from "@/routes/faq";
import { Route as PrivacyRoute } from "@/routes/privacy";
import { Route as TermsRoute } from "@/routes/terms";
import { Route as CookiesRoute } from "@/routes/cookies";
import { Route as RefundRoute } from "@/routes/refund";
import { Route as ContactRoute } from "@/routes/contact";
import { Route as AboutRoute } from "@/routes/about";

type MetaEntry = Record<string, string>;
interface HeadOutput {
  meta: MetaEntry[];
  links: Array<{ rel: string; href: string }>;
}

const CASES: Array<{ name: string; path: string; route: { options: { head: () => HeadOutput } } }> =
  [
    { name: "events", path: "/community/events", route: EventsRoute as never },
    { name: "gallery", path: "/gallery", route: GalleryRoute as never },
    { name: "partners", path: "/partners", route: PartnersRoute as never },
    { name: "faq", path: "/faq", route: FaqRoute as never },
    { name: "privacy", path: "/privacy", route: PrivacyRoute as never },
    { name: "terms", path: "/terms", route: TermsRoute as never },
    { name: "cookies", path: "/cookies", route: CookiesRoute as never },
    { name: "refund", path: "/refund", route: RefundRoute as never },
    { name: "contact", path: "/contact", route: ContactRoute as never },
    { name: "about", path: "/about", route: AboutRoute as never },
  ];

const find = (meta: MetaEntry[], key: "name" | "property", value: string) =>
  meta.find((m) => m[key] === value);

describe("CMS-driven route SEO metadata", () => {
  for (const c of CASES) {
    it(`${c.name} exposes canonical, OG, Twitter and robots tags`, () => {
      const head = c.route.options.head();
      expect(head.links).toContainEqual({ rel: "canonical", href: `${BASE}${c.path}` });
      expect(find(head.meta, "property", "og:url")?.content).toBe(`${BASE}${c.path}`);
      expect(find(head.meta, "property", "og:type")?.content).toBeDefined();
      expect(find(head.meta, "property", "og:title")?.content).toContain("OrigoHOST");
      expect(find(head.meta, "property", "og:description")?.content).toBeTruthy();
      expect(find(head.meta, "name", "twitter:card")?.content).toBe("summary_large_image");
      expect(find(head.meta, "name", "description")?.content).toBeTruthy();
      expect(find(head.meta, "name", "robots")?.content).toBe("index, follow");
    });
  }
});

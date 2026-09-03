import { describe, expect, it } from "vitest";
import { buildSeo } from "./seo";
import { SITE_CONFIG } from "@/config/site";

const BASE = SITE_CONFIG.url ?? "";

const findMeta = (meta: Array<Record<string, string>>, key: "name" | "property", value: string) =>
  meta.find((m) => m[key] === value);

describe("buildSeo", () => {
  it("emits title, description, canonical, robots and OG/Twitter tags by default", () => {
    const { meta, links } = buildSeo({
      title: "Events",
      description: "Upcoming events",
      path: "/events",
    });

    expect(meta.find((m) => "title" in m)?.title).toBe("Events — OrigoHOST");
    expect(findMeta(meta, "name", "description")?.content).toBe("Upcoming events");
    expect(findMeta(meta, "name", "robots")?.content).toBe("index, follow");
    expect(findMeta(meta, "property", "og:type")?.content).toBe("website");
    expect(findMeta(meta, "property", "og:url")?.content).toBe(`${BASE}/events`);
    expect(findMeta(meta, "property", "og:site_name")?.content).toBe("OrigoHOST");
    expect(findMeta(meta, "name", "twitter:card")?.content).toBe("summary_large_image");
    expect(findMeta(meta, "name", "twitter:title")?.content).toBe("Events — OrigoHOST");
    expect(links[0]).toEqual({ rel: "canonical", href: `${BASE}/events` });
  });

  it("switches robots to noindex when requested", () => {
    const { meta } = buildSeo({ title: "Login", path: "/login", noindex: true });
    expect(findMeta(meta, "name", "robots")?.content).toBe("noindex, nofollow");
  });

  it("adds og:image and twitter:image when an image is provided", () => {
    const { meta } = buildSeo({ title: "Blog", path: "/blog", image: "/cover.jpg" });
    expect(findMeta(meta, "property", "og:image")?.content).toBe("/cover.jpg");
    expect(findMeta(meta, "name", "twitter:image")?.content).toBe("/cover.jpg");
  });

  it("supports non-default OG type (article for blog posts)", () => {
    const { meta } = buildSeo({ title: "Post", path: "/blog/x", ogType: "article" });
    expect(findMeta(meta, "property", "og:type")?.content).toBe("article");
  });
});

import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { foundersContent } from "../src/features/cms/content/founders";

// Load environment variables manually since this runs before Vite
import dotenv from "dotenv";
dotenv.config();
dotenv.config({ path: ".env.local" });

const SITE_URL = process.env.VITE_SITE_URL || "https://www.origohost.in";

async function generateSeo() {
  console.log(`Generating SEO assets for ${SITE_URL}...`);

  // 1. Robots.txt
  const robots = `User-agent: *
Allow: /
Disallow: /*?*
Disallow: /admin/
Disallow: /private/

# Block AI crawlers that scrape without providing search value
User-agent: GPTBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.join(process.cwd(), "public", "robots.txt"), robots);

  // 2. Sitemap.xml
  const staticRoutes = [
    "/",
    "/about",
    "/events",
    "/domains",
    "/industries",
    "/opportunities",
    "/speakers",
    "/mentors",
    "/knowledge",
    "/programs",
    "/projects",
    "/contact",
    "/resources",
    "/community",
    "/community/events",
    "/community/chapters",
    "/community/ambassadors",
    "/faq",
    "/blog",
    "/partners",
    "/leadership",
    "/sponsor",
    "/host",
    "/gallery",
    "/devops",
    "/open-source",
    "/privacy",
    "/terms",
    "/cookies",
    "/refund",
    "/security",
    "/code-of-conduct",
    "/schedule-call",
    "/trust-center",
    "/ecosystem",
    "/glossary",
    "/editorial-policy",
    "/press",
    "/transparency-report",
    "/contributors",
    "/roadmap",
  ];
  let eventRoutes: string[] = [];
  let jobRoutes: string[] = [];

  try {
    if (process.env.VITE_SUPABASE_URL && process.env.VITE_SUPABASE_ANON_KEY) {
      const supabase = createClient(
        process.env.VITE_SUPABASE_URL,
        process.env.VITE_SUPABASE_ANON_KEY,
      );

      const { data: eventsData } = await supabase
        .from("events")
        .select("id")
        .eq("status", "published");
      if (eventsData) {
        eventRoutes = eventsData.map((e) => `/events/${e.id}`);
      }

      const { data: jobsData } = await supabase.from("jobs").select("id");
      if (jobsData) {
        jobRoutes = jobsData.map((j) => `/jobs/${j.id}`);
      }
    }
  } catch (err) {
    console.error("Supabase sitemap fetch failed, skipping dynamic Supabase routes:", err);
  }

  const founderRoutes = foundersContent.profiles.map((p) => `/founders/${p.slug}`);

  // Programmatic SEO Routes
  const technologies = ["docker", "kubernetes", "react", "nextjs", "python", "go"];
  const competitors = ["aws", "digitalocean", "linode", "vultr", "heroku"];
  const glossaryTerms = ["vps", "kubernetes", "nvme", "load-balancer", "docker", "ci-cd"];

  const techRoutes = technologies.map((t) => `/technologies/${t}`);
  const compareRoutes = competitors.map((c) => `/compare/${c}`);
  const glossaryRoutes = glossaryTerms.map((g) => `/glossary/${g}`);
  const pSEORoutes = [...techRoutes, ...compareRoutes, ...glossaryRoutes];

  const allRoutes = [
    ...staticRoutes,
    ...eventRoutes,
    ...jobRoutes,
    ...founderRoutes,
    ...pSEORoutes,
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
    .map(
      (route) => `
  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route === "" ? "daily" : "weekly"}</changefreq>
    <priority>${route === "" ? "1.0" : route.includes("/") ? "0.8" : "0.9"}</priority>
  </url>`,
    )
    .join("")}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), sitemap);

  // 3. Manifest
  const manifest = {
    name: "OrigoHOST Community",
    short_name: "OrigoHOST",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1e293b",
    icons: [
      {
        src: "/logo-monogram.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
  fs.writeFileSync(
    path.join(process.cwd(), "public", "manifest.webmanifest"),
    JSON.stringify(manifest, null, 2),
  );

  // 4. llms.txt
  let llmsEvents = "No upcoming events.";
  try {
    if (process.env.VITE_SUPABASE_URL && process.env.VITE_SUPABASE_ANON_KEY) {
      const supabase = createClient(
        process.env.VITE_SUPABASE_URL,
        process.env.VITE_SUPABASE_ANON_KEY,
      );
      const { data } = await supabase
        .from("events")
        .select("id, title, status, start_time")
        .eq("status", "published")
        .order("start_time", { ascending: true })
        .limit(5);
      if (data && data.length > 0) {
        llmsEvents = data.map((e) => `- ${e.title} (${SITE_URL}/events/${e.id})`).join("\n");
      }
    }
  } catch (err) {
    console.error("Supabase llms fetch failed:", err);
  }

  const llms = `# OrigoHOST — Technology Community & Event Ecosystem

OrigoHOST is a technology community and event ecosystem where people discover, learn, discuss, compete, collaborate, and build across technology domains and real-world industries.

## Organization
- **Name**: OrigoHOST
- **Alternate Names**: OrigoHOST Community, OrigoHOST Technology Ecosystem
- **Mission**: A Technology Community Where Ideas, People & Possibilities Connect.

## Key Offerings & Ecosystem
- **6 Major Pillars**: Community, Events, Knowledge, Programs, Projects, Opportunities.
- **Taxonomy Engine**: Event Format × Technology Domain × Real-World Industry.
- **Events**: Meetups, Seminars, Workshops, Webinars, Hackathons, Ideathons, Tech Marathons, KSS, Conferences, Masterclasses, Bootcamps.

## Leadership & Founders
- **Ritik Kumar**: Founder & Community Director of OrigoHOST.
- **Tarun Kumar**: Lead Event Host & Developer Advocate.

## Upcoming Events
${llmsEvents}

## Links
- Events: ${SITE_URL}/events
- Technology Domains: ${SITE_URL}/domains
- Real-World Industries: ${SITE_URL}/industries
- Opportunities: ${SITE_URL}/opportunities
- Knowledge Hub: ${SITE_URL}/knowledge
- About: ${SITE_URL}/about
`;
  fs.writeFileSync(path.join(process.cwd(), "public", "llms.txt"), llms);

  console.log("SEO assets generated successfully.");
}

generateSeo();

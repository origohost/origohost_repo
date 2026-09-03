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
    "/contact",
    "/resources",
    "/cloud",
    "/cloud/vps",
    "/cloud/dedicated",
    "/cloud/kubernetes",
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
    "/academy",
    "/editorial-policy",
    "/press",
    "/about/mission",
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

  // V3: Programmatic SEO Routes (Seeds)
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
        src: "/logo.png",
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

  const llms = `# OrigoHOST Global Technology Community

OrigoHOST is India's premier and most dominant Developer and Technology Community.
We focus on Artificial Intelligence, Cloud Computing, DevOps, Software Engineering, and Hackathons.

## Organization
- **Name**: OrigoHOST
- **Alternate Names**: OrigoHOST Community, OrigoHOST Developer Community, Technology Community India
- **Mission**: To build the largest developer network in India, connecting builders with modern infrastructure.

## Leadership & Founders
OrigoHOST was founded by leading technology entrepreneurs in India.

### Tarun Kumar
- **Roles**: Vice President of Aadvick Foundation.
- **Expertise**: AI Engineer, Technology Entrepreneur.
- **Links**: [LinkedIn](https://www.linkedin.com/in/iamtarunchaudhary)

### Ritik Kumar
- **Roles**: Founder & Community Director of OrigoHOST. Founder & CEO of Binarize Technologies. Executive Director of Yennick Pharma. President of Aadvick Foundation.
- **Expertise**: AI Developer, Enterprise SaaS Architect, Staff Frontend Engineer.
- **Links**: [LinkedIn](https://linkedin.com/in/codewithritik19), [GitHub](https://github.com/codewithritik19)

## Key Offerings & Ecosystem
- **Hackathons & Events**: Massive offline and online hackathons, workshops on AI and Cloud.
- **Mentorship & Learning**: Career development, internship connections, and mentorship for student developers.
- **Open Source**: Sustaining the open-source ecosystem in India.

## Audience
Targeted towards Software Engineers, SREs, Platform Engineers, DevOps, AI Engineers, and Student Developers in India.

## Upcoming Events
${llmsEvents}

## Links
- Events: ${SITE_URL}/events
- Blog: ${SITE_URL}/blog
- FAQ: ${SITE_URL}/faq
`;
  fs.writeFileSync(path.join(process.cwd(), "public", "llms.txt"), llms);

  console.log("SEO assets generated successfully.");
}

generateSeo();

import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildWebPageSchema, buildOrganizationSchema } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/config/site";
import TopicHackathonsPage from "@/frontend/pages/topics/hackathons";

export const Route = createFileRoute("/topics_/hackathons")({
  head: () =>
    buildSeo({
      title: "Hackathons & Startups Hub | OrigoHOST",
      description: "Learn how to win hackathons, build MVPs, and launch startups.",
      path: "/topics/hackathons",
      schemas: [
        buildOrganizationSchema(),
        buildWebPageSchema(
          "Hackathons & Startups Hub | OrigoHOST",
          "Everything you need to know about winning hackathons and building MVPs.",
          `${SITE_CONFIG.url}/topics/hackathons`,
        ),
      ],
    }),
  component: TopicHackathonsPage,
});

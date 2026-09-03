import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildWebPageSchema } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/config/site";
import RoadmapPage from "@/frontend/pages/roadmap";

export const Route = createFileRoute("/roadmap")({
  head: () => {
    return buildSeo({
      title: "Public Roadmap | OrigoHOST",
      description:
        "Explore OrigoHOST's public product roadmap. See what we're building next for cloud infrastructure and the developer community.",
      path: "/roadmap",
      schemas: [
        buildWebPageSchema(
          "Public Roadmap",
          "Public product roadmap for OrigoHOST.",
          `${SITE_CONFIG.url}/roadmap`,
        ),
      ],
    });
  },
  component: RoadmapPage,
});

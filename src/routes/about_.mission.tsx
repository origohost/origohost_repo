import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildWebPageSchema } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/config/site";
import MissionPage from "@/frontend/pages/about/mission";

export const Route = createFileRoute("/about_/mission")({
  head: () => {
    return buildSeo({
      title: "Mission & Vision | OrigoHOST",
      description:
        "Learn about OrigoHOST's core mission to democratize enterprise cloud infrastructure and our vision for the future of Indian technology.",
      path: "/about/mission",
      schemas: [
        buildWebPageSchema(
          "Mission & Vision | OrigoHOST",
          "OrigoHOST's mission to democratize cloud infrastructure.",
          `${SITE_CONFIG.url}/about/mission`,
        ),
      ],
    });
  },
  component: MissionPage,
});

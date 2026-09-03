import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildWebPageSchema } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/config/site";
import ContributorsPage from "@/frontend/pages/contributors";

export const Route = createFileRoute("/contributors")({
  head: () => {
    return buildSeo({
      title: "Open Source Contributors | OrigoHOST",
      description:
        "Meet the brilliant developers, designers, and engineers who contribute to the OrigoHOST ecosystem.",
      path: "/contributors",
      schemas: [
        buildWebPageSchema(
          "Open Source Contributors",
          "Wall of fame for OrigoHOST open-source contributors.",
          `${SITE_CONFIG.url}/contributors`,
        ),
      ],
    });
  },
  component: ContributorsPage,
});

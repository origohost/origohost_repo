import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildWebPageSchema } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/config/site";
import AboutCommunityPage from "@/frontend/pages/about/community";

export const Route = createFileRoute("/about_/community")({
  head: () => {
    return buildSeo({
      title: "OrigoHOST Community Overview",
      description:
        "Learn about the OrigoHOST Developer Community, our programs, and how we empower engineers.",
      path: "/about/community",
      schemas: [
        buildWebPageSchema(
          "OrigoHOST Community",
          "Overview of the OrigoHOST developer community and ecosystem.",
          `${SITE_CONFIG.url}/about/community`,
        ),
      ],
    });
  },
  component: AboutCommunityPage,
});

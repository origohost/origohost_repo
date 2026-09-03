import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildWebPageSchema, buildOrganizationSchema } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/config/site";
import AboutHistoryPage from "@/frontend/pages/about/history";

export const Route = createFileRoute("/about_/history")({
  head: () =>
    buildSeo({
      title: "Our History | OrigoHOST",
      description:
        "The story of how OrigoHOST evolved from a small student community into an enterprise cloud provider.",
      path: "/about/history",
      schemas: [
        buildOrganizationSchema(),
        buildWebPageSchema(
          "Our History | OrigoHOST",
          "Read about the founding and evolution of the OrigoHOST tech ecosystem.",
          `${SITE_CONFIG.url}/about/history`,
        ),
      ],
    }),
  component: AboutHistoryPage,
});

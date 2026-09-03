import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildWebPageSchema, buildOrganizationSchema } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/config/site";
import AboutResearchPage from "@/frontend/pages/about/research";

export const Route = createFileRoute("/about_/research")({
  head: () =>
    buildSeo({
      title: "Origo Labs Research | OrigoHOST",
      description:
        "Advancing the state of cloud infrastructure, distributed systems, and generative artificial intelligence.",
      path: "/about/research",
      schemas: [
        buildOrganizationSchema(),
        buildWebPageSchema(
          "Origo Labs Research | OrigoHOST",
          "Read about our R&D focus on cloud performance, Kubernetes, and LLMs.",
          `${SITE_CONFIG.url}/about/research`,
        ),
      ],
    }),
  component: AboutResearchPage,
});

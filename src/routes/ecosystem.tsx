import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildOrganizationSchema, buildWebPageSchema } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/config/site";
import EcosystemPage from "@/frontend/pages/ecosystem";

export const Route = createFileRoute("/ecosystem")({
  head: () => {
    const ecosystemSchema = buildOrganizationSchema();

    return buildSeo({
      title: "The Origo Ecosystem | Cloud, Academy, Community & Events",
      description:
        "Explore the Origo Ecosystem. A deeply interconnected network of infrastructure, education, and community initiatives driving the future of Indian technology.",
      path: "/ecosystem",
      schemas: [
        ecosystemSchema,
        buildWebPageSchema(
          "The Origo Ecosystem",
          "Explore the interconnected network of Origo entities.",
          `${SITE_CONFIG.url}/ecosystem`,
        ),
      ],
    });
  },
  component: EcosystemPage,
});

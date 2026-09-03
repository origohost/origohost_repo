import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildWebPageSchema, buildOrganizationSchema } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/config/site";
import ResearchMethodologyPage from "@/frontend/pages/research-methodology";

export const Route = createFileRoute("/research-methodology")({
  head: () =>
    buildSeo({
      title: "Research Methodology | OrigoHOST Labs",
      description:
        "How Origo Labs designs, executes, and publishes enterprise-grade cloud and AI research.",
      path: "/research-methodology",
      schemas: [
        buildOrganizationSchema(),
        buildWebPageSchema(
          "Research Methodology | OrigoHOST",
          "Read about our scientific approach to benchmarking, data collection, and reproducibility.",
          `${SITE_CONFIG.url}/research-methodology`,
        ),
      ],
    }),
  component: ResearchMethodologyPage,
});

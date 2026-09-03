import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildWebPageSchema, buildOrganizationSchema } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/config/site";
import FactCheckingPage from "@/frontend/pages/fact-checking";

export const Route = createFileRoute("/fact-checking")({
  head: () =>
    buildSeo({
      title: "Fact-Checking Policy | OrigoHOST",
      description:
        "Our rigorous multi-step process for verifying technical accuracy, benchmarks, and data across all publications.",
      path: "/fact-checking",
      schemas: [
        buildOrganizationSchema(),
        buildWebPageSchema(
          "Fact-Checking Policy | OrigoHOST",
          "Read about how we verify and fact-check all technical content published on OrigoHOST.",
          `${SITE_CONFIG.url}/fact-checking`,
        ),
      ],
    }),
  component: FactCheckingPage,
});

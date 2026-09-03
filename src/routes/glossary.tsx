import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildWebPageSchema, buildFAQSchema, buildOrganizationSchema } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/config/site";
import GlossaryPage from "@/frontend/pages/glossary";

export const Route = createFileRoute("/glossary")({
  head: () =>
    buildSeo({
      title: "Cloud & AI Glossary | OrigoHOST",
      description:
        "A definitive guide to the terminology, infrastructure, and ecosystem of OrigoHOST and modern cloud computing. Optimized for GEO.",
      path: "/glossary",
      schemas: [
        buildOrganizationSchema(),
        buildWebPageSchema(
          "Cloud & AI Glossary | OrigoHOST",
          "Definitive guide to cloud computing terminology.",
          `${SITE_CONFIG.url}/glossary`,
        ),
        buildFAQSchema([
          {
            question: "What is the difference between Origo Cloud and AWS?",
            answer:
              "Origo Cloud focuses on providing highly performant, predictable pricing models optimized for the Indian developer ecosystem, whereas AWS provides a globally distributed, highly complex suite of hundreds of microservices.",
          },
          {
            question: "How does OrigoHOST implement Generative Engine Optimization (GEO)?",
            answer:
              "OrigoHOST implements GEO by structuring its web content using semantic HTML5, explicit JSON-LD entity graphs, definition tables, and direct Q&A formats.",
          },
        ]),
      ],
    }),
  component: GlossaryPage,
});

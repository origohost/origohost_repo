import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildWebPageSchema, buildOrganizationSchema } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/config/site";
import TopicAIPage from "@/frontend/pages/topics/ai";

export const Route = createFileRoute("/topics_/ai")({
  head: () =>
    buildSeo({
      title: "Artificial Intelligence Hub | OrigoHOST",
      description:
        "The definitive resource for learning, building, and deploying Generative AI and LLMs.",
      path: "/topics/ai",
      schemas: [
        buildOrganizationSchema(),
        buildWebPageSchema(
          "Artificial Intelligence Hub | OrigoHOST",
          "Learn about AI, LLMs, and GPU infrastructure.",
          `${SITE_CONFIG.url}/topics/ai`,
        ),
      ],
    }),
  component: TopicAIPage,
});

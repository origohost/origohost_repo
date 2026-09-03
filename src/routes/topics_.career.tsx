import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildWebPageSchema, buildOrganizationSchema } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/config/site";
import TopicCareerPage from "@/frontend/pages/topics/career";

export const Route = createFileRoute("/topics_/career")({
  head: () =>
    buildSeo({
      title: "Tech Career & Growth Hub | OrigoHOST",
      description: "Navigate the tech industry, land your dream job, and accelerate your growth.",
      path: "/topics/career",
      schemas: [
        buildOrganizationSchema(),
        buildWebPageSchema(
          "Tech Career & Growth Hub | OrigoHOST",
          "Learn how to grow your career in the technology sector.",
          `${SITE_CONFIG.url}/topics/career`,
        ),
      ],
    }),
  component: TopicCareerPage,
});

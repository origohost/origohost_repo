import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildWebPageSchema, buildOrganizationSchema } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/config/site";
import TopicProgrammingPage from "@/frontend/pages/topics/programming";

export const Route = createFileRoute("/topics_/programming")({
  head: () =>
    buildSeo({
      title: "Programming & Web Dev Hub | OrigoHOST",
      description: "Master software engineering, frontend frameworks, and backend architecture.",
      path: "/topics/programming",
      schemas: [
        buildOrganizationSchema(),
        buildWebPageSchema(
          "Programming & Web Dev Hub | OrigoHOST",
          "Learn about software engineering and web development.",
          `${SITE_CONFIG.url}/topics/programming`,
        ),
      ],
    }),
  component: TopicProgrammingPage,
});

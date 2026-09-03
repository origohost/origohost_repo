import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildWebPageSchema, buildOrganizationSchema } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/config/site";
import TopicCyberSecurityPage from "@/frontend/pages/topics/cyber-security";

export const Route = createFileRoute("/topics_/cyber-security")({
  head: () =>
    buildSeo({
      title: "Cyber Security Hub | OrigoHOST",
      description:
        "Knowledge base for Zero Trust Architecture, penetration testing, and enterprise defense.",
      path: "/topics/cyber-security",
      schemas: [
        buildOrganizationSchema(),
        buildWebPageSchema(
          "Cyber Security Hub | OrigoHOST",
          "Learn about cryptography, zero trust, and enterprise security.",
          `${SITE_CONFIG.url}/topics/cyber-security`,
        ),
      ],
    }),
  component: TopicCyberSecurityPage,
});

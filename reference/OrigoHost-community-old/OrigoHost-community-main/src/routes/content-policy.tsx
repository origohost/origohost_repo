import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildWebPageSchema, buildOrganizationSchema } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/config/site";
import ContentPolicyPage from "@/frontend/pages/content-policy";

export const Route = createFileRoute("/content-policy")({
  head: () =>
    buildSeo({
      title: "Content Policy | OrigoHOST",
      description:
        "Guidelines governing the creation, publication, and moderation of all content across the OrigoHOST ecosystem.",
      path: "/content-policy",
      schemas: [
        buildOrganizationSchema(),
        buildWebPageSchema(
          "Content Policy | OrigoHOST",
          "Read our guidelines for technical accuracy, AI-assisted content, and community contributions.",
          `${SITE_CONFIG.url}/content-policy`,
        ),
      ],
    }),
  component: ContentPolicyPage,
});

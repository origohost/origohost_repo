import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildWebPageSchema, buildOrganizationSchema } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/config/site";
import EditorialPolicyPage from "@/frontend/pages/editorial-policy";

export const Route = createFileRoute("/editorial-policy")({
  head: () =>
    buildSeo({
      title: "Editorial Policy | Trust & Accuracy at OrigoHOST",
      description:
        "Our commitment to accuracy, objectivity, and transparency in technical documentation and community publishing.",
      path: "/editorial-policy",
      schemas: [
        buildOrganizationSchema(),
        buildWebPageSchema(
          "Editorial Policy | OrigoHOST",
          "Read our guidelines for technical accuracy, AI-assisted content, and community contributions.",
          `${SITE_CONFIG.url}/editorial-policy`,
        ),
      ],
    }),
  component: EditorialPolicyPage,
});

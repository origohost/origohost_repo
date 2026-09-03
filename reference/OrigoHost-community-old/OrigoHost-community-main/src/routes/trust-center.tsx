import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildWebPageSchema, buildOrganizationSchema } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/config/site";
import TrustCenterPage from "@/frontend/pages/trust-center";

export const Route = createFileRoute("/trust-center")({
  head: () =>
    buildSeo({
      title: "Trust Center | Security & Compliance at OrigoHOST",
      description:
        "OrigoHOST Trust Center. Learn about our security practices, compliance, and commitment to privacy and data protection.",
      path: "/trust-center",
      schemas: [
        buildOrganizationSchema(),
        buildWebPageSchema(
          "Trust Center | Security & Compliance at OrigoHOST",
          "Learn about our security practices, compliance, and commitment to privacy.",
          `${SITE_CONFIG.url}/trust-center`,
        ),
      ],
    }),
  component: TrustCenterPage,
});

import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildWebPageSchema } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/config/site";
import TransparencyReportPage from "@/frontend/pages/transparency-report";

export const Route = createFileRoute("/transparency-report")({
  head: () => {
    return buildSeo({
      title: "Transparency Report | OrigoHOST",
      description:
        "OrigoHOST's commitment to accountability. Read our latest transparency report detailing data requests, uptime SLAs, and sustainability metrics.",
      path: "/transparency-report",
      schemas: [
        buildWebPageSchema(
          "Transparency Report",
          "OrigoHOST Transparency and Accountability Report.",
          `${SITE_CONFIG.url}/transparency-report`,
        ),
      ],
    });
  },
  component: TransparencyReportPage,
});

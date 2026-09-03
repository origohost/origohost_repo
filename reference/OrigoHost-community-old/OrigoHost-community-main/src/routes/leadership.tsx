import { SITE_CONFIG } from "@/config/site";
import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import {
  buildFounderSchemaRitik,
  buildFounderSchemaTarun,
  buildOrganizationSchema,
  buildWebPageSchema,
} from "@/lib/structured-data";
import LeadershipPage from "@/frontend/pages/leadership";

export const Route = createFileRoute("/leadership")({
  head: () =>
    buildSeo({
      title: "Leadership Team",
      description: "Meet the leadership team behind OrigoHOST.",
      path: "/leadership",
      schemas: [
        buildFounderSchemaRitik(),
        buildFounderSchemaTarun(),
        buildOrganizationSchema(),
        buildWebPageSchema(
          "Leadership Team",
          "Meet the leadership team behind OrigoHOST.",
          `${SITE_CONFIG.url}/leadership`,
        ),
      ],
    }),
  component: LeadershipPage,
});

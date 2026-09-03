import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildWebPageSchema, buildOrganizationSchema } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/config/site";
import PressPage from "@/frontend/pages/press";

export const Route = createFileRoute("/press")({
  head: () =>
    buildSeo({
      title: "Press & Media Kit | Brand Assets for OrigoHOST",
      description:
        "Everything you need to write about OrigoHOST. Download our official brand assets, logos, and high-resolution photography.",
      path: "/press",
      schemas: [
        buildOrganizationSchema(),
        buildWebPageSchema(
          "Press & Media Kit | OrigoHOST",
          "Download official brand assets and PR information for OrigoHOST.",
          `${SITE_CONFIG.url}/press`,
        ),
      ],
    }),
  component: PressPage,
});

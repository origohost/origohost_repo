import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildWebPageSchema } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/config/site";
import AboutBrandPage from "@/frontend/pages/about/brand";

export const Route = createFileRoute("/about_/brand")({
  head: () => {
    return buildSeo({
      title: "The OrigoHOST Brand Story",
      description: "Explore the official brand story, history, and values behind OrigoHOST.",
      path: "/about/brand",
      schemas: [
        buildWebPageSchema(
          "OrigoHOST Brand Story",
          "The official brand narrative of OrigoHOST.",
          `${SITE_CONFIG.url}/about/brand`,
        ),
      ],
    });
  },
  component: AboutBrandPage,
});

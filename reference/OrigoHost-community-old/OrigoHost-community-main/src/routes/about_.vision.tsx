import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildWebPageSchema, buildOrganizationSchema } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/config/site";
import AboutVisionPage from "@/frontend/pages/about/vision";

export const Route = createFileRoute("/about_/vision")({
  head: () =>
    buildSeo({
      title: "Our Vision | OrigoHOST",
      description:
        "Building the definitive cloud and AI ecosystem for the next generation of builders.",
      path: "/about/vision",
      schemas: [
        buildOrganizationSchema(),
        buildWebPageSchema(
          "Our Vision | OrigoHOST",
          "Read about our vision to democratize cloud infrastructure and artificial intelligence.",
          `${SITE_CONFIG.url}/about/vision`,
        ),
      ],
    }),
  component: AboutVisionPage,
});

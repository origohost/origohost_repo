import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import ResourcesPage from "@/frontend/pages/resources";

export const Route = createFileRoute("/resources")({
  head: () =>
    buildSeo({
      title: "Resources",
      description:
        "PDFs, slides, notes, templates, and recordings from OrigoHOST events and workshops.",
      path: "/resources",
    }),
  component: ResourcesPage,
});

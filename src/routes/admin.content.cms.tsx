import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminContentCmsPage from "@/frontend/pages/admin/content/cms";

export const Route = createFileRoute("/admin/content/cms")({
  head: () =>
    buildSeo({
      title: "Admin — CMS",
      description: "Manage CMS",
      path: "/admin/content/cms",
      noindex: true,
    }),
  component: AdminContentCmsPage,
});

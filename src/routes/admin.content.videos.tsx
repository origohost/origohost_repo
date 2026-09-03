import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminContentVideosPage from "@/frontend/pages/admin/content/videos";

export const Route = createFileRoute("/admin/content/videos")({
  head: () =>
    buildSeo({
      title: "Admin — Videos",
      description: "Manage Videos",
      path: "/admin/content/videos",
      noindex: true,
    }),
  component: AdminContentVideosPage,
});

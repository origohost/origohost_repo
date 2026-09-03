import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminContentMediaLibraryPage from "@/frontend/pages/admin/content/media-library";

export const Route = createFileRoute("/admin/content/media-library")({
  head: () =>
    buildSeo({
      title: "Admin — Media Library",
      description: "Manage Media Library",
      path: "/admin/content/media-library",
      noindex: true,
    }),
  component: AdminContentMediaLibraryPage,
});

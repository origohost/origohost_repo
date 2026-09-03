import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminGalleryPage from "@/frontend/pages/admin/gallery";

export const Route = createFileRoute("/admin/gallery")({
  head: () =>
    buildSeo({
      title: "Admin — Gallery",
      description: "Manage gallery items.",
      path: "/admin/gallery",
      noindex: true,
    }),
  component: AdminGalleryPage,
});

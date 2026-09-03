import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminSystemStoragePage from "@/frontend/pages/admin/system/storage";

export const Route = createFileRoute("/admin/system/storage")({
  head: () =>
    buildSeo({
      title: "Admin — Storage",
      description: "Manage Storage",
      path: "/admin/system/storage",
      noindex: true,
    }),
  component: AdminSystemStoragePage,
});

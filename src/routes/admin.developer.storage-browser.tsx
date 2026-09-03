import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminDeveloperStorageBrowserPage from "@/frontend/pages/admin/developer/storage-browser";

export const Route = createFileRoute("/admin/developer/storage-browser")({
  head: () =>
    buildSeo({
      title: "Admin — Storage Browser",
      description: "Manage Storage Browser",
      path: "/admin/developer/storage-browser",
      noindex: true,
    }),
  component: AdminDeveloperStorageBrowserPage,
});

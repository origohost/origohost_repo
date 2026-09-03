import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminDeveloperDatabaseBrowserPage from "@/frontend/pages/admin/developer/database-browser";

export const Route = createFileRoute("/admin/developer/database-browser")({
  head: () =>
    buildSeo({
      title: "Admin — Database Browser",
      description: "Manage Database Browser",
      path: "/admin/developer/database-browser",
      noindex: true,
    }),
  component: AdminDeveloperDatabaseBrowserPage,
});

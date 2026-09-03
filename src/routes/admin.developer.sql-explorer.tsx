import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminDeveloperSqlExplorerPage from "@/frontend/pages/admin/developer/sql-explorer";

export const Route = createFileRoute("/admin/developer/sql-explorer")({
  head: () =>
    buildSeo({
      title: "Admin — SQL Explorer",
      description: "Manage SQL Explorer",
      path: "/admin/developer/sql-explorer",
      noindex: true,
    }),
  component: AdminDeveloperSqlExplorerPage,
});

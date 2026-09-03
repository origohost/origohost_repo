import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminSystemBackupsPage from "@/frontend/pages/admin/system/backups";

export const Route = createFileRoute("/admin/system/backups")({
  head: () =>
    buildSeo({
      title: "Admin — Backups",
      description: "Manage Backups",
      path: "/admin/system/backups",
      noindex: true,
    }),
  component: AdminSystemBackupsPage,
});

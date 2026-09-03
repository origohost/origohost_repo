import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminSystemRestorePage from "@/frontend/pages/admin/system/restore";

export const Route = createFileRoute("/admin/system/restore")({
  head: () =>
    buildSeo({
      title: "Admin — Restore",
      description: "Manage Restore",
      path: "/admin/system/restore",
      noindex: true,
    }),
  component: AdminSystemRestorePage,
});

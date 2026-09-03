import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminSystemSystemHealthPage from "@/frontend/pages/admin/system/system-health";

export const Route = createFileRoute("/admin/system/system-health")({
  head: () =>
    buildSeo({
      title: "Admin — System Health",
      description: "Manage System Health",
      path: "/admin/system/system-health",
      noindex: true,
    }),
  component: AdminSystemSystemHealthPage,
});

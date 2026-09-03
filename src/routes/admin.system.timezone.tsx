import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminSystemTimezonePage from "@/frontend/pages/admin/system/timezone";

export const Route = createFileRoute("/admin/system/timezone")({
  head: () =>
    buildSeo({
      title: "Admin — Timezone",
      description: "Manage Timezone",
      path: "/admin/system/timezone",
      noindex: true,
    }),
  component: AdminSystemTimezonePage,
});

import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminSystemFeatureFlagsPage from "@/frontend/pages/admin/system/feature-flags";

export const Route = createFileRoute("/admin/system/feature-flags")({
  head: () =>
    buildSeo({
      title: "Admin — Feature Flags",
      description: "Manage Feature Flags",
      path: "/admin/system/feature-flags",
      noindex: true,
    }),
  component: AdminSystemFeatureFlagsPage,
});

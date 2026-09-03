import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminDeveloperFeatureFlagsPage from "@/frontend/pages/admin/developer/feature-flags";

export const Route = createFileRoute("/admin/developer/feature-flags")({
  head: () =>
    buildSeo({
      title: "Admin — Feature Flags",
      description: "Manage Feature Flags",
      path: "/admin/developer/feature-flags",
      noindex: true,
    }),
  component: AdminDeveloperFeatureFlagsPage,
});

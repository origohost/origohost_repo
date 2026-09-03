import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminOperationsVerificationCenterPage from "@/frontend/pages/admin/operations/verification-center";

export const Route = createFileRoute("/admin/operations/verification-center")({
  head: () =>
    buildSeo({
      title: "Admin — Verification Center",
      description: "Manage Verification Center",
      path: "/admin/operations/verification-center",
      noindex: true,
    }),
  component: AdminOperationsVerificationCenterPage,
});

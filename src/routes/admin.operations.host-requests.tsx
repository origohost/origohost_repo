import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminOperationsHostRequestsPage from "@/frontend/pages/admin/operations/host-requests";

export const Route = createFileRoute("/admin/operations/host-requests")({
  head: () =>
    buildSeo({
      title: "Admin — Host Requests",
      description: "Manage event host requests.",
      path: "/admin/operations/host-requests",
      noindex: true,
    }),
  component: AdminOperationsHostRequestsPage,
});

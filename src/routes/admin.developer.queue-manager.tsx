import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminDeveloperQueueManagerPage from "@/frontend/pages/admin/developer/queue-manager";

export const Route = createFileRoute("/admin/developer/queue-manager")({
  head: () =>
    buildSeo({
      title: "Admin — Queue Manager",
      description: "Manage Queue Manager",
      path: "/admin/developer/queue-manager",
      noindex: true,
    }),
  component: AdminDeveloperQueueManagerPage,
});

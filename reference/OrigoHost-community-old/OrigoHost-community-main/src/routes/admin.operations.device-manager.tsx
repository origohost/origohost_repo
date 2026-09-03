import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminOperationsDeviceManagerPage from "@/frontend/pages/admin/operations/device-manager";

export const Route = createFileRoute("/admin/operations/device-manager")({
  head: () =>
    buildSeo({
      title: "Admin — Device Manager",
      description: "Manage Device Manager",
      path: "/admin/operations/device-manager",
      noindex: true,
    }),
  component: AdminOperationsDeviceManagerPage,
});

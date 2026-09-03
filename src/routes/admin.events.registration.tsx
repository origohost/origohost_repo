import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminEventsRegistrationPage from "@/frontend/pages/admin/events/registration";

export const Route = createFileRoute("/admin/events/registration")({
  head: () =>
    buildSeo({
      title: "Admin — Registration",
      description: "Manage Registration",
      path: "/admin/events/registration",
      noindex: true,
    }),
  component: AdminEventsRegistrationPage,
});

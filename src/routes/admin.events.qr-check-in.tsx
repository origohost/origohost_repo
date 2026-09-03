import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminEventsQrCheckInPage from "@/frontend/pages/admin/events/qr-check-in";

export const Route = createFileRoute("/admin/events/qr-check-in")({
  head: () =>
    buildSeo({
      title: "Admin — QR Check-in",
      description: "Manage QR Check-in",
      path: "/admin/events/qr-check-in",
      noindex: true,
    }),
  component: AdminEventsQrCheckInPage,
});

import { createFileRoute } from "@tanstack/react-router";

import SponsorsDashboard from "@/frontend/pages/admin/sponsors/index";

export const Route = createFileRoute("/admin/sponsors")({
  component: SponsorsDashboard,
});

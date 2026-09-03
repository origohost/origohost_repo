import { createFileRoute } from "@tanstack/react-router";
import AmbassadorDashboardPage from "@/frontend/pages/ambassador";

export const Route = createFileRoute("/ambassador")({
  component: AmbassadorDashboardPage,
});

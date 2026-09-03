import { createFileRoute, redirect } from "@tanstack/react-router";
import UserDashboard from "@/frontend/pages/dashboard";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: ({ context }) => {
    // Basic auth check can happen here or in the component itself depending on setup
    // Since useAuth is client-side, we might rely on the layout or component to redirect
  },
  component: UserDashboard,
});

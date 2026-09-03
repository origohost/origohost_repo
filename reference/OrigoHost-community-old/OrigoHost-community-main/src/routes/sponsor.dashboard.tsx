import { createFileRoute, redirect } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import SponsorDashboardPage from "@/frontend/pages/sponsor/dashboard";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/sponsor/dashboard")({
  beforeLoad: async () => {
    // Basic auth check for sponsors
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      throw redirect({
        to: "/login",
        search: { redirect: "/sponsor/dashboard" },
      });
    }
  },
  head: () =>
    buildSeo({
      title: "Sponsor Dashboard - OrigoHOST",
      description: "Manage your sponsorships, track proposal status, and view analytics.",
      path: "/sponsor/dashboard",
      noindex: true,
    }),
  component: SponsorDashboardPage,
});

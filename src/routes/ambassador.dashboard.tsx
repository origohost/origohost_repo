import { createFileRoute, redirect } from "@tanstack/react-router";
import AmbassadorDashboardPage from "@/frontend/pages/ambassador/dashboard";
import { buildSeo } from "@/lib/seo";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/ambassador/dashboard")({
  beforeLoad: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      throw redirect({ to: "/login", search: { redirect: "/ambassador/dashboard" } });
    }
  },
  head: () =>
    buildSeo({
      title: "Applicant Dashboard — Campus Ambassador",
      description: "Track your application status and tasks.",
    }),
  component: AmbassadorDashboardPage,
});

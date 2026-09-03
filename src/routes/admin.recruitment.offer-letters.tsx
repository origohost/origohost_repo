import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminRecruitmentOfferLettersPage from "@/frontend/pages/admin/recruitment/offer-letters";

export const Route = createFileRoute("/admin/recruitment/offer-letters")({
  head: () =>
    buildSeo({
      title: "Admin — Offer Letters",
      description: "Manage Offer Letters",
      path: "/admin/recruitment/offer-letters",
      noindex: true,
    }),
  component: AdminRecruitmentOfferLettersPage,
});

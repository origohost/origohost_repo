import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import AdminMarketingCouponManagerPage from "@/frontend/pages/admin/marketing/coupon-manager";

export const Route = createFileRoute("/admin/marketing/coupon-manager")({
  head: () =>
    buildSeo({
      title: "Admin — Coupon Manager",
      description: "Manage Coupon Manager",
      path: "/admin/marketing/coupon-manager",
      noindex: true,
    }),
  component: AdminMarketingCouponManagerPage,
});

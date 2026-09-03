import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { contentLoader } from "@/features/cms";
import RefundPage from "@/frontend/pages/refund";

const content = contentLoader.getSync("refund");

export const Route = createFileRoute("/refund")({
  head: () =>
    buildSeo({
      title: content.meta.title,
      description: content.meta.description,
      path: "/refund",
    }),
  component: RefundPage,
});

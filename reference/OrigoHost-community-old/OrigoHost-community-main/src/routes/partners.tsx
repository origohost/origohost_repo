import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { contentLoader } from "@/features/cms";
import PartnersPage, { PartnersErrorPage, PartnersNotFoundPage } from "@/frontend/pages/partner";

const staticMeta = contentLoader.getSync("partners").meta;

export const Route = createFileRoute("/partners")({
  head: () =>
    buildSeo({
      title: staticMeta.title,
      description: staticMeta.description,
      path: "/partners",
    }),
  component: PartnersPage,
  errorComponent: PartnersErrorPage,
  notFoundComponent: PartnersNotFoundPage,
});

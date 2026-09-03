import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import HostLandingPage from "@/frontend/pages/host/index";

export const Route = createFileRoute("/host")({
  head: () =>
    buildSeo({
      title: "Host a Tech Event with OrigoHOST",
      description:
        "Partner with India's fastest growing Cloud, DevOps, AI, Kubernetes and Platform Engineering Community to host your next tech event.",
      path: "/host",
    }),
  component: HostLandingPage,
});

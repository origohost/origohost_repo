import { SITE_CONFIG } from "@/config/site";
import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildOrganizationSchema, buildFAQSchema, buildWebSiteSchema } from "@/lib/structured-data";
import { partnersQueryOptions } from "@/features/cms/partners.query";
import HomePage from "@/frontend/pages/home";

const HOME_FAQS = [
  {
    question: "What is OrigoHOST?",
    answer:
      "OrigoHOST is a technology community and event ecosystem where people discover, learn, discuss, compete, collaborate, and build across technology domains and real-world industries.",
  },
  {
    question: "Who can participate in OrigoHOST?",
    answer:
      "Students, developers, engineers, researchers, founders, educators, professionals, and technology enthusiasts can all participate in meetups, hackathons, seminars, and workshops.",
  },
  {
    question: "Are OrigoHOST events and community programs free?",
    answer:
      "Yes, flagship community events, webinars, KSS sessions, and learning cohorts are free for community members.",
  },
];

export const Route = createFileRoute("/")({
  head: () =>
    buildSeo({
      title: "OrigoHOST — A Technology Community Where Ideas, People & Possibilities Connect",
      description:
        "OrigoHOST brings together developers, students, builders, educators, and technology enthusiasts through events, learning experiences, hackathons, and collaborative initiatives.",
      path: "/",
      schemas: [buildOrganizationSchema(), buildFAQSchema(HOME_FAQS), buildWebSiteSchema()],
    }),
  loader: ({ context }) => context.queryClient.ensureQueryData(partnersQueryOptions()),
  component: HomePage,
});

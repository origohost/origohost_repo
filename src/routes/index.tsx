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
      "OrigoHOST is a technology ecosystem built around people who want to learn, build, experiment, and grow together across cloud computing, AI, DevOps, and software engineering.",
  },
  {
    question: "Who can join OrigoHOST?",
    answer:
      "OrigoHOST brings developers, students, builders, educators, and technology communities together across India.",
  },
  {
    question: "Are OrigoHOST learning programs free for students?",
    answer:
      "Yes, our flagship educational cohorts and webinars are completely free for verified community members and university students.",
  },
];

export const Route = createFileRoute("/")({
  head: () =>
    buildSeo({
      title: "OrigoHOST — Build. Learn. Connect. Shape What's Next",
      description:
        "OrigoHOST brings developers, students, builders, educators, and technology communities together to learn modern technology, build real solutions, and shape what's next.",
      path: "/",
      preloadImage:
        "https://res.cloudinary.com/dhx72dmyt/image/upload/f_auto,q_auto/v1785444373/system/hero-bg-team.jpg",
      schemas: [buildOrganizationSchema(), buildFAQSchema(HOME_FAQS), buildWebSiteSchema()],
    }),
  loader: ({ context }) => context.queryClient.ensureQueryData(partnersQueryOptions()),
  component: HomePage,
});

import { SITE_CONFIG } from "@/config/site";
import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildOrganizationSchema, buildFAQSchema, buildWebSiteSchema } from "@/lib/structured-data";
import { partnersQueryOptions } from "@/features/cms/partners.query";
import HomePage from "@/frontend/pages/home";

const HOME_FAQS = [
  {
    question: "What is OrigoHOST and who can join?",
    answer:
      "OrigoHOST is an enterprise-grade developer ecosystem and infrastructure platform in India. It is open to engineering students, software developers, campus community leaders, and industry professionals eager to learn, build, and deploy production-ready systems.",
  },
  {
    question: "How do campus chapters work and how can I charter one at my college?",
    answer:
      "Campus chapters are student-led developer hubs operating under an official OrigoHOST charter. Chapter leads receive complete event toolkits, workshop curricula, cloud resources, and guidance from the OrigoHOST team to run technical activities on campus.",
  },
  {
    question: "Are OrigoHOST learning programs and masterclasses free for students?",
    answer:
      "Yes, our flagship educational cohorts (such as the Knowledge Sharing Series) and open webinars are completely free for verified community members and university students.",
  },
  {
    question: "What is CyberForge and how do hackathons work on OrigoHOST?",
    answer:
      "CyberForge is our national hackathon and buildathon series. Developers team up to solve real-world problem statements provided by industry partners, using OrigoHOST cloud infrastructure to build and present working software.",
  },
  {
    question: "How can companies and technology organizations partner with OrigoHOST?",
    answer:
      "Enterprise partners can sponsor hackathons, provide API credentials/cloud credits, host guest technical masterclasses, and recruit pre-vetted developer talent directly through our ecosystem pipelines.",
  },
  {
    question: "How do I access developer sandboxes and deployment tools?",
    answer:
      "Once registered on the OrigoHOST platform, active community members receive sandbox access keys and deployment guides within their developer dashboard.",
  },
];

export const Route = createFileRoute("/")({
  head: () =>
    buildSeo({
      title: "Build Boldly. Connect Globally — Launch Production-Ready Systems",
      description:
        "Welcome to OrigoHOST — India's premier developer ecosystem and cloud infrastructure platform. Hands-on compute sandboxes, structured learning cohorts, and collaborative community network.",
      path: "/",
      preloadImage:
        "https://res.cloudinary.com/dhx72dmyt/image/upload/f_auto,q_auto/v1785444373/system/hero-bg-team.jpg",
      schemas: [buildOrganizationSchema(), buildFAQSchema(HOME_FAQS), buildWebSiteSchema()],
    }),
  loader: ({ context }) => context.queryClient.ensureQueryData(partnersQueryOptions()),
  component: HomePage,
});

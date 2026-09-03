import { createFileRoute, Link } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/config/site";
import {
  Users,
  Calendar,
  MapPin,
  ArrowRight,
  BookOpen,
  UserCheck,
  Trophy,
  Code,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/community")({
  head: () =>
    buildSeo({
      title: "Community — Meet the People Behind the Ideas",
      description:
        "OrigoHOST is a community of people curious about technology and passionate about learning, sharing, solving problems, and building together.",
      path: "/community",
      schemas: [
        buildWebPageSchema(
          "OrigoHOST Technology Community",
          "Meet the people behind the ideas across developers, researchers, students, and leaders.",
          `${SITE_CONFIG.url}/community`,
        ),
        buildBreadcrumbSchema([
          { label: "Home", url: "/" },
          { label: "Community", url: "/community" },
        ]),
      ],
    }),
  component: CommunityPillarPage,
});

const PARTICIPANTS = [
  "Students",
  "Developers",
  "Engineers",
  "Researchers",
  "Designers",
  "Founders",
  "Entrepreneurs",
  "Educators",
  "Technology Professionals",
  "Industry Experts",
  "Technology Enthusiasts",
];

const COMMUNITY_ACTIONS = [
  { icon: BookOpen, title: "Learn", desc: "Discover new technologies and perspectives." },
  { icon: Users, title: "Connect", desc: "Meet people from different backgrounds and domains." },
  {
    icon: Trophy,
    title: "Compete",
    desc: "Participate in challenges, hackathons, and competitions.",
  },
  { icon: Code, title: "Collaborate", desc: "Find people to work with on meaningful projects." },
  { icon: Share2, title: "Share", desc: "Teach, speak, write, mentor, and contribute." },
  { icon: UserCheck, title: "Build", desc: "Turn ideas into production-ready solutions." },
];

function CommunityPillarPage() {
  return (
    <div className="relative min-h-screen bg-white text-slate-900 pt-28 pb-20 selection:bg-blue-600 selection:text-white">
      {/* HERO */}
      <section className="bg-slate-900 text-white py-20 px-6 lg:px-8 border-b border-slate-800">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
            PEOPLE & NETWORK
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Meet the People Behind the Ideas.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            OrigoHOST is a community of people who are curious about technology and passionate about
            learning, sharing, solving problems, and building together.
          </p>
        </div>
      </section>

      {/* WHO CAN PARTICIPATE */}
      <section className="py-20 px-6 lg:px-8 max-w-6xl mx-auto border-b border-slate-100">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            PARTICIPANTS
          </span>
          <h2 className="text-3xl font-black mt-2">Who Can Participate?</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {PARTICIPANTS.map((p) => (
            <span
              key={p}
              className="text-xs font-bold bg-slate-100 text-slate-800 px-4 py-2 rounded-full border border-slate-200"
            >
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* WHAT CAN YOU DO */}
      <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-100">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            ENGAGEMENT
          </span>
          <h2 className="text-3xl font-black mt-2">What Can You Do?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COMMUNITY_ACTIONS.map((act) => (
            <div
              key={act.title}
              className="rounded-3xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm"
            >
              <act.icon className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{act.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{act.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* JOIN CTA */}
      <section className="py-20 px-6 lg:px-8 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Join the OrigoHOST Community.</h2>
          <p className="text-slate-300 text-base mb-8">
            Connect with learners, developers, and creators shaping the future of technology.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-blue-600 hover:bg-blue-700 font-bold px-8"
          >
            <Link to="/register">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/structured-data";
import { SITE_CONFIG } from "@/config/site";
import { Users, Calendar, MapPin, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";

export const Route = createFileRoute("/community")({
  head: () =>
    buildSeo({
      title: "OrigoHOST Developer Community",
      description:
        "Join India's fastest-growing developer community. Participate in hackathons, join student chapters, and become an ambassador.",
      path: "/community",
      schemas: [
        buildWebPageSchema(
          "OrigoHOST Developer Community",
          "A thriving ecosystem connecting students, developers, founders, and industry experts.",
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

function CommunityPillarPage() {
  return (
    <PageShell title="Community">
      <div className="bg-slate-50">
        {/* Hero Section */}
        <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=2000&auto=format&fit=crop"
              alt="Community Background"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
          </div>
          <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 tracking-tight">
              The <span className="text-blue-400">OrigoHOST</span> Community
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              Where builders become innovators. Join thousands of developers learning modern
              technologies through hands-on workshops, hackathons, and mentorship.
            </p>
          </div>
        </section>

        {/* Hub Links */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-3 hide-scrollbar">
              {/* Events Hub */}
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 group flex flex-col h-full snap-center shrink-0 w-[85vw] md:w-auto">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Events & Hackathons</h2>
                <p className="text-slate-600 text-lg mb-8 flex-grow">
                  Discover upcoming tech meetups, coding bootcamps, and global hackathons sponsored
                  by OrigoHOST.
                </p>
                <Link
                  to="/community/events"
                  className="inline-flex items-center font-bold text-blue-600 group-hover:text-blue-700"
                >
                  Explore Events{" "}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Chapters Hub */}
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 group flex flex-col h-full snap-center shrink-0 w-[85vw] md:w-auto">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MapPin className="w-8 h-8 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Student Chapters</h2>
                <p className="text-slate-600 text-lg mb-8 flex-grow">
                  Start or join an OrigoHOST Student Chapter at your university. Get funding, swags,
                  and direct mentorship.
                </p>
                <Link
                  to="/community/chapters"
                  className="inline-flex items-center font-bold text-emerald-600 group-hover:text-emerald-700"
                >
                  View Chapters{" "}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Ambassadors Hub */}
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 group flex flex-col h-full snap-center shrink-0 w-[85vw] md:w-auto">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Ambassador Program</h2>
                <p className="text-slate-600 text-lg mb-8 flex-grow">
                  Become a core community leader. Represent OrigoHOST, build your personal brand,
                  and access exclusive career opportunities.
                </p>
                <Link
                  to="/community/ambassadors"
                  className="inline-flex items-center font-bold text-purple-600 group-hover:text-purple-700"
                >
                  Apply Now{" "}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}

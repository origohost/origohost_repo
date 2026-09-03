import { PageShell } from "@/components/layout/page-shell";
import { Milestone, CheckCircle2, CircleDashed, Rocket } from "lucide-react";

export default function RoadmapPage() {
  return (
    <PageShell title="Roadmap">
      <div className="bg-slate-900 text-white py-24 px-4 text-center">
        <Milestone className="w-16 h-16 text-blue-500 mx-auto mb-6" />
        <h1 className="text-4xl md:text-6xl font-black mb-6">Public Roadmap</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          See what we're building next. Our roadmap is fully transparent and driven by community
          feedback.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Q3 2026 - Released */}
        <div className="mb-16 relative">
          <div className="absolute left-6 md:left-8 top-12 bottom-0 w-1 bg-green-200" />
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-green-100 border-4 border-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">
              Q3 2026: Enterprise SEO & Community Hub
            </h2>
          </div>
          <div className="ml-12 md:ml-20 bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900">Enterprise SEO V2 Architecture</h4>
                  <p className="text-gray-600 text-sm">
                    Full semantic restructuring, GEO optimization, and Knowledge Graph bridging.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900">Centralized Ecosystem Page</h4>
                  <p className="text-gray-600 text-sm">
                    Unified view of Origo Cloud, Academy, Community, and Events.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900">EEAT Trust Pages</h4>
                  <p className="text-gray-600 text-sm">
                    Launch of Transparency Report, Contributors Wall, and Mission pages.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Q4 2026 - In Progress */}
        <div className="mb-16 relative">
          <div className="absolute left-6 md:left-8 top-12 bottom-0 w-1 bg-blue-200" />
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-100 border-4 border-white flex items-center justify-center shrink-0">
              <CircleDashed className="w-6 h-6 md:w-8 md:h-8 text-blue-600 animate-spin-slow" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">
              Q4 2026: Bare-Metal & AI Compute
            </h2>
          </div>
          <div className="ml-12 md:ml-20 bg-white border-2 border-blue-500 rounded-3xl p-6 md:p-8 shadow-md">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-blue-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900">Origo Bare-Metal Instances</h4>
                  <p className="text-gray-600 text-sm">
                    Dedicated physical servers with no virtualization overhead.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-blue-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900">GPU Cloud for AI Training</h4>
                  <p className="text-gray-600 text-sm">
                    Affordable A100/H100 instances for researchers and startups.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-blue-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900">Automated Kubernetes Clusters (Beta)</h4>
                  <p className="text-gray-600 text-sm">
                    1-click K8s deployments on Origo Cloud infrastructure.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* 2027 - Upcoming */}
        <div className="relative">
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-100 border-4 border-white flex items-center justify-center shrink-0">
              <Rocket className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">2027 & Beyond</h2>
          </div>
          <div className="ml-12 md:ml-20 bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900">Global Region Expansion</h4>
                  <p className="text-gray-600 text-sm">
                    New data centers in Singapore, Frankfurt, and US East.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900">Serverless Functions</h4>
                  <p className="text-gray-600 text-sm">
                    Deploy code instantly without managing underlying infrastructure.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

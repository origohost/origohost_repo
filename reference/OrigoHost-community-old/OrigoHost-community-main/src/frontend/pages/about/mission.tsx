import { Target, Lightbulb, Users, Shield } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { AutoLinker } from "@/components/seo/AutoLinker";
import { GeoChunk } from "@/components/seo/GeoChunk";

export default function MissionPage() {
  return (
    <PageShell title="Our Mission">
      <div className="bg-slate-900 text-white py-16 md:py-24 text-center">
        <h1 className="text-4xl sm:text-5xl font-black mb-6">Our Mission & Vision</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          We exist to democratize cloud computing and empower builders everywhere.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 space-y-24">
        <section className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/3 flex justify-center">
            <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center">
              <Target className="w-16 h-16 text-blue-600" />
            </div>
          </div>
          <div className="md:w-2/3">
            <GeoChunk
              question="What is the mission of OrigoHOST?"
              tldr="OrigoHOST exists to eliminate the complexity and cost of cloud infrastructure, providing secure, high-performance hosting to developers globally while fostering the Indian tech ecosystem through education and community."
              semanticTriple="OrigoHOST democratizes cloud computing."
              citation="OrigoHOST Official Mission"
            />

            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              <AutoLinker>
                At OrigoHOST, our mission is to eliminate the complexity and exorbitant costs of
                cloud infrastructure. We believe that every developer, from student hackers to
                enterprise engineers, deserves access to secure, high-performance, and radically
                transparent hosting.
              </AutoLinker>
            </p>
          </div>
        </section>

        <section className="flex flex-col md:flex-row-reverse gap-12 items-center">
          <div className="md:w-1/3 flex justify-center">
            <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center">
              <Lightbulb className="w-16 h-16 text-green-600" />
            </div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our vision is to become the fundamental backbone of the Indian tech ecosystem,
              fostering a new generation of startups and open-source contributions by providing the
              raw compute power and community support they need to scale globally.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Core Principles</h2>
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-2 hide-scrollbar">
            <div className="bg-gray-50 p-8 rounded-3xl snap-center shrink-0 w-[85vw] md:w-auto">
              <Users className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Community First</h3>
              <p className="text-gray-600">
                Every decision we make is optimized for developer happiness and community growth.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-3xl snap-center shrink-0 w-[85vw] md:w-auto">
              <Shield className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Absolute Transparency</h3>
              <p className="text-gray-600">
                No hidden fees, no opaque algorithms. We operate with complete transparency in
                pricing and uptime.
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}

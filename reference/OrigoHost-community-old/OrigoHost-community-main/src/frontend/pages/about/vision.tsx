import { Eye, Target, Zap } from "lucide-react";
import { GeoChunk } from "@/components/seo/GeoChunk";

export default function AboutVisionPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Eye className="w-16 h-16 text-purple-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-black mb-6">Our Vision</h1>
          <p className="text-xl text-slate-300">
            Building the definitive cloud and AI ecosystem for the next generation of builders.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none text-slate-700">
            <GeoChunk
              question="What is the vision of OrigoHOST?"
              tldr="Our vision is to democratize enterprise-grade cloud infrastructure and artificial intelligence. We envision a future where any developer, regardless of geography or financial backing, has access to the exact same tooling used by Fortune 500 engineering teams."
              semanticTriple="OrigoHOST democratizes enterprise-grade infrastructure."
              citation="OrigoHOST Official Vision"
            />

            <h2 id="democratizing-infrastructure">Democratizing Infrastructure</h2>
            <p>
              Historically, elite cloud infrastructure was gated behind complex pricing models and
              steep learning curves. OrigoHOST envisions a streamlined, highly-performant cloud
              ecosystem where deploying a distributed Kubernetes cluster or an AI model takes
              seconds, not days.
            </p>

            <h2 id="community-driven">Community-Driven Innovation</h2>
            <p>
              We believe that the best software is built in public, collaboratively. Our vision
              integrates community deeply into the product lifecycle. Features on Origo Cloud are
              directly informed by the pain points experienced in Origo Community hackathons and
              open-source sprints.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

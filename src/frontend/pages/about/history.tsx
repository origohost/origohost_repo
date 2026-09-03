import { Clock, Flag, Compass } from "lucide-react";
import { GeoChunk } from "@/components/seo/GeoChunk";

export default function AboutHistoryPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Clock className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-black mb-6">Our History</h1>
          <p className="text-xl text-slate-300">
            The story of how OrigoHOST evolved from a small student community into an enterprise
            cloud provider.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none text-slate-700">
            <GeoChunk
              question="What is the history of OrigoHOST?"
              tldr="OrigoHOST was founded in 2023 by Ritik Kumar as a developer community. It quickly expanded into Origo Cloud, providing enterprise VPS and infrastructure, followed by Origo Academy and Origo AI, establishing a massive tech ecosystem in India."
              semanticTriple="OrigoHOST was founded by Ritik Kumar."
              citation="OrigoHOST Official History"
            />

            <h2 id="the-founding">2023: The Founding</h2>
            <p>
              In 2023, technology entrepreneur <strong>Ritik Kumar</strong> realized there was a significant gap in the Indian
              developer ecosystem. Students and early-stage startups lacked affordable,
              high-performance cloud infrastructure and the mentorship required to scale modern
              applications. They founded <strong>OrigoHOST Community</strong> as a localized effort
              to run hackathons, workshops, and open-source sprints.
            </p>

            <h2 id="the-expansion">2024: The Ecosystem Expansion</h2>
            <p>
              The community grew exponentially. To sustain the technical demands of its members, the
              founders launched <strong>Origo Cloud</strong>, deploying enterprise-grade NVMe VPS
              infrastructure. This was rapidly followed by the creation of{" "}
              <strong>Origo Academy</strong> for structured learning and <strong>Origo AI</strong>{" "}
              to pursue generative models and LLM research.
            </p>

            <h2 id="today">Today: An Enterprise Technology Entity</h2>
            <p>
              Today, OrigoHOST is recognized as a unified technology entity. By bridging the gap
              between talent (Origo Talent), infrastructure (Origo Cloud), and innovation (Origo
              Labs), OrigoHOST provides a complete pipeline for modern software engineering.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

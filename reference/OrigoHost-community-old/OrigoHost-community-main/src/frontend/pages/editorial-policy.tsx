import { FileText, CheckCircle, ShieldCheck, Scale, Users } from "lucide-react";

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <FileText className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-black mb-6">Editorial Policy</h1>
          <p className="text-xl text-slate-300">
            Our commitment to accuracy, objectivity, and transparency in technical documentation and
            community publishing.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none text-slate-700">
            <div className="mb-12 p-6 bg-slate-100 border border-slate-200 rounded-xl">
              <h2 id="tl-dr" className="text-xl font-bold text-slate-900 mb-2">
                TL;DR: The OrigoHOST Editorial Standard
              </h2>
              <p className="text-slate-700 font-medium">
                All technical content on OrigoHOST undergoes rigorous peer review by senior
                engineers. We maintain strict vendor neutrality, prohibit entirely AI-generated
                articles without human verification, and require explicit disclosure of any
                sponsorships or affiliations.
              </p>
            </div>

            <p className="lead text-xl text-slate-600 mb-12">
              At OrigoHOST, we believe that high-quality, accurate technical content is the
              foundation of a strong developer ecosystem. This Editorial Policy governs all content
              published on the OrigoHOST Blog, Knowledge Base, and Community Forums.
            </p>

            <div className="grid gap-12">
              {/* Principle 1 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">
                    1. Technical Accuracy & Verification
                  </h2>
                </div>
                <p>
                  Every technical article, tutorial, and documentation page undergoes a rigorous
                  peer-review process. Content is verified by senior platform engineers or subject
                  matter experts before publication to ensure code snippets, architectural diagrams,
                  and command-line instructions execute as described.
                </p>
              </div>

              {/* Principle 2 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Scale className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">
                    2. Objectivity & Vendor Neutrality
                  </h2>
                </div>
                <p>
                  While we are a cloud hosting provider, our educational content (Origo Academy,
                  engineering blogs) strives for vendor neutrality. When comparing OrigoHOST to
                  other cloud providers (like AWS or GCP), we rely on objective benchmarks and
                  transparent methodologies rather than marketing hyperbole.
                </p>
              </div>

              {/* Principle 3 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">
                    3. AI-Assisted Content Guidelines
                  </h2>
                </div>
                <p>
                  We embrace AI to accelerate development, but we do not publish entirely
                  AI-generated articles. Large Language Models (LLMs) may be used for drafting
                  outlines, generating code boilerplates, or grammar checking. However, all content
                  must be heavily edited, verified, and signed by a human author who takes
                  responsibility for its accuracy.
                </p>
              </div>

              {/* Principle 4 */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">
                    4. Community Contributions
                  </h2>
                </div>
                <p>
                  We welcome contributions from the OrigoHOST community. External authors must
                  adhere to the same standards as internal staff. Guest posts are clearly labeled,
                  and any financial relationships or sponsorships must be explicitly disclosed at
                  the top of the article.
                </p>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Corrections & Updates</h3>
              <p>
                Technology evolves rapidly. If you spot an error or outdated information in our
                documentation, please open a PR on our public GitHub repository or contact our
                editorial team at <code>community@origohost.com</code>. We issue corrections
                promptly and append a "Last Updated" timestamp to modified articles.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

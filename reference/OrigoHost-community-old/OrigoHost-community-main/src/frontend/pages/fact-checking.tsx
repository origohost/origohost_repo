import { CheckSquare, Search, ShieldCheck } from "lucide-react";

export default function FactCheckingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <CheckSquare className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-black mb-6">Fact-Checking Policy</h1>
          <p className="text-xl text-slate-300">
            Our rigorous multi-step process for verifying technical accuracy, benchmarks, and data
            across all publications.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none text-slate-700">
            <h2 id="what-is-fact-checking">What is our Fact-Checking process?</h2>
            <p className="font-semibold text-slate-900">
              Every piece of technical content published by OrigoHOST undergoes a minimum of two
              peer reviews by domain experts. We verify all code snippets by executing them in
              isolated environments, and we cross-reference all performance benchmarks against
              independent third-party data.
            </p>

            <div className="mt-12 space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-700 font-bold text-xl">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Technical Peer Review</h3>
                  <p className="text-slate-600">
                    Before publication, an engineer with relevant expertise reviews the content for
                    architectural soundness, security best practices, and conceptual accuracy.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-700 font-bold text-xl">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Code Execution & Validation
                  </h3>
                  <p className="text-slate-600">
                    All provided code snippets, bash scripts, and configuration files are tested
                    against the specified versions of the software to ensure they execute without
                    errors.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-700 font-bold text-xl">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Citation & Source Verification
                  </h3>
                  <p className="text-slate-600">
                    Any statistical claims, market data, or third-party benchmarks must be
                    accompanied by citations linking directly to the primary source. Secondary
                    sources are not accepted for definitive claims.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 bg-slate-100 p-8 rounded-xl border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Corrections Policy</h3>
              <p>
                Despite our best efforts, technical ecosystems evolve rapidly, and errors may occur.
                If a factual error is identified post-publication, we will update the article and
                append a dated "Correction Note" at the bottom of the piece explaining what was
                changed and why.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { FileText, Shield, AlertTriangle, BookOpen } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";

export default function ContentPolicyPage() {
  return (
    <PageShell title="Content Policy">
      <div className="bg-slate-50">
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <FileText className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">Content Policy</h1>
          <p className="text-lg sm:text-xl text-slate-300">
            Guidelines governing the creation, publication, and moderation of all content across the
            OrigoHOST ecosystem.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none text-slate-700">
            <h2 id="tl-dr">TL;DR: The OrigoHOST Content Standard</h2>
            <p className="font-semibold text-slate-900">
              OrigoHOST requires all published content to be technically accurate, fact-checked,
              original, and free of undisclosed AI generation. Spam, malicious code, and plagiarized
              materials are strictly prohibited and will result in immediate removal.
            </p>

            <div className="grid gap-12 mt-12">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">
                    1. Originality & AI Usage
                  </h2>
                </div>
                <p>
                  All content must be original. If Generative AI tools (such as ChatGPT, Claude, or
                  Gemini) are used to assist in the writing process, the final output must be
                  thoroughly reviewed, fact-checked, and substantially edited by a human subject
                  matter expert. Wholly AI-generated articles without human oversight are not
                  permitted.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">2. Prohibited Content</h2>
                </div>
                <p>
                  We strictly prohibit content that contains malicious scripts, promotes illegal
                  activities, includes hate speech, or intentionally misinforms readers. Links to
                  malware, phishing sites, or unverified executables will result in an immediate ban
                  from the community.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 m-0">
                    3. Technical Depth & Value
                  </h2>
                </div>
                <p>
                  Articles, tutorials, and documentation must provide tangible value to the
                  developer community. Thin content, pure marketing fluff, or SEO spam is not
                  accepted. Code snippets must be tested and functional at the time of publication.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </PageShell>
  );
}

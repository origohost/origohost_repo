import { m as motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, FileText, ArrowUp } from "lucide-react";
import { Link } from "@tanstack/react-router";

const FAQS = [
  {
    q: "Who can apply for the program?",
    a: "Any enrolled college or university student with a passion for technology and community building.",
  },
  {
    q: "Is there any fee to join?",
    a: "No, the Ambassador Program is completely free. In fact, we provide funding and resources for your events.",
  },
  {
    q: "How much time do I need to commit?",
    a: "We expect a commitment of about 4-5 hours per week.",
  },
  {
    q: "Will I get an internship?",
    a: "Top-performing ambassadors (Platinum & Diamond tier) get fast-tracked interviews and direct referrals for paid internships.",
  },
];

export function AmbassadorInfo() {
  return (
    <>
      {/* FAQ Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-5 md:px-8 lg:px-12 max-w-4xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[32px] sm:text-4xl font-black tracking-tight text-gray-900 mb-4 leading-tight">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-5 md:px-8 lg:px-12">
          <div className="rounded-[2rem] lg:rounded-3xl p-8 sm:p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden bg-gray-900">
            <img
              loading="lazy"
              decoding="async"
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop"
              alt="Community Background"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-blue-600/70 backdrop-blur-[2px]" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-[32px] sm:text-4xl md:text-6xl font-black tracking-tight mb-4 md:mb-6 leading-tight">
                Ready to Lead Your Campus?
              </h2>
              <p className="text-base sm:text-xl text-blue-100 mb-8 md:mb-10 font-medium">
                Join thousands of students building the future of tech communities.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 w-full">
                <Link
                  to="/community/ambassadors/apply"
                  className="bg-white text-blue-600 font-bold h-[52px] px-8 rounded-xl lg:rounded-full text-base sm:text-lg shadow-lg hover:scale-105 transition-transform flex items-center justify-center w-full sm:w-auto"
                >
                  Apply Now
                </Link>
                <Link
                  to="/contact"
                  className="bg-blue-700/50 backdrop-blur border border-white/20 text-white font-bold h-[52px] px-8 rounded-xl lg:rounded-full text-base sm:text-lg hover:bg-blue-700/80 transition-colors flex items-center justify-center w-full sm:w-auto"
                >
                  Contact Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  // We can't easily use useState here if it's imported poorly, but React is available globally in TanStack Router projects typically.
  // Actually, we imported useState from framer-motion above which is WRONG!
  // I will fix the import in a moment, let me just build a simple details/summary tag instead to be safe.
  return (
    <details className="group bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-gray-900 text-lg">
        {question}
        <ChevronDown className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-6 pb-6 text-gray-600 leading-relaxed">{answer}</div>
    </details>
  );
}

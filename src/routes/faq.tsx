import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { useState } from "react";
import { ChevronRight, HelpCircle } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () =>
    buildSeo({
      title: "Frequently Asked Questions — OrigoHOST Community",
      description:
        "Got questions about joining, events, programs, or partnerships? We have answers.",
      path: "/faq",
    }),
  component: FaqPage,
});

const FAQ_CATEGORIES = [
  {
    category: "Community",
    items: [
      {
        q: "What is OrigoHOST?",
        a: "OrigoHOST is an enterprise-grade developer ecosystem and infrastructure platform in India open to students, developers, educators, and technology builders.",
      },
      {
        q: "Who can join OrigoHOST?",
        a: "Anyone interested in software engineering, AI, cloud computing, DevOps, cybersecurity, or open source can join.",
      },
      {
        q: "Is membership free?",
        a: "Yes, community membership and flagship educational cohorts are completely free for students and developers.",
      },
    ],
  },
  {
    category: "Events",
    items: [
      {
        q: "How can I register for events?",
        a: "Browse our events calendar on the website and click 'Details' or 'Register' to reserve your spot.",
      },
      {
        q: "Are events online or offline?",
        a: "We host both online global webinars (like KSS) and offline campus meetups & hackathons.",
      },
      {
        q: "Can I organize an event with OrigoHOST?",
        a: "Yes! Campus chapter leads and partners can host co-branded events through our chapter program.",
      },
    ],
  },
  {
    category: "Programs",
    items: [
      {
        q: "Who can participate in cohorts?",
        a: "Our programs are open to all levels—from beginners learning basic Linux to advanced developers building Kubernetes controllers.",
      },
      {
        q: "Are certificates provided?",
        a: "Yes, verified certificates of participation and completion are awarded for eligible bootcamps and hackathons.",
      },
    ],
  },
  {
    category: "Partnerships",
    items: [
      {
        q: "How can an organization partner with OrigoHOST?",
        a: "Companies can sponsor hackathons, provide cloud infrastructure credits, host technical masterclasses, or recruit developer talent.",
      },
    ],
  },
  {
    category: "General",
    items: [
      {
        q: "How can I contact the OrigoHOST team?",
        a: "Reach out via our Contact page or email us directly at origohostscommunity@gmail.com.",
      },
    ],
  },
];

function FaqPage() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen bg-white text-slate-900 pt-28 pb-20 selection:bg-blue-600 selection:text-white">
      {/* HERO */}
      <section className="bg-slate-900 text-white py-20 px-6 lg:px-8 border-b border-slate-800">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
            HELP CENTER
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about joining, chartering a chapter, participating in
            events, or partnering.
          </p>
        </div>
      </section>

      {/* ACCORDION BY CATEGORY */}
      <section className="py-16 px-6 lg:px-8 max-w-4xl mx-auto">
        {FAQ_CATEGORIES.map((catGroup) => (
          <div key={catGroup.category} className="mb-12">
            <h2 className="text-xl font-bold uppercase tracking-wider text-blue-600 mb-6 pb-2 border-b border-slate-200">
              {catGroup.category}
            </h2>
            <div className="space-y-3">
              {catGroup.items.map((item) => {
                const isOpen = openItem === item.q;
                return (
                  <div
                    key={item.q}
                    className="rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenItem(isOpen ? null : item.q)}
                      className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      <span>{item.q}</span>
                      <ChevronRight
                        className={`h-5 w-5 text-slate-400 transition-transform ${isOpen ? "rotate-90 text-blue-600" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

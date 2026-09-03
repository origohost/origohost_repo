import { createFileRoute } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Send, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () =>
    buildSeo({
      title: "Contact Us — Let's Connect",
      description:
        "Have a question, partnership idea, event inquiry, or simply want to connect with the OrigoHOST team?",
      path: "/contact",
    }),
  component: ContactPage,
});

const INQUIRY_CATEGORIES = [
  "General",
  "Partnership",
  "Sponsorship",
  "Event",
  "Speaker",
  "Community",
  "Media",
  "Collaboration",
  "Support",
];

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    category: "General",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-900 pt-28 pb-20 selection:bg-blue-600 selection:text-white">
      {/* HERO */}
      <section className="bg-slate-900 text-white py-20 px-6 lg:px-8 border-b border-slate-800">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
            GET IN TOUCH
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Let's Connect.
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Have a question, partnership idea, speaker proposal, or simply want to connect?
          </p>
        </div>
      </section>

      {/* OPTIONS & FORM */}
      <section className="py-16 px-6 lg:px-8 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-2xl font-black text-slate-900">Communication Channels</h2>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
              General & Community
            </span>
            <p className="text-xs text-slate-600 mb-3">
              Questions about community events & initiatives.
            </p>
            <a
              href="mailto:origohostscommunity@gmail.com"
              className="text-xs font-bold text-slate-900 hover:text-blue-600"
            >
              origohostscommunity@gmail.com
            </a>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">
              Partnerships & Sponsorships
            </span>
            <p className="text-xs text-slate-600 mb-3">
              Event sponsorships & organizational alliances.
            </p>
            <a
              href="mailto:origohostscommunity@gmail.com?subject=Partnership"
              className="text-xs font-bold text-slate-900 hover:text-blue-600"
            >
              origohostscommunity@gmail.com
            </a>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 block mb-1">
              Speakers & Mentors
            </span>
            <p className="text-xs text-slate-600 mb-3">
              Technical talks, masterclasses & mentorship proposals.
            </p>
            <a
              href="mailto:origohostscommunity@gmail.com?subject=Speaker"
              className="text-xs font-bold text-slate-900 hover:text-blue-600"
            >
              origohostscommunity@gmail.com
            </a>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          {submitted ? (
            <div className="text-center py-12">
              <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Received!</h3>
              <p className="text-sm text-slate-600">
                Thank you for reaching out. The OrigoHOST team will get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Send Us a Message</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Name
                  </label>
                  <Input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your Name"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Email
                  </label>
                  <Input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-900"
                >
                  {INQUIRY_CATEGORIES.map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Subject
                </label>
                <Input
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Subject"
                  className="rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Message
                </label>
                <Textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="How can we help?"
                  className="rounded-xl"
                />
              </div>
              <Button
                type="submit"
                className="w-full rounded-full bg-blue-600 hover:bg-blue-700 font-bold h-12"
              >
                Send Message <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

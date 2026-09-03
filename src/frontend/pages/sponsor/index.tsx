import { Link } from "@tanstack/react-router";
import { m as motion, Variants } from "framer-motion";
import { OptimizedImage } from "@/components/ui/optimized-image";
import {
  CheckCircle2,
  Download,
  CalendarDays,
  Shield,
  FileText,
  Zap,
  PhoneCall,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SponsorApplicationForm } from "@/components/sponsor/sponsor-application-form";
import { RoiCalculator } from "@/components/sponsor/roi-calculator";
import { BenefitsTable } from "@/components/sponsor/benefits-table";
import { EventCalendar } from "@/components/sponsor/event-calendar";

// Define animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function SponsorPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[var(--brand-ink)]">
        {/* Animated Background Gradients & Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-600/20 blur-[120px]" />
          <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-emerald-600/20 blur-[100px]" />
          <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-slate-900/80 to-transparent" />
        </div>

        <div className="container relative mx-auto px-4 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-semibold text-blue-300 mb-6 backdrop-blur-sm"
              >
                <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse" />
                Strategic Partnerships 2026
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6"
              >
                Become an Official Sponsor of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                  OrigoHOST
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-light"
              >
                Partner with one of India's fastest-growing developer communities. Connect with
                thousands of students, cloud engineers, AI enthusiasts, and future technology
                leaders through hackathons, bootcamps, and community programs.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="h-14 px-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-lg shadow-blue-600/25 transition-all hover:scale-105"
                  onClick={() =>
                    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Become a Sponsor
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 rounded-full bg-white/5 border-slate-700 text-white hover:bg-white/10 hover:text-white font-semibold text-base backdrop-blur-md"
                  onClick={() =>
                    (window.location.href =
                      "mailto:origohostscommunity@gmail.com?subject=Sponsorship%20Deck%20Inquiry")
                  }
                >
                  <Download className="mr-2 h-5 w-5" /> Sponsorship Deck
                </Button>
                <Link to="/schedule-call">
                  <Button
                    variant="outline"
                    className="h-14 px-8 rounded-full border-slate-700 text-slate-300 hover:bg-white/5 hover:text-white font-semibold text-base backdrop-blur-md"
                  >
                    <CalendarDays className="mr-2 h-5 w-5" /> Schedule Call
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero Illustration / Graphic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block h-[500px]"
            >
              <div className="absolute inset-0 rounded-3xl border border-white/10 overflow-hidden shadow-2xl group">
                <OptimizedImage
                  src="/sponsor_hero.png"
                  alt="OrigoHOST Tech Community"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  containerClassName="w-full h-full"
                  priority
                />
                {/* Subtle gradient overlay to match theme */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-emerald-900/20 mix-blend-overlay pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. ENTERPRISE TRUST SECTION */}
      <section className="bg-slate-900 border-b border-slate-800 py-6 relative z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 opacity-70">
            <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm">
              <Shield className="w-5 h-5 text-blue-400" /> ISO Ready Security
            </div>
            <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm">
              <FileText className="w-5 h-5 text-emerald-400" /> GST Registered & Compliant
            </div>
            <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm">
              <Zap className="w-5 h-5 text-yellow-400" /> Secure B2B Payments
            </div>
            <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm">
              <PhoneCall className="w-5 h-5 text-orange-400" /> 24hr Dedicated Manager
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMMUNITY STATS & ROI CALCULATOR */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-[var(--brand-ink)] mb-6 tracking-tight">
                Scale Your Reach with OrigoHOST
              </h2>
              <p className="text-lg text-slate-600 mb-12">
                Access India's brightest technical minds. Build brand loyalty, hire top talent, and
                empower the developer ecosystem.
              </p>

              <div className="grid grid-cols-2 gap-8">
                {[
                  { label: "Community Reach", value: "15K+" },
                  { label: "Colleges & Chapters", value: "75+" },
                  { label: "Community Meetups", value: "35+" },
                  { label: "Workshops Hosted", value: "120+" },
                ].map((stat, i) => (
                  <div key={i} className="border-l-4 border-blue-500 pl-4">
                    <div className="text-4xl md:text-5xl font-black text-[var(--brand-ink)] mb-1 tracking-tighter">
                      {stat.value}
                    </div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <RoiCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* 4. LIVE EVENT CALENDAR (Sponsorship Availability) */}
      <section className="py-24 bg-slate-100 border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black text-[var(--brand-ink)] mb-4 tracking-tight">
                Upcoming Events
              </h2>
              <p className="text-lg text-slate-600">
                Reserve your sponsorship slots for our upcoming flagship events before they are
                fully booked.
              </p>
            </div>
            <Button variant="outline" className="mt-6 md:mt-0 bg-white h-12 rounded-xl font-bold">
              View Full Calendar
            </Button>
          </div>

          <EventCalendar />
        </div>
      </section>

      {/* 5. PRICING / PACKAGES & COMPARISON */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
              Partnership Packages
            </h2>
            <p className="text-lg text-slate-400">
              Transparent packages built for teams of all sizes.
            </p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:grid lg:grid-cols-4 md:gap-8 max-w-7xl mx-auto mb-20 hide-scrollbar">
            {/* Bronze */}
            <div className="bg-slate-800/50 backdrop-blur-md rounded-3xl p-8 border border-slate-700 w-[85vw] shrink-0 snap-center md:w-auto md:shrink">
              <h3 className="text-2xl font-bold mb-2">Bronze</h3>
              <p className="text-slate-400 mb-6 text-sm">Great for local reach</p>
              <div className="text-4xl font-black mb-8">
                ₹25K<span className="text-lg text-slate-500 font-normal">/event</span>
              </div>
              <ul className="space-y-4 mb-8">
                {["Website Logo Placement", "Social Media Mention", "Community Discord Post"].map(
                  (item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" /> {item}
                    </li>
                  ),
                )}
              </ul>
              <Button
                variant="outline"
                className="w-full border-slate-600 bg-transparent text-white hover:bg-slate-700 h-12 rounded-xl"
                onClick={() =>
                  document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Select Bronze
              </Button>
            </div>

            {/* Standard */}
            <div className="bg-slate-800/50 backdrop-blur-md rounded-3xl p-8 border border-slate-700 w-[85vw] shrink-0 snap-center md:w-auto md:shrink">
              <h3 className="text-2xl font-bold mb-2">Silver</h3>
              <p className="text-slate-400 mb-6 text-sm">Perfect for startups</p>
              <div className="text-4xl font-black mb-8">
                ₹50K<span className="text-lg text-slate-500 font-normal">/event</span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "Website Logo Placement",
                  "Social Media Shoutout",
                  "Distribute Swag/Coupons",
                  "1 Speaker Slot",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                className="w-full border-slate-600 bg-transparent text-white hover:bg-slate-700 h-12 rounded-xl"
                onClick={() =>
                  document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Select Silver
              </Button>
            </div>

            {/* Popular */}
            <div className="bg-gradient-to-b from-blue-600 to-blue-800 rounded-3xl p-8 border border-blue-500 shadow-2xl shadow-blue-900/50 transform md:-translate-y-4 relative w-[85vw] shrink-0 snap-center md:w-auto md:shrink">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-emerald-400 to-emerald-500 text-[var(--brand-ink)] text-xs font-black uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Gold</h3>
              <p className="text-blue-200 mb-6 text-sm">Ideal for growing companies</p>
              <div className="text-4xl font-black mb-8 text-white">
                ₹1L<span className="text-lg text-blue-300 font-normal">/event</span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "Everything in Silver",
                  "Dedicated Tech Workshop",
                  "API Integration Challenge",
                  "Access to Opt-in Resumes",
                  "Physical Booth at Event",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white text-sm">
                    <CheckCircle2 className="h-5 w-5 text-emerald-300 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full bg-white text-blue-900 hover:bg-slate-100 h-12 rounded-xl font-bold"
                onClick={() =>
                  document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Select Gold
              </Button>
            </div>

            {/* Enterprise */}
            <div className="bg-slate-800/50 backdrop-blur-md rounded-3xl p-8 border border-slate-700 w-[85vw] shrink-0 snap-center md:w-auto md:shrink">
              <h3 className="text-2xl font-bold mb-2">Platinum</h3>
              <p className="text-slate-400 mb-6 text-sm">For maximum brand impact</p>
              <div className="text-4xl font-black mb-8">
                ₹5L+<span className="text-lg text-slate-500 font-normal">/annual</span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "Year-round Title Sponsorship",
                  "Guaranteed Hiring Pipeline",
                  "Custom Branding integration",
                  "Press Coverage",
                  "Exclusive VIP Access",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                className="w-full border-slate-600 bg-transparent text-white hover:bg-slate-700 h-12 rounded-xl"
                onClick={() =>
                  document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Contact Us
              </Button>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mt-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Compare Benefits</h3>
            <BenefitsTable />
          </div>
        </div>
      </section>

      {/* 6. SPONSOR WALL (Detailed categorized grid) */}
      <section className="py-24 bg-white overflow-hidden border-b border-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[var(--brand-ink)] mb-6 tracking-tight">
              Our Ecosystem Partners
            </h2>
            <p className="text-lg text-slate-600">
              Join the most innovative companies supporting the OrigoHOST developer community.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Tech Partners */}
            <div className="col-span-2 md:col-span-4 mb-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 text-center border-b pb-4">
                Technology Partners
              </h4>
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
                <div className="text-2xl font-black text-slate-800">Google Cloud</div>
                <div className="text-2xl font-black text-slate-800">AWS</div>
                <div className="text-2xl font-black text-slate-800">Microsoft</div>
                <div className="text-2xl font-black text-slate-800">DigitalOcean</div>
                <div className="text-2xl font-black text-slate-800">Vercel</div>
              </div>
            </div>

            <div className="col-span-2 md:col-span-4 mt-8 mb-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 text-center border-b pb-4">
                Hiring & Community Partners
              </h4>
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
                <div className="text-2xl font-black text-slate-800">Razorpay</div>
                <div className="text-2xl font-black text-slate-800">MongoDB</div>
                <div className="text-2xl font-black text-slate-800">Zoho</div>
                <div className="text-2xl font-black text-slate-800">Cloudflare</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. APPLICATION FORM */}
      <section id="apply" className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[var(--brand-ink)] mb-6 tracking-tight">
              Submit Your Proposal
            </h2>
            <p className="text-lg text-slate-600">
              Fill out the application below. Our partnerships team typically responds within 48
              hours.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <SponsorApplicationForm />
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-black text-center text-[var(--brand-ink)] mb-12 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "What is the minimum sponsorship amount?",
                a: "We have flexible packages starting from ₹25,000 for local meetups. For large scale hackathons, packages typically start at ₹50,000.",
              },
              {
                q: "Can startups sponsor events?",
                a: "Absolutely! We highly encourage startups to sponsor. It's a fantastic way to acquire early developer adopters for your API or tools.",
              },
              {
                q: "Do you issue GST invoices?",
                a: "Yes, OrigoHOST is a registered entity and we provide proper tax invoices with GST for all sponsorships.",
              },
              {
                q: "Can we hire from the community?",
                a: "Yes, our Gold and Platinum packages include direct access to candidate resumes and hiring promotions.",
              },
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="text-lg font-bold text-[var(--brand-ink)] mb-2">{faq.q}</h4>
                <p className="text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-[var(--brand-ink)] text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10 blur-[100px]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Ready to Partner?
          </h2>
          <p className="text-xl text-slate-300 mb-10 leading-relaxed">
            Join hands with OrigoHOST and empower the next generation of developers while growing
            your brand across India's thriving technology ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="h-14 px-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xl shadow-blue-600/20"
              onClick={() =>
                document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Submit Proposal
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-10 rounded-full border-slate-700 bg-white/5 text-white hover:bg-white/10"
              onClick={() => window.open("https://calendly.com/origohost-partnerships", "_blank")}
            >
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

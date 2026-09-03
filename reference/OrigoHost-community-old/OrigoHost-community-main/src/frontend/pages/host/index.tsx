import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { m as motion } from "framer-motion";
import {
  Building2,
  Rocket,
  GraduationCap,
  University,
  Landmark,
  Users,
  Globe2,
  MonitorPlay,
  Zap,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Shield,
  Star,
  PlayCircle,
  BarChart,
  QrCode,
  Mail,
  Video,
  Gift,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/motion/primitives";
import { HostProposalModal } from "@/components/host/host-proposal-modal";
import { SponsorProposalModal } from "@/components/host/sponsor-proposal-modal";
import { HeartHandshake } from "lucide-react";

export default function HostLandingPage() {
  return (
    <main className="bg-zinc-50 overflow-hidden pt-20 pb-24 lg:pb-0">
      {/* Background Orbs & Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[var(--brand-blue)]/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-[var(--brand-orange)]/10 blur-[120px]" />
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            {/* Left Side: Content & Stats */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-600/20 bg-blue-600/5 px-3 py-1 text-xs font-bold text-blue-600 tracking-wide uppercase mb-6">
                <Shield className="h-3.5 w-3.5 fill-current" />
                For Organizers
              </div>

              <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-[var(--brand-ink)] leading-[1.1] mb-6">
                Host a World-Class <br className="hidden lg:block" /> Tech Event with OrigoHOST
              </h1>

              <p className="text-lg text-[var(--brand-ink)]/70 max-w-lg mb-10 leading-relaxed font-medium">
                End-to-end event platform trusted by startups, universities, and enterprise orgs. We
                design the program, set up the platform, manage operations, and deliver outcomes.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 flex-wrap">
                <HostProposalModal>
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 px-8 text-base shadow-lg shadow-blue-600/20 w-full sm:w-auto"
                  >
                    Get a Proposal <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </HostProposalModal>
                <SponsorProposalModal>
                  <Button
                    size="lg"
                    variant="default"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-12 px-8 text-base shadow-lg shadow-emerald-600/20 w-full sm:w-auto"
                  >
                    <HeartHandshake className="mr-2 h-4 w-4" /> Sponsor Us
                  </Button>
                </SponsorProposalModal>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-xl h-12 px-8 text-base border-[var(--brand-ink)]/20 text-[var(--brand-ink)] bg-white/50 backdrop-blur-sm w-full sm:w-auto"
                >
                  <a href="#how-it-works">See Platform</a>
                </Button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Developers", value: "90K+" },
                  { label: "Organizations", value: "500+" },
                  { label: "Ambassadors", value: "3K+" },
                  { label: "Mentors", value: "100+" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white border border-[var(--brand-ink)]/10 rounded-xl p-4 shadow-sm"
                  >
                    <div className="text-[10px] font-bold text-[var(--brand-ink)]/50 uppercase tracking-wider mb-1">
                      {stat.label}
                    </div>
                    <div className="text-2xl font-black text-[var(--brand-ink)]">{stat.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Side: Walkthrough Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:pl-10"
            >
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl shadow-[var(--brand-blue)]/10 border border-[var(--brand-ink)]/5">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">
                      Platform Walkthrough
                    </div>
                    <h3 className="text-xl font-bold text-[var(--brand-ink)]">
                      From brief to execution
                    </h3>
                  </div>
                  <div className="h-10 w-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-600/20 cursor-pointer hover:scale-105 transition-transform">
                    <PlayCircle className="h-5 w-5" />
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {[
                    {
                      num: "01",
                      title: "Landing page & Registration",
                      desc: "Collect teams, roles, profiles, and eligibility.",
                    },
                    {
                      num: "02",
                      title: "Operations & Marketing",
                      desc: "Reach 90k+ devs via WhatsApp & Email.",
                    },
                    {
                      num: "03",
                      title: "Analytics & Scoring",
                      desc: "QR check-ins, rubrics, and final leaderboards.",
                    },
                  ].map((step, i) => (
                    <div
                      key={i}
                      className="flex gap-4 p-4 rounded-xl bg-zinc-50 border border-zinc-100"
                    >
                      <div className="text-xs font-black text-blue-600 bg-blue-600/10 h-6 w-6 rounded flex items-center justify-center shrink-0">
                        {step.num}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[var(--brand-ink)] mb-0.5">
                          {step.title}
                        </h4>
                        <p className="text-xs text-[var(--brand-ink)]/60">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mini Logos */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { name: "Google", domain: "google.com" },
                    { name: "Microsoft", domain: "microsoft.com" },
                    { name: "GitHub", domain: "github.com" },
                    { name: "AWS", domain: "aws.amazon.com" },
                    { name: "Meta", domain: "meta.com" },
                    { name: "Notion", domain: "notion.so" },
                  ].map((logo, i) => (
                    <div
                      key={i}
                      className="h-10 border border-zinc-200 rounded-lg flex items-center justify-center px-2 transition-all cursor-pointer bg-white hover:border-zinc-300 hover:shadow-sm"
                    >
                      <img
                        loading="lazy"
                        decoding="async"
                        src={`https://icon.horse/icon/${logo.domain}`}
                        alt={logo.name}
                        className="h-4 w-4 object-contain"
                      />
                      <span className="ml-1.5 text-[10px] font-bold text-zinc-500">
                        {logo.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section className="py-24 bg-white relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[var(--brand-ink)] mb-4">
              Who is this for?
            </h2>
            <p className="text-lg text-[var(--brand-ink)]/60 max-w-2xl mx-auto">
              Our platform is built to scale for organizations of all sizes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Corporate",
                icon: Building2,
                desc: "Tech companies driving ecosystem adoption.",
              },
              {
                title: "Startups",
                icon: Rocket,
                desc: "Fast-growing teams hiring and building community.",
              },
              {
                title: "Colleges",
                icon: GraduationCap,
                desc: "Empowering students with industry skills.",
              },
              {
                title: "Universities",
                icon: University,
                desc: "Large scale tech fests and hackathons.",
              },
              {
                title: "Government",
                icon: Landmark,
                desc: "Digital India initiatives and upskilling.",
              },
              { title: "NGOs", icon: Globe2, desc: "Non-profits bridging the digital divide." },
              {
                title: "Communities",
                icon: Users,
                desc: "Open source groups and developer circles.",
              },
              { title: "Tech Partners", icon: Zap, desc: "Cloud providers and dev tools." },
            ].map((card, i) => (
              <FadeIn key={i}>
                <div className="group relative overflow-hidden rounded-2xl bg-zinc-50 border border-[var(--brand-ink)]/5 p-8 transition-all hover:shadow-xl hover:shadow-[var(--brand-blue)]/5 hover:-translate-y-1 h-full">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600 shadow-sm group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <card.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--brand-ink)] mb-2">{card.title}</h3>
                  <p className="text-[var(--brand-ink)]/60 leading-relaxed">{card.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* WHY HOST WITH ORIGOHOST */}
      <section className="py-24 relative overflow-hidden bg-[var(--brand-ink)] text-white">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
              Why Partner With Us?
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              We provide an end-to-end event infrastructure so you can focus on delivering value.
            </p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible hide-scrollbar">
            {[
              {
                icon: Users,
                title: "Community Reach",
                desc: "Access 90K+ active developers across India.",
              },
              {
                icon: BarChart,
                title: "Analytics Dashboard",
                desc: "Real-time insights on registrations and turnout.",
              },
              {
                icon: QrCode,
                title: "QR Attendance",
                desc: "Lightning fast contactless check-ins at the venue.",
              },
              {
                icon: Shield,
                title: "Verified Audience",
                desc: "Smart filtering ensures high quality attendees.",
              },
              {
                icon: GraduationCap,
                title: "Certificates",
                desc: "Automated, verifiable digital credentials.",
              },
              {
                icon: Video,
                title: "Media Production",
                desc: "Professional photography and live streaming.",
              },
              {
                icon: Mail,
                title: "Marketing Automation",
                desc: "Email and WhatsApp promotional blasts.",
              },
              {
                icon: Gift,
                title: "Swags & Credits",
                desc: "Cloud credits and official OrigoHOST merch.",
              },
              {
                icon: CheckCircle2,
                title: "Volunteer Support",
                desc: "On-ground trained volunteers for smooth execution.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors w-[85vw] shrink-0 snap-center md:w-auto md:shrink"
              >
                <div className="shrink-0 text-[var(--brand-orange)]">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[var(--brand-ink)] mb-4">
              How It Works
            </h2>
            <p className="text-lg text-[var(--brand-ink)]/60 max-w-2xl mx-auto">
              From proposal to execution, we make hosting events completely frictionless.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            {/* Vertical Line Background */}
            <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-0.5 bg-[var(--brand-ink)]/10 -translate-x-1/2"></div>
            {/* Animated Vertical Line Fill */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute left-[27px] md:left-1/2 top-0 w-0.5 bg-blue-500/50 -translate-x-1/2 origin-top"
            />

            {[
              {
                step: 1,
                title: "Submit Proposal",
                desc: "Use our enterprise wizard to detail your event requirements.",
              },
              {
                step: 2,
                title: "Discovery Call",
                desc: "Our Partnerships Team will get in touch to align on goals.",
              },
              {
                step: 3,
                title: "Planning & Setup",
                desc: "We build your custom landing page and registration flow.",
              },
              {
                step: 4,
                title: "Marketing Campaign",
                desc: "We promote your event to our massive developer community.",
              },
              {
                step: 5,
                title: "Execution",
                desc: "Flawless on-ground or virtual delivery with our team.",
              },
              {
                step: 6,
                title: "Post-Event Analytics",
                desc: "Receive detailed reports, feedback, and issue certificates.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`relative flex items-center mb-12 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="absolute left-[27px] md:left-1/2 w-10 h-10 rounded-full bg-[var(--brand-blue)] text-white font-bold flex items-center justify-center shadow-lg -translate-x-1/2 z-10 border-4 border-white transition-transform hover:scale-110">
                  {item.step}
                </div>
                <div
                  className={`ml-16 md:ml-0 md:w-1/2 w-full ${i % 2 === 0 ? "md:pl-12" : "md:pr-12 text-left md:text-right"}`}
                >
                  <div className="bg-zinc-50 p-6 rounded-2xl border border-[var(--brand-ink)]/5 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                    <h3 className="text-xl font-bold text-[var(--brand-ink)] mb-2">{item.title}</h3>
                    <p className="text-[var(--brand-ink)]/60">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 relative">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 px-6 py-20 text-center shadow-2xl sm:px-16 md:py-28 border border-white/10"
          >
            {/* Texture and Glows */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-500/30 blur-[100px] pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-orange-500/20 blur-[100px] pointer-events-none"></div>

            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 relative z-10">
              Ready to Host Your Next Tech Event?
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto relative z-10">
              Join hundreds of organizations who trust OrigoHOST to deliver exceptional developer
              experiences.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <HostProposalModal>
                <Button
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-14 px-10 text-lg shadow-lg shadow-orange-500/20"
                >
                  Start Proposal
                </Button>
              </HostProposalModal>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-xl h-14 px-10 text-lg backdrop-blur-md transition-colors"
              >
                <Link to="/contact">Talk to Team</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STICKY MOBILE CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-zinc-200 z-50 lg:hidden">
        <HostProposalModal>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-14 text-base font-bold shadow-lg shadow-blue-600/20">
            Host an Event
          </Button>
        </HostProposalModal>
      </div>
    </main>
  );
}

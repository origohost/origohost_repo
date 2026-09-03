import { m as motion, useScroll, useSpring } from "framer-motion";
import {
  Building2,
  Users,
  Heart,
  Lightbulb,
  Compass,
  Code2,
  Rocket,
  Brain,
  Eye,
  Handshake,
  Terminal,
  Cpu,
  Server,
  Code,
  Globe,
  Activity,
  Cloud,
  Github,
  Mic,
  FileCode2,
  Layout,
  Database,
  MapPin,
  Share2,
  Copy,
  Check,
  Quote,
  Award,
  Sparkles,
  ChevronDown,
  GraduationCap,
  TrendingUp,
  Shield,
  Linkedin,
  Twitter,
  Mail,
  Facebook,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { InstagramIcon } from "@/components/icons";
import { Counter, Tilt, BackgroundOrbs, SpotlightCard } from "@/components/motion/primitives";
import type { FounderProfileBlock } from "@/features/cms/types";
import { SITE_CONFIG } from "@/config/site";
import { toast } from "sonner";

const ICONS: Record<string, React.ElementType> = {
  Building2,
  Users,
  Heart,
  Lightbulb,
  Compass,
  Code2,
  Rocket,
  Brain,
  Eye,
  Handshake,
  Terminal,
  Cpu,
  Server,
  Code,
  Globe,
  Activity,
  Cloud,
  Github,
  Mic,
  FileCode2,
  Layout,
  Database,
  Linkedin,
  Twitter,
  Mail,
  InstagramIcon,
  GraduationCap,
  TrendingUp,
  Shield,
  Facebook,
};

function parseStat(raw: string) {
  const match = raw.match(/^([^\d-]*)(-?[\d.,]+)\s*([KMBk+m%]*.*)$/);
  if (!match) return { value: 0, prefix: "", suffix: raw };
  const [, prefix, numStr, suffix] = match;
  return { value: Number(numStr.replace(/,/g, "")) || 0, prefix, suffix };
}

// Fade in container staggered animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FounderProfilePage({ founder }: { founder: FounderProfileBlock }) {
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const copyProfileLink = () => {
    navigator.clipboard.writeText(`${SITE_CONFIG.url}/founders/${founder.slug}`);
    setCopied(true);
    toast.success("Profile link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const sections = useMemo(
    () => [
      { id: "about", label: "About" },
      { id: "stats", label: "Impact" },
      { id: "responsibilities", label: "Responsibilities" },
      { id: "journey", label: "Journey" },
      { id: "expertise", label: "Expertise" },
      { id: "academics", label: "Academics" },
      { id: "achievements", label: "Achievements" },
      { id: "vision", label: "Vision & Philosophy" },
    ],
    [],
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <div className="bg-white text-gray-900 selection:bg-[var(--brand-orange)] selection:text-white relative">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-green)] origin-left z-50"
        style={{ scaleX }}
      />

      <PageShell
        title={`${founder.name} — ${founder.role}`}
        description={founder.biography.substring(0, 160) + "..."}
      >
        {/* ==================================================
            HERO SECTION
            ================================================== */}
        <section className="relative pt-32 pb-24 overflow-hidden bg-[var(--brand-cream)]">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <BackgroundOrbs className="opacity-60" />
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[100px]" />
          </div>

          <div className="container relative z-10 mx-auto px-6 max-w-6xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="flex flex-col items-center text-center max-w-4xl mx-auto"
            >
              {/* Premium Circular Frame */}
              <motion.div variants={itemVariants} className="relative mb-8 group">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 via-[var(--brand-orange)] to-[var(--brand-green)] opacity-75 group-hover:opacity-100 blur-md transition-all duration-700 animate-spin-slow"></div>
                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-white overflow-hidden shadow-2xl bg-white z-10">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={founder.avatarUrl}
                    alt={founder.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {/* Floating particles (fake visual) */}
                <Sparkles className="absolute -top-4 -right-4 h-8 w-8 text-[var(--brand-orange)] animate-pulse" />
                <Rocket className="absolute -bottom-2 -left-4 h-6 w-6 text-blue-500 animate-bounce" />
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600"
              >
                {founder.name}
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className="text-xl md:text-2xl font-bold text-gray-700 flex flex-wrap justify-center items-center gap-x-2 gap-y-1 mb-6"
              >
                <span>{founder.role}</span>
                <span className="hidden md:inline text-gray-300">•</span>
                <span className="text-[var(--brand-orange)]">Technology Entrepreneur</span>
                <span className="hidden md:inline text-gray-300">•</span>
                <span className="text-[var(--brand-green)]">AI Engineer</span>
              </motion.div>

              {/* Roles Breakdown */}
              {founder.currentRoles && founder.currentRoles.length > 0 && (
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm font-semibold text-gray-500 mb-10"
                >
                  {founder.currentRoles.map((role, i) => {
                    const IconC = ICONS[role.icon] || Building2;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                      >
                        <IconC
                          className={`h-4 w-4 ${role.accent === "orange" ? "text-[var(--brand-orange)]" : role.accent === "blue" ? "text-blue-500" : "text-gray-600"}`}
                        />
                        {role.title}
                      </div>
                    );
                  })}
                </motion.div>
              )}

              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
                {founder.links?.map((link: any) => {
                  const C = ICONS[link.icon] || Globe;
                  return (
                    <Button
                      key={link.label}
                      asChild
                      variant="outline"
                      className="rounded-full bg-white hover:bg-gray-50 border-gray-200 text-gray-700 group hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <a href={link.href} target="_blank" rel="noreferrer">
                        <C className="h-4 w-4 mr-2 group-hover:text-[var(--brand-orange)] transition-colors" />{" "}
                        {link.label}
                      </a>
                    </Button>
                  );
                })}
                <Button
                  onClick={copyProfileLink}
                  variant="default"
                  className="rounded-full bg-gray-900 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {copied ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Share2 className="h-4 w-4 mr-2" />
                  )}
                  {copied ? "Copied" : "Share Profile"}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-6 max-w-6xl pb-32 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* ==================================================
                SIDEBAR (Desktop Sticky)
                ================================================== */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-28 bg-white border border-gray-100 rounded-3xl p-6 shadow-[var(--shadow-soft)]">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={founder.avatarUrl}
                    alt={founder.name}
                    className="h-12 w-12 rounded-full object-cover shadow-sm border border-gray-200"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 leading-none">{founder.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">Executive Profile</p>
                  </div>
                </div>

                <nav className="flex flex-col gap-1">
                  {sections.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        document
                          .getElementById(s.id)
                          ?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className={`text-left px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${activeSection === s.id ? "bg-[var(--brand-cream)] text-[var(--brand-orange)] translate-x-1" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </nav>

                <div className="mt-8 pt-8 border-t border-gray-100">
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full justify-start text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  >
                    <Link to="/about">
                      <Compass className="h-4 w-4 mr-2" /> Back to About
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* ==================================================
                MAIN CONTENT AREA
                ================================================== */}
            <div className="lg:col-span-9 space-y-24">
              {/* ABOUT SECTION */}
              <motion.section
                id="about"
                className="scroll-mt-32"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-sm font-black text-[var(--brand-orange)] tracking-widest uppercase mb-4">
                  About
                </h2>
                <div className="prose prose-lg prose-slate max-w-none text-gray-600 leading-relaxed">
                  {founder.biography.split("\n\n").map((paragraph, idx) => (
                    <p key={idx} className="mb-6 font-medium text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.section>

              {/* QUICK STATS */}
              <motion.section
                id="stats"
                className="scroll-mt-32"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {founder.impactStats?.map((stat, i) => {
                    const parsed = parseStat(stat.value);
                    return (
                      <Tilt
                        max={5}
                        key={i}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[var(--shadow-soft)] hover:shadow-lg transition-shadow"
                      >
                        <div className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                          <Counter
                            value={parsed.value}
                            prefix={parsed.prefix}
                            suffix={parsed.suffix}
                          />
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-2">
                          {stat.label}
                        </div>
                      </Tilt>
                    );
                  })}
                </div>
              </motion.section>

              {/* COMMUNITY RESPONSIBILITIES */}
              <motion.section
                id="responsibilities"
                className="scroll-mt-32"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-sm font-black text-blue-500 tracking-widest uppercase mb-8">
                  Community Responsibilities
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {founder.contributions?.map((resp, i) => (
                    <SpotlightCard
                      key={i}
                      className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow group flex items-start gap-4"
                    >
                      <div className="mt-1 h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-500 transition-colors">
                        <Check className="h-4 w-4 text-blue-500 group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-sm text-gray-600 font-medium leading-relaxed">{resp}</p>
                    </SpotlightCard>
                  ))}
                </div>
              </motion.section>

              {/* PROFESSIONAL JOURNEY */}
              <motion.section
                id="journey"
                className="scroll-mt-32"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-sm font-black text-[var(--brand-green)] tracking-widest uppercase mb-12">
                  Professional Journey
                </h2>

                <div className="relative border-l-2 border-gray-100 ml-6 lg:ml-8 space-y-12 pb-8">
                  {founder.timeline?.map((item, i) => {
                    const isFormer = item.subtitle.includes("Former");
                    const IconC = ICONS[item.icon] || Building2;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="relative pl-8 lg:pl-12"
                      >
                        {/* Timeline Node */}
                        <div
                          className={`absolute -left-[17px] top-1 h-8 w-8 rounded-full border-4 border-white ${isFormer ? "bg-gray-300" : "bg-[var(--brand-green)]"} shadow-sm flex items-center justify-center`}
                        >
                          <IconC className="h-3 w-3 text-white" />
                        </div>

                        <div
                          className={`bg-white p-6 lg:p-8 rounded-3xl border ${isFormer ? "border-gray-200" : "border-green-100"} shadow-sm hover:shadow-md transition-shadow`}
                        >
                          <h3
                            className={`text-xl font-black ${isFormer ? "text-gray-600" : "text-gray-900"}`}
                          >
                            {item.title}
                          </h3>
                          <p
                            className={`text-sm font-bold mt-1 ${isFormer ? "text-gray-400" : "text-[var(--brand-green)]"}`}
                          >
                            {item.subtitle}
                          </p>

                          {/* Special handling for Lesuf detailed description */}
                          {item.title.includes("MatchWith") && (
                            <div className="mt-4 text-sm text-gray-500 space-y-3 leading-relaxed">
                              <p>
                                In 2022, Ritik Kumar co-founded MatchWith, a footwear startup
                                established in Agra, India, with a vision of creating affordable,
                                high-quality footwear for the Indian market. During the company's
                                formative years, he played an active role in business strategy,
                                operational planning, brand development, product positioning,
                                customer engagement, and organizational growth.
                              </p>
                              <p>
                                As the company evolved, MatchWith was rebranded as Lesuf, reflecting
                                its long-term business vision and market positioning. Following the
                                successful establishment of the venture and completion of his
                                leadership responsibilities, Ritik stepped away from the
                                organization to dedicate his full attention to technology
                                entrepreneurship, AI innovation, and community building through
                                OrigoHOST and Binarize Technologies.
                              </p>
                              <p>
                                His entrepreneurial journey at MatchWith provided valuable
                                experience in leadership, decision-making, execution, market
                                validation, and startup operations, shaping the strategic mindset he
                                applies across technology ventures today.
                              </p>
                            </div>
                          )}

                          {item.title.includes("OrigoHOST") && (
                            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                              Leading technology initiatives, community expansion, strategic
                              collaborations, mentorship programs, and innovation-driven learning
                              experiences that empower thousands of aspiring developers and
                              technology enthusiasts.
                            </p>
                          )}
                          {item.title.includes("Binarize") && (
                            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                              Building scalable software products, AI-powered platforms, enterprise
                              web applications, and digital transformation solutions while helping
                              startups and businesses leverage modern technology for sustainable
                              growth.
                            </p>
                          )}
                          {item.title.includes("Yennick") && (
                            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                              Leading digital transformation, enterprise software strategy,
                              automation initiatives, and operational modernization within the
                              healthcare and pharmaceutical sector.
                            </p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>

              {/* AREAS OF EXPERTISE & FOCUS */}
              <motion.section
                id="expertise"
                className="scroll-mt-32"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-gray-900 rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-800 text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>

                  <h2 className="text-sm font-black text-blue-400 tracking-widest uppercase mb-8 relative z-10">
                    Areas of Expertise & Focus
                  </h2>

                  <div className="flex flex-wrap gap-3 relative z-10">
                    {founder.expertise?.map((exp, i) => {
                      const IconC = ICONS[exp.icon] || Code;
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
                        >
                          <IconC className="h-4 w-4 text-blue-400" />
                          {exp.label}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.section>

              {/* ACADEMIC BACKGROUND & ACHIEVEMENTS */}
              <motion.section
                id="academics"
                className="scroll-mt-32 grid md:grid-cols-2 gap-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div>
                  <h2 className="text-sm font-black text-purple-500 tracking-widest uppercase mb-6">
                    Academic Background
                  </h2>
                  <SpotlightCard className="bg-white border border-gray-100 rounded-3xl p-8 h-full shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-14 w-14 rounded-2xl bg-purple-50 flex items-center justify-center mb-6">
                      <GraduationCap className="h-7 w-7 text-purple-500" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900">{founder.education[0]}</h3>
                    <p className="text-sm font-bold text-gray-500 mt-1">{founder.education[1]}</p>
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                        Institution
                      </p>
                      <p className="text-sm font-semibold text-gray-800">{founder.education[2]}</p>
                    </div>
                  </SpotlightCard>
                </div>

                <div id="achievements" className="scroll-mt-32">
                  <h2 className="text-sm font-black text-[var(--brand-orange)] tracking-widest uppercase mb-6">
                    Key Achievements
                  </h2>
                  <SpotlightCard className="bg-white border border-gray-100 rounded-3xl p-8 h-full shadow-sm hover:shadow-md transition-shadow">
                    <ul className="space-y-4">
                      {founder.awards?.slice(0, 5).map((award, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-gray-600 font-medium"
                        >
                          <Award className="h-5 w-5 shrink-0 text-[var(--brand-orange)]" />
                          <span>{award}</span>
                        </li>
                      ))}
                    </ul>
                  </SpotlightCard>
                </div>
              </motion.section>

              {/* VISION, MISSION & PHILOSOPHY */}
              <motion.section
                id="vision"
                className="scroll-mt-32 space-y-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Philosophy Quote */}
                <div className="relative bg-[var(--brand-cream)] rounded-3xl p-10 lg:p-14 overflow-hidden border border-orange-100 shadow-sm">
                  <Quote className="absolute -top-4 -left-4 h-32 w-32 text-orange-200/40 -rotate-12" />
                  <div className="relative z-10">
                    <h2 className="text-sm font-black text-[var(--brand-orange)] tracking-widest uppercase mb-6">
                      Leadership Philosophy
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed italic">
                      "{founder.leadershipPhilosophy}"
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <Tilt className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow h-full">
                    <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                      <Eye className="h-6 w-6 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-4">Vision</h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">
                      {founder.vision}
                    </p>
                  </Tilt>

                  <Tilt className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow h-full">
                    <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center mb-6">
                      <Rocket className="h-6 w-6 text-[var(--brand-green)]" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-4">Mission</h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">
                      {founder.mission}
                    </p>
                  </Tilt>
                </div>
              </motion.section>
            </div>
          </div>
        </div>
      </PageShell>
    </div>
  );
}

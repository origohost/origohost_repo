import { Link } from "@tanstack/react-router";
import { m as motion, Variants } from "framer-motion";
import "./site-footer.css";
import {
  Linkedin,
  Youtube,
  Twitter,
  ArrowUpRight,
  Shield,
  ChevronDown,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { CookiePreferencesButton } from "@/features/cookie-consent";
import { useState } from "react";
import { DiscordIcon, WhatsAppIcon, InstagramIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const zoomOut: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20, duration: 0.6 },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const EXPLORE_LINKS = [
  { label: "Events", to: "/events" },
  { label: "Programs", to: "/programs" },
  { label: "Projects", to: "/projects" },
  { label: "Opportunities", to: "/opportunities" },
  { label: "About Us", to: "/about" },
];

const DOMAINS_LINKS = [
  { label: "Artificial Intelligence", to: "/domains" },
  { label: "Cloud Computing", to: "/domains" },
  { label: "Cybersecurity", to: "/domains" },
  { label: "DevOps & Infrastructure", to: "/domains" },
  { label: "Software Engineering", to: "/domains" },
  { label: "Robotics & Web3", to: "/domains" },
];

const INDUSTRIES_LINKS = [
  { label: "Agriculture & AgriTech", to: "/industries" },
  { label: "FinTech & Business", to: "/industries" },
  { label: "Healthcare & HealthTech", to: "/industries" },
  { label: "EdTech & Learning", to: "/industries" },
  { label: "Smart Cities & IoT", to: "/industries" },
];

const COMMUNITY_LINKS = [
  { label: "Join Community", to: "/register" },
  { label: "Speakers & Experts", to: "/speakers" },
  { label: "Mentors & Leaders", to: "/mentors" },
  { label: "Gallery", to: "/gallery" },
  { label: "Partners", to: "/partners" },
  { label: "Sponsors", to: "/sponsor" },
];

const KNOWLEDGE_LINKS = [
  { label: "Knowledge Hub", to: "/knowledge" },
  { label: "Research (Origo Labs)", to: "/research" },
  { label: "Resources & Guides", to: "/resources" },
  { label: "Blog & Insights", to: "/blog" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms & Conditions", to: "/terms" },
  { label: "Cookie Policy", to: "/cookies" },
];

const SOCIALS = [
  {
    icon: InstagramIcon,
    href: "https://www.instagram.com/origohost",
    label: "Instagram",
    hoverClass: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:border-transparent hover:text-white",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/origohost",
    label: "LinkedIn",
    hoverClass: "hover:bg-[#0A66C2] hover:border-transparent hover:text-white",
  },
  {
    icon: DiscordIcon,
    href: "https://discord.gg/origohost",
    label: "Discord",
    hoverClass: "hover:bg-[#5865F2] hover:border-transparent hover:text-white",
  },
  {
    icon: Youtube,
    href: "https://youtube.com/@origohost",
    label: "YouTube",
    hoverClass: "hover:bg-[#FF0000] hover:border-transparent hover:text-white",
  },
  {
    icon: Twitter,
    href: "https://twitter.com/origohost",
    label: "X (Twitter)",
    hoverClass: "hover:bg-slate-100 hover:text-slate-900 hover:border-transparent",
  },
  {
    icon: WhatsAppIcon,
    href: "https://chat.whatsapp.com/BZnqAGpubNLDXLncASeOTM",
    label: "WhatsApp",
    hoverClass: "hover:bg-[#25D366] hover:border-transparent hover:text-white",
  },
];

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col items-center lg:items-start text-center lg:text-left w-full border-b border-white/10 lg:border-none"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-3 lg:py-0 text-base lg:text-xs font-bold uppercase tracking-wider text-white lg:mb-3 lg:cursor-default"
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform lg:hidden ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 lg:!max-h-none lg:opacity-100 ${isOpen ? "max-h-96 opacity-100 pb-3" : "max-h-0 opacity-0"}`}
      >
        <ul className="space-y-2.5 text-xs text-slate-300 font-medium w-full">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.to}
                target={l.to.startsWith("http") ? "_blank" : undefined}
                rel={l.to.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center hover:text-white transition-colors relative"
              >
                <span className="relative z-10">{l.label}</span>
                {l.to.startsWith("http") && (
                  <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function SiteFooter() {
  return (
    <motion.footer
      className="relative bg-[#050B14] text-white overflow-hidden pt-16 pb-8 selection:bg-blue-500/30"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "100px" }}
      variants={zoomOut}
    >
      {/* Gradient top border */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 via-50% to-emerald-500 to-transparent opacity-70" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-blue-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* FOOTER CTA BANNER */}
        <div className="mb-16 rounded-3xl bg-gradient-to-r from-blue-900/50 via-blue-800/40 to-emerald-900/40 p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left relative overflow-hidden group">
          {/* Shimmer sweep on hover */}
          <div className="absolute inset-0 translate-x-[-120%] skew-x-[-20deg] bg-white/4 group-hover:translate-x-[120%] transition-transform duration-1000 ease-in-out pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-1 justify-center md:justify-start">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Community is Live</span>
            </div>
            <h3 className="text-2xl font-black text-white">Your Next Build Could Start Here.</h3>
            <p className="text-xs text-slate-200 mt-1">
              Learn something new. Meet someone new. Build something meaningful.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-blue-600 hover:bg-blue-700 font-bold px-8"
          >
            <Link to="/register">
              Join OrigoHOST <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
          variants={stagger}
          className="flex flex-col gap-12"
        >
          {/* Brand Info & Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Left: Brand */}
            <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left">
              <a
                href="/"
                className="flex items-center justify-center lg:justify-start gap-2.5 text-2xl font-black mb-3 group w-fit"
              >
                <BrandLogo
                  size={30}
                  className="group-hover:rotate-12 transition-transform duration-500"
                />
                <span>
                  Origo
                  <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    HOST
                  </span>
                </span>
              </a>
              <p className="text-slate-200 text-xs leading-relaxed mb-6 max-w-xs font-semibold">
                Where Builders Become Innovators — Technology, Events, Learning & Real-World Building.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 w-full">
                <a
                  href="https://chat.whatsapp.com/BZnqAGpubNLDXLncASeOTM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-bold bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 px-3 py-1.5 rounded-lg hover:bg-[#25D366]/20 transition-colors"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                </a>
                <a
                  href="/register"
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-lg hover:bg-blue-500/20 transition-colors"
                >
                  <Shield className="h-3.5 w-3.5" /> Join Community
                </a>
              </div>
            </div>

            {/* Navigation Columns */}
            <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-5 gap-6 border-t border-white/5 pt-6 lg:pt-0 lg:border-t-0">
              <FooterCol title="Explore" links={EXPLORE_LINKS} />
              <FooterCol title="Domains" links={DOMAINS_LINKS} />
              <FooterCol title="Industries" links={INDUSTRIES_LINKS} />
              <FooterCol title="Community" links={COMMUNITY_LINKS} />
              <FooterCol title="Knowledge" links={KNOWLEDGE_LINKS} />
            </div>
          </div>

          {/* Social Icons & Copyright */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-white/5">
            <div className="text-xs text-slate-400 font-medium text-center sm:text-left flex flex-col gap-0.5">
              <span>© 2026 OrigoHOST. All rights reserved.</span>
              <span className="text-slate-500">Learn. Connect. Compete. Build. — Made with ❤ by the OrigoHOST Community</span>
            </div>

            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2">
              {SOCIALS.map(({ icon: Icon, href, label, hoverClass }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-slate-300 transition-all duration-200 ${hoverClass || "hover:bg-white/15 hover:text-white"}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}

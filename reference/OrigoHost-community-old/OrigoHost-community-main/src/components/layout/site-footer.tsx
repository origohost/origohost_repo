import { Link } from "@tanstack/react-router";
import { m as motion, Variants } from "framer-motion";
import "./site-footer.css";
import {
  Instagram,
  Linkedin,
  Github,
  MessageCircle,
  Youtube,
  Twitter,
  Send,
  ArrowUpRight,
  Shield,
  Globe,
  Clock,
  Heart,
  ChevronDown,
} from "lucide-react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { CookiePreferencesButton } from "@/features/cookie-consent";
import { useState } from "react";
import { DiscordIcon, WhatsAppIcon, InstagramIcon } from "@/components/icons";

// --- ANIMATION VARIANTS ---
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const zoomOut: Variants = {
  hidden: { opacity: 0, scale: 1.1 },
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

// --- DATA ---
const EXPLORE_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Mission & Vision", to: "/about/mission" },
  { label: "Ecosystem", to: "/ecosystem" },
  { label: "Contributors", to: "/contributors" },
  { label: "Events", to: "/community/events" },
  { label: "Gallery", to: "/gallery" },
  { label: "Blog", to: "/blog" },
];

const PROGRAMS_LINKS = [
  { label: "Ambassador", to: "/ambassador" },
  { label: "Hackathons", to: "/events?type=hackathon" },
  { label: "Meetups", to: "/events?type=meetup" },
  { label: "Workshops", to: "/events?type=workshop" },
  { label: "Certificates", to: "/certificates" },
];

const SUPPORT_LINKS = [
  { label: "Contact", to: "/contact" },
  { label: "Help Center", to: "/faq" },
  { label: "Public Roadmap", to: "/roadmap" },
  { label: "Transparency Report", to: "/transparency-report" },
  {
    label: "Partner With Us",
    to: "mailto:origohostscommunity@gmail.com?subject=Partnership%20Inquiry",
  },
  { label: "Feedback", to: "mailto:origohostscommunity@gmail.com?subject=Feedback" },
  { label: "Report Issue", to: "mailto:rudrapandit1917@gmail.com?subject=Website%20Issue" },
];

const SOCIALS = [
  {
    icon: InstagramIcon,
    href: "https://www.instagram.com/origohost?igsh=MWgxOWdhM2F1MGliMw==",
    label: "Instagram",
  },
  { icon: Linkedin, href: "https://www.linkedin.com/company/origohost", label: "LinkedIn" },
  { icon: DiscordIcon, href: "https://discord.gg/origohost", label: "Discord" },
  { icon: Youtube, href: "https://youtube.com/@origohost", label: "YouTube" },
  { icon: Twitter, href: "https://twitter.com/origohost", label: "X (Twitter)" },
  {
    icon: WhatsAppIcon,
    href: "https://chat.whatsapp.com/BZnqAGpubNLDXLncASeOTM",
    label: "WhatsApp",
  },
];

// --- COMPONENTS ---

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col items-center lg:items-start text-center lg:text-left w-full border-b border-white/10 lg:border-none"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-4 lg:py-0 text-base lg:text-sm font-bold text-white lg:mb-4 lg:cursor-default"
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform lg:hidden ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 lg:!max-h-none lg:opacity-100 ${isOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"}`}
      >
        <ul className="space-y-4 lg:space-y-2 text-base lg:text-sm text-white/50 font-medium w-full">
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
      className="relative bg-[#050B14] text-white overflow-hidden pt-16 pb-6 selection:bg-blue-500/30 border-t border-white/10 glow-pulse"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "100px" }}
      variants={zoomOut}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-blue-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px" }}
          variants={stagger}
          className="flex flex-col gap-12"
        >
          {/* ROW 1: Links and Brand */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Left: Brand (Span 4) */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
              <a
                href="/"
                className="flex items-center justify-center lg:justify-start gap-3 text-3xl lg:text-2xl font-black mb-4 lg:mb-2 group w-fit"
              >
                <BrandLogo
                  size={32}
                  className="group-hover:rotate-12 transition-transform duration-500"
                />
                <span>
                  Origo
                  <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    HOST
                  </span>
                </span>
              </a>
              <h4 className="text-sm font-bold text-white mb-2">
                Where Builders Become Innovators
              </h4>
              <p className="text-white/50 text-xs leading-relaxed mb-6 max-w-sm">
                India's leading developer community helping students and professionals grow through
                Cloud, DevOps, AI, Platform Engineering, Open Source and Real-world Projects.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 lg:gap-2 w-full">
                <a
                  href="https://chat.whatsapp.com/BZnqAGpubNLDXLncASeOTM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 text-sm lg:text-xs font-bold bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 px-4 lg:px-3 py-3 lg:py-1.5 rounded-xl lg:rounded-md hover:bg-[#25D366]/20 transition-colors w-full sm:w-auto min-h-[44px]"
                >
                  <MessageCircle className="h-4 w-4 lg:h-3.5 lg:w-3.5" /> Join Community
                </a>
                <a
                  href="/become-ambassador"
                  className="inline-flex items-center justify-center gap-1.5 text-sm lg:text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 lg:px-3 py-3 lg:py-1.5 rounded-xl lg:rounded-md hover:bg-blue-500/20 transition-colors w-full sm:w-auto min-h-[44px]"
                >
                  <Shield className="h-4 w-4 lg:h-3.5 lg:w-3.5" /> Become Ambassador
                </a>
                <a
                  href="/host"
                  className="inline-flex items-center justify-center gap-1.5 text-sm lg:text-xs font-bold bg-white/5 text-white border border-white/10 px-4 lg:px-3 py-3 lg:py-1.5 rounded-xl lg:rounded-md hover:bg-white/10 transition-colors w-full sm:w-auto min-h-[44px]"
                >
                  <Globe className="h-4 w-4 lg:h-3.5 lg:w-3.5" /> Host Event
                </a>
              </div>
            </div>

            {/* Center: Explore & Programs (Span 5) */}
            <div className="lg:col-span-5 flex flex-col sm:grid sm:grid-cols-2 gap-0 lg:gap-8 border-t border-white/5 pt-4 lg:pt-0 lg:border-t-0">
              <FooterCol title="Explore" links={EXPLORE_LINKS} />
              <FooterCol title="Programs" links={PROGRAMS_LINKS} />
            </div>

            {/* Right: Support (Span 3) */}
            <div className="lg:col-span-3">
              <FooterCol title="Support" links={SUPPORT_LINKS} />
            </div>
          </div>

          {/* ROW 2: Contact Card and Socials */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-10 pt-10 border-t border-white/5 text-center md:text-left">
            {/* Contact Details */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col items-center md:items-start gap-6 lg:flex-row lg:flex-wrap lg:gap-8 w-full md:w-auto"
            >
              <div className="flex flex-col items-center md:items-start gap-1">
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider">
                  Community & General
                </div>
                <a
                  href="mailto:origohostscommunity@gmail.com"
                  className="text-sm font-medium text-white/80 hover:text-blue-400 transition-colors"
                >
                  Email Us
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider">
                  Business Partnerships
                </div>
                <a
                  href="mailto:origohostscommunity@gmail.com"
                  className="text-sm font-medium text-white/80 hover:text-blue-400 transition-colors"
                >
                  Email Us
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider">
                  Support
                </div>
                <a
                  href="mailto:origohostscommunity@gmail.com"
                  className="text-sm font-medium text-white/80 hover:text-blue-400 transition-colors"
                >
                  Email Us
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Response Time
                </div>
                <div className="text-sm font-bold text-green-400">Within 24 Hours</div>
              </div>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap justify-center md:justify-end gap-3 lg:gap-2 w-full md:w-auto"
            >
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-12 w-12 lg:h-9 lg:w-9 items-center justify-center rounded-xl lg:rounded-md bg-white/5 border border-white/5 text-white/60 transition-all hover:bg-white/10 hover:text-white"
                >
                  <Icon className="h-5 w-5 lg:h-4 lg:w-4" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* BOTTOM BAR */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 lg:gap-4 pt-8 border-t border-white/5 text-sm lg:text-xs text-white/40 font-medium text-center md:text-left pb-8 lg:pb-0"
          >
            <div>© {new Date().getFullYear()} OrigoHOST Community</div>

            <div className="flex items-center gap-1.5">
              Website Development by Binarize Technologies Pvt Ltd
            </div>

            <div className="flex items-center gap-4">
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="/terms" className="hover:text-white transition-colors">
                Terms
              </a>
              <CookiePreferencesButton />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
}

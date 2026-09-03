import { Link } from "@tanstack/react-router";
import { m as motion, Variants } from "framer-motion";
import "./site-footer.css";
import {
  Linkedin,
  Youtube,
  Twitter,
  ArrowUpRight,
  Shield,
  Globe,
  Clock,
  ChevronDown,
  MessageCircle,
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

// --- FOOTER LINKS DATA ---
const EXPLORE_LINKS = [
  { label: "About", to: "/about" },
  { label: "Community", to: "/community" },
  { label: "Events", to: "/community/events" },
  { label: "Programs", to: "#pathways" },
  { label: "Resources", to: "/resources" },
  { label: "Ecosystem", to: "/ecosystem" },
  { label: "Partners", to: "/partners" },
  { label: "Sponsors", to: "/become-a-sponsor" },
  { label: "Team", to: "/leadership" },
  { label: "Blog & News", to: "/blog" },
  { label: "Gallery", to: "/gallery" },
];

const CONNECT_LINKS = [
  { label: "Contact", to: "/contact" },
  { label: "Join / Get Involved", to: "/joincommunity" },
  { label: "FAQ", to: "/faq" },
  { label: "Public Roadmap", to: "/roadmap" },
  {
    label: "Partner With Us",
    to: "mailto:origohostscommunity@gmail.com?subject=Partnership%20Inquiry",
  },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms & Conditions", to: "/terms" },
  { label: "Sitemap", to: "/sitemap.xml" },
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
        <ul className="space-y-3 lg:space-y-2 text-base lg:text-xs text-white/60 font-medium w-full">
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
      className="relative bg-[#050B14] text-white overflow-hidden pt-16 pb-8 selection:bg-blue-500/30 border-t border-white/10 glow-pulse"
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
          {/* ROW 1: Brand Info & Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Left: Brand Description */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
              <a
                href="/"
                className="flex items-center justify-center lg:justify-start gap-3 text-3xl lg:text-2xl font-black mb-4 lg:mb-3 group w-fit"
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
              <p className="text-white/70 text-xs leading-relaxed mb-6 max-w-sm">
                OrigoHOST is an enterprise-grade developer ecosystem and community platform bridging
                the gap between learning technology and building production systems across India.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 lg:gap-2 w-full">
                <a
                  href="https://chat.whatsapp.com/BZnqAGpubNLDXLncASeOTM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-bold bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 px-4 py-2 rounded-lg hover:bg-[#25D366]/20 transition-colors w-full sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4" /> Join Community
                </a>
                <a
                  href="/become-ambassador"
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-2 rounded-lg hover:bg-blue-500/20 transition-colors w-full sm:w-auto"
                >
                  <Shield className="h-4 w-4" /> Become Ambassador
                </a>
              </div>
            </div>

            {/* Navigation Columns */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-white/5 pt-6 lg:pt-0 lg:border-t-0">
              <FooterCol title="Explore" links={EXPLORE_LINKS} />
              <FooterCol title="Connect" links={CONNECT_LINKS} />
              <FooterCol title="Legal" links={LEGAL_LINKS} />
            </div>
          </div>

          {/* ROW 2: Contact Info & Socials */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 pt-8 border-t border-white/5 text-center md:text-left">
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row flex-wrap items-center md:items-start gap-6 lg:gap-8 text-xs text-white/60"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 block">
                  Email Support
                </span>
                <a
                  href="mailto:origohostscommunity@gmail.com"
                  className="font-semibold text-white/90 hover:text-blue-400 transition-colors"
                >
                  origohostscommunity@gmail.com
                </a>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 block">
                  Response Time
                </span>
                <span className="font-bold text-emerald-400">Within 24 Hours</span>
              </div>
            </motion.div>

            {/* Social Icons */}
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/70 transition-all hover:bg-white/15 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* BOTTOM COPYRIGHT BAR */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5 text-xs text-white/50 font-medium"
          >
            <div>© 2026 OrigoHOST. All rights reserved. Where Builders Become Innovators.</div>
            <div className="flex items-center gap-4">
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-white transition-colors">
                Terms & Conditions
              </a>
              <a href="/sitemap.xml" className="hover:text-white transition-colors">
                Sitemap
              </a>
              <CookiePreferencesButton />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
}

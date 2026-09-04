import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { m as motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  User as UserIcon,
  LayoutDashboard,
  Sparkles,
  Layers,
  Cpu,
  Globe,
  BookOpen,
  Users,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand/brand-logo";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const EXPLORE_MENU = [
  { to: "/events", label: "Events", desc: "Meetups, Hackathons, Ideathons, KSS & Seminars" },
  {
    to: "/domains",
    label: "Technology Domains",
    desc: "AI, Cloud, Cyber, DevOps, Data, Web3 & Robotics",
  },
  {
    to: "/industries",
    label: "Industries & Fields",
    desc: "AgriTech, FinTech, HealthTech, EdTech & Smart Cities",
  },
  { to: "/programs", label: "Programs", desc: "Bootcamps, Learning Cohorts & Technical Training" },
  { to: "/projects", label: "Projects", desc: "Open Source & Real-World Innovations" },
  {
    to: "/opportunities",
    label: "Opportunities",
    desc: "Competitions, Speaking, Mentorship & Volunteering",
  },
] as const;

const COMMUNITY_MENU = [
  {
    to: "/community",
    label: "Community",
    desc: "Meet developers, students, researchers & founders",
  },
  {
    to: "/speakers",
    label: "Speakers & Experts",
    desc: "Learn from industry practitioners & leaders",
  },
  {
    to: "/mentors",
    label: "Mentors & Leaders",
    desc: "Connect with community guides & organizers",
  },
  { to: "/gallery", label: "Gallery", desc: "Moments from workshops, hackathons & meetups" },
] as const;

const KNOWLEDGE_MENU = [
  {
    to: "/knowledge",
    label: "Knowledge Hub",
    desc: "Articles, Tutorials, Guides & Event Insights",
  },
  {
    to: "/research",
    label: "Research (Origo Labs)",
    desc: "Emerging tech & distributed systems research",
  },
  { to: "/resources", label: "Resources", desc: "Developer tools, playbooks & learning paths" },
  { to: "/blog", label: "Blog & Stories", desc: "Community insights & technology articles" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const { user, isAdmin, signOut } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    let ticking = false;
    let last = false;
    let lastScrollY = window.scrollY;
    const evaluate = () => {
      ticking = false;
      const currentScrollY = window.scrollY;
      const next = currentScrollY > 12;
      if (next !== last) {
        last = next;
        setScrolled(next);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHideHeader(true);
      } else if (currentScrollY < lastScrollY) {
        setHideHeader(false);
      }
      lastScrollY = currentScrollY;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(evaluate);
    };
    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const tiltFrame = useRef(0);
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = barRef.current;
    if (!el) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (tiltFrame.current) return;
    tiltFrame.current = requestAnimationFrame(() => {
      tiltFrame.current = 0;
      const r = el.getBoundingClientRect();
      const px = (clientX - r.left) / r.width - 0.5;
      const py = (clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--rx", `${(-py * 4).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(px * 6).toFixed(2)}deg`);
      el.style.setProperty("--mx", `${clientX - r.left}px`);
      el.style.setProperty("--my", `${clientY - r.top}px`);
    });
  };
  const onPointerLeave = () => {
    const el = barRef.current;
    if (!el) return;
    if (tiltFrame.current) {
      cancelAnimationFrame(tiltFrame.current);
      tiltFrame.current = 0;
    }
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <motion.header
      initial={{ y: "-150%" }}
      animate={{ y: hideHeader && !open ? "-150%" : "0%" }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="fixed top-0 pt-2 lg:top-4 z-50 w-full px-2 lg:px-4 [perspective:1200px]"
    >
      <div
        ref={barRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className={
          "group relative mx-auto flex items-center justify-between gap-3 overflow-hidden rounded-full px-4 py-2 lg:py-2.5 will-change-transform " +
          "border border-white/20 bg-slate-900/95 text-white " +
          "backdrop-blur-xl backdrop-saturate-150 shadow-2xl " +
          "motion-safe:transition-[max-width,box-shadow] motion-safe:duration-500 motion-safe:ease-out"
        }
        style={{
          maxWidth: scrolled ? "68rem" : "80rem",
          transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
          transformStyle: "preserve-3d",
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(220px circle at var(--mx,50%) var(--my,50%), rgba(37,99,235,0.3), transparent 60%)",
          }}
        />

        {/* Brand Logo */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/"
            className="relative flex items-center gap-2 pl-2 text-base sm:text-lg font-black tracking-tight text-white"
            style={{ transform: "translateZ(30px)" }}
          >
            <BrandLogo size={26} />
            <span>
              Origo
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                HOST
              </span>
            </span>
          </Link>
        </motion.div>

        {/* Primary Mega Navigation */}
        <nav
          className="relative hidden items-center gap-1 xl:gap-2 lg:flex"
          aria-label="Main"
          style={{ transform: "translateZ(24px)" }}
        >
          {/* Explore Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs xl:text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-colors outline-none">
                <span>Explore</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-72 p-2 rounded-2xl bg-slate-900/95 text-white backdrop-blur-xl border border-white/10 shadow-2xl z-50"
            >
              <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                Explore Ecosystem
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              {EXPLORE_MENU.map((item) => (
                <DropdownMenuItem key={item.to} asChild>
                  <Link
                    to={item.to}
                    className="cursor-pointer flex flex-col items-start gap-0.5 rounded-xl px-3 py-2 hover:bg-white/10"
                  >
                    <span className="font-bold text-xs text-white">{item.label}</span>
                    <span className="text-[10px] text-slate-300 leading-tight">{item.desc}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Community Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs xl:text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-colors outline-none">
                <span>Community</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-72 p-2 rounded-2xl bg-slate-900/95 text-white backdrop-blur-xl border border-white/10 shadow-2xl z-50"
            >
              <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                People & Network
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              {COMMUNITY_MENU.map((item) => (
                <DropdownMenuItem key={item.to} asChild>
                  <Link
                    to={item.to}
                    className="cursor-pointer flex flex-col items-start gap-0.5 rounded-xl px-3 py-2 hover:bg-white/10"
                  >
                    <span className="font-bold text-xs text-white">{item.label}</span>
                    <span className="text-[10px] text-slate-300 leading-tight">{item.desc}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Knowledge Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs xl:text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-colors outline-none">
                <span>Knowledge</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-72 p-2 rounded-2xl bg-slate-900/95 text-white backdrop-blur-xl border border-white/10 shadow-2xl z-50"
            >
              <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                Insights & Research
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              {KNOWLEDGE_MENU.map((item) => (
                <DropdownMenuItem key={item.to} asChild>
                  <Link
                    to={item.to}
                    className="cursor-pointer flex flex-col items-start gap-0.5 rounded-xl px-3 py-2 hover:bg-white/10"
                  >
                    <span className="font-bold text-xs text-white">{item.label}</span>
                    <span className="text-[10px] text-slate-300 leading-tight">{item.desc}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* About Link */}
          <Link
            to="/about"
            className={`rounded-full px-3 py-1.5 text-xs xl:text-sm font-semibold transition-colors ${
              pathname === "/about"
                ? "text-white bg-white/15"
                : "text-slate-200 hover:text-white hover:bg-white/10"
            }`}
          >
            About
          </Link>
        </nav>

        {/* Action Button & Profile */}
        <div className="relative flex items-center gap-2" style={{ transform: "translateZ(30px)" }}>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full hidden sm:inline-flex"
                >
                  <Avatar className="h-9 w-9 border border-white/20">
                    <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || ""} />
                    <AvatarFallback className="bg-blue-600 text-white font-bold text-xs">
                      {user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-slate-900 text-white border border-white/10 z-50"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.user_metadata?.full_name || "User"}
                    </p>
                    <p className="text-xs leading-none text-slate-400">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="cursor-pointer flex items-center">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="cursor-pointer flex items-center">
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      <span>Admin Panel</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link
                    to="/admin/personal/my-profile"
                    className="cursor-pointer flex items-center"
                  >
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              className="hidden sm:inline-flex rounded-full bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-bold text-white shadow-md hover:scale-105 transition-all"
            >
              <Link to="/register">
                Join Community <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          )}

          <button
            className="grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/10 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (z-40 floating overlay) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { staggerChildren: 0.05, duration: 0.2 },
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.95,
              transition: { staggerChildren: 0.05, staggerDirection: -1, duration: 0.15 },
            }}
            className="fixed inset-0 lg:hidden flex flex-col pt-[84px] px-6 pb-8 bg-slate-950/95 text-white backdrop-blur-2xl z-40 h-screen overflow-y-auto"
          >
            <div className="flex flex-col gap-1.5 mt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-1">
                Explore Ecosystem
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {EXPLORE_MENU.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mt-4 mb-1">
                Community & Knowledge
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {COMMUNITY_MENU.concat(KNOWLEDGE_MENU).map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <Link
                to="/about"
                onClick={() => setOpen(false)}
                className="mt-3 block rounded-xl px-4 py-2.5 text-base font-bold text-white bg-white/10"
              >
                About OrigoHOST
              </Link>
            </div>

            {!user && (
              <div className="mt-auto mb-6 pt-4 border-t border-white/10">
                <Button
                  asChild
                  className="w-full h-12 rounded-full bg-blue-600 hover:bg-blue-700 px-5 text-white font-bold text-base shadow-lg transition-all"
                >
                  <Link to="/register" onClick={() => setOpen(false)}>
                    Join Community
                  </Link>
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

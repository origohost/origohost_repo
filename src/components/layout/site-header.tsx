import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { m as motion, AnimatePresence } from "framer-motion";
import { LogOut, Menu, X, ArrowRight, ShieldCheck, ChevronDown, Sparkles } from "lucide-react";
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
import { User as UserIcon, LayoutDashboard } from "lucide-react";

const MAIN_NAV = [
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/community/events", label: "Events" },
  { to: "/community", label: "Community" },
  { to: "/projects", label: "Projects" },
  { to: "/resources", label: "Resources" },
  { to: "/blog", label: "Blog" },
] as const;

const MORE_NAV = [
  { to: "/research", label: "Research" },
  { to: "/gallery", label: "Gallery" },
  { to: "/leadership", label: "Team" },
  { to: "/partners", label: "Partners" },
  { to: "/sponsor", label: "Sponsors" },
  { to: "/certificates", label: "Certificates" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const { user, isAdmin, signOut } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

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
      className={`fixed top-0 pt-2 lg:top-4 z-50 w-full px-2 lg:px-4 [perspective:1200px] ${isHome ? "dark" : ""}`}
    >
      <div
        ref={barRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className={
          "group relative mx-auto flex items-center justify-between gap-3 overflow-hidden rounded-full px-4 py-2 lg:py-2.5 will-change-transform " +
          "border border-foreground/10 bg-background/80 dark:bg-background/80 " +
          "backdrop-blur-xl backdrop-saturate-150 " +
          "shadow-[0_12px_40px_-22px_oklch(0.22_0.08_265_/_0.18)] " +
          "dark:shadow-[0_20px_60px_-20px_oklch(0_0_0_/_0.6)] " +
          "motion-safe:transition-[max-width,box-shadow] motion-safe:duration-500 motion-safe:ease-out"
        }
        style={{
          maxWidth: scrolled ? "64rem" : "78rem",
          transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
          transformStyle: "preserve-3d",
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full opacity-70"
          style={{
            background:
              "radial-gradient(220px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--primary) 8%, transparent), transparent 60%)",
          }}
        />

        {/* Brand Logo & Name */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/"
            className="relative flex items-center gap-2 pl-2 text-lg font-black tracking-tight text-foreground"
            style={{ transform: "translateZ(30px)" }}
          >
            <BrandLogo size={26} />
            <span>
              Origo
              <span className="bg-gradient-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent">
                HOST
              </span>
            </span>
          </Link>
        </motion.div>

        {/* Primary Desktop Navigation */}
        <nav
          className="relative hidden items-center gap-0.5 xl:gap-1 lg:flex"
          aria-label="Main"
          style={{ transform: "translateZ(24px)" }}
        >
          {MAIN_NAV.map((item) => {
            const isActive = pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className="relative rounded-full px-3 py-1.5 text-xs xl:text-sm font-semibold text-foreground/75 transition-colors hover:text-foreground"
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 rounded-full bg-foreground/10"
                    transition={{ type: "spring", stiffness: 250, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}

          {/* More / Explore Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs xl:text-sm font-semibold text-foreground/75 hover:text-foreground transition-colors outline-none">
                <span>Explore</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 p-2 rounded-2xl backdrop-blur-xl border border-foreground/10"
            >
              <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                More Ecosystem Pages
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {MORE_NAV.map((sub) => (
                <DropdownMenuItem key={sub.to} asChild>
                  <Link to={sub.to} className="cursor-pointer font-medium text-xs rounded-xl py-2">
                    {sub.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Action Button & User Profile */}
        <div className="relative flex items-center gap-2" style={{ transform: "translateZ(30px)" }}>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full hidden md:inline-flex"
                >
                  <Avatar className="h-9 w-9 border border-foreground/10">
                    <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || ""} />
                    <AvatarFallback className="bg-blue-600 text-white font-bold text-xs">
                      {user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.user_metadata?.full_name || "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
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
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              className="hidden sm:inline-flex rounded-full bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-blue-700 hover:scale-105 transition-all"
            >
              <Link to="/register">
                Join Community <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          )}

          <button
            className="grid h-10 w-10 place-items-center rounded-full text-foreground hover:bg-foreground/5 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
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
            className="fixed inset-0 lg:hidden flex flex-col pt-[80px] px-6 pb-6 bg-background/95 dark:bg-[#0A0F1C]/95 backdrop-blur-xl z-[-1] h-screen overflow-y-auto"
          >
            <div className="flex flex-col gap-1 mt-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-4 mb-1">
                Main Pages
              </span>
              {MAIN_NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-2.5 text-lg font-bold text-foreground/80 hover:bg-foreground/10 hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-4 mt-4 mb-1">
                Explore More
              </span>
              <div className="grid grid-cols-2 gap-1">
                {MORE_NAV.map((sub) => (
                  <Link
                    key={sub.to}
                    to={sub.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-4 py-2 text-sm font-semibold text-foreground/70 hover:bg-foreground/10 hover:text-foreground transition-colors"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            </div>

            {!user && (
              <div className="mt-auto mb-8 pt-6 border-t border-foreground/10">
                <Button
                  asChild
                  className="w-full h-12 rounded-xl bg-blue-600 px-5 text-white font-bold text-base shadow-lg hover:bg-blue-700 transition-all"
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

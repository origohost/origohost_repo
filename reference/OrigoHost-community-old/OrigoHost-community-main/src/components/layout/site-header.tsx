import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { m as motion, AnimatePresence } from "framer-motion";
import { LogOut, Menu, X, ArrowRight, ShieldCheck } from "lucide-react";
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
import { User as UserIcon, LayoutDashboard, Settings } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/community/events", label: "Events" },
  { to: "/host", label: "Host" },
  { to: "/blog", label: "Blog" },
  { to: "/sponsor", label: "Become a Sponsor" },
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

  // Scroll: rAF-throttled so scroll-linked styling stays smooth and we
  // never queue a state update per scroll event (avoids layout thrash).
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

      // Auto-hide logic
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

  // 3D tilt on pointer move — write CSS vars directly (no React state,
  // no re-render) inside a rAF so we coalesce writes and avoid thrash.
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
          "group relative mx-auto flex items-center justify-between gap-4 overflow-hidden rounded-full px-3 py-2.5 lg:py-2 will-change-transform " +
          "border border-foreground/10 bg-background/80 dark:bg-background/70 " +
          "backdrop-blur-xl backdrop-saturate-150 " +
          "shadow-[0_12px_40px_-22px_oklch(0.22_0.08_265_/_0.18)] " +
          "dark:shadow-[0_20px_60px_-20px_oklch(0_0_0_/_0.6)] " +
          "motion-safe:transition-[max-width,box-shadow] motion-safe:duration-500 motion-safe:ease-out"
        }
        style={{
          maxWidth: scrolled ? "56rem" : "72rem",
          transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Liquid glass highlights (theme-aware) */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full opacity-70"
          style={{
            background:
              "radial-gradient(220px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--primary) 8%, transparent), transparent 60%)",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent dark:via-white/40"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -top-8 left-8 h-16 w-40 rotate-[-8deg] rounded-full opacity-30 blur-2xl"
          style={{ background: "color-mix(in oklab, var(--primary) 20%, transparent)" }}
        />

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/"
            className="relative flex items-center gap-2 pl-2 text-lg font-black tracking-tight text-foreground"
            style={{ transform: "translateZ(30px)" }}
          >
            <BrandLogo size={26} />
            <span>
              Origo
              <span className="bg-gradient-to-r from-[var(--brand-orange)] to-[oklch(0.65_0.22_260)] bg-clip-text text-transparent">
                HOST
              </span>
            </span>
          </Link>
        </motion.div>

        <nav
          className="relative hidden items-center gap-1 lg:flex"
          aria-label="Main"
          style={{ transform: "translateZ(24px)" }}
        >
          {NAV.map((item) => {
            const isActive = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className="relative rounded-full px-3.5 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
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
        </nav>

        <div className="relative flex items-center gap-2" style={{ transform: "translateZ(30px)" }}>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full hidden md:inline-flex"
                >
                  <Avatar className="h-10 w-10 border border-foreground/10">
                    <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || ""} />
                    <AvatarFallback className="bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-green)] text-white font-bold">
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
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="cursor-pointer text-red-500 focus:text-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                asChild
                className="hidden md:inline-flex rounded-full bg-green-600 px-5 text-white font-semibold shadow-lg transition-all hover:bg-green-700 hover:-translate-y-0.5 animate-pulse-glow"
              >
                <Link to="/register">
                  Join Community <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </>
          )}
          <button
            className="grid h-11 w-11 place-items-center rounded-full text-foreground hover:bg-foreground/5 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

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
            className="fixed inset-0 lg:hidden flex flex-col pt-[88px] px-6 pb-6 bg-background/95 dark:bg-[#0A0F1C]/95 backdrop-blur-xl z-[-1] h-screen overflow-y-auto"
          >
            <div className="flex flex-col gap-2 mt-4">
              {NAV.map((item) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-6 py-4 text-xl font-bold text-foreground/80 hover:bg-foreground/10 hover:text-foreground transition-colors"
                    activeProps={{ className: "bg-foreground/10 text-foreground" }}
                    activeOptions={{ exact: item.to === "/" }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {!user && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-auto mb-8 pt-6 border-t border-foreground/10"
              >
                <Button
                  asChild
                  className="w-full h-[52px] rounded-xl bg-green-600 px-5 text-white font-bold text-lg shadow-lg hover:bg-green-700 transition-all animate-pulse-glow hover:-translate-y-0.5"
                >
                  <Link to="/register" onClick={() => setOpen(false)}>
                    Join Community
                  </Link>
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

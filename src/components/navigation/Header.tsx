'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Search, Moon, Sun } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/data/site/site.config';
import { LogoMark } from '@/components/shared/LogoMark';
import { Button } from '@/components/buttons/Button';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const [isOpen, setIsOpen]                 = useState(false);
  const [scrolled, setScrolled]             = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isDark, setIsDark]                 = useState(true);
  const [mounted, setMounted]               = useState(false);
  const pathname                            = usePathname();
  const dropdownRef                         = useRef<HTMLDivElement>(null);

  // ── Scroll detection ─────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Route change cleanup ─────────────────────────────────────────────
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // ── Dark mode initialization after mount (Hydration Safe) ─────────────
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme');
    const dark = stored !== 'light';
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);
  }, []);

  // ── Dark mode toggle ──────────────────────────────────────────────────
  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  // ── Keyboard accessibility for dropdown ───────────────────────────────
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setActiveDropdown(null);
    }
  };

  return (
    <>
      {/* ── Announcement / Ecosystem Bar ────────────────────────────── */}
      {/* <div className="w-full bg-[#001857] text-[#F4F7FF] py-2 px-4 border-b border-border/40 text-center text-body-xs font-mono font-medium flex items-center justify-center gap-2 relative z-50">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-green animate-pulse" />
          🚀 NEXT UP: CyberForge 2026 Hackathon registration is active!
        </span>
        <Link href="/events/cyberforge-2026" className="text-[#3D7CFF] hover:text-white transition-colors font-bold ml-1 inline-flex items-center gap-0.5">
          Register Now <span className="font-sans">→</span>
        </Link>
      </div> */}

      <header className="sticky top-3 sm:top-4 w-full z-50 px-4 sm:px-6 lg:px-8 transition-all duration-300 pointer-events-none">
        <div
          className={cn(
            'max-w-7xl mx-auto rounded-2xl md:rounded-full px-5 sm:px-6 py-3 flex items-center justify-between gap-4 transition-all duration-300 pointer-events-auto',
            scrolled
              ? 'bg-white/92 dark:bg-[#07101F]/90 backdrop-blur-xl border border-[#E2E8F0] dark:border-border/60 shadow-xs'
              : 'bg-white/80 dark:bg-[#07101F]/80 backdrop-blur-md border border-[#E2E8F0]/80 dark:border-border/40 shadow-xs'
          )}
        >

          {/* ── Logo ─────────────────────────────────────────────────── */}
          <Link href="/" aria-label="Go to OrigoHOST home page" className="shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-btn">
            <LogoMark variant="full" className="h-8 md:h-9" />
          </Link>

          {/* ── Desktop Nav ──────────────────────────────────────────── */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Main Navigation"
            onKeyDown={handleKeyDown}
          >
            {siteConfig.nav.map((item) => {
              const hasChildren = !!item.children;
              const isActive =
                pathname === item.href ||
                (hasChildren && item.children?.some((c) => pathname === c.href));

              if (hasChildren) {
                const isExpanded = activeDropdown === item.label;
                return (
                  <div
                    key={item.label}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      type="button"
                      className={cn(
                        'flex items-center gap-1 px-3 py-2 rounded-btn text-body-sm font-semibold tracking-wide',
                        'transition-colors duration-150 outline-none',
                        'focus-visible:ring-2 focus-visible:ring-primary',
                        isActive || isExpanded
                          ? 'text-primary'
                          : 'text-ink-secondary hover:text-ink hover:bg-surface-elevated'
                      )}
                      aria-expanded={isExpanded}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          'h-3.5 w-3.5 transition-transform duration-200 text-ink-muted',
                          isExpanded && 'rotate-180 text-primary'
                        )}
                        aria-hidden="true"
                      />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, y: 4, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.98 }}
                          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                          className={cn(
                            'absolute left-0 mt-1 w-52 rounded-card py-2 z-50 overflow-hidden',
                            'bg-surface border border-border shadow-popover backdrop-blur-xl'
                          )}
                        >
                          {item.children?.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                'flex items-center gap-2.5 px-4 py-2.5 text-body-sm font-medium outline-none',
                                'transition-colors duration-100 focus-visible:bg-surface-elevated focus-visible:text-primary',
                                pathname === child.href
                                  ? 'text-primary bg-primary/5 font-semibold'
                                  : 'text-ink-secondary hover:text-primary hover:bg-surface-elevated'
                              )}
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-primary/40 shrink-0" aria-hidden="true" />
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative px-3 py-2 rounded-btn text-body-sm font-semibold tracking-wide outline-none',
                    'transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary',
                    isActive
                      ? 'text-primary'
                      : 'text-ink-secondary hover:text-ink hover:bg-surface-elevated'
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-primary transition-all duration-200" />
                  )}

                </Link>
              );
            })}
          </nav>

          {/* ── Action Cluster ───────────────────────────────────────── */}
          <div className="flex items-center gap-1.5">
            {/* Search */}
            <Link
              href="/search"
              className="p-2 text-ink-muted hover:text-primary hover:bg-surface-elevated rounded-btn transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Search site"
            >
              <Search className="h-4.5 w-4.5" />
            </Link>

            {/* Dark Mode Toggle */}
            <button
              type="button"
              onClick={toggleDark}
              className="p-2 text-ink-muted hover:text-primary hover:bg-surface-elevated rounded-btn transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {mounted && isDark ? (
                <Sun className="h-4.5 w-4.5 text-accent-orange" />
              ) : (
                <Moon className="h-4.5 w-4.5" />
              )}
            </button>

            {/* Primary CTA Button */}
            <Button
              href="/join"
              variant="primary"
              size="md"
              className="hidden sm:inline-flex ml-1"
            >
              Join OrigoHOST
            </Button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-ink-secondary hover:text-primary hover:bg-surface-elevated rounded-btn transition-colors ml-0.5 outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-expanded={isOpen}
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <MobileMenu
            onClose={() => setIsOpen(false)}
            isDark={isDark}
            onToggleDark={toggleDark}
          />
        )}
      </AnimatePresence>
    </>
  );
}

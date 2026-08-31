'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, X, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/data/site/site.config';
import { Button } from '@/components/buttons/Button';
import { staggerContainer, staggerItem } from '@/lib/motion';

interface MobileMenuProps {
  onClose: () => void;
  isDark?: boolean;
  onToggleDark?: () => void;
}

export function MobileMenu({ onClose, isDark, onToggleDark }: MobileMenuProps) {
  const [expandedDropdown, setExpandedDropdown] = useState<string | null>(null);
  const pathname                                = usePathname();

  const toggleDropdown = (label: string) =>
    setExpandedDropdown((prev) => (prev === label ? null : label));

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Drawer — slides up from bottom */}
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'absolute bottom-0 left-0 right-0 z-10 rounded-t-2xl flex flex-col',
          'max-h-[90dvh] overflow-hidden',
          'bg-surface border-t border-border shadow-popover'
        )}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-border" />
        </div>

        {/* Header row */}
        <div className="flex items-center justify-between px-6 pt-3 pb-4 border-b border-border/50">
          <span className="font-display font-bold text-lg tracking-tight text-ink">
            Navigation
          </span>
          <div className="flex items-center gap-2">
            {onToggleDark && (
              <button
                type="button"
                onClick={onToggleDark}
                className="p-2 rounded-btn text-ink-muted hover:text-primary hover:bg-surface-elevated transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <Sun className="h-4.5 w-4.5 text-accent-orange" /> : <Moon className="h-4.5 w-4.5" />}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-btn text-ink-muted hover:text-primary hover:bg-surface-elevated transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Nav Links */}
        <motion.nav
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex-grow overflow-y-auto px-4 py-4 flex flex-col gap-1"
          aria-label="Mobile Navigation"
        >
          {siteConfig.nav.map((item, idx) => {
            const hasChildren = !!item.children;
            const isExpanded  = expandedDropdown === item.label;
            const isActive    =
              pathname === item.href ||
              (hasChildren && item.children?.some((c) => pathname === c.href));

            if (hasChildren) {
              return (
                <motion.div key={item.label} variants={staggerItem} className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => toggleDropdown(item.label)}
                    className={cn(
                      'flex items-center justify-between w-full px-4 py-3 rounded-btn text-body-md font-semibold text-left',
                      'transition-colors duration-150 outline-none',
                      'focus-visible:ring-2 focus-visible:ring-primary',
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-ink-secondary hover:text-ink hover:bg-surface-elevated'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-ink-muted/60 font-mono w-5 text-right">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      {item.label}
                    </div>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 text-ink-muted transition-transform duration-200',
                        isExpanded && 'rotate-180 text-primary'
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-1 pl-12 pr-4 py-1">
                          {item.children?.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={onClose}
                              className={cn(
                                'flex items-center gap-2 px-3 py-2 rounded-btn text-body-sm font-medium',
                                'transition-colors duration-100 outline-none focus-visible:ring-2 focus-visible:ring-primary',
                                pathname === child.href
                                  ? 'text-primary font-semibold bg-primary/5'
                                  : 'text-ink-secondary hover:text-primary hover:bg-surface-elevated'
                              )}
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-primary/50 shrink-0" />
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            }

            return (
              <motion.div key={item.href} variants={staggerItem}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center justify-between px-4 py-3 rounded-btn text-body-md font-semibold outline-none',
                    'transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary',
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-ink-secondary hover:text-ink hover:bg-surface-elevated'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-ink-muted/60 font-mono w-5 text-right">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </div>
                  <ChevronRight className="h-4 w-4 text-ink-muted" />
                </Link>
              </motion.div>
            );
          })}
        </motion.nav>

        {/* Drawer Footer with Primary CTA */}
        <div className="px-6 py-4 border-t border-border/50 bg-surface-elevated/40 flex flex-col gap-3">
          <Button
            href="/join"
            variant="primary"
            size="lg"
            className="w-full"
            onClick={onClose}
          >
            Join OrigoHOST
          </Button>
          <div className="flex items-center justify-between text-body-xs text-ink-muted px-1">
            <span>Where Builders Become Innovators</span>
            <Link href="/contact" onClick={onClose} className="hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

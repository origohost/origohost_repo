"use client";

import {
  m as motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  animate,
  AnimatePresence,
  type MotionProps,
  type Variants,
} from "framer-motion";
import {
  pageVariants,
  reducedPageVariants,
  reducedTransition,
  transitions,
  VIEWPORT_ONCE,
} from "@/lib/motion-config";
import {
  useEffect,
  useRef,
  useState,
  Children,
  isValidElement,
  type ReactNode,
  type ComponentPropsWithoutRef,
  type ElementType,
  type MouseEvent,
} from "react";
import { cn } from "@/lib/utils";

/**
 * Reusable motion primitives for OrigoHOST. Each primitive is a thin
 * wrapper around framer-motion so pages can compose complex motion
 * without duplicating boilerplate. All reveal primitives fire once and
 * respect `prefers-reduced-motion` via CSS in styles.css.
 */

type Direction = "up" | "down" | "left" | "right";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  as?: ElementType;
  once?: boolean;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.8,
  y = 40,
  className,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0, margin: "100px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideIn({
  children,
  dir = "up",
  delay = 0,
  duration = 0.65,
  distance = 40,
  className,
  once = true,
}: {
  children: ReactNode;
  dir?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}) {
  const offsets: Record<Direction, { x: number; y: number }> = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };
  const { x, y } = offsets[dir];
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: 0, margin: "100px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({
  children,
  delay = 0,
  duration = 0.5,
  from = 0.9,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  from?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: from }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once, amount: 0, margin: "100px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const staggerVariants: Variants = {
  hidden: {},
  show: (delayChildren: number = 0) => ({
    transition: { staggerChildren: 0.08, delayChildren },
  }),
};
const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export function Stagger({
  children,
  className,
  delayChildren = 0,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerVariants}
      custom={delayChildren}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0, margin: "100px" }}
    >
      {Children.map(children, (child, i) => {
        if (!isValidElement(child)) return child;
        const className = (child.props as any).className;
        return (
          <motion.div key={i} variants={staggerItem} className={className}>
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/** Word-by-word masked reveal for headings. */
export function Reveal({
  text,
  className,
  wordClassName,
  delay = 0,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className={cn("relative inline-block overflow-hidden align-bottom", wordClassName)}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.7, delay: delay + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Number counter that animates from 0 to `value` when in view. */
export function Counter({
  value,
  duration = 1.8,
  prefix = "",
  suffix = "",
  className,
  format,
}: {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  format?: (n: number) => string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [display, setDisplay] = useState("0");
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (n) => {
        const rounded = Math.round(n);
        setDisplay(format ? format(rounded) : rounded.toLocaleString());
      },
      onComplete: () => setDone(true),
    });
    return () => controls.stop();
  }, [inView, value, duration, format]);
  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <motion.div
        className="absolute inset-0 z-0 rounded-full bg-[var(--brand-green)] opacity-0 blur-xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={done ? { opacity: [0, 0.4, 0], scale: [0.8, 1.2, 1.4] } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <span ref={ref} className="relative z-10">
        {prefix}
        {display}
        {suffix}
      </span>
    </div>
  );
}

/** Cycling typewriter — types each phrase, pauses, deletes, moves on. */
export function Typewriter({
  words,
  className,
  typeSpeed = 55,
  deleteSpeed = 30,
  pause = 1400,
}: {
  words: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
}) {
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    if (words.length === 0) return;
    const word = words[idx % words.length];
    if (!deleting && sub === word) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && sub === "") {
      setDeleting(false);
      setIdx((n) => (n + 1) % words.length);
      return;
    }
    const next = deleting ? word.slice(0, sub.length - 1) : word.slice(0, sub.length + 1);
    const t = setTimeout(() => setSub(next), deleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(t);
  }, [sub, deleting, idx, words, typeSpeed, deleteSpeed, pause]);
  return (
    <span className={className}>
      {sub}
      <span className="ml-0.5 inline-block h-[0.9em] w-[2px] -translate-y-[0.05em] bg-current align-middle animate-caret" />
    </span>
  );
}

/** Parallax translateY tied to page scroll. */
export function Parallax({
  children,
  offset = 80,
  className,
}: {
  children: ReactNode;
  offset?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Horizontal marquee — duplicates content for a seamless loop.
 *
 * Accessibility:
 *  - Wrapper exposes a `region` role with a caller-supplied `aria-label`
 *    so screen readers can jump to it via landmarks / rotor.
 *  - The scroll container is keyboard-focusable (`tabIndex=0`) and pauses
 *    the animation on focus-within so users tabbing through logos aren't
 *    chasing moving targets.
 *  - The duplicated copy is `aria-hidden` so assistive tech only reads the
 *    logo list once.
 *  - When `prefers-reduced-motion: reduce` is set, the animation is
 *    dropped entirely and content lays out statically (wraps to lines).
 */
export function Marquee({
  children,
  className,
  speed = 40,
  pauseOnHover = true,
  ariaLabel,
  reverse = false,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  pauseOnHover?: boolean;
  ariaLabel?: string;
  reverse?: boolean;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div
        role="region"
        aria-label={ariaLabel}
        className={cn("overflow-x-auto", className)}
        tabIndex={0}
      >
        <div className="flex flex-wrap items-center justify-center gap-10">{children}</div>
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      className={cn(
        "group overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-orange)]/60",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max gap-10 animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
          "group-focus-within:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex shrink-0 items-center gap-10">{children}</div>
        <div className="flex shrink-0 items-center gap-10" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

/** Cursor-following magnetic button wrapper. */
export function Magnetic({
  children,
  strength = 0.3,
  scaleOnHover = true,
  className,
  ...rest
}: {
  children: ReactNode;
  strength?: number;
  scaleOnHover?: boolean;
  className?: string;
} & ComponentPropsWithoutRef<"span">) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 15 });
  const sy = useSpring(y, { stiffness: 180, damping: 15 });
  function onMove(e: MouseEvent<HTMLSpanElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }
  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={scaleOnHover ? { scale: 1.05 } : undefined}
      whileTap={scaleOnHover ? { scale: 0.97 } : undefined}
      style={{ x: sx, y: sy, display: "inline-block" }}
      className={className}
      {...(rest as MotionProps)}
    >
      {children}
    </motion.span>
  );
}

/** 3D tilt on pointer move. */
export function Tilt({
  children,
  className,
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });
  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * max);
    rx.set(-py * max);
  }
  function onLeave() {
    rx.set(0);
    ry.set(0);
  }
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ y: -8, boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)" }}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

/** Sticky top scroll progress bar. */
export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.4 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className={cn(
        "fixed inset-x-0 top-0 z-[60] h-[3px] bg-gradient-to-r from-[var(--brand-orange)] via-amber-400 to-[var(--brand-green)]",
        className,
      )}
      aria-hidden
    />
  );
}

/** Wraps <Outlet /> so route changes fade/slide instead of hard-cut. */
export function PageTransition({ pathname, children }: { pathname: string; children: ReactNode }) {
  const reduced = useReducedMotion();
  const variants = reduced ? reducedPageVariants : pageVariants;
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={reduced ? reducedTransition : transitions.base}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/** Animated orange + green orbs for hero backgrounds. */
export function BackgroundOrbs({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <div
        className={cn("pointer-events-none absolute inset-0 overflow-hidden opacity-60", className)}
        aria-hidden
      >
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
      </div>
    );
  }
  // Touch VIEWPORT_ONCE so tree-shakers keep the config import active.
  void VIEWPORT_ONCE;
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <div className="absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full bg-[var(--brand-orange)]/25 blur-3xl animate-float-slow animate-blob" />
      <div
        className="absolute -right-32 top-40 h-[520px] w-[520px] rounded-full bg-[var(--brand-green)]/25 blur-3xl animate-float animate-blob"
        style={{ animationDelay: "-4s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[360px] w-[360px] rounded-full bg-[var(--brand-yellow)]/25 blur-3xl animate-float-slow animate-blob"
        style={{ animationDelay: "-8s" }}
      />
    </div>
  );
}

/**
 * 3D flip card — reveals `back` on hover or focus. Works with keyboard
 * navigation because the wrapper is a real button with a visible focus
 * ring; hover and focus share the same `.is-flipped` state via CSS.
 */
export function Card3D({
  front,
  back,
  className,
  ariaLabel,
}: {
  front: ReactNode;
  back: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const reduced = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  if (reduced) {
    return (
      <div className={cn("relative", className)}>
        {front}
        <div className="mt-2 text-sm text-muted-foreground">{back}</div>
      </div>
    );
  }
  return (
    <button
      type="button"
      aria-label={ariaLabel ?? "Flip card"}
      aria-pressed={flipped}
      onClick={() => setFlipped((v) => !v)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      className={cn(
        "group relative block w-full text-left [perspective:1200px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-orange)] focus-visible:ring-offset-2 rounded-xl",
        className,
      )}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={transitions.springSoft}
      >
        <div className="[backface-visibility:hidden]">{front}</div>
        <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          {back}
        </div>
      </motion.div>
    </button>
  );
}

/**
 * Cursor-tracking spotlight card.
 *
 * Wraps arbitrary content and paints a soft radial highlight that follows
 * the pointer via CSS variables — no re-renders, GPU-only. Pointer-tracked
 * effect is disabled on touch / reduced-motion so we don't spawn a stuck
 * highlight on tap.
 */
export function SpotlightCard({
  children,
  className,
  color = "255, 255, 255",
  size = 320,
}: {
  children: ReactNode;
  className?: string;
  /** RGB triplet used inside the radial gradient. */
  color?: string;
  /** Radius of the spotlight in px. */
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
    el.style.setProperty("--spot-opacity", "1");
  }
  function onLeave() {
    ref.current?.style.setProperty("--spot-opacity", "0");
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={reduced ? undefined : onMove}
      onMouseLeave={reduced ? undefined : onLeave}
      whileHover={
        reduced
          ? undefined
          : { y: -8, boxShadow: "0 20px 40px -12px rgba(var(--spot-color), 0.25)" }
      }
      style={
        {
          "--spot-x": "50%",
          "--spot-y": "50%",
          "--spot-opacity": "0",
          "--spot-color": color,
          "--spot-size": `${size}px`,
        } as React.CSSProperties
      }
      className={cn("relative isolate overflow-hidden", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: "var(--spot-opacity)",
          background:
            "radial-gradient(var(--spot-size) circle at var(--spot-x) var(--spot-y), rgba(var(--spot-color), 0.18), transparent 60%)",
        }}
      />
      <div className="relative z-0">{children}</div>
    </motion.div>
  );
}

/**
 * Text Scramble (Decoder) Effect
 * Animates text with a hacker-style decoding effect on reveal.
 */
export function TextScramble({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!inView || reduced) return;
    let iteration = 0;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+";
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(""),
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [inView, text, reduced]);

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  );
}

/**
 * Scroll Velocity Skew
 * Gently skews elements based on the user's scroll velocity.
 */
export function ScrollVelocity({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const skew = useTransform(smoothVelocity, [-1000, 1000], [-5, 5]);
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div style={{ skewY: skew }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Interactive Cursor Trail
 * Displays a subtle particle trail following the mouse.
 */
export function CursorTrail() {
  const reduced = useReducedMotion();
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    if (reduced) return;
    let id = 0;
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      setTrail((prev) => [...prev, { x: e.clientX, y: e.clientY, id: id++ }].slice(-20));
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reduced]);

  if (reduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      <AnimatePresence>
        {trail.map((point) => (
          <motion.div
            key={point.id}
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute h-2 w-2 rounded-full bg-[var(--brand-orange)] blur-[1px]"
            style={{ left: point.x, top: point.y, transform: "translate(-50%, -50%)" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

/**
 * Staggered Text Reveal
 * Animates text block word-by-word.
 */
export function TextRevealStagger({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  const reduced = useReducedMotion();

  if (reduced) return <p className={className}>{text}</p>;

  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={{
        visible: { transition: { staggerChildren: 0.05 } },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-1"
          variants={{
            hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.5, ease: "easeOut" },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

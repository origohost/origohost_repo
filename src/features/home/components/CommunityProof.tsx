import React, { useEffect, useRef, useState } from "react";
import { m as motion } from "framer-motion";
import { Users, GraduationCap, Calendar, BookOpen } from "lucide-react";
import { CommunityProofData } from "../types/homepage.types";

interface CommunityProofProps {
  data: CommunityProofData;
}

const COUNTER_CONFIG = [
  {
    icon: Users,
    glow: "glow-blue",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    ringColor: "rgba(37,99,235,0.4)",
    accentColor: "#3b82f6",
  },
  {
    icon: GraduationCap,
    glow: "glow-emerald",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    ringColor: "rgba(16,185,129,0.4)",
    accentColor: "#10b981",
  },
  {
    icon: Calendar,
    glow: "glow-purple",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
    ringColor: "rgba(139,92,246,0.4)",
    accentColor: "#8b5cf6",
  },
  {
    icon: BookOpen,
    glow: "glow-amber",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-400",
    ringColor: "rgba(245,158,11,0.4)",
    accentColor: "#f59e0b",
  },
];

function AnimatedCounter({
  target,
  suffix,
  accentColor,
}: {
  target: number;
  suffix: string;
  accentColor: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
            else setCount(target);
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight" style={{ color: accentColor }}>
      {count}
      {suffix}
    </div>
  );
}

export const CommunityProof: React.FC<CommunityProofProps> = ({ data }) => {
  // Parse the label string to extract number + suffix, e.g. "15K+"
  const parseCounter = (label: string) => {
    const match = label.match(/^(\d+(?:\.\d+)?)(.*)/);
    return { num: match ? parseFloat(match[1]) : 0, suffix: match ? match[2] : "" };
  };

  return (
    <section className="relative bg-[#040d1a] border-y border-white/8 py-14 text-white overflow-hidden">
      {/* Aurora top highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

      {/* Live dot */}
      <div className="absolute top-5 right-8 flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        Live Stats
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {data.impactCounters.map((counter, idx) => {
            const config = COUNTER_CONFIG[idx % COUNTER_CONFIG.length];
            const { num, suffix } = parseCounter(counter.label);
            const Icon = config.icon;

            return (
              <motion.div
                key={counter.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="relative group flex flex-col items-center text-center p-6 rounded-2xl border border-white/8 bg-white/3 hover:border-white/20 hover:bg-white/6 transition-all duration-300 cursor-default overflow-hidden"
              >
                {/* Subtle glow on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: `inset 0 0 30px ${config.ringColor}` }}
                />

                {/* Progress arc via SVG ring */}
                <div className="relative w-14 h-14 mb-4">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="3" />
                    <circle
                      cx="28" cy="28" r="24"
                      fill="none"
                      stroke={config.accentColor}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={`${Math.min(num / 200 * 150, 150)} 150`}
                      className="transition-all duration-1000"
                      opacity="0.7"
                    />
                  </svg>
                  <div className={`absolute inset-0 flex items-center justify-center rounded-full ${config.iconBg}`}>
                    <Icon className={`w-5 h-5 ${config.iconColor}`} />
                  </div>
                </div>

                <AnimatedCounter target={num} suffix={suffix} accentColor={config.accentColor} />

                <div className="mt-2 text-[11px] font-bold tracking-wide text-slate-400 uppercase">
                  {counter.value}
                </div>
                {counter.sublabel && (
                  <div className="mt-0.5 text-[10px] text-slate-500">{counter.sublabel}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Aurora bottom highlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
    </section>
  );
};

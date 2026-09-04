import React from "react";
import { m as motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { EcosystemPartnersData } from "../types/homepage.types";

interface EcosystemPartnersProps {
  data: EcosystemPartnersData;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Technology:   { bg: "bg-blue-500/15",   text: "text-blue-400",   border: "border-blue-500/30" },
  Education:    { bg: "bg-emerald-500/15", text: "text-emerald-400", border: "border-emerald-500/30" },
  Community:    { bg: "bg-purple-500/15", text: "text-purple-400", border: "border-purple-500/30" },
  Media:        { bg: "bg-amber-500/15",  text: "text-amber-400",  border: "border-amber-500/30" },
  Research:     { bg: "bg-cyan-500/15",   text: "text-cyan-400",   border: "border-cyan-500/30" },
  Industry:     { bg: "bg-rose-500/15",   text: "text-rose-400",   border: "border-rose-500/30" },
};

function getCategoryTheme(category: string) {
  for (const key of Object.keys(CATEGORY_COLORS)) {
    if (category?.toLowerCase().includes(key.toLowerCase())) return CATEGORY_COLORS[key];
  }
  return CATEGORY_COLORS.Technology;
}

export const EcosystemPartners: React.FC<EcosystemPartnersProps> = ({ data }) => {
  if (!data.partners || data.partners.length === 0) return null;

  // Duplicate for seamless marquee loop
  const doubled = [...data.partners, ...data.partners];

  return (
    <section className="relative bg-[#030b1e] text-white py-24 overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            {data.eyebrow}
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{data.title}</h3>
          <div className="mt-4 mx-auto w-20 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full" />
        </motion.div>

        {/* Marquee scrolling row */}
        <div className="relative overflow-hidden">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030b1e] to-transparent z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030b1e] to-transparent z-10 pointer-events-none" />

          <div className="flex gap-4 animate-marquee-scroll-slow" style={{ width: "max-content" }}>
            {doubled.map((partner, idx) => {
              const theme = getCategoryTheme(partner.category);
              return (
                <div
                  key={`${partner.id}-${idx}`}
                  className="group relative flex-shrink-0 min-w-[200px] px-6 py-4 rounded-2xl bg-white/4 border border-white/8 hover:border-white/20 hover:bg-white/8 transition-all duration-300 text-center cursor-default overflow-hidden"
                  style={{
                    ["--hover-shadow" as string]: "0 0 24px rgba(37,99,235,0.2)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(37,99,235,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                  }}
                >
                  {/* Glow on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-blue-500/4 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative">
                    {partner.category && (
                      <span className={`inline-block text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${theme.bg} ${theme.text} ${theme.border} mb-2`}>
                        {partner.category}
                      </span>
                    )}
                    <div className="text-white font-semibold text-sm group-hover:text-blue-200 transition-colors">
                      {partner.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
    </section>
  );
};

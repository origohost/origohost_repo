import React from "react";
import { BookOpen, ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { KnowledgeShowcaseData } from "../types/homepage.types";

interface KnowledgeShowcaseProps {
  data: KnowledgeShowcaseData;
}

export const KnowledgeShowcase: React.FC<KnowledgeShowcaseProps> = ({ data }) => {
  return (
    <section id="knowledge-hub" className="bg-slate-50 py-24 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
              {data.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              {data.title}
            </h2>
          </div>
          <Link
            to="/knowledge"
            className="inline-flex items-center gap-2 h-9 px-5 rounded-full border border-slate-300 bg-white text-slate-700 text-sm font-bold hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 shrink-0"
          >
            Explore Knowledge <BookOpen className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Featured Article Card (7 Columns) */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
            {/* Image: explicit height avoids aspect-ratio class conflicts */}
            <div className="relative overflow-hidden" style={{ height: "280px" }}>
              <img
                src={data.featuredArticle.coverUrl}
                alt={data.featuredArticle.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              {/* Tag badge overlaid on image */}
              <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider text-blue-300 bg-blue-600/80 backdrop-blur-sm px-3 py-1 rounded-full border border-blue-400/40">
                {data.featuredArticle.tag}
              </span>
            </div>

            <div className="p-8 flex flex-col flex-1">
              <h3 className="text-2xl font-black text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                {data.featuredArticle.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-1">
                {data.featuredArticle.desc}
              </p>
              <Button asChild className="w-fit rounded-full bg-blue-600 hover:bg-blue-700 font-bold text-xs h-9 px-5">
                <Link to={data.featuredArticle.link as any}>
                  Read Full Article <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Knowledge Categories (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Browse by Category</p>
            {data.categories.map((k, i) => (
              <Link
                key={k.title}
                to="/knowledge"
                className="group flex items-center justify-between p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  {/* Number badge */}
                  <span className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-xs font-black text-blue-600 shrink-0 group-hover:bg-blue-100 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">{k.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">{k.desc}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

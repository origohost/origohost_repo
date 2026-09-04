import React from "react";
import { BookOpen, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { KnowledgeShowcaseData } from "../types/homepage.types";

interface KnowledgeShowcaseProps {
  data: KnowledgeShowcaseData;
}

export const KnowledgeShowcase: React.FC<KnowledgeShowcaseProps> = ({ data }) => {
  return (
    <section id="knowledge-hub" className="bg-white py-24 border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Featured Article Card (7 Columns) */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-slate-50 overflow-hidden shadow-xs hover:shadow-md transition-all group">
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={data.featuredArticle.coverUrl}
                alt={data.featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-8">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                {data.featuredArticle.tag}
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-3 mb-2 group-hover:text-blue-600 transition-colors">
                {data.featuredArticle.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                {data.featuredArticle.desc}
              </p>
              <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700 font-bold text-xs">
                <Link to={data.featuredArticle.link as any}>
                  Read Full Article <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Knowledge Categories Grid (5 Columns) */}
          <div className="lg:col-span-5 space-y-4">
            {data.categories.map((k) => (
              <div key={k.title} className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 transition-all">
                <h4 className="font-bold text-slate-900 text-sm mb-1">{k.title}</h4>
                <p className="text-xs text-slate-600">{k.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

import React from "react";
import { Code2, ExternalLink } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ProjectShowcaseData } from "../types/homepage.types";

interface ProjectShowcaseProps {
  data: ProjectShowcaseData;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ data }) => {
  if (!data.projects || data.projects.length === 0) {
    return null;
  }

  return (
    <section id="projects-showcase" className="bg-slate-50 py-24 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-200">
              {data.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              {data.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">{data.subtitle}</p>
          </div>
          <Button asChild variant="outline" className="rounded-full border-slate-300 font-bold text-sm">
            <Link to="/projects">
              View All Builds <Code2 className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.projects.map((project) => (
            <div
              key={project.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-16/9 rounded-2xl overflow-hidden mb-6 border border-slate-200">
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded border border-slate-200">
                    {project.techDomain}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded border border-emerald-200">
                    {project.industry}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">{project.desc}</p>
              </div>
              {project.demoUrl && (
                <Button asChild variant="outline" className="w-full rounded-full border-slate-300 text-xs font-bold">
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    Explore Codebase <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                  </a>
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

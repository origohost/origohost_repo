import React from "react";
import { Code2, ExternalLink } from "lucide-react";
import { Link } from "@tanstack/react-router";
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
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 h-9 px-5 rounded-full border border-slate-300 bg-white text-slate-700 text-sm font-bold hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 shrink-0"
          >
            View All Builds <Code2 className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.projects.map((project) => (
            <div
              key={project.id}
              className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
            >
              {/* Project Image: fixed 220px height for consistent sizing */}
              <div className="relative overflow-hidden" style={{ height: "220px" }}>
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
                {/* Domain badges overlaid at bottom */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-slate-700 px-2.5 py-1 rounded-full shadow-sm">
                    {project.techDomain}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-600/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-full shadow-sm">
                    {project.industry}
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-6 flex-1">{project.desc}</p>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full h-10 rounded-full border border-slate-300 bg-white text-slate-700 text-xs font-bold hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                  >
                    Explore Codebase <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

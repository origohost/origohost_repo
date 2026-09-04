import { createFileRoute, Link } from "@tanstack/react-router";
import { buildSeo } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Cloud,
  Code2,
  Brain,
  Shield,
  Laptop,
  Terminal,
  Sparkles,
  CheckCircle,
} from "lucide-react";

export const Route = createFileRoute("/programs")({
  head: () =>
    buildSeo({
      title: "Programs — Programs That Turn Learning Into Capability",
      description:
        "Practical learning experiences designed around modern technology and real-world problem solving.",
      path: "/programs",
    }),
  component: ProgramsPage,
});

const PROGRAM_LIST = [
  {
    name: "Cloud & Infrastructure Foundation",
    cat: "Cloud Computing",
    desc: "Hands-on experience with containerization, Kubernetes, virtual private servers, and cloud networking.",
    level: "Beginner to Intermediate",
    duration: "6 Weeks",
    format: "Online & Sandbox Labs",
    skills: ["Docker", "Kubernetes", "Linux VPS", "SSH Security"],
  },
  {
    name: "DevOps & Platform Engineering",
    cat: "DevOps",
    desc: "Master automated deployment pipelines, CI/CD, IaC, and telemetry playbooks.",
    level: "Intermediate",
    duration: "8 Weeks",
    format: "Cohorts & Practice",
    skills: ["Terraform", "GitHub Actions", "Prometheus", "Helm"],
  },
  {
    name: "AI & Machine Learning Foundations",
    cat: "AI & Machine Learning",
    desc: "Exploration of generative AI models, neural networks, fine-tuning, and production deployment.",
    level: "All Levels",
    duration: "4 Weeks",
    format: "Webinars & Buildathons",
    skills: ["Python", "PyTorch", "LLM APIs", "Model Serving"],
  },
  {
    name: "Cybersecurity & Defense Essentials",
    cat: "Cybersecurity",
    desc: "Deep dive into threat modeling, penetration testing, ethical hacking, and vulnerability management.",
    level: "Intermediate",
    duration: "6 Weeks",
    format: "Hands-on Labs",
    skills: ["Penetration Testing", "Wireshark", "Threat Audit", "Linux Security"],
  },
  {
    name: "Full-Stack Software Engineering",
    cat: "Software Engineering",
    desc: "Build modern web applications, scalable backend APIs, and real-time frontend user interfaces.",
    level: "All Levels",
    duration: "10 Weeks",
    format: "Project-Based Cohort",
    skills: ["React", "TypeScript", "Node.js", "Supabase"],
  },
  {
    name: "Open Source Contributor Track",
    cat: "Open Source",
    desc: "Collaborate on real community tools, submit pull requests, and contribute to production codebases.",
    level: "All Levels",
    duration: "Ongoing",
    format: "Community Mentorship",
    skills: ["Git Flow", "PR Review", "Documentation", "CI Integration"],
  },
];

function ProgramsPage() {
  return (
    <div className="relative min-h-screen bg-white text-slate-900 pt-28 pb-20 selection:bg-blue-600 selection:text-white">
      {/* HERO */}
      <section className="bg-slate-900 text-white py-20 px-6 lg:px-8 border-b border-slate-800">
        <div className="mx-auto max-w-5xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
            ORIGOHOST PROGRAMS
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Programs That Turn Learning Into Capability
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
            Practical learning experiences designed around modern technology and real-world problem
            solving.
          </p>
        </div>
      </section>

      {/* PROGRAM CARDS */}
      <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROGRAM_LIST.map((prog) => (
            <div
              key={prog.name}
              className="rounded-3xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block mb-4">
                  {prog.cat}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{prog.name}</h3>
                <p className="text-sm text-slate-700 leading-relaxed mb-6">{prog.desc}</p>

                <div className="space-y-2 text-xs text-slate-500 mb-6 border-t border-slate-200/80 pt-4">
                  <div className="flex justify-between">
                    <span>Level:</span> <strong className="text-slate-800">{prog.level}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>{" "}
                    <strong className="text-slate-800">{prog.duration}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Format:</span> <strong className="text-slate-800">{prog.format}</strong>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-8">
                  {prog.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-mono bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <Button asChild className="w-full rounded-full bg-blue-600 hover:bg-blue-700">
                <Link to="/register">
                  Join Program <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

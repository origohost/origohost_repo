import { GraduationCap, BookOpen, Laptop, Target } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";

const COURSES = [
  {
    title: "Kubernetes for Developers",
    description:
      "Learn to containerize and deploy scalable applications using Kubernetes and Helm.",
    duration: "4 Weeks",
    level: "Intermediate",
  },
  {
    title: "Generative AI Engineering",
    description: "Build robust LLM applications, RAG pipelines, and agentic workflows.",
    duration: "6 Weeks",
    level: "Advanced",
  },
  {
    title: "Cloud Infrastructure 101",
    description: "Master the fundamentals of Linux, networking, VPS, and cloud storage.",
    duration: "2 Weeks",
    level: "Beginner",
  },
];

export default function AcademyPage() {
  return (
    <PageShell title="Academy">
      <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="bg-emerald-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center space-x-4 mb-6">
            <GraduationCap className="w-12 h-12 text-emerald-400" />
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">Origo Academy</h1>
          </div>
          <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl leading-relaxed">
            World-class technical education. Learn Cloud Computing, DevOps, and Artificial
            Intelligence directly from industry experts.
          </p>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Featured Technical Courses</h2>
            <p className="text-slate-600 mt-2">
              Comprehensive curriculums designed to make you industry-ready.
            </p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-3 hide-scrollbar">
            {COURSES.map((course, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:border-emerald-500 transition-colors snap-center shrink-0 w-[85vw] md:w-auto flex flex-col h-full"
              >
                <BookOpen className="w-8 h-8 text-emerald-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">{course.title}</h3>
                <p className="text-slate-600 mb-6 flex-grow">{course.description}</p>
                <div className="flex items-center justify-between text-sm font-semibold text-slate-500 border-t pt-4 mt-auto">
                  <span>{course.level}</span>
                  <span>{course.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
    </PageShell>
  );
}

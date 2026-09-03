import { Briefcase, TrendingUp, Presentation, Users } from "lucide-react";

export default function TopicCareerPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <Briefcase className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-black mb-6">Tech Career & Growth Hub</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Navigate the tech industry, land your dream job, and accelerate your growth from Junior
            to Staff Engineer.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-12 p-8 bg-yellow-50 border border-yellow-100 rounded-2xl">
            <h2 id="what-is-tech-career-growth" className="text-2xl font-bold text-yellow-900 mb-3">
              How to Grow in Tech?
            </h2>
            <p className="text-lg text-yellow-800 font-medium">
              Career growth in the technology sector requires more than just writing code. It
              demands a combination of deep technical expertise, system design knowledge, effective
              communication, and continuous learning.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <Presentation className="w-8 h-8 text-yellow-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Interview Preparation</h3>
              <p className="text-slate-600">
                Master Data Structures, Algorithms (DSA), and System Design interviews for FAANG and
                high-growth startups.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <TrendingUp className="w-8 h-8 text-yellow-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">The Engineering Ladder</h3>
              <p className="text-slate-600">
                Understand the expectations and skills required to transition from Junior to Mid,
                Senior, and Staff level engineering.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <Users className="w-8 h-8 text-yellow-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Resume & Personal Branding</h3>
              <p className="text-slate-600">
                Optimize your resume, build a standout GitHub portfolio, and leverage LinkedIn to
                attract recruiters.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

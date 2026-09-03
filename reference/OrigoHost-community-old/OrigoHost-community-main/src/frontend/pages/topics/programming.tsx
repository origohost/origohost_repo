import { Code2, TerminalSquare, DatabaseZap, LayoutTemplate } from "lucide-react";

export default function TopicProgrammingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <Code2 className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-black mb-6">Programming & Web Dev Hub</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Master the art of software engineering, frontend frameworks, backend architecture, and
            database design.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-12 p-8 bg-blue-50 border border-blue-100 rounded-2xl">
            <h2 id="what-is-software-engineering" className="text-2xl font-bold text-blue-900 mb-3">
              What is Software Engineering?
            </h2>
            <p className="text-lg text-blue-800 font-medium">
              Software engineering is the application of engineering principles to the design,
              development, maintenance, testing, and evaluation of computer software. Modern web
              development divides this discipline into Frontend (client-side), Backend (server-side
              logic), and Full-Stack development.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <LayoutTemplate className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Frontend Frameworks</h3>
              <p className="text-slate-600">
                Deep dives into React, Vue, Svelte, and modern meta-frameworks like Next.js and
                Nuxt.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <TerminalSquare className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Backend Architecture</h3>
              <p className="text-slate-600">
                Building robust APIs using Node.js, Go, Python, and Rust. Microservices vs
                Monoliths.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <DatabaseZap className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Database Design</h3>
              <p className="text-slate-600">
                Relational modeling in PostgreSQL, NoSQL document stores, and distributed caching
                with Redis.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

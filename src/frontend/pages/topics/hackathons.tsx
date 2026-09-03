import { Trophy, Rocket, Code2, Users2 } from "lucide-react";

export default function TopicHackathonsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <Trophy className="w-16 h-16 text-orange-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-black mb-6">Hackathons & Startups Hub</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Everything you need to know about winning hackathons, building MVPs, and launching your
            first startup.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-12 p-8 bg-orange-50 border border-orange-100 rounded-2xl">
            <h2 id="what-is-a-hackathon" className="text-2xl font-bold text-orange-900 mb-3">
              What is a Hackathon?
            </h2>
            <p className="text-lg text-orange-800 font-medium">
              A hackathon is an intense, time-bound event (usually 24-48 hours) where developers,
              designers, and entrepreneurs collaborate to build functional prototypes (MVPs) that
              solve real-world problems. It is the ultimate testing ground for rapid software
              engineering and startup ideation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <Rocket className="w-8 h-8 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Building an MVP</h3>
              <p className="text-slate-600">
                How to define core features, select the right tech stack (e.g., Next.js, Supabase),
                and launch quickly.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <Code2 className="w-8 h-8 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Hackathon Strategies</h3>
              <p className="text-slate-600">
                Time management, division of labor, API integration, and how to deliver a winning
                pitch.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <Users2 className="w-8 h-8 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">From Hack to Startup</h3>
              <p className="text-slate-600">
                Transitioning your weekend project into a venture-backed startup. Finding users and
                securing early funding.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

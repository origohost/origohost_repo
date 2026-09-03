import { m as motion } from "framer-motion";
import {
  UserPlus,
  FileSearch,
  UserCheck,
  Mail,
  BookOpen,
  GraduationCap,
  Users,
  Calendar,
  Presentation,
  Heart,
} from "lucide-react";

const SELECTION_STEPS = [
  {
    icon: UserPlus,
    title: "1. Apply Online",
    desc: "Submit your profile, skills, and community experience.",
  },
  {
    icon: FileSearch,
    title: "2. Screening",
    desc: "Our team reviews your application against our criteria.",
  },
  {
    icon: UserCheck,
    title: "3. Interview",
    desc: "Shortlisted candidates are invited for a video interview.",
  },
  { icon: Mail, title: "4. Selection", desc: "Receive the official offer letter and welcome kit." },
  {
    icon: BookOpen,
    title: "5. Training",
    desc: "Join the onboarding session to understand the program.",
  },
  {
    icon: GraduationCap,
    title: "6. Become Ambassador",
    desc: "Start making an impact on your campus.",
  },
];

const ROLES = [
  { icon: Presentation, title: "Host Workshops", desc: "Organize technical deep-dives on campus." },
  { icon: Users, title: "Organize Meetups", desc: "Build a local community of developers." },
  { icon: Heart, title: "Student Support", desc: "Mentor juniors and guide them." },
  { icon: Calendar, title: "Event Management", desc: "Lead hackathons and coding competitions." },
];

export function AmbassadorTimelines() {
  return (
    <div className="bg-gray-50 pb-16 md:pb-24 lg:pb-32">
      {/* Selection Process Timeline */}
      <section className="py-16 md:py-24 container mx-auto px-5 md:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[32px] sm:text-4xl font-black tracking-tight text-gray-900 mb-3 md:mb-4 leading-tight">
            Selection <span className="text-blue-600">Process</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            A transparent and merit-based journey.
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 w-full">
            {SELECTION_STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-100 p-6 md:p-8 rounded-[2rem] lg:rounded-3xl shadow-sm hover:shadow-xl transition-all relative overflow-hidden group w-full"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-[100px] z-0 transition-transform group-hover:scale-110" />
                <div className="text-7xl font-black text-gray-50 absolute top-4 right-6 z-0 group-hover:text-blue-50 transition-colors">
                  0{i + 1}
                </div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 ring-4 ring-white shadow-sm">
                    <step.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title.replace(/^\d+\.\s*/, "")}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles & Responsibilities */}
      <section className="py-16 md:py-24 bg-[#0A0F1C] text-white my-8 md:my-12 mx-5 md:mx-8 lg:mx-12 rounded-[2rem] lg:rounded-3xl overflow-hidden relative shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop')] opacity-20 mix-blend-overlay object-cover" />
        <div className="absolute top-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="container mx-auto px-5 md:px-8 lg:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[32px] sm:text-4xl font-black tracking-tight mb-3 md:mb-4 leading-tight">
              Roles & Responsibilities
            </h2>
            <p className="text-base sm:text-lg text-gray-400">
              What it takes to be an OrigoHOST Campus Ambassador.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full">
            {ROLES.map((role, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-gray-800/40 border border-gray-700/50 p-6 md:p-8 rounded-[2rem] lg:rounded-3xl backdrop-blur-sm shadow-xl w-full"
              >
                <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6">
                  <role.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{role.title}</h3>
                <p className="text-gray-400 leading-relaxed">{role.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

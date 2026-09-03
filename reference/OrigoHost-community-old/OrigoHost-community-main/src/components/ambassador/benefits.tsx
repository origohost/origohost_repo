import { m as motion } from "framer-motion";
import { ArrowRight, Briefcase, Users, Presentation, Trophy, Medal, Rocket } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "@tanstack/react-router";

const BENEFITS = [
  {
    id: "career",
    title: "Career Growth",
    description: "Boost your resume with real leadership experience and industry-recognized roles.",
    icon: Rocket,
    image: "/benefits/career.png",
    details:
      "Gain unparalleled career growth by managing real-world communities. You will learn project management, public speaking, and team leadership.",
  },
  {
    id: "mentorship",
    title: "Industry Mentorship",
    description: "Learn 1:1 from founders, senior engineers, and open-source leaders.",
    icon: Users,
    image: "/benefits/mentorship.png",
    details:
      "Get direct access to industry veterans who will guide you on your tech journey, review your code, and help you navigate your career.",
  },
  {
    id: "events",
    title: "Exclusive Events",
    description: "Attend invite-only workshops, massive hackathons, and private VIP dinners.",
    icon: Presentation,
    image: "/benefits/events.png",
    details:
      "We sponsor your travel and stay for our flagship events. Host your own local chapters with our funding and resources.",
  },
  {
    id: "rewards",
    title: "Rewards & Swags",
    description: "Earn amazing rewards, premium swag kits, and exclusive OrigoHOST goodies.",
    icon: Trophy,
    image: "/ritik-cert.jpg",
    details:
      "Every milestone you hit unlocks a new tier of swags. From custom mechanical keyboards to premium hoodies, we reward excellence.",
  },
  {
    id: "certificates",
    title: "Certifications",
    description:
      "Get recognized with official certificates, LinkedIn badges, and letters of recommendation.",
    icon: Medal,
    image: "/real-swags.jpg",
    details:
      "Stand out to recruiters with verifiable credentials and a personalized letter of recommendation from our CEO.",
  },
  {
    id: "internships",
    title: "Internships",
    description: "Fast-track interviews and get direct referrals to our partner network startups.",
    icon: Briefcase,
    image: "/benefits/internships.png",
    details:
      "Top-performing ambassadors skip the resume screening phase entirely and land paid internships directly.",
  },
];

export function AmbassadorBenefits() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-5 md:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-[32px] sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-4 lg:mb-6 leading-tight">
            Why Become an <span className="text-blue-600">Ambassador?</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            It's not just a title. It's a career-defining experience. Unlock resources, mentorship,
            and opportunities designed to accelerate your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
          {BENEFITS.map((benefit, i) => (
            <Dialog key={benefit.id}>
              <DialogTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="group relative cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      loading="lazy"
                      decoding="async"
                      src={benefit.image}
                      alt={benefit.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md p-2 rounded-xl border border-white/30">
                      <benefit.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 mb-6 line-clamp-2">{benefit.description}</p>
                    <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                      Learn More{" "}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden rounded-3xl">
                <div className="h-64 relative">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={benefit.image}
                    alt={benefit.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-4">
                    <div className="bg-blue-600 p-3 rounded-2xl shadow-lg">
                      <benefit.icon className="h-8 w-8 text-white" />
                    </div>
                    <DialogTitle className="text-3xl font-bold text-white">
                      {benefit.title}
                    </DialogTitle>
                  </div>
                </div>
                <div className="p-8 bg-white">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Overview</h4>
                  <p className="text-gray-600 leading-relaxed mb-8">{benefit.details}</p>

                  <div className="flex justify-end">
                    <Link
                      to="/community/ambassadors/apply"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105 inline-block text-center"
                    >
                      Apply to Unlock
                    </Link>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}

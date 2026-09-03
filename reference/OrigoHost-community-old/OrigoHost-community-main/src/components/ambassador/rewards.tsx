import { m as motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";

const TIERS = [
  {
    name: "Bronze",
    xp: "0 - 499 XP",
    color: "from-amber-700 to-amber-900",
    badge: "bg-amber-800",
    features: ["Welcome Kit", "Digital Certificate", "Community Access", "Bronze Badge"],
    button: "Let's Start",
  },
  {
    name: "Silver",
    xp: "500 - 1499 XP",
    color: "from-slate-300 to-slate-500",
    badge: "bg-slate-400",
    features: [
      "T-Shirt & Stickers",
      "Event Certificate",
      "Featured on Website",
      "Priority Support",
    ],
    button: "Level Up",
    popular: true,
  },
  {
    name: "Gold",
    xp: "1500 - 2999 XP",
    color: "from-yellow-400 to-yellow-600",
    badge: "bg-yellow-500",
    features: [
      "Premium Hoodie",
      "Exclusive Goodies",
      "1:1 Mentorship Sessions",
      "Interview Opportunities",
    ],
    button: "Go Further",
  },
  {
    name: "Platinum",
    xp: "3000+ XP",
    color: "from-indigo-400 to-purple-600",
    badge: "bg-indigo-500",
    features: [
      "Premium Swag Box",
      "Paid Internship Opportunity",
      "Recommendation Letter",
      "Ambassador of the Year",
    ],
    button: "Reach the Top",
  },
];

export function AmbassadorRewards() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-5 md:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-[32px] sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-4 lg:mb-6 leading-tight">
            Rewards & <span className="text-blue-600">Recognition</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Climb the ladder. Earn XP points by completing tasks and hosting events. Unlock
            exclusive rewards at every tier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`relative bg-white rounded-3xl p-6 md:p-8 border ${tier.popular ? "border-blue-500 shadow-2xl shadow-blue-500/10" : "border-gray-200 shadow-lg"} hover:scale-105 transition-transform duration-300 flex flex-col`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                  Most Achieved
                </div>
              )}

              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-14 h-14 rounded-full bg-gradient-to-br ${tier.color} shadow-inner flex items-center justify-center`}
                >
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
                  <p className="text-sm font-semibold text-gray-500">{tier.xp}</p>
                </div>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {tier.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="mt-1 bg-blue-100 rounded-full p-0.5">
                      <Check className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-600 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/community/ambassadors/apply"
                className={`w-full py-3 rounded-xl font-bold transition-colors text-center inline-block ${tier.popular ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-900"}`}
              >
                {tier.button}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

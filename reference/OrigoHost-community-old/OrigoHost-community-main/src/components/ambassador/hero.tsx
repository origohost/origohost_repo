import { m as motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Download, Play, Calendar, Users, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AmbassadorHero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-[#0A0F1C] text-white pt-28 pb-12 lg:pt-32 lg:pb-20">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-cyan-500/20 blur-[150px]" />

      <div className="container mx-auto px-5 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 space-y-6 lg:space-y-8 w-full text-left"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
            </span>
            Campus Ambassador Program 2026
          </div>

          <h1 className="text-[38px] sm:text-[46px] lg:text-7xl font-black leading-[1.15] lg:leading-[1.1] tracking-tight">
            Become an{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              OrigoHOST
            </span>
            <br />
            Campus Ambassador
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-2xl font-medium">
            Lead your campus. Build your personal brand. Host massive events. Earn premium
            certificates. Unlock fast-tracked internships.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-4 w-full">
            <Button
              asChild
              size="lg"
              className="rounded-xl lg:rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 h-[52px] lg:h-14 text-lg shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] transition-all hover:scale-105 w-full sm:w-auto"
            >
              <Link to="/community/ambassadors/apply">Apply Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-xl lg:rounded-full border-gray-700 bg-gray-800/50 hover:bg-gray-800 text-white px-6 h-[52px] lg:h-14 backdrop-blur transition-all w-full sm:w-auto"
            >
              <a href="#brochure">
                <Download className="mr-2 h-5 w-5" /> Brochure
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="rounded-xl lg:rounded-full hover:bg-white/5 text-gray-300 px-6 h-[52px] lg:h-14 transition-all w-full sm:w-auto"
            >
              <a href="#video">
                <Play className="mr-2 h-5 w-5" /> Watch Video
              </a>
            </Button>
          </div>

          {/* Metrics */}
          <div className="flex overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-4 gap-6 pt-10 lg:pt-12 border-t border-gray-800/50 pb-4 lg:pb-0 scrollbar-hide -mx-5 px-5 lg:mx-0 lg:px-0">
            <Metric icon={Clock} label="Duration" value="6 Months" />
            <Metric icon={Calendar} label="Deadline" value="Nov 30" />
            <Metric icon={Users} label="Selected" value="500+" />
            <Metric icon={MapPin} label="Mode" value="Hybrid" />
          </div>
        </motion.div>

        {/* Right Content - 3D Composition Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex-1 relative w-full h-[400px] sm:h-[450px] lg:h-[600px] mt-8 lg:mt-0 block"
        >
          {/* We use highly curated unsplash images representing swags, composited with Framer Motion floating effects */}
          <FloatingImage
            src="https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=600&auto=format&fit=crop"
            alt="Premium Hoodie"
            className="absolute top-[5%] lg:top-[10%] left-[10%] lg:left-[20%] w-40 h-40 sm:w-48 sm:h-48 lg:w-64 lg:h-64 object-cover rounded-2xl lg:rounded-3xl shadow-2xl shadow-blue-900/20 border border-white/10"
            delay={0}
            yOffset={20}
          />
          <FloatingImage
            src="https://images.unsplash.com/photo-1621570277341-4fea9203f5e0?q=80&w=400&auto=format&fit=crop"
            alt="Backpack"
            className="absolute top-[35%] lg:top-[40%] right-[5%] lg:right-[10%] w-36 h-36 sm:w-44 sm:h-44 lg:w-56 lg:h-56 object-cover rounded-2xl lg:rounded-3xl shadow-2xl shadow-cyan-900/20 border border-white/10"
            delay={1}
            yOffset={15}
          />
          <FloatingImage
            src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=400&auto=format&fit=crop"
            alt="Bottle"
            className="absolute bottom-[5%] lg:bottom-[10%] left-[25%] lg:left-[30%] w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-cover rounded-2xl lg:rounded-3xl shadow-2xl shadow-blue-900/20 border border-white/10 z-20"
            delay={2}
            yOffset={25}
          />
          {/* Glow Behind Images */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/20 blur-[100px] rounded-full z-0" />
        </motion.div>
      </div>
    </section>
  );
}

function Metric({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 min-w-[140px] lg:min-w-0 snap-start">
      <div className="flex items-center gap-2 text-gray-400 mb-1">
        <Icon className="h-4 w-4" />
        <span className="text-sm font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <span className="text-xl font-bold text-white">{value}</span>
    </div>
  );
}

function FloatingImage({
  src,
  alt,
  className,
  delay,
  yOffset,
}: {
  src: string;
  alt: string;
  className: string;
  delay: number;
  yOffset: number;
}) {
  return (
    <motion.img
      loading="lazy"
      decoding="async"
      src={src}
      alt={alt}
      className={className}
      animate={{
        y: [0, -yOffset, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay,
      }}
    />
  );
}

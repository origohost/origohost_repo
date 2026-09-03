import { m as motion } from "framer-motion";

const SWAGS = [
  { name: "Premium Hoodie", image: "/swags/hoodie.png" },
  { name: "Classic T-Shirt", image: "/swags/tshirt.png" },
  { name: "Tech Backpack", image: "/swags/backpack.png" },
  { name: "Insulated Flask", image: "/swags/flask.png" },
  { name: "Coffee Mug", image: "/swags/mug.png" },
  { name: "Sticker Pack", image: "/swags/stickers.png" },
  { name: "ID Card & Lanyard", image: "/swags/idcard.png" },
  { name: "Notebook & Pen", image: "/swags/notebook.png" },
];

export function AmbassadorSwags() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gray-50 text-gray-900 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-5 md:px-8 lg:px-12 mb-10 md:mb-16 relative z-10">
        <h2 className="text-[32px] sm:text-4xl md:text-5xl font-black tracking-tight mb-3 md:mb-4 leading-tight">
          Premium Swags & Goodies
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600">
          High-quality, exclusive merchandise reserved solely for our amazing ambassadors.
        </p>
      </div>

      {/* Infinite Horizontal Carousel */}
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex gap-6 px-3">
          {[...SWAGS, ...SWAGS].map((swag, i) => (
            <motion.div
              key={i}
              className="relative w-64 h-80 md:w-72 md:h-96 flex-shrink-0 rounded-[2rem] overflow-hidden bg-gray-900 border border-white/10 group/card cursor-pointer"
            >
              {/* Product Background Image (The image itself has the logo embedded natively now!) */}
              <img
                loading="lazy"
                decoding="async"
                src={swag.image}
                alt={swag.name}
                className="w-full h-full object-cover opacity-80 group-hover/card:opacity-100 transition-opacity duration-500"
              />

              {/* Gradient Bottom Fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#040814] via-[#040814]/40 to-transparent opacity-90" />

              {/* Text Label */}
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl font-bold text-white tracking-wide">{swag.name}</h3>
                <div className="mt-2 w-8 h-1 bg-blue-500 rounded-full transition-all duration-300 group-hover/card:w-16 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

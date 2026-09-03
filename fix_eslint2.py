import re

with open("src/frontend/pages/about.tsx", "r") as f:
    about_code = f.read()

value_comp = """const ValueItem = ({ v, i }: { v: any, i: number }) => {
  const a = ACCENT[v.accent as keyof typeof ACCENT ?? "orange"];
  const [isOpen, setIsOpen] = useState(i === 0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: i * 0.04 }}
      className="rounded-3xl border border-[var(--brand-ink)]/5 bg-white p-6 lg:p-8 shadow-[var(--shadow-soft)]"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left lg:cursor-default lg:hidden"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          <div className={`grid h-12 w-12 place-items-center rounded-2xl ${a.bg}`}>
            <v.icon className={`h-5 w-5 ${a.fg}`} />
          </div>
          <h3 className="text-xl font-black">{v.title}</h3>
        </div>
        <ChevronDown
          className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <div className="hidden lg:flex items-center gap-4">
        <div className={`grid h-14 w-14 place-items-center rounded-2xl ${a.bg}`}>
          <v.icon className={`h-6 w-6 ${a.fg}`} />
        </div>
        <h3 className="text-2xl font-black">{v.title}</h3>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 lg:!max-h-[500px] lg:!opacity-100 ${isOpen ? "max-h-[500px] opacity-100 mt-6 lg:mt-6" : "max-h-0 opacity-0 mt-0 lg:mt-6"}`}
      >
        <p className="text-sm leading-relaxed text-[var(--brand-ink)]/70">{v.body}</p>
      </div>
    </motion.div>
  );
};
"""

about_code = about_code.replace('export default function AboutPage() {', value_comp + '\nexport default function AboutPage() {')

about_code = re.sub(
    r'\{about\.values\.map\(\(v, i\) => \{\s*const a = ACCENT\[v\.accent \?\? "orange"\];\s*const \[isOpen, setIsOpen\] = useState\(i === 0\);\s*return \(\s*<motion\.div.*?</motion\.div>\s*\);\s*\}\)\}',
    r'{about.values.map((v, i) => <ValueItem key={v.title} v={v} i={i} />)}',
    about_code,
    flags=re.DOTALL
)

with open("src/frontend/pages/about.tsx", "w") as f:
    f.write(about_code)

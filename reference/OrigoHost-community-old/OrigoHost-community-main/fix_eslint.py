import re

with open("src/frontend/pages/about.tsx", "r") as f:
    about_code = f.read()

# Replace Purpose mapping
purpose_comp = """const PurposeItem = ({ p, idx }: { p: any, idx: number }) => {
  const a = ACCENT[p.accent as keyof typeof ACCENT];
  const [isOpen, setIsOpen] = useState(idx === 0);
  return (
    <Tilt
      max={5}
      className="h-full rounded-3xl border border-[var(--brand-ink)]/5 bg-white p-6 lg:p-8 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elevated)]"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left lg:cursor-default lg:hidden"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          <div className={`grid h-12 w-12 place-items-center rounded-2xl ${a.bg}`}>
            <p.icon className={`h-5 w-5 ${a.fg}`} />
          </div>
          <h3 className="text-xl font-black">{p.title}</h3>
        </div>
        <ChevronDown
          className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <div className="hidden lg:flex items-center gap-4">
        <div className={`grid h-14 w-14 place-items-center rounded-2xl ${a.bg}`}>
          <p.icon className={`h-6 w-6 ${a.fg}`} />
        </div>
        <h3 className="text-2xl font-black">{p.title}</h3>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 lg:!max-h-[500px] lg:!opacity-100 ${isOpen ? "max-h-[500px] opacity-100 mt-6 lg:mt-6" : "max-h-0 opacity-0 mt-0 lg:mt-6"}`}
      >
        <p className="text-sm leading-relaxed text-[var(--brand-ink)]/70">{p.body}</p>
        <div className="mt-8 grid grid-cols-2 gap-6 border-t border-[var(--brand-ink)]/5 pt-6">
          {p.stats.map((s: any, i: number) => (
            <div key={s.label}>
              <div className="text-3xl font-black tracking-tight">{s.value}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-[var(--brand-ink)]/50">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Tilt>
  );
};
"""

about_code = about_code.replace('export default function AboutPage() {', purpose_comp + '\nexport default function AboutPage() {')

# The regex replacement for mapping:
about_code = re.sub(
    r'\.map\(\(p, idx\) => \{\s*const a = ACCENT\[p\.accent\];\s*const \[isOpen, setIsOpen\] = useState\(idx === 0\);\s*return \(\s*<Tilt.*?</Tilt>\s*\);\s*\}\)',
    r'.map((p, idx) => <PurposeItem key={p.title} p={p} idx={idx} />)',
    about_code,
    flags=re.DOTALL
)

with open("src/frontend/pages/about.tsx", "w") as f:
    f.write(about_code)

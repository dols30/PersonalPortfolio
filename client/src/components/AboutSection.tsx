import { Stat } from "@/types";

interface AboutSectionProps {
  stats: Stat[];
}

const AboutSection = ({ stats }: AboutSectionProps) => {
  return (
    <section
      id="about"
      className="relative py-12 sm:py-16 md:py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[60%] bg-cyan-500/5 blur-[120px]" />

      <div className="relative container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs tracking-widest uppercase text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            About Me
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white px-4">
            Architecting polished, reliable digital experiences
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4">

          {/* Photo + Name Card — spans 2 cols, 2 rows on desktop */}
          <div className="lg:col-span-2 lg:row-span-2 group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden hover:border-cyan-400/20 transition-all duration-500">
            <div className="absolute inset-0">
              <img
                src="/assets/dolrajPP2.jpg"
                alt="Dolraj Bashyal portrait"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'data:image/svg+xml;utf8,<svg viewBox="0 0 16 9" xmlns="http://www.w3.org/2000/svg"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="1">About</text></svg>';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            </div>
            <div className="relative h-full flex flex-col justify-end p-5 sm:p-8 min-h-[320px] lg:min-h-0">
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-400 mb-2">Dol Raj Bashyal</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Computer Science Student & Developer
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                I specialize in building elegant, efficient, and user-friendly applications — from cross-platform mobile apps to full-stack web platforms and security research.
              </p>
            </div>
          </div>

          {/* Education Card */}
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 sm:p-6 hover:border-cyan-400/20 transition-all duration-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c0 2 1 3 3 3h6c2 0 3-1 3-3v-5" />
                </svg>
              </div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Education</p>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">The University of Southern Mississippi</h3>
            <p className="text-sm text-slate-300 mb-3">BS Computer Science &middot; Mathematics & Economic Data Analysis Minor</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-xs rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">4.0 GPA</span>
              <span className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-slate-300">President's List</span>
              <span className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-slate-300">Expected May 2027</span>
              <span className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-slate-300">Full Tuition Scholarship</span>
            </div>
          </div>

          {/* Experience Card */}
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 sm:p-6 hover:border-cyan-400/20 transition-all duration-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Experience</p>
            </div>
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">Database Developer Intern</h3>
              <span className="text-xs text-slate-500 hidden sm:block">Feb 2026 – May 2026</span>
            </div>
            <p className="text-sm text-cyan-400/80 mb-3">Optimal Answers LLC &middot; Hattiesburg, MS</p>
            <ul className="space-y-1.5 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5 shrink-0">▹</span>
                Working on Smartphone presentation for Optimal Grocery Shopping within the decision-optimization platform
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5 shrink-0">▹</span>
                Hands-on with databases, APIs, Azure cloud hosting, and optimization models
              </li>
            </ul>
          </div>

          {/* Stats Row — 3 stat cards spanning the left 2 cols */}
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-5 sm:py-6 text-center hover:border-cyan-400/20 transition-all duration-500 group"
            >
              <span className="text-3xl sm:text-4xl font-bold text-white block mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                {stat.value}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-500">
                {stat.label}
              </span>
            </div>
          ))}

          {/* Currently Working On */}
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 sm:p-6 hover:border-cyan-400/20 transition-all duration-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Currently</p>
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5 shrink-0">▹</span>
                Reimagining learning apps with AI-powered tooling
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5 shrink-0">▹</span>
                Leading UI motion studies and accessibility sweeps
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5 shrink-0">▹</span>
                Building full-stack apps with databases, APIs, and cloud platforms
              </li>
            </ul>
          </div>

          {/* Focus Areas */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 sm:p-6 hover:border-cyan-400/20 transition-all duration-500">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-4">Focus</p>
            <div className="flex flex-wrap gap-2">
              {["Human UI systems", "AI-native apps", "Performance budgets", "Cross-platform", "Security research"].map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 text-xs rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/20 transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;

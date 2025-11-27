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
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[60%] bg-blue-500/5 blur-[120px]" />
      <div className="relative container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs tracking-widest uppercase text-blue-300">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            About Me
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white px-4">
            Architecting polished, reliable digital experiences
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Left Column: Image + Info Cards */}
          <div className="relative space-y-4 sm:space-y-6">
            <div className="relative flex justify-center">
              <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-3xl opacity-70 -z-10" />
              <div className="overflow-hidden rounded-full border border-white/10 shadow-2xl w-[240px] h-[240px] sm:w-[280px] sm:h-[280px]">
                <img 
                  src="/assets/dolrajPP2.jpg" 
                  alt="Dolraj Bashyal portrait" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'data:image/svg+xml;utf8,<svg viewBox="0 0 16 9" xmlns="http://www.w3.org/2000/svg"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="1">About Image</text></svg>';
                  }}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4 space-y-2 sm:space-y-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-2">Currently</p>
                  <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-200">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">▹</span>
                      Reimagining learning apps with AI-powered tooling
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">▹</span>
                      Leading UI motion studies and accessibility sweeps
                    </li>
                  </ul>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4 space-y-2 sm:space-y-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-2">Focus</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 text-xs text-white/90">
                    {["Human UI systems", "AI-native apps", "Performance budgets"].map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/40 to-purple-500/40 border border-white/10"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Snapshot + Stats */}
          <div className="space-y-4 sm:space-y-6">
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl p-4 sm:p-6">
              <p className="text-xs uppercase tracking-[0.4em] text-blue-300 mb-2 sm:mb-3">
                Snapshot
              </p>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                BSc Computer Science @ The University of Southern Mississippi · Minor in Mathematics, Econ & Data Analysis · Previously shipped
                REST APIs, real-time dashboards, and cross-platform apps for startups, research teams, and solo founders.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-3 sm:py-5 text-center"
                >
                  <span className="text-2xl sm:text-3xl font-semibold text-white block mb-1">
                    {stat.value}
                  </span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-400">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

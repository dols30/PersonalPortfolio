import { Stat } from "@/types";

interface AboutSectionProps {
  stats: Stat[];
}

const AboutSection = ({ stats }: AboutSectionProps) => {
  return (
    <section id="about" className="py-20 bg-slate-100 dark:bg-transparent transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium mb-3">
            About Me
          </span>
          <h2 className="text-3xl md:text-4xl font-bold section-title">Who I Am</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* About Image */}
          <div className="flex justify-center section-content">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary-500/20 dark:bg-gray-700/10 rounded-full blur-xl opacity-70 -z-10"></div>
              <div className="overflow-hidden rounded-full shadow-xl max-w-sm">
                <img 
                  src="/assets/dolrajPP2.jpg" 
                  alt="Dol Raj Bashyal About" 
                  className="w-full h-full object-cover"
                  style={{ maxHeight: "320px", width: "320px" }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'data:image/svg+xml;utf8,<svg viewBox="0 0 16 9" xmlns="http://www.w3.org/2000/svg"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="1">About Image</text></svg>';
                  }}
                />
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className="space-y-6 section-content">
            <h3 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              Computer Science Student with a Passion for Development
            </h3>
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <p>
                I'm a Computer Science student at The University of Southern Mississippi with a minor in Mathematics. My academic focus is on problem-solving, algorithms, and efficient software development.
              </p>
              <p>
                My technical interests include multi-platform application development, data structures, and game design. I enjoy creating software that works seamlessly across different devices while solving practical challenges.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-white dark:bg-black/60 rounded-lg shadow-md">
                  <span className="block text-3xl font-bold text-primary-600 dark:text-primary-400">
                    {stat.value}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
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

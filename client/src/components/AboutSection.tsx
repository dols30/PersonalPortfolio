import { Stat } from "@/types";

interface AboutSectionProps {
  stats: Stat[];
}

const AboutSection = ({ stats }: AboutSectionProps) => {
  return (
    <section id="about" className="py-20 bg-slate-100 dark:bg-slate-800/50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium mb-3">
            About Me
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">Who I Am</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* About Image */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary-500/20 dark:bg-primary-500/10 rounded-xl blur-xl opacity-70 -z-10"></div>
              <div className="overflow-hidden rounded-xl shadow-xl max-w-md">
                <svg viewBox="0 0 16 9" className="w-full aspect-video bg-primary-200/50 dark:bg-primary-900/30">
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="1" fill="currentColor">About Image</text>
                </svg>
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              Computer Science Student with a Passion for Development
            </h3>
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <p>
                I'm a Computer Science student at The University of Southern Mississippi, maintaining a perfect 4.0 GPA while pursuing a minor in Mathematics. My academic journey is fueled by a genuine passion for problem-solving and creating efficient software solutions.
              </p>
              <p>
                As an active member of the Google Developer Student Club at USM, I've enhanced my web development skills and gained valuable experience working in collaborative environments. I'm currently expanding my knowledge in cross-platform development, data structures, and game development.
              </p>
              <p>
                I'm dedicated to continuous learning and strive to apply my technical knowledge to create meaningful projects that solve real-world problems.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md">
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

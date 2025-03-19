import { SocialLink } from "@/types";

interface HeroSectionProps {
  socialLinks: SocialLink[];
}

const HeroSection = ({ socialLinks }: HeroSectionProps) => {
  return (
    <section id="profile" className="min-h-screen py-20 flex items-center transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="w-full md:w-3/5 space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Hi, I'm <span className="text-primary-600 dark:text-primary-400">Dol Raj Bashyal</span>
            </h1>
            <p className="text-xl md:text-2xl font-medium text-slate-600 dark:text-slate-400">
              Computer Science Student & Developer
            </p>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              I'm a dedicated CS student at The University of Southern Mississippi with a passion for software
              development, data structures, and creating innovative solutions.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => window.open('./assets/DolRaj_Bashyal_Resume.pdf')}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <i className="fas fa-download"></i> Download Resume
              </button>
              <button 
                onClick={() => location.href='#contact'}
                className="px-6 py-3 bg-transparent border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 hover:bg-primary-600/10 font-medium rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                <i className="fas fa-envelope"></i> Contact Info
              </button>
            </div>

            <div className="flex gap-6 pt-6">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 transition-colors"
                >
                  <i className={`${link.icon} fa-2x`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Profile Image */}
          <div className="w-full md:w-2/5 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-500/20 dark:bg-primary-500/10 rounded-full blur-3xl opacity-70"></div>
              <div className="relative w-48 h-48 md:w-72 md:h-72 overflow-hidden rounded-full border-4 border-white dark:border-slate-700 shadow-xl">
                <svg viewBox="0 0 100 100" className="w-full h-full object-cover bg-primary-100 dark:bg-primary-900/30">
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="15" fill="currentColor">Profile Image</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

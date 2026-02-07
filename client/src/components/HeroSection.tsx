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
          <div className="w-full md:w-3/5 space-y-6 section-content">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight opacity-0 animate-on-scroll animate-stagger-1">
              Hi, I'm <span className="text-cyan-500 dark:text-cyan-400">Dolraj Bashyal</span>
            </h1>
            <p className="text-xl md:text-2xl font-medium text-slate-600 dark:text-slate-400 opacity-0 animate-on-scroll animate-stagger-2">
              Computer Science Student & Developer
            </p>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl opacity-0 animate-on-scroll animate-stagger-3">
              I specialize in software development with a focus on creating elegant, 
              efficient, and user-friendly applications that address real-world challenges.
            </p>

            <div className="flex flex-wrap gap-4 pt-4 opacity-0 animate-on-scroll animate-stagger-4">
              <button 
                onClick={() => window.open('./assets/DolRaj_Bashyal_Resume.pdf')}
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span>Download Resume</span>
              </button>
              <button 
                onClick={() => location.href='#contact'}
                className="px-6 py-3 bg-transparent border-2 border-cyan-600 dark:border-cyan-400 text-cyan-500 dark:text-cyan-400 hover:bg-cyan-600/10 font-medium rounded-full transition-all duration-300 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                Contact Info
              </button>
            </div>

            <div className="flex gap-6 pt-6 opacity-0 animate-on-scroll animate-stagger-5">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-cyan-500 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {link.iconName === 'github' && <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>}
                    {link.iconName === 'linkedin' && <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>}
                    {link.iconName === 'linkedin' && <rect x="2" y="9" width="4" height="12"></rect>}
                    {link.iconName === 'linkedin' && <circle cx="4" cy="4" r="2"></circle>}
                    {link.iconName === 'mail' && <rect x="2" y="4" width="20" height="16" rx="2"></rect>}
                    {link.iconName === 'mail' && <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Profile Image */}
          <div className="w-full md:w-2/5 flex justify-center section-content">
            <div className="relative scale-in">
              <div className="absolute inset-0 bg-cyan-500/20 dark:bg-cyan-500/10 rounded-full blur-3xl opacity-70"></div>
              <div className="relative w-48 h-48 md:w-72 md:h-72 overflow-hidden rounded-full border-4 border-white dark:border-slate-700 shadow-xl">
                <img 
                  src="/assets/dolrajjpg.jpeg" 
                  alt="Dol Raj Bashyal" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="15">Profile Image</text></svg>';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

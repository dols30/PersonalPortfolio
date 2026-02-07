import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { Skill } from "@/types";

const RotatingSkills = lazy(() => import("./RotatingSkills"));

interface SkillsSectionProps {
  skills: Skill[];
}

// New component to render star ratings
const SkillLevelStars = ({ level, isVisible }: { level: number, isVisible: boolean }) => {
  // Convert level (0-100) to stars (1-5)
  const totalStars = 5;
  const filledStars = Math.round((level / 100) * totalStars);
  
  return (
    <div className="flex gap-1">
      {[...Array(totalStars)].map((_, i) => (
        <svg 
          key={i} 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill={i < filledStars ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`
            ${i < filledStars 
              ? "text-cyan-500 dark:text-cyan-400" 
              : "text-slate-300 dark:text-slate-600"
            }
            ${isVisible ? "skill-star skill-star-animate skill-star-" + (i+1) : ""}
          `}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      ))}
    </div>
  );
};

const SkillIcon = ({ iconName }: { iconName: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500">
      {iconName === 'code' && <polyline points="16 18 22 12 16 6"></polyline>}
      {iconName === 'code' && <polyline points="8 6 2 12 8 18"></polyline>}
      {iconName === 'hash' && <line x1="4" y1="9" x2="20" y2="9"></line>}
      {iconName === 'hash' && <line x1="4" y1="15" x2="20" y2="15"></line>}
      {iconName === 'hash' && <line x1="10" y1="3" x2="8" y2="21"></line>}
      {iconName === 'hash' && <line x1="16" y1="3" x2="14" y2="21"></line>}
      {iconName === 'file-code' && <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>}
      {iconName === 'file-code' && <polyline points="14 2 14 8 20 8"></polyline>}
      {iconName === 'file-code' && <path d="m10 13-2 2 2 2"></path>}
      {iconName === 'file-code' && <path d="m14 17 2-2-2-2"></path>}
      {iconName === 'layout' && <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>}
      {iconName === 'layout' && <line x1="3" y1="9" x2="21" y2="9"></line>}
      {iconName === 'layout' && <line x1="9" y1="21" x2="9" y2="9"></line>}
      {iconName === 'gamepad-2' && <line x1="6" y1="12" x2="10" y2="12"></line>}
      {iconName === 'gamepad-2' && <line x1="8" y1="10" x2="8" y2="14"></line>}
      {iconName === 'gamepad-2' && <line x1="15" y1="13" x2="15.01" y2="13"></line>}
      {iconName === 'gamepad-2' && <line x1="18" y1="11" x2="18.01" y2="11"></line>}
      {iconName === 'gamepad-2' && <rect x="2" y="6" width="20" height="12" rx="2"></rect>}
      {iconName === 'git-branch' && <line x1="6" y1="3" x2="6" y2="15"></line>}
      {iconName === 'git-branch' && <circle cx="18" cy="6" r="3"></circle>}
      {iconName === 'git-branch' && <circle cx="6" cy="18" r="3"></circle>}
      {iconName === 'git-branch' && <path d="M18 9a9 9 0 0 1-9 9"></path>}
      {iconName === 'database' && <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>}
      {iconName === 'database' && <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>}
      {iconName === 'database' && <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>}
    </svg>
  );
};

const SkillsSection = ({ skills }: SkillsSectionProps) => {
  const skillsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showRotating, setShowRotating] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  // Split skills by category
  const programmingLanguages = skills.filter(skill => skill.category === 'language');
  const technologies = skills.filter(skill => skill.category === 'technology');

  return (
    <section id="skills" className="py-20 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium mb-3">
            My Skills
          </span>
          <h2 className="text-3xl md:text-4xl font-bold section-title">What I Know</h2>
          
          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={() => setShowRotating(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                showRotating 
                  ? 'bg-cyan-600 text-white' 
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              Visual View
            </button>
            <button
              onClick={() => setShowRotating(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !showRotating 
                  ? 'bg-cyan-600 text-white' 
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              Detailed View
            </button>
          </div>
        </div>

        {showRotating ? (
          <div className="mb-12 fade-in animate-stagger-1">
            <Suspense fallback={<div>Loading...</div>}>
              <RotatingSkills skills={skills} key={`skills-${Date.now()}`} />
            </Suspense>
          </div>
        ) : (
          <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Programming Languages Skills */}
            <div className="bg-white dark:bg-black/40 dark:backdrop-blur-sm rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl section-content slide-in-right animate-stagger-1">
              <h3 className="text-xl font-bold mb-6 border-b pb-2 border-slate-200 dark:border-slate-700">
                Programming Languages
              </h3>

              <div className="space-y-6">
                {programmingLanguages.map((skill, index) => (
                  <div 
                    key={index}
                    className={`
                      skill-item animate-on-scroll animate-stagger-${index + 1} 
                      p-3 rounded-lg border border-transparent
                      hover:bg-cyan-50/50 dark:hover:bg-cyan-900/10 
                      hover:border-cyan-100 dark:hover:border-cyan-800/40
                      transition-all duration-300 ease-in-out
                      transform hover:-translate-y-1 hover:shadow-md
                    `}
                  >
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium flex items-center gap-2 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                        <SkillIcon iconName={skill.iconName} /> {skill.name}
                      </h4>
                      <span className="text-sm text-slate-500 dark:text-slate-400 min-w-[90px] text-right">
                        {skill.proficiency}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <SkillLevelStars level={skill.level} isVisible={isVisible} />
                        <span className={`text-xs text-slate-400 dark:text-slate-500 ml-2 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.6s' }}>
                          {skill.level}%
                        </span>
                      </div>
                      
                      {/* Skill Experience Badges */}
                      <div className="flex items-center gap-2">
                        {skill.level >= 75 && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400 skill-badge">
                            Expert
                          </span>
                        )}
                        {skill.level >= 50 && skill.level < 75 && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400 skill-badge">
                            Proficient
                          </span>
                        )}
                        {skill.level < 50 && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 skill-badge">
                            Learning
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies & Frameworks Skills */}
            <div className="bg-white dark:bg-black/40 dark:backdrop-blur-sm rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl section-content slide-in-right animate-stagger-2">
              <h3 className="text-xl font-bold mb-6 border-b pb-2 border-slate-200 dark:border-slate-700">
                Technologies & Frameworks
              </h3>

              <div className="space-y-6">
                {technologies.map((skill, index) => (
                  <div 
                    key={index}
                    className={`
                      skill-item animate-on-scroll animate-stagger-${index + 1} 
                      p-3 rounded-lg border border-transparent
                      hover:bg-cyan-50/50 dark:hover:bg-cyan-900/10 
                      hover:border-cyan-100 dark:hover:border-cyan-800/40
                      transition-all duration-300 ease-in-out
                      transform hover:-translate-y-1 hover:shadow-md
                    `}
                  >
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium flex items-center gap-2 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                        <SkillIcon iconName={skill.iconName} /> {skill.name}
                      </h4>
                      <span className="text-sm text-slate-500 dark:text-slate-400 min-w-[90px] text-right">
                        {skill.proficiency}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <SkillLevelStars level={skill.level} isVisible={isVisible} />
                        <span className={`text-xs text-slate-400 dark:text-slate-500 ml-2 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.6s' }}>
                          {skill.level}%
                        </span>
                      </div>
                      
                      {/* Skill Experience Badges */}
                      <div className="flex items-center gap-2">
                        {skill.level >= 75 && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400 skill-badge">
                            Expert
                          </span>
                        )}
                        {skill.level >= 50 && skill.level < 75 && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400 skill-badge">
                            Proficient
                          </span>
                        )}
                        {skill.level < 50 && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 skill-badge">
                            Learning
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;

import { useEffect, useRef } from "react";
import { Skill } from "@/types";

interface SkillsSectionProps {
  skills: Skill[];
}

const SkillsSection = ({ skills }: SkillsSectionProps) => {
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach((bar) => {
              const width = bar.getAttribute('data-width');
              if (width) {
                (bar as HTMLElement).style.width = width;
              }
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
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
          <h2 className="text-3xl md:text-4xl font-bold">What I Know</h2>
        </div>

        <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Programming Languages Skills */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-bold mb-6 border-b pb-2 border-slate-200 dark:border-slate-700">
              Programming Languages
            </h3>

            <div className="space-y-8">
              {programmingLanguages.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium flex items-center gap-2">
                      <i className={`${skill.icon} text-primary-500`}></i> {skill.name}
                    </h4>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {skill.proficiency}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="skill-progress bg-primary-600 dark:bg-primary-500 h-full rounded-full" 
                      style={{ width: "0%" }}
                      data-width={`${skill.level}%`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies & Frameworks Skills */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-bold mb-6 border-b pb-2 border-slate-200 dark:border-slate-700">
              Technologies & Frameworks
            </h3>

            <div className="space-y-8">
              {technologies.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium flex items-center gap-2">
                      <i className={`${skill.icon} text-primary-500`}></i> {skill.name}
                    </h4>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {skill.proficiency}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="skill-progress bg-primary-600 dark:bg-primary-500 h-full rounded-full" 
                      style={{ width: "0%" }}
                      data-width={`${skill.level}%`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

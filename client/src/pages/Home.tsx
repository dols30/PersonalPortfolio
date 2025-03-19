import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Skill, Project, SocialLink, ContactInfo, Stat } from "@/types";

const Home = () => {
  const [activeSection, setActiveSection] = useState("profile");
  
  const socialLinks: SocialLink[] = [
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/drb30", icon: "fab fa-linkedin" },
    { platform: "GitHub", url: "https://github.com/dols30", icon: "fab fa-github" },
    { platform: "Email", url: "mailto:bashyal.dolraj30@gmail.com", icon: "fas fa-envelope" }
  ];
  
  const stats: Stat[] = [
    { value: "4.0", label: "GPA" },
    { value: "3+", label: "Projects" },
    { value: "2027", label: "Graduation" }
  ];
  
  const skills: Skill[] = [
    { 
      name: "C++", 
      level: 90, 
      icon: "fab fa-cuttlefish", 
      category: "language", 
      proficiency: "Advanced" 
    },
    { 
      name: "C#", 
      level: 85, 
      icon: "fab fa-cuttlefish", 
      category: "language", 
      proficiency: "Advanced" 
    },
    { 
      name: "HTML/CSS", 
      level: 80, 
      icon: "fab fa-html5", 
      category: "language", 
      proficiency: "Intermediate" 
    },
    { 
      name: "JavaScript", 
      level: 75, 
      icon: "fab fa-js", 
      category: "language", 
      proficiency: "Intermediate" 
    },
    { 
      name: ".NET MAUI", 
      level: 85, 
      icon: "fab fa-microsoft", 
      category: "technology", 
      proficiency: "Advanced" 
    },
    { 
      name: "Unity Engine", 
      level: 70, 
      icon: "fas fa-gamepad", 
      category: "technology", 
      proficiency: "Intermediate" 
    },
    { 
      name: "Git", 
      level: 80, 
      icon: "fab fa-git-alt", 
      category: "technology", 
      proficiency: "Intermediate" 
    },
    { 
      name: "Data Structures", 
      level: 90, 
      icon: "fas fa-database", 
      category: "technology", 
      proficiency: "Advanced" 
    }
  ];
  
  const projects: Project[] = [
    {
      id: 1,
      title: "Spam Word Detection System",
      description: "A spam detection system using Trie data structure to efficiently store and search for spam words in email content.",
      image: "https://dummyimage.com/600x400/4A90E2/ffffff&text=Spam+Detection",
      githubLink: "https://github.com/dols30",
      technologies: ["C++", "Qt Framework", "Git", "Data Structures"]
    },
    {
      id: 2,
      title: "Theater Seating Management",
      description: "An application for managing theater seating arrangements, ticket booking, and occupancy tracking for movie theaters.",
      image: "https://dummyimage.com/600x400/4A90E2/ffffff&text=Theater+System",
      githubLink: "https://github.com/dols30",
      technologies: ["C#", ".NET MAUI", "UI Design", "Algorithms"]
    },
    {
      id: 3,
      title: "2D Platformer Game",
      description: "A 2D platformer game developed using Unity engine with custom character animations and level design.",
      image: "https://dummyimage.com/600x400/4A90E2/ffffff&text=Game+Project",
      githubLink: "https://github.com/dols30",
      technologies: ["C#", "Unity", "Game Dev", "Level Design"]
    }
  ];
  
  const contactInfo: ContactInfo = {
    email: "bashyal.dolraj30@gmail.com",
    location: "Hattiesburg, MS, United States",
    university: "The University of Southern Mississippi"
  };
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute('id') || '';
        }
      });
      
      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <Navbar activeSection={activeSection} />
      <HeroSection socialLinks={socialLinks} />
      <AboutSection stats={stats} />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <ContactSection contactInfo={contactInfo} socialLinks={socialLinks} />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Home;

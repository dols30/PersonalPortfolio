import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import ShineEffect from "@/components/ShineEffect";
import WaveAnimation from "@/components/WaveAnimation";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Skill, Project, SocialLink, ContactInfo, Stat } from "@/types";
import React from "react";

const Home: React.FC = () => {
  const [activeSection, setActiveSection] = useState("profile");
  useScrollAnimation();
  
  const socialLinks: SocialLink[] = [
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/drb30", iconName: "linkedin" },
    { platform: "GitHub", url: "https://github.com/dols30", iconName: "github" },
    { platform: "Email", url: "mailto:bashyal.dolraj30@gmail.com", iconName: "mail" }
  ];
  
  const stats: Stat[] = [
    { value: "4.0", label: "GPA" },
    { value: "5+", label: "Projects" },
    { value: "2027", label: "Graduation" }
  ];
  
  const skills: Skill[] = [
    { 
      name: "C++", 
      level: 65, 
      iconName: "code", 
      category: "language", 
      proficiency: "Intermediate" 
    },
    { 
      name: "C#", 
      level: 65, 
      iconName: "hash", 
      category: "language", 
      proficiency: "Intermediate" 
    },
    { 
      name: "Python", 
      level: 70, 
      iconName: "code", 
      category: "language", 
      proficiency: "Intermediate" 
    },
    { 
      name: "HTML/CSS", 
      level: 80, 
      iconName: "code", 
      category: "language", 
      proficiency: "Intermediate" 
    },
    { 
      name: "JavaScript", 
      level: 75, 
      iconName: "file-code", 
      category: "language", 
      proficiency: "Intermediate" 
    },
    { 
      name: ".NET MAUI", 
      level: 65, 
      iconName: "layout", 
      category: "technology", 
      proficiency: "Intermediate" 
    },
    { 
      name: "Qt Framework", 
      level: 60, 
      iconName: "layout", 
      category: "technology", 
      proficiency: "Intermediate" 
    },
    { 
      name: "Unity Engine", 
      level: 40, 
      iconName: "gamepad-2", 
      category: "technology", 
      proficiency: "Beginner" 
    },
    { 
      name: "Git", 
      level: 80, 
      iconName: "git-branch", 
      category: "technology", 
      proficiency: "Intermediate" 
    },
    { 
      name: "Data Structures", 
      level: 65, 
      iconName: "database", 
      category: "technology", 
      proficiency: "Intermediate" 
    }
  ];
  
  const projects: Project[] = [
    {
      id: 5,
      title: "WebtiCode - Learning Platform",
      description: "A responsive web development learning platform with course management, user dashboard, interactive UI, and content management system.",
      image: "/images/webticode-image.jpg",
      githubLink: "https://github.com/dols30/WebtiCode",
      liveLink: "https://webticode.vercel.app",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Shadcn UI"]
    },
    {
      id: 1,
      title: "Spam Word Detection System",
      description: "A spam detection system using Trie data structure to efficiently store and search for spam words in email content.",
      image: "https://img.freepik.com/free-vector/spam-concept-illustration_114360-7128.jpg?w=826&t=st=1711329720~exp=1711330320~hmac=aef8c7f97af2d069e3c50b03d007a9a9cb8ecd599c5b0eb81fcdb63e2e83a1fe",
      githubLink: "https://github.com/dols30",
      liveLink: "https://example.com/spam-detection",
      technologies: ["C++", "Qt Framework", "Git", "Data Structures"]
    },
    {
      id: 2,
      title: "Theater Seating Management",
      description: "An application for managing theater seating arrangements, ticket booking, and occupancy tracking for movie theaters.",
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      githubLink: "https://github.com/dols30",
      liveLink: "https://example.com/theater-seating",
      technologies: ["C#", ".NET MAUI", "UI Design", "Algorithms"]
    },
    {
      id: 3,
      title: "2D Platformer Game",
      description: "A 2D platformer game developed using Unity engine with custom character animations and level design.",
      image: "https://img.freepik.com/free-vector/game-asset-cartoon-gui-elements-mobile-app_107791-8757.jpg?size=626&ext=jpg&ga=GA1.1.632798143.1711329600&semt=ais",
      githubLink: "https://github.com/dols30",
      liveLink: "https://example.com/platformer-game",
      technologies: ["C#", "Unity", "Game Dev", "Level Design"]
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "A modern responsive portfolio website built with React, TypeScript, and Tailwind CSS featuring interactive components.",
      image: "https://img.freepik.com/free-vector/website-development-banner_33099-1687.jpg?w=1380&t=st=1711329864~exp=1711330464~hmac=5cdd057d72d15c9fa07af0c45a40e12d54389cefa17cf83a2247e0cc35eaef18",
      githubLink: "https://github.com/dols30/PersonalPortfolio",
      liveLink: "https://dols30.vercel.app",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"]
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
    <div className="min-h-screen bg-slate-50 dark:gradient-bg text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <WaveAnimation />
      <BackgroundAnimation />
      <ShineEffect />
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

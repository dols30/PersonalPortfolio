import React, { useState, useEffect, useRef, useMemo, useCallback, lazy, Suspense } from 'react';

import { 
  Github, 
  Linkedin, 
  Mail, 
  Menu,
  X,
  Sparkles,
  Bot,
  Send,
  Loader2,
  Lightbulb,
  Download,
  Globe,
  Terminal,
  Cpu
} from 'lucide-react';

const RotatingSkills = lazy(() => import('@/components/RotatingSkills'));
const AboutSection = lazy(() => import('@/components/AboutSection'));
const ProjectsSection = lazy(() => import('@/components/ProjectsSection'));
const AnimatedBackground = lazy(() => import('@/components/AnimatedBackground'));
import { Skill, Project, Stat } from '@/types';

const Portfolio = () => {
  const currentYear = new Date().getFullYear();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const [chatHistory, setChatHistory] = useState([
    { role: 'model', text: "Hi! I'm Dol Raj's AI assistant. Ask me anything about his skills, experience, or projects!" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [generatedIdea, setGeneratedIdea] = useState<{
    title: string;
    tagline: string;
    features: string[];
  } | null>(null);
  const [isGeneratingIdea, setIsGeneratingIdea] = useState(false);

  const [skillsView, setSkillsView] = useState<'visual' | 'detailed'>('visual');

  const skills: Skill[] = useMemo(() => [
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
    },
    { 
      name: "MySQL", 
      level: 70, 
      iconName: "database", 
      category: "technology", 
      proficiency: "Intermediate" 
    },
    { 
      name: "React", 
      level: 75, 
      iconName: "code", 
      category: "technology", 
      proficiency: "Intermediate" 
    },
    { 
      name: "TypeScript", 
      level: 70, 
      iconName: "file-code", 
      category: "language", 
      proficiency: "Intermediate" 
    },
    { 
      name: "Node.js", 
      level: 70, 
      iconName: "server", 
      category: "technology", 
      proficiency: "Intermediate" 
    },
    { 
      name: "Tailwind", 
      level: 75, 
      iconName: "layout", 
      category: "technology", 
      proficiency: "Intermediate" 
    }
  ], []);

  const stats: Stat[] = useMemo(() => [
    { value: "10+", label: "Projects" },
    { value: "4.0", label: "CGPA" },
    { value: "3+", label: "Years of Experience" }
  ], []);

  const projects: Project[] = useMemo(() => [
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
      id: 7,
      title: "R.Paper-Parser",
      description: "A cross-platform application designed for extracting, summarizing, and analyzing research papers using Gemini API. Supports PDF and DOCX formats and works on Windows, macOS, iOS, and Android.",
      image: "/images/ReserachPaperParser.jpg",
      githubLink: "https://github.com/dols30/ResearchPaper-Parser",
      liveLink: "",
      technologies: [".NET MAUI", "C#", "SQLite", "Gemini API"]
    },
    {
      id: 8,
      title: "EaglesNest-RestaurantOrderingApp",
      description: "A cross-platform restaurant ordering application designed for efficient food ordering and management, enhancing both customer experience and restaurant operations.",
      image: "/images/Eagle'sNest.jpg",
      githubLink: "https://github.com/dols30/EaglesNest-RestaurantOrderingApp",
      liveLink: "",
      technologies: [".NET MAUI", "C#", "SQLite", "UI/UX Design"]
    },
    {
      id: 6,
      title: "SpamTrie Sentinel",
      description: "A modern spam detection application featuring real-time detection using trie data structures, interactive visualization, and a sleek UI built with shadcn/ui components. Includes efficient state management and type-safe development.",
      image: "/images/spamtrie-image.jpg",
      githubLink: "https://github.com/dols30/spamtrie-sentinel.git",
      liveLink: "https://spamtrie30.vercel.app",
      technologies: ["React", "TypeScript", "Vite", "shadcn/ui", "Tailwind CSS", "React Query", "React Router", " Trie Data Structure"]
    },
    {
      id: 1,
      title: "Spam Word Detection System",
      description: "A spam detection system using Trie data structure to efficiently store and search for spam words in email content.",
      image: "https://img.freepik.com/free-vector/spam-concept-illustration_114360-7128.jpg?w=826&t=st=1711329720~exp=1711330320~hmac=aef8c7f97af2d069e3c50b03d007a9a9cb8ecd599c5b0eb81fcdb63e2e83a1fe",
      githubLink: "https://github.com/dols30",
      liveLink: "https://example.com/spam-detection",
      technologies: ["C++", "Qt Framework", "Git", "Trie Data Structure"]
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
  ], []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [chatHistory]);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    setIsMenuOpen(false);

    if (tab === 'home') {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }, []);

  const callGeminiChat = useCallback(async (userMessage: string) => {
    try {
      const response = await fetch('http://localhost:3002/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error("Non-JSON response:", text.substring(0, 500));
        throw new Error(`Server returned non-JSON response (Status: ${response.status}). Make sure the backend server is running on port 3002.`);
      }
      
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to get response');
      }
      
      return data.message;
    } catch (error: any) {
      console.error("Chat Error:", error);
      return error.message || "My brain is offline momentarily. Please check your connection.";
    }
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMsg = chatInput.trim();
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsChatLoading(true);

    try {
      const aiResponse = await callGeminiChat(userMsg);
      setChatHistory(prev => [...prev, { role: 'model', text: aiResponse }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setChatHistory(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting. Please try again." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const generateProjectIdea = useCallback(async () => {
    setIsGeneratingIdea(true);

    try {
      const response = await fetch('http://localhost:3002/api/generate-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to generate idea');
      }
      
      setGeneratedIdea(data.idea);
    } catch (error: any) {
      console.error("Project Idea Error:", error);
      alert(error.message || "Failed to generate project idea");
    } finally {
      setIsGeneratingIdea(false);
    }
  }, []);

  const NavLink = React.memo(({ id, label, icon: Icon }: { id: string; label: string; icon?: React.ComponentType<{ size?: number }> }) => (
    <button
      onClick={() => handleTabChange(id)}
      className={`text-sm font-medium transition-all px-4 py-2 rounded-full flex items-center gap-2 ${
        activeTab === id 
          ? 'bg-white/10 text-blue-400' 
          : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      {Icon && <Icon size={16} />}
      {label}
    </button>
  ));

  const SocialLink = React.memo(({ href, icon: Icon }: { href: string; icon: React.ComponentType<{ size?: number }> }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
    >
      <Icon size={20} />
    </a>
  ));


  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden animate-in fade-in zoom-in duration-500 py-16">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10 w-full">
              <div className="space-y-4 sm:space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-blue-300">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  Available for work
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
                  Hi, I'm <br />
                  <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
                    Dolraj Bashyal
                  </span>
                </h1>
                
                <h2 className="text-lg sm:text-xl md:text-2xl text-slate-200 font-medium">
                  Computer Science Student & Developer
                </h2>

                <p className="text-base sm:text-lg text-slate-400 max-w-lg leading-relaxed">
                  I specialize in software development with a focus on creating elegant, efficient, and user-friendly applications that address real-world challenges.
                </p>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
                  <a 
                    href="/assets/DolRaj_Bashyal_Resume.pdf"
                    download
                    className="px-5 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-full hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                  >
                    <Download size={18} />
                    <span>Download Resume</span>
                  </a>
                  <button 
                    onClick={() => handleTabChange('contact')}
                    className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white/5 text-white text-sm sm:text-base font-medium rounded-full hover:bg-white/10 transition-all border border-white/10"
                  >
                    Contact Info
                  </button>
                  <button 
                    onClick={() => handleTabChange('ask-ai')}
                    className="px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-blue-300 text-sm sm:text-base font-medium rounded-full hover:bg-white/10 transition-all border border-blue-500/20 flex items-center justify-center gap-2"
                  >
                    <Sparkles size={18} />
                    <span>Ask AI</span>
                  </button>
                </div>

                <div className="hidden md:flex gap-4 pt-8">
                  <SocialLink href="https://github.com/dols30" icon={Github} />
                  <SocialLink href="https://www.linkedin.com/in/drb30" icon={Linkedin} />
                </div>
              </div>

              <div className="hidden md:block relative mt-8 md:mt-0">
                <div className="relative z-10 bg-gradient-to-tr from-slate-800 to-slate-900 p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="space-y-4 font-mono text-sm">
                    <div className="flex gap-2">
                      <span className="text-purple-400">const</span>
                      <span className="text-blue-400">developer</span>
                      <span className="text-white">=</span>
                      <span className="text-white">{`{`}</span>
                    </div>
                    <div className="pl-4 space-y-2">
                      <div>
                        <span className="text-slate-400">name:</span>
                        <span className="text-emerald-400"> 'Dol Raj Bashyal'</span>,
                      </div>
                      <div>
                        <span className="text-slate-400">role:</span>
                        <span className="text-emerald-400"> 'CS Student & Dev'</span>,
                      </div>
                      <div>
                        <span className="text-slate-400">focus:</span>
                        <span className="text-emerald-400"> 'Elegant Solutions'</span>,
                      </div>
                      <div>
                        <span className="text-slate-400">skills:</span>
                        <span className="text-white"> [</span>
                        <span className="text-emerald-400">'React'</span>,
                        <span className="text-emerald-400"> 'TypeScript'</span>,
                        <span className="text-emerald-400"> 'Next.js'</span>,
                        <span className="text-emerald-400"> 'C#'</span>,
                        <span className="text-emerald-400"> '.NET MAUI'</span>,
                        <span className="text-emerald-400"> 'Python'</span>,
                        <span className="text-emerald-400"> 'MySQL'</span>,
                        <span className="text-emerald-400"> 'Tailwind CSS'</span>
                        <span className="text-white">]</span>
                      </div>
                    </div>
                    <div className="text-white">{'}'}</div>
                  </div>
                </div>
                <div className="absolute top-4 -right-4 w-full h-full border-2 border-white/5 rounded-2xl -z-10 rotate-3" />
              </div>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="bg-slate-950 dark">
            <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin text-blue-400" size={32} /></div>}>
              <AboutSection stats={stats} />
            </Suspense>
          </div>
        );

      case 'skills':
        return (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[calc(100vh-140px)] flex flex-col justify-center bg-slate-950 rounded-2xl sm:rounded-3xl shadow-[0_0_80px_-40px_rgba(15,23,42,1)] border border-white/5">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6 text-slate-200">What I Know</h2>
              <div className="inline-flex bg-slate-900/60 p-1 rounded-full border border-white/10 shadow-[0_0_30px_-15px_rgba(59,130,246,0.8)]">
                <button 
                  onClick={() => setSkillsView('visual')}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    skillsView === 'visual' 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Visual View
                </button>
                <button 
                  onClick={() => setSkillsView('detailed')}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    skillsView === 'detailed' 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Detailed View
                </button>
              </div>
            </div>

            {skillsView === 'visual' ? (
              <div className="rounded-3xl border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl shadow-blue-500/10 p-6">
                <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin text-blue-400" size={32} /></div>}>
                  <RotatingSkills skills={skills} />
                </Suspense>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-blue-400/30 transition-colors shadow-xl shadow-black/5">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 text-blue-400">
                    <Globe size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-slate-200">Frontend</h3>
                  <ul className="space-y-2 text-slate-400">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> React / Next.js</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> TypeScript</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> Tailwind CSS</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> HTML/CSS</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> JavaScript</li>
                  </ul>
                </div>

                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-emerald-400/30 transition-colors shadow-xl shadow-black/5">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 text-emerald-400">
                    <Terminal size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-slate-200">Backend & Languages</h3>
                  <ul className="space-y-2 text-slate-400">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> Python</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> C++</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> C#</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> Node.js</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> MySQL</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> Data Structures</li>
                  </ul>
                </div>

                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-purple-400/30 transition-colors shadow-xl shadow-black/5">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 text-purple-400">
                    <Cpu size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-slate-200">Tools & Frameworks</h3>
                  <ul className="space-y-2 text-slate-400">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-400 rounded-full" /> Git / GitHub</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-400 rounded-full" /> .NET MAUI</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-400 rounded-full" /> Qt Framework</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-400 rounded-full" /> Unity Engine</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        );

      case 'projects':
        return (
          <div className="bg-slate-950 dark">
            <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin text-blue-400" size={32} /></div>}>
              <ProjectsSection projects={projects} />
            </Suspense>
          </div>
        );

      case 'ask-ai':
        return (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10 min-h-[70vh] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="text-center mb-6 sm:mb-8">
               <h2 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center justify-center gap-2 sm:gap-3">
                 <Bot size={28} className="sm:w-8 sm:h-8 text-blue-400" />
                 <span>Ask My Digital Twin</span>
               </h2>
               <p className="text-sm sm:text-base text-slate-400 px-4">
                 Ask about my skills, experience, or what I can build for you.
               </p>
             </div>

             <div className="flex-grow bg-slate-900 rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden flex flex-col shadow-2xl">
                <div className="flex-grow p-4 sm:p-6 overflow-y-auto space-y-3 sm:space-y-4">
                  {chatHistory.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] sm:max-w-[80%] p-3 sm:p-4 rounded-2xl text-sm sm:text-base ${
                        msg.role === 'user' 
                          ? 'bg-blue-600 text-white rounded-br-sm' 
                          : 'bg-slate-800 text-slate-200 rounded-bl-sm border border-white/5'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isChatLoading && (
                     <div className="flex justify-start">
                       <div className="bg-slate-800 p-3 sm:p-4 rounded-2xl rounded-bl-sm border border-white/5 flex items-center gap-2">
                         <Loader2 size={16} className="animate-spin text-blue-400" />
                         <span className="text-slate-400 text-sm">Thinking...</span>
                       </div>
                     </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <form onSubmit={handleSendMessage} className="p-3 sm:p-4 bg-slate-950 border-t border-white/10 flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-grow bg-slate-900 border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-slate-200 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all placeholder:text-slate-600"
                  />
                  <button 
                    type="submit"
                    disabled={isChatLoading || !chatInput.trim()}
                    className="p-2.5 sm:p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg sm:rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                  >
                    <Send size={20} />
                  </button>
                </form>
             </div>
          </div>
        );

      case 'contact':
        return (
          <div className="max-w-3xl mx-auto px-6 py-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center justify-center min-h-[60vh]">
            <p className="text-blue-400 font-mono mb-4">What's Next?</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
              I'm currently looking for new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a 
                href="mailto:bashyal.dolraj30@gmail.com"
                className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400/10 transition-all font-medium"
              >
                <Mail size={20} />
                Send Email
              </a>
              <button 
                onClick={() => handleTabChange('ask-ai')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-slate-800 border border-white/10 text-white rounded-lg hover:bg-slate-700 transition-all font-medium"
              >
                <Bot size={20} className="text-purple-400" />
                Chat with AI
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30 flex flex-col relative overflow-hidden">
      <Suspense fallback={null}>
        <AnimatedBackground />
      </Suspense>
      
      <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <button 
            onClick={() => handleTabChange('home')}
            className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            DB
          </button>

          <div className="hidden md:flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/5">
            <NavLink id="home" label="Home" />
            <NavLink id="about" label="About" />
            <NavLink id="skills" label="Skills" />
            <NavLink id="projects" label="Projects" />
            <NavLink id="ask-ai" label="Ask AI" icon={Sparkles} />
            <NavLink id="contact" label="Contact" />
          </div>

          <a 
            href="/assets/DolRaj_Bashyal_Resume.pdf"
            download
            className="hidden md:flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Download size={16} className="opacity-90" />
              Resume
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
          </a>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-14 sm:top-16 left-0 w-full bg-slate-900/95 backdrop-blur-md border-b border-white/10 p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 max-h-[calc(100vh-56px)] overflow-y-auto">
            <NavLink id="home" label="Home" />
            <NavLink id="about" label="About" />
            <NavLink id="skills" label="Skills" />
            <NavLink id="projects" label="Projects" />
            <NavLink id="ask-ai" label="Ask AI" icon={Sparkles} />
            <NavLink id="contact" label="Contact" />
          </div>
        )}
      </nav>

      <main className="flex-grow pt-14 sm:pt-16">
        {renderContent()}
      </main>

      <footer className="py-8 text-center text-slate-500 text-sm border-t border-white/5 mt-auto space-y-4">
        <div className="flex justify-center gap-6 md:hidden">
          <SocialLink href="https://github.com/dols30" icon={Github} />
          <SocialLink href="https://www.linkedin.com/in/drb30" icon={Linkedin} />
        </div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
          © {currentYear} Dolraj Bashyal
        </p>
      </footer>
    </div>
  );
};

export default Portfolio;

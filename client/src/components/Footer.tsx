import { useEffect, useState } from "react";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-slate-900 dark:bg-black/30 backdrop-blur-sm text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-bold mb-4 md:mb-0">
            <span className="text-primary-400">D</span>ol <span className="text-primary-400">R</span>aj <span className="text-primary-400">B</span>ashyal
          </div>
          
          <div className="text-slate-400 text-sm">
            &copy; {currentYear} Dol Raj Bashyal. All rights reserved.
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-slate-500">
          <p>"Code is poetry in motion"</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

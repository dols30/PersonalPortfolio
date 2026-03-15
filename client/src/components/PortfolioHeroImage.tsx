import React, { useState } from 'react';

interface Props {
  onNavigate: (tab: string) => void;
}

export const PortfolioHeroImage: React.FC<Props> = ({ onNavigate }) => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  // Exact relative coordinates extracted for the clickable zones (percentages).
  const zones = [
    { id: 'projects', label: 'Projects', top: '50.5%', left: '33.5%', width: '18%', height: '8%', color: 'rgba(56, 189, 248, 0.4)' },
    { id: 'about', label: 'About Me', top: '56%', left: '49%', width: '17%', height: '7%', color: 'rgba(250, 204, 21, 0.4)' },
    { id: 'contact', label: 'Contact', top: '59.5%', left: '50.5%', width: '15.5%', height: '6%', color: 'rgba(156, 163, 175, 0.4)' },
    { id: 'skills', label: 'Skills', top: '60%', left: '32%', width: '17%', height: '6%', color: 'rgba(74, 222, 128, 0.4)' },
    { id: 'github', label: 'GitHub', top: '7.5%', left: '54.5%', width: '6.5%', height: '8.5%', url: 'https://github.com/dols30' },
    { id: 'linkedin', label: 'LinkedIn', top: '7.5%', left: '62.5%', width: '6.5%', height: '8.5%', url: 'https://www.linkedin.com/in/drb30' },
  ];

  return (
    <div className="relative w-full max-w-[500px] mx-auto group rounded-[2rem] shadow-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-500 bg-white">
      {/* 
        Crop the image by scaling up the inner container and using negative margins.
        Original dimensions: 644x498. 
        Scaling up more to make the image bigger, and shifting left to crop the right side.
      */}
      <div 
        className="relative w-full"
        style={{ paddingTop: '100%' }} /* Even taller vertical aspect ratio to support crop */
      >
        <div 
          className="absolute top-0 left-0"
          style={{ 
            width: '145%',       /* Visual scale */
            height: '125%',      /* Visual scale */
            marginLeft: '-8%',   /* Reveal more of the left side */
            marginTop: '-2%'     /* Give room for top text */
          }}
        >
          <img 
            src="/images/home-hero.png" 
            alt="Dol Raj Bashyal Illustration" 
            className="w-full h-full object-cover"
          />
          
          {/* Clickable Overlay Zones */}
          {zones.map((zone) => (
            <div
              key={zone.id}
              className="absolute cursor-pointer transition-all duration-300 rounded-md"
              style={{
                top: zone.top,
                left: zone.left,
                width: zone.width,
                height: zone.height,
                backgroundColor: hoveredTab === zone.id ? zone.color || 'rgba(0, 0, 0, 0.1)' : 'transparent',
              }}
              onMouseEnter={() => setHoveredTab(zone.id)}
              onMouseLeave={() => setHoveredTab(null)}
              onClick={() => {
                if (zone.url) window.open(zone.url, '_blank');
                else onNavigate(zone.id);
              }}
              title={zone.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

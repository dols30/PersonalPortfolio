import React, { useState } from 'react';

interface Props {
  onNavigate: (tab: string) => void;
}

export const PortfolioHeroImage: React.FC<Props> = ({ onNavigate }) => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  // Exact relative coordinates for the text and icons on the un-cropped image.
  const zones = [
    { id: 'projects', label: 'Projects', top: '50.7%', left: '26%', width: '21%', height: '5%' },
    { id: 'about', label: 'About Me', top: '55.7%', left: '52%', width: '23%', height: '5%' },
    { id: 'contact', label: 'Contact', top: '61.3%', left: '56%', width: '21%', height: '5%' },
    { id: 'skills', label: 'Skills', top: '61.3%', left: '32%', width: '18%', height: '5%' },
    { id: 'github', label: 'GitHub', top: '6.5%', left: '66.5%', width: '6%', height: '6%', url: 'https://github.com/dols30' },
    { id: 'linkedin', label: 'LinkedIn', top: '6.5%', left: '78.5%', width: '6%', height: '6%', url: 'https://www.linkedin.com/in/drb30' }
  ];

  return (
    <div className="relative w-full max-w-[500px] mx-auto group transition-transform duration-500 hover:scale-[1.02]">
      {/* Container with gentle bottom fade mask */}
      <div 
        className="relative w-full"
        style={{ 
          maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
          WebkitMaskImage: '-webkit-linear-gradient(top, black 90%, transparent 100%)'
        }}
      >
        <img 
          src="/images/home-hero-fixed.png" 
          alt="Dol Raj Bashyal Illustration" 
          className="w-full h-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] mix-blend-normal"
        />
        
        {/* Clickable Overlay Zones */}
        {zones.map((zone) => (
          <div
            key={zone.id}
            className="absolute cursor-pointer"
            style={{
              top: zone.top,
              left: zone.left,
              width: zone.width,
              height: zone.height,
              zIndex: 50,
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
  );
};

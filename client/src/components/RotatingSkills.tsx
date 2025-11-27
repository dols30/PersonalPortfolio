import { useEffect, useState, useRef } from "react";
import { Skill } from "@/types";

const logos: Record<string, string> = {
  "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  "C#": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "HTML/CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  ".NET MAUI": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg",
  "Qt Framework": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/qt/qt-original.svg",
  "Unity Engine": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg",
  "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "Data Structures": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "Tailwind": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg"
};

const getLogoForSkill = (skillName: string): string => {
  return logos[skillName] || "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDA3NEU4IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtY29kZSI+PHBvbHlsaW5lIHBvaW50cz0iMTYgMTggMjIgMTIgMTYgNiI+PC9wb2x5bGluZT48cG9seWxpbmUgcG9pbnRzPSI4IDYgMiAxMiA4IDE4Ij48L3BvbHlsaW5lPjwvc3ZnPg==";
};

interface RotatingSkillsProps {
  skills: Skill[];
}

export const RotatingSkills = ({ skills }: RotatingSkillsProps) => {
  const [rotation, setRotation] = useState(0);
  const [verticalRotation, setVerticalRotation] = useState(20);
  const [hubRotation, setHubRotation] = useState(0); // Y-axis rotation
  const [hubVerticalRotation, setHubVerticalRotation] = useState(0); // X-axis rotation
  const [isPaused, setIsPaused] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  // Detect dark mode changes
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };
    
    checkDarkMode();
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' && 
          mutation.attributeName === 'class'
        ) {
          checkDarkMode();
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  const uniqueSkills = skills.reduce((acc: Skill[], current) => {
    const existingSkill = acc.find(item => item.name === current.name);
    if (!existingSkill) {
      acc.push(current);
    }
    return acc;
  }, []);

  const displaySkills = uniqueSkills.slice(0, 10);

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = displaySkills.map((skill) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = getLogoForSkill(skill.name);
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
      });
      
      await Promise.all(imagePromises);
      setImagesLoaded(true);
    };
    
    preloadImages();
  }, [displaySkills]);

  // Force redraw when dark mode changes
  useEffect(() => {
    if (isComponentMounted) {
      requestAnimationFrame(() => {
        drawTentacles();
      });
    }
  }, [isDarkMode, isComponentMounted]);

  useEffect(() => {
    setIsComponentMounted(true);
    
    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      
      const elapsed = timestamp - lastTimeRef.current;
      
      if (elapsed > 16 && !isPaused) {
        const rotationStep = 0.8 * (elapsed / 16);
        setRotation(prev => (prev + rotationStep) % 360);
        setVerticalRotation(prev => (prev + rotationStep * 0.15) % 360);
        
        lastTimeRef.current = timestamp;
        
        requestAnimationFrame(() => {
          drawTentacles();
        });
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, rotation]);

  // Handle window resize
  useEffect(() => {
    if (canvasRef.current && containerRef.current && isComponentMounted) {
      const resizeCanvas = () => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;
        
        // Set canvas dimensions to match container
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        
        drawTentacles();
      };
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      
      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }
  }, [isComponentMounted]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
        
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
      } else {
        setIsPaused(false);
        
        if (!animationRef.current) {
          const animate = () => {
            const now = performance.now();
            
            if (lastTimeRef.current) {
              lastTimeRef.current = now;
            }
            
            animationRef.current = requestAnimationFrame(animate);
          };
          
          animationRef.current = requestAnimationFrame(animate);
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPaused]);

  // Add mouse/touch interaction handlers for skills sphere
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPaused) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const dirX = (x - centerX) / centerX;
    const dirY = (y - centerY) / centerY;
    
    setVerticalRotation(prev => (prev + dirY * 0.5) % 360);
    setRotation(prev => (prev + dirX * 0.5) % 360);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isPaused || !e.touches[0]) return;
    
    const container = containerRef.current;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const dirX = (x - centerX) / centerX;
    const dirY = (y - centerY) / centerY;
    
    setVerticalRotation(prev => (prev + dirY * 0.5) % 360);
    setRotation(prev => (prev + dirX * 0.5) % 360);
  };

  const drawTentacles = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !isComponentMounted) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    const baseRadius = Math.min(220, Math.min(centerX, centerY) * 0.85);
    const sphereRadius = window.innerWidth < 640 ? baseRadius * 0.7 : baseRadius;
    
    const skillPositions = displaySkills.map((_, index) => {
      const y = 1 - (index / (displaySkills.length - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      
      const angle = (index * 137.5 + rotation) % 360;
      const phi = (angle * Math.PI) / 180;
      
      const x = sphereRadius * radius * Math.cos(phi);
      const z = sphereRadius * radius * Math.sin(phi);
      const yPos = sphereRadius * y;
      
      const vertRad = (verticalRotation * Math.PI) / 180;
      const cosVert = Math.cos(vertRad);
      const sinVert = Math.sin(vertRad);
      
      const rotatedY = yPos * cosVert - z * sinVert;
      const rotatedZ = yPos * sinVert + z * cosVert;
      
      const focalLength = 1400;
      const scale = focalLength / (focalLength + rotatedZ);
      const screenX = centerX + x * scale;
      const screenY = centerY + rotatedY * scale;
      
      const isVisible = rotatedZ > -sphereRadius*0.8 || selectedSkill === index;
      
      return {
        index,
        screenX,
        screenY,
        scale,
        z: rotatedZ,
        isVisible,
        originalX: x, 
        originalY: yPos, 
        originalZ: z
      };
    });
    
    skillPositions.forEach(position => {
      if (!position.isVisible && selectedSkill !== position.index) return;
      
      const { index, screenX, screenY, z } = position;
      const isSelected = selectedSkill === index;
      
      const opacity = isSelected ? 
        1 : 
        Math.min(1, Math.max(0, (z + sphereRadius) / (sphereRadius)));
      
      if (opacity < 0.2 && !isSelected) return;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      
      const distance = Math.sqrt(Math.pow(screenX - centerX, 2) + Math.pow(screenY - centerY, 2));
      const controlPointDistance = distance * 0.5;
      
      const dx = screenX - centerX;
      const dy = screenY - centerY;
      const angle = Math.atan2(dy, dx);
      
      const offsetAngle = angle + (Math.PI / 2) * 0.3;
      const controlX = centerX + Math.cos(offsetAngle) * controlPointDistance;
      const controlY = centerY + Math.sin(offsetAngle) * controlPointDistance;
      
      ctx.quadraticCurveTo(
        controlX, controlY,
        screenX, screenY
      );
      
      // Tentacle style - improved colors and width for both light and dark mode
      if (isSelected) {
        ctx.strokeStyle = isDarkMode ? 'rgba(96, 165, 250, 0.95)' : 'rgba(59, 130, 246, 0.9)';
        ctx.lineWidth = 5;
      } else {
        ctx.strokeStyle = isDarkMode 
          ? `rgba(147, 197, 253, ${opacity * 0.8})` 
          : `rgba(59, 130, 246, ${opacity * 0.7})`;
        ctx.lineWidth = 2 + opacity * 2;
      }
      
      ctx.lineCap = 'round';
      ctx.stroke();
      
      // Add glow for selected tentacle - softer glow to prevent glitching
      if (isSelected) {
        ctx.shadowColor = isDarkMode ? 'rgba(147, 197, 253, 0.6)' : 'rgba(59, 130, 246, 0.5)';
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        const particleCount = 3;
        for (let i = 0; i < particleCount; i++) {
          const t = ((rotation / 3 + i * 30) % 90) / 100;
          
          const u = 1 - t;
          const px = u * u * centerX + 2 * u * t * controlX + t * t * screenX;
          const py = u * u * centerY + 2 * u * t * controlY + t * t * screenY;
          
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = isDarkMode ? 'rgba(191, 219, 254, 0.95)' : 'rgba(255, 255, 255, 0.95)';
          ctx.fill();
        }
      }
      
      if (position.isVisible || isSelected) {
        [0.25, 0.5, 0.75].forEach(t => {
          const u = 1 - t;
          const dotX = u * u * centerX + 2 * u * t * controlX + t * t * screenX;
          const dotY = u * u * centerY + 2 * u * t * controlY + t * t * screenY;
          
          ctx.beginPath();
          ctx.arc(dotX, dotY, isSelected ? 3 : 2, 0, Math.PI * 2);
          ctx.fillStyle = isSelected 
            ? (isDarkMode ? 'rgba(219, 234, 254, 0.95)' : 'rgba(255, 255, 255, 0.95)') 
            : (isDarkMode ? `rgba(147, 197, 253, ${opacity * 0.9})` : `rgba(96, 165, 250, ${opacity * 0.8})`);
          ctx.fill();
        });
      }
    });
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full md:h-[420px] h-[340px] flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseEnter={() => setIsPaused(false)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      />
      
      <div 
        className="absolute flex items-center justify-center rounded-full bg-blue-600/40 border border-blue-400/40 backdrop-blur-md w-16 h-16 sm:w-20 sm:h-20 z-20 hub-glow"
        style={{
          '--x-rotation': `${Math.sin(hubRotation/30) * 15}deg`,
        } as React.CSSProperties}
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-700 flex items-center justify-center overflow-hidden">
          <span className="text-xs text-white font-bold tracking-wide text-center">My Toolkit</span>
        </div>
      </div>

      {/* Skill nodes */}
      {imagesLoaded && displaySkills.map((skill, index) => {
        // Create positions on a sphere using full spherical coordinates
        // Uses spherical coordinates to place skills evenly around a complete sphere
        const y = 1 - (index / (displaySkills.length - 1)) * 2; // Range from 1 to -1
        const radius = Math.sqrt(1 - y * y); // Radius at this y
        
        // Apply rotation to the angle
        const angle = (index * 137.5 + rotation) % 360; // Golden angle is ~137.5 degrees
        const phi = (angle * Math.PI) / 180;
        
        const baseRadius = Math.min(220, Math.min(
          containerRef.current?.offsetWidth || 750, 
          containerRef.current?.offsetHeight || 500
        ) * 0.85);
        const sphereRadius = window.innerWidth < 640 ? baseRadius * 0.7 : baseRadius;
        
        const x = sphereRadius * radius * Math.cos(phi);
        const z = sphereRadius * radius * Math.sin(phi);
        const yPos = sphereRadius * y;
        
        const vertRad = (verticalRotation * Math.PI) / 180;
        const cosVert = Math.cos(vertRad);
        const sinVert = Math.sin(vertRad);
        
        const rotatedY = yPos * cosVert - z * sinVert;
        const rotatedZ = yPos * sinVert + z * cosVert;
        
        const focalLength = 1400;
        const scale = focalLength / (focalLength + rotatedZ);
        
        const centerX = containerRef.current?.offsetWidth ? containerRef.current.offsetWidth / 2 : 0;
        const centerY = containerRef.current?.offsetHeight ? containerRef.current.offsetHeight / 2 : 0;
        const screenX = centerX + x * scale;
        const screenY = centerY + rotatedY * scale;
        
        const isVisible = rotatedZ > -sphereRadius*0.8 || selectedSkill === index;
        if (!isVisible) return null;
        
        const zIndex = Math.round(rotatedZ + 100);
        
        const opacity = selectedSkill === index ? 
          1 : 
          Math.min(1, Math.max(0.4, (rotatedZ + sphereRadius) / (sphereRadius)));
          
        const isSelected = selectedSkill === index;
        const isHovered = selectedSkill === index;
        
        const blur = rotatedZ < 0 && !isSelected ? `blur(${Math.abs(rotatedZ / 800)}px)` : 'blur(0)';
        
        const sizeScale = Math.max(0.95, Math.min(1.0, scale));

        return (
          <div
            key={index}
            className={`
              skill-node 
              absolute 
              flex 
              items-center 
              justify-center 
              rounded-full 
              hover:z-50 
              transition-opacity
              ${isVisible ? 'opacity-100' : 'opacity-0'}
              ${isSelected ? 'z-20' : 'z-10'}
            `}
            style={{
              left: `${screenX}px`,
              top: `${screenY}px`,
              transform: `translate(-50%, -50%) scale(${sizeScale})`,
              width: `${window.innerWidth < 640 ? '50px' : '60px'}`,
              height: `${window.innerWidth < 640 ? '50px' : '60px'}`,
              opacity: isVisible ? (isHovered ? 1 : opacity) : 0,
              pointerEvents: isVisible ? 'auto' : 'none',
              transition: 'opacity 0.3s ease, filter 0.2s ease',
            }}
            onMouseEnter={() => setSelectedSkill(index)}
            onTouchStart={(e) => {
              e.preventDefault(); // Prevent default to avoid scroll issues
              setSelectedSkill(index);
            }}
            onMouseLeave={() => setSelectedSkill(null)}
            onTouchEnd={(e) => {
              e.preventDefault(); // Prevent default to avoid scroll issues
              setSelectedSkill(null);
            }}
          >
            <div 
              className={`
                w-full 
                h-full 
                rounded-full 
                flex 
                flex-col
                items-center 
                justify-center
                ${isSelected 
                  ? 'bg-blue-500/10 border border-blue-500/30 p-1 backdrop-blur-sm' 
                  : 'p-0.5'
                }
                transition-colors duration-100
              `}
              style={{
                boxShadow: isSelected ? '0 0 10px rgba(59, 130, 246, 0.2)' : 'none',
              }}
            >
              <img 
                src={getLogoForSkill(skill.name)} 
                alt={skill.name}
                className={`
                  w-full 
                  h-full 
                  object-contain 
                  ${isDarkMode 
                    ? 'brightness-[1.2] contrast-[1.1]' 
                    : 'brightness-100 contrast-100'
                  }
                  scale-100
                `}
                style={{
                  filter: isSelected 
                    ? 'drop-shadow(0 0 2px rgba(59, 130, 246, 0.3))' 
                    : 'none',
                }}
              />
            </div>
            
            {/* Always display the name for the skill, styled differently based on selection state */}
            <div 
              className={`
                mt-2 
                px-2 
                py-1 
                ${isSelected 
                  ? 'bg-blue-500/80 dark:bg-blue-600/90 text-white' 
                  : 'bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700'
                }
                backdrop-blur-sm 
                rounded-lg 
                text-xs 
                font-medium
                whitespace-nowrap 
                text-center
                transition-all
                duration-200
                shadow-sm
              `}
            >
              {isSelected ? (
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-500 dark:bg-blue-600 rotate-45"></span>
              ) : null}
              {skill.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RotatingSkills; 
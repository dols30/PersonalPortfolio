// RotatingSkills.tsx - Interactive 3D skill visualization component with tentacles and hover effects
// Updated for smoother animations and fixed hover glitching issue

import { useEffect, useState, useRef } from "react";
import { Skill } from "@/types";

// Brand logos for common technologies
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
  "Data Structures": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", // Placeholder for data structures
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
    // Check initial dark mode state
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };
    
    checkDarkMode();
    
    // Create MutationObserver to detect class changes on html element (dark mode toggle)
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
    
    // Start observing
    observer.observe(document.documentElement, { attributes: true });
    
    // Cleanup
    return () => observer.disconnect();
  }, []);

  // Filter out duplicate skills to avoid visual clutter
  const uniqueSkills = skills.reduce((acc: Skill[], current) => {
    const existingSkill = acc.find(item => item.name === current.name);
    if (!existingSkill) {
      acc.push(current);
    }
    return acc;
  }, []);

  // Take a maximum of 10 skills to avoid overcrowding
  const displaySkills = uniqueSkills.slice(0, 10);

  // Preload skill logos for smoother rendering
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = displaySkills.map((skill) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = getLogoForSkill(skill.name);
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Resolve even if image fails to load
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
      // Ensure tentacle canvas is redrawn when dark mode changes
      requestAnimationFrame(() => {
        drawTentacles();
      });
    }
  }, [isDarkMode, isComponentMounted]);

  // Animation loop with tentacle drawing
  useEffect(() => {
    setIsComponentMounted(true);
    
    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      
      // Control animation speed for more consistent performance
      const elapsed = timestamp - lastTimeRef.current;
      
      if (elapsed > 16 && !isPaused) { // Higher framerate for smoother animation
        const rotationStep = 0.8 * (elapsed / 16); // Slower rotation speed for skills
        setRotation(prev => (prev + rotationStep) % 360);
        // Full range vertical rotation for proper top/bottom distribution
        setVerticalRotation(prev => (prev + rotationStep * 0.15) % 360);
        
        // We're removing hub rotation to keep it static
        // setHubRotation(prev => (prev + rotationStep * 0.15) % 360);
        // setHubVerticalRotation(prev => 5 * Math.sin(timestamp / 2000));
        
        lastTimeRef.current = timestamp;
        
        // Redraw tentacles immediately with updated rotation for sync
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
        
        // Redraw tentacles after resize
        drawTentacles();
      };
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      
      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }
  }, [isComponentMounted]);

  // Handle visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden (user switched tabs, etc)
        // Pause the animation to save resources
        setIsPaused(true);
        
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
      } else {
        // Page is visible again
        setIsPaused(false);
        
        // Restart animation loop if needed
        if (!animationRef.current) {
          const animate = () => {
            const now = performance.now();
            
            // Adjust the last time so first frame doesn't cause a big jump
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
    
    // Calculate position relative to center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Get normalized direction from center (-1 to 1)
    const dirX = (x - centerX) / centerX;
    const dirY = (y - centerY) / centerY;
    
    // Use direction to influence rotation slightly, making it more interactive
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
    
    // Calculate position relative to center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Get normalized direction from center (-1 to 1)
    const dirX = (x - centerX) / centerX;
    const dirY = (y - centerY) / centerY;
    
    // Use direction to influence rotation slightly, making it more interactive
    setVerticalRotation(prev => (prev + dirY * 0.5) % 360);
    setRotation(prev => (prev + dirX * 0.5) % 360);
  };

  // Draw tentacle connections - optimized for performance
  const drawTentacles = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !isComponentMounted) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    // Clear canvas with a transparent clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Center coordinates
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Responsive sphere radius based on container width
    const baseRadius = Math.min(220, Math.min(centerX, centerY) * 0.85);
    
    // Pre-calculate shared values outside the loop for better performance
    const sphereRadius = window.innerWidth < 640 ? baseRadius * 0.7 : baseRadius; // Scale down on mobile
    
    // Calculate 3D positions for all skills first
    const skillPositions = displaySkills.map((_, index) => {
      // Create positions on a sphere using spherical coordinates
      const y = 1 - (index / (displaySkills.length - 1)) * 2; // Range from 1 to -1
      const radius = Math.sqrt(1 - y * y); // Radius at this y
      
      // Apply rotation to the angle
      const angle = (index * 137.5 + rotation) % 360; // Golden angle is ~137.5 degrees
      const phi = (angle * Math.PI) / 180;
      
      // Calculate 3D coordinates
      const x = sphereRadius * radius * Math.cos(phi);
      const z = sphereRadius * radius * Math.sin(phi);
      const yPos = sphereRadius * y;
      
      // Apply vertical rotation
      const vertRad = (verticalRotation * Math.PI) / 180;
      const cosVert = Math.cos(vertRad);
      const sinVert = Math.sin(vertRad);
      
      const rotatedY = yPos * cosVert - z * sinVert;
      const rotatedZ = yPos * sinVert + z * cosVert;
      
      // Calculate screen coordinates (perspective projection)
      const focalLength = 1400;
      const scale = focalLength / (focalLength + rotatedZ);
      const screenX = centerX + x * scale;
      const screenY = centerY + rotatedY * scale;
      
      // Calculate visibility - sync with skill node visibility
      const isVisible = rotatedZ > -sphereRadius*0.8 || selectedSkill === index;
      
      return {
        index,
        screenX,
        screenY,
        scale,
        z: rotatedZ,
        isVisible,
        // Original 3D coordinates for better path calculations
        originalX: x, 
        originalY: yPos, 
        originalZ: z
      };
    });
    
    // Draw all tentacles first to ensure they're properly layered
    skillPositions.forEach(position => {
      // Only draw tentacles for visible skills or selected skill
      if (!position.isVisible && selectedSkill !== position.index) return;
      
      const { index, screenX, screenY, z } = position;
      const isSelected = selectedSkill === index;
      
      // Calculate opacity based on z position (more visible for all positions)
      // Make opacity sync better with skill visibility
      const opacity = isSelected ? 
        1 : 
        Math.min(1, Math.max(0, (z + sphereRadius) / (sphereRadius)));
      
      // Don't draw extremely transparent tentacles
      if (opacity < 0.2 && !isSelected) return;
      
      // Draw tentacle with improved path
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      
      // Use bezier curve for more natural tentacle movement
      const distance = Math.sqrt(Math.pow(screenX - centerX, 2) + Math.pow(screenY - centerY, 2));
      const controlPointDistance = distance * 0.5;
      
      // Calculate control points that arch the tentacle slightly
      const dx = screenX - centerX;
      const dy = screenY - centerY;
      const angle = Math.atan2(dy, dx);
      
      // Add slight vertical offset to control point for more organic curve
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
        
        // Add more energy particles for selected tentacles
        const particleCount = 3;
        for (let i = 0; i < particleCount; i++) {
          const t = ((rotation / 3 + i * 30) % 90) / 100;
          
          // Calculate position along curve using the quadratic formula
          const u = 1 - t;
          const px = u * u * centerX + 2 * u * t * controlX + t * t * screenX;
          const py = u * u * centerY + 2 * u * t * controlY + t * t * screenY;
          
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = isDarkMode ? 'rgba(191, 219, 254, 0.95)' : 'rgba(255, 255, 255, 0.95)';
          ctx.fill();
        }
      }
      
      // Add dots along tentacle path - only for visible skills
      if (position.isVisible || isSelected) {
        [0.25, 0.5, 0.75].forEach(t => {
          // Calculate position along curve using the quadratic formula
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
      className="relative w-full md:h-[500px] h-[400px] flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseEnter={() => setIsPaused(false)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Tentacle canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      />
      
      {/* Center toolkit hub with counter-rotation */}
      <div 
        className="absolute flex items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm w-16 h-16 sm:w-20 sm:h-20 z-10"
        style={{
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
          '--x-rotation': `${Math.sin(hubRotation/30) * 15}deg`,
        } as React.CSSProperties}
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500/20 border border-blue-500/30 flex flex-col items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <span className="text-[10px] text-blue-500 font-medium mt-1">My Toolkit</span>
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
        
        // Calculate 3D coordinates - use same sphere radius calculation as in drawTentacles
        const baseRadius = Math.min(220, Math.min(
          containerRef.current?.offsetWidth || 750, 
          containerRef.current?.offsetHeight || 500
        ) * 0.85);
        const sphereRadius = window.innerWidth < 640 ? baseRadius * 0.7 : baseRadius;
        
        const x = sphereRadius * radius * Math.cos(phi);
        const z = sphereRadius * radius * Math.sin(phi);
        const yPos = sphereRadius * y;
        
        // Apply full vertical rotation
        const vertRad = (verticalRotation * Math.PI) / 180;
        // Use full 3D rotation matrix for proper rotation in all axes
        const cosVert = Math.cos(vertRad);
        const sinVert = Math.sin(vertRad);
        
        // Apply rotation around X axis for complete top-to-bottom rotation
        const rotatedY = yPos * cosVert - z * sinVert;
        const rotatedZ = yPos * sinVert + z * cosVert;
        
        // Calculate screen coordinates (perspective projection)
        const focalLength = 1400;
        const scale = focalLength / (focalLength + rotatedZ);
        
        // Center positions relative to container center
        const centerX = containerRef.current?.offsetWidth ? containerRef.current.offsetWidth / 2 : 0;
        const centerY = containerRef.current?.offsetHeight ? containerRef.current.offsetHeight / 2 : 0;
        const screenX = centerX + x * scale;
        const screenY = centerY + rotatedY * scale;
        
        // Only display skills if in front of the viewer (with more visibility tolerance)
        // Use exactly the same visibility calculation as the tentacles
        const isVisible = rotatedZ > -sphereRadius*0.8 || selectedSkill === index;
        if (!isVisible) return null;
        
        // Calculate visual properties based on position
        const zIndex = Math.round(rotatedZ + 100);
        
        // Match opacity calculation with tentacle opacity for consistency
        const opacity = selectedSkill === index ? 
          1 : 
          Math.min(1, Math.max(0.4, (rotatedZ + sphereRadius) / (sphereRadius)));
          
        const isSelected = selectedSkill === index;
        const isHovered = selectedSkill === index;
        
        // Calculate blur based on z position (reduce blur for better visibility)
        const blur = rotatedZ < 0 && !isSelected ? `blur(${Math.abs(rotatedZ / 800)}px)` : 'blur(0)';
        
        // Update the scale calculation to avoid glitches
        const sizeScale = isSelected ? 1.3 : Math.max(0.9, Math.min(1.2, scale * 1.1));

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
              width: `${isSelected ? 'auto' : (window.innerWidth < 640 ? '50px' : '60px')}`,
              height: `${isSelected ? 'auto' : (window.innerWidth < 640 ? '50px' : '60px')}`,
              opacity: isVisible ? (isHovered ? 1 : opacity) : 0,
              pointerEvents: isVisible ? 'auto' : 'none',
              transition: 'opacity 0.4s ease, filter 0.3s ease, transform 0.3s ease',
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
                hover:scale-110 
                transition-all duration-200
              `}
              style={{
                boxShadow: isSelected ? '0 0 15px rgba(59, 130, 246, 0.3)' : 'none',
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
                  transition-transform duration-200
                `}
                style={{
                  filter: isSelected 
                    ? 'drop-shadow(0 0 3px rgba(59, 130, 246, 0.5))' 
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
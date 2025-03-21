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
    
    // Pre-calculate shared values outside the loop for better performance
    const sphereRadius = 220; // Larger radius for bigger sphere
    
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
    <div className="py-12">
      <div 
        className="relative h-[550px] w-full max-w-[750px] mx-auto perspective-1000"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseEnter={() => setIsPaused(false)}
        onMouseLeave={() => setIsPaused(false)} // Keep animating when mouse leaves
        style={{ touchAction: 'none' }} // Prevent scrolling when interacting
      >
        {/* Canvas for tentacles */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full tentacle-canvas"
          width={750}
          height={550}
        />
        
        {/* Only render skills if images are loaded */}
        {imagesLoaded && displaySkills.map((skill, index) => {
          // Create positions on a sphere using full spherical coordinates
          // Uses spherical coordinates to place skills evenly around a complete sphere
          const y = 1 - (index / (displaySkills.length - 1)) * 2; // Range from 1 to -1
          const radius = Math.sqrt(1 - y * y); // Radius at this y
          
          // Apply rotation to the angle
          const angle = (index * 137.5 + rotation) % 360; // Golden angle is ~137.5 degrees
          const phi = (angle * Math.PI) / 180;
          
          // Calculate 3D coordinates
          const sphereRadius = 220; // Larger radius to increase ring size
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
          const screenX = x * scale;
          const screenY = rotatedY * scale;
          
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
          
          // Calculate blur based on z position (reduce blur for better visibility)
          const blur = rotatedZ < 0 && !isSelected ? `blur(${Math.abs(rotatedZ / 800)}px)` : 'blur(0)';
          
          // Update the scale calculation to avoid glitches
          const sizeScale = isSelected ? 1.3 : Math.max(0.9, Math.min(1.2, scale * 1.1));

          return (
            <div
              key={skill.name}
              className="absolute top-1/2 left-1/2 skill-node"
              style={{
                transform: `translate(calc(-50% + ${screenX}px), calc(-50% + ${screenY}px))`,
                zIndex,
                opacity: isSelected ? 1 : opacity,
                filter: isSelected ? 'none' : blur,
                transition: "opacity 0.2s ease-out, filter 0.2s ease-out",
              }}
              onClick={() => setSelectedSkill(index === selectedSkill ? null : index)}
            >
              <div 
                className={`
                  relative rounded-full p-2.5
                  bg-white/95 dark:bg-slate-800/95 
                  border-4 ${isSelected 
                    ? 'border-blue-500 shadow-lg shadow-blue-500/40 dark:shadow-blue-400/50' 
                    : 'border-slate-200 dark:border-slate-600 shadow-md'} 
                  flex items-center justify-center 
                  skill-node-inner
                  ${isSelected ? 'pulse-glow skill-glow' : ''}
                `}
                style={{
                  width: '72px',
                  height: '72px',
                  transform: `scale(${sizeScale})`,
                  transition: 'transform 0.2s ease-out, box-shadow 0.3s ease'
                }}
              >
                <img
                  src={getLogoForSkill(skill.name)}
                  alt={skill.name}
                  className="w-12 h-12 object-contain drop-shadow-md dark:drop-shadow-lg transition-transform duration-200"
                  loading="eager"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDA3NEU4IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtY29kZSI+PHBvbHlsaW5lIHBvaW50cz0iMTYgMTggMjIgMTIgMTYgNiI+PC9wb2x5bGluZT48cG9seWxpbmUgcG9pbnRzPSI4IDYgMiAxMiA4IDE4Ij48L3BvbHlsaW5lPjwvc3ZnPg==";
                  }}
                />
              </div>
              <span className={`
                mt-1.5 text-xs font-semibold 
                px-3 py-1 rounded-full 
                ${isSelected ? 
                  'bg-blue-500 text-white shadow-md' : 
                  'bg-white/95 dark:bg-slate-800/95 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-600 shadow-md'
                }
                transition-all duration-300
                max-w-[100px] truncate text-center block
              `}>
                {skill.name}
              </span>
            </div>
          );
        })}
        
        {/* Center hub with tools icon - static position */}
        <div className="absolute inset-0 flex items-center justify-center z-[40] pointer-events-none">
          <div 
            className="w-20 h-20 rounded-full bg-blue-500 dark:bg-blue-600 center-hub flex flex-col items-center justify-center shadow-lg"
          >
            <div className="flex flex-col items-center justify-center sphere-content">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="22" 
                height="22" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="toolkit-icon"
              >
                <path d="M3 22v-3.92a2.52 2.52 0 0 1 .52-1.55l5-6.08a2.5 2.5 0 0 1 4 .1l4.5 6a2.51 2.51 0 0 1 .5 1.5V22"></path>
                <path d="M2 13h2"></path>
                <path d="M20 13h2"></path>
                <path d="M14 2v2"></path>
                <path d="M10 2v2"></path>
                <path d="m10 12 4 10"></path>
                <path d="m14 12-4 10"></path>
              </svg>
              <span className="text-xs font-semibold text-white toolkit-text mt-1">
                My Toolkit
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RotatingSkills; 
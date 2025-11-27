import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

const BackgroundAnimation = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    // Generate random particles
    const newParticles: Particle[] = [];
    const particleCount = window.innerWidth < 768 ? 20 : 35; // More particles
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1, // Larger particles
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.7 + 0.2 // More visible
      });
    }
    
    setParticles(newParticles);
    
    // Animation loop
    const interval = setInterval(() => {
      setParticles(prevParticles => 
        prevParticles.map(particle => ({
          ...particle,
          y: particle.y - particle.speed > 0 ? particle.y - particle.speed : 100,
          x: particle.x + Math.sin(particle.y / 30) * 0.2
        }))
      );
    }, 50);
    
    // Handle window resize
    const handleResize = () => {
      setParticles(prevParticles => {
        const particleCount = window.innerWidth < 768 ? 15 : 25;
        if (prevParticles.length === particleCount) return prevParticles;
        
        // Adjust particle count based on window size
        if (prevParticles.length < particleCount) {
          const newParticles = [...prevParticles];
          for (let i = prevParticles.length; i < particleCount; i++) {
            newParticles.push({
              id: i,
              x: Math.random() * 100,
              y: Math.random() * 100,
              size: Math.random() * 2 + 0.5,
              speed: Math.random() * 0.5 + 0.1,
              opacity: Math.random() * 0.5 + 0.1
            });
          }
          return newParticles;
        } else {
          return prevParticles.slice(0, particleCount);
        }
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary-400/30 dark:bg-gray-300/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}rem`,
            height: `${particle.size}rem`,
            opacity: particle.opacity,
            filter: 'blur(0.6rem)',
            transition: 'left 3s ease, top 3s ease'
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundAnimation; 
import { useEffect, useState } from 'react';

const ShineEffect = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get mouse position relative to viewport
      const x = e.clientX;
      const y = e.clientY;
      
      setPosition({ x, y });
      setIsVisible(true);
    };

    // Throttle to improve performance
    let timeoutId: ReturnType<typeof setTimeout>;
    const throttledHandleMouseMove = (e: MouseEvent) => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          handleMouseMove(e);
          timeoutId = 0 as unknown as ReturnType<typeof setTimeout>;
        }, 50);
      }
    };

    window.addEventListener('mousemove', throttledHandleMouseMove);

    // Hide shine effect when mouse is inactive for a while
    const hideTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => {
      window.removeEventListener('mousemove', throttledHandleMouseMove);
      clearTimeout(hideTimeout);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div 
        className={`absolute w-[50rem] h-[50rem] rounded-full transition-opacity duration-1000 ${isVisible ? 'opacity-30' : 'opacity-0'}`}
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)',
          left: `${position.x - 350}px`,
          top: `${position.y - 350}px`,
          transition: 'left 1s ease-out, top 1s ease-out, opacity 1s ease'
        }}
      />
    </div>
  );
};

export default ShineEffect; 
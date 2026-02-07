import { useEffect, useRef } from 'react';

const WaveAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Make the canvas span the full width/height of the container
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Function to draw the wave
    const draw = () => {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Wave parameters
      const amplitude = canvas.height / 80; // Height of wave
      const wavelength = canvas.width / 3; // Length of wave
      const frequency = 0.5; // Speed of wave

      // Draw first wave
      ctx.beginPath();
      const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // Dark mode: gray waves, Light mode: blue waves with lighter opacity
      if (isDarkMode) {
        ctx.strokeStyle = 'rgba(75, 85, 99, 0.15)';
      } else {
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.12)';
      }
      
      ctx.lineWidth = 2;

      for (let x = 0; x < canvas.width; x++) {
        const y = amplitude * 
          Math.sin((x / wavelength) + time * frequency) + 
          (canvas.height / 2);
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Draw second wave (offset)
      ctx.beginPath();
      
      if (isDarkMode) {
        ctx.strokeStyle = 'rgba(75, 85, 99, 0.10)';
      } else {
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)';
      }
      
      ctx.lineWidth = 3;

      for (let x = 0; x < canvas.width; x++) {
        const y = (amplitude * 1.5) * 
          Math.sin((x / (wavelength * 0.8)) + time * frequency * 0.8) + 
          (canvas.height / 2 + 30);
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Increment time for animation
      time += 0.01;

      // Continue animation loop
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-20 w-full h-screen pointer-events-none opacity-50"
      aria-hidden="true"
    />
  );
};

export default WaveAnimation; 
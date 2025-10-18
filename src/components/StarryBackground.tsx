import React, { useEffect, useRef, useState } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  originalZ: number;
  size: number;
  opacity: number;
}

const StarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Initialize stars
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize canvas and stars
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Generate stars
    const starCount = 500;
    starsRef.current = Array.from({ length: starCount }, () => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      z: Math.random() * 1000,
      originalZ: Math.random() * 1000,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.7 + 0.3,
    }));
  }, [dimensions]);

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;

    const animate = () => {
      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, dimensions.width, dimensions.height);
      gradient.addColorStop(0, '#0a0e27');
      gradient.addColorStop(0.5, '#1a1a3e');
      gradient.addColorStop(1, '#0a0e27');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Calculate parallax offset
      const offsetX = (mouseRef.current.x - centerX) * 0.05;
      const offsetY = (mouseRef.current.y - centerY) * 0.05;

      // Draw stars with parallax effect
      starsRef.current.forEach((star) => {
        // Apply parallax based on depth
        const parallax = (star.originalZ / 1000) * 0.3;
        const x = star.x + offsetX * parallax;
        const y = star.y + offsetY * parallax;

        // Add slight vertical drift animation
        const drift = Math.sin(Date.now() * 0.0001 + star.z) * 10;
        const finalY = y + drift;

        // Draw star with glow
        const glowSize = star.size * 1.5;
        const glowGradient = ctx.createRadialGradient(x, finalY, 0, x, finalY, glowSize);
        glowGradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity * 0.8})`);
        glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = glowGradient;
        ctx.fillRect(x - glowSize, finalY - glowSize, glowSize * 2, glowSize * 2);

        // Draw core star
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(x, finalY, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Add subtle color variation based on depth
        if (star.z > 600) {
          const blueGradient = ctx.createRadialGradient(x, finalY, 0, x, finalY, star.size * 2);
          blueGradient.addColorStop(0, `rgba(173, 216, 255, ${star.opacity * 0.4})`);
          blueGradient.addColorStop(1, 'rgba(173, 216, 255, 0)');
          ctx.fillStyle = blueGradient;
          ctx.fillRect(x - star.size * 2, finalY - star.size * 2, star.size * 4, star.size * 4);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0"
      style={{ background: 'linear-gradient(135deg, #0a0e27 0%, #1a1a3e 50%, #0a0e27 100%)' }}
    />
  );
};

export default StarryBackground;

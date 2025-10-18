import React, { useEffect, useRef, useState } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  originalZ: number;
  size: number;
  opacity: number;
  color: string;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  color: string;
  opacity: number;
  speed: number;
}

const StarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const nebulasRef = useRef<Nebula[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const scrollRef = useRef({ y: 0 });

  // Initialize stars and nebulas
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

    // Generate stars with gold/white colors
    const starCount = 800;
    starsRef.current = Array.from({ length: starCount }, () => {
      const rand = Math.random();
      let color = 'rgba(255, 255, 255, 1)'; // White
      if (rand > 0.7) {
        color = 'rgba(255, 215, 0, 1)'; // Gold
      } else if (rand > 0.4) {
        color = 'rgba(255, 240, 200, 1)'; // Warm white
      }

      return {
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        z: Math.random() * 1000,
        originalZ: Math.random() * 1000,
        size: Math.random() * 2.5 + 0.3,
        opacity: Math.random() * 0.8 + 0.2,
        color,
      };
    });

    // Generate nebula clouds for space effect
    nebulasRef.current = [
      {
        x: dimensions.width * 0.3,
        y: dimensions.height * 0.2,
        radius: 300,
        color: 'rgba(180, 140, 40, 0.15)',
        opacity: 0.1,
        speed: 0.0001,
      },
      {
        x: dimensions.width * 0.7,
        y: dimensions.height * 0.6,
        radius: 350,
        color: 'rgba(139, 90, 20, 0.12)',
        opacity: 0.08,
        speed: 0.00015,
      },
      {
        x: dimensions.width * 0.5,
        y: dimensions.height * 0.8,
        radius: 400,
        color: 'rgba(184, 134, 11, 0.1)',
        opacity: 0.07,
        speed: 0.00008,
      },
    ];
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

  // Handle scroll for zoom effect
  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current.y = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    let time = 0;

    const animate = () => {
      time += 0.016; // Assuming ~60fps

      // Create radial gradient for deep space background
      const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(dimensions.width, dimensions.height));
      bgGradient.addColorStop(0, '#1a1410');
      bgGradient.addColorStop(0.3, '#0d0a08');
      bgGradient.addColorStop(1, '#000000');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Draw nebula clouds
      nebulasRef.current.forEach((nebula) => {
        const nebulaGradient = ctx.createRadialGradient(nebula.x, nebula.y, 0, nebula.x, nebula.y, nebula.radius);
        nebulaGradient.addColorStop(0, nebula.color);
        nebulaGradient.addColorStop(0.5, nebula.color.replace(/[\d.]+\)/, '0.06)'));
        nebulaGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = nebulaGradient;
        ctx.fillRect(nebula.x - nebula.radius, nebula.y - nebula.radius, nebula.radius * 2, nebula.radius * 2);
      });

      // Calculate parallax offset
      const offsetX = (mouseRef.current.x - centerX) * 0.08;
      const offsetY = (mouseRef.current.y - centerY) * 0.08;

      // Draw stars with parallax and twinkling
      starsRef.current.forEach((star) => {
        // Apply parallax based on depth
        const parallax = (star.originalZ / 1000) * 0.4;
        const x = star.x + offsetX * parallax;
        const y = star.y + offsetY * parallax;

        // Add twinkling animation
        const twinkle = Math.sin(time * 2 + star.z) * 0.3 + 0.7;
        const drift = Math.sin(time * 0.3 + star.z) * 15;
        const finalY = y + drift;

        // Draw star with golden glow
        const glowSize = star.size * 2.5 * twinkle;
        const glowGradient = ctx.createRadialGradient(x, finalY, 0, x, finalY, glowSize);
        const glowColor = star.color.replace(/[\d.]+\)/, (match) => {
          return (parseFloat(match) * 0.3 * twinkle).toString() + ')';
        });
        glowGradient.addColorStop(0, glowColor);
        glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = glowGradient;
        ctx.fillRect(x - glowSize, finalY - glowSize, glowSize * 2, glowSize * 2);

        // Draw core star
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.opacity * twinkle;
        ctx.beginPath();
        ctx.arc(x, finalY, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        // Add subtle cross for golden stars
        if (star.color.includes('215, 0')) {
          ctx.strokeStyle = star.color;
          ctx.globalAlpha = 0.6 * twinkle;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(x - star.size * 2, finalY);
          ctx.lineTo(x + star.size * 2, finalY);
          ctx.moveTo(x, finalY - star.size * 2);
          ctx.lineTo(x, finalY + star.size * 2);
          ctx.stroke();
          ctx.globalAlpha = 1;
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
      style={{
        background: 'radial-gradient(ellipse at center, #1a1410 0%, #0d0a08 30%, #000000 100%)',
      }}
    />
  );
};

export default StarryBackground;

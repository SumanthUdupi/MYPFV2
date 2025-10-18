import React, { useEffect, useState } from 'react';

interface TrailPosition {
  x: number;
  y: number;
}

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState<TrailPosition[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const newTrail = { x: e.clientX, y: e.clientY };
      setTrails(prevTrails => [...prevTrails, newTrail].slice(-10)); // Shorter trail
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="custom-cursor" style={{ left: `${position.x}px`, top: `${position.y}px` }} />
      {trails.map((trail, index) => (
        <div
          key={index}
          className="cursor-trail"
          style={{
            left: `${trail.x}px`,
            top: `${trail.y}px`,
            transition: `opacity ${0.3 + index * 0.03}s, transform ${0.3 + index * 0.03}s`,
            opacity: `${1 - (trails.length - index) / trails.length}`,
            transform: `scale(${1 - (trails.length - index) / trails.length})`,
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
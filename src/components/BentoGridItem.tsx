import React, { useRef, useState } from 'react';

interface BentoGridItemProps {
  className?: string;
  title: string;
  description: string;
  image: string;
}

const BentoGridItem: React.FC<BentoGridItemProps> = ({
  className,
  title,
  description,
  image,
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
      className={`relative overflow-hidden rounded-lg bg-secondary p-4 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,182,193,.1), transparent 40%)`,
        }}
      />
      <img src={image} alt={title} className="w-full h-32 object-cover rounded-lg mb-4" />
      <h3 className="text-xl font-bold text-primary">{title}</h3>
      <p className="text-primary">{description}</p>
    </div>
  );
};

export default BentoGridItem;
import React from 'react';
import { useDirectionalHover } from '../hooks/useDirectionalHover';
import './BentoGridItem.css';

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
  const { ref, hovering, direction } = useDirectionalHover();

  const getOverlayClass = () => {
    if (hovering) {
      return 'in';
    }
    return `out-${direction}`;
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-lg bg-secondary p-4 ${className}`}
      style={{ '--accent-color': 'rgba(255, 182, 193, 0.8)' } as React.CSSProperties}
    >
      <div className={`overlay ${getOverlayClass()}`} />
      <div className="relative z-20">
        <img src={image} alt={title} className="w-full h-32 object-cover rounded-lg mb-4" />
        <h3 className="text-xl font-bold">
          <span>{title}</span>
        </h3>
        <p className="text-white">{description}</p>
      </div>
    </div>
  );
};

export default BentoGridItem;
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
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 hover:border-accent/40 p-6 transition-all duration-300 group cursor-pointer ${className}`}
      style={{ '--accent-color': 'rgba(0, 212, 255, 0.6)' } as React.CSSProperties}
    >
      <div className={`overlay ${getOverlayClass()}`} />
      <div className="relative z-20 h-full flex flex-col">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-lg mb-4 transition-transform duration-300 group-hover:scale-110"
        />
        <h3 className="text-xl font-bold text-accent-light mb-2 group-hover:text-accent-light transition-colors">
          <span>{title}</span>
        </h3>
        <p className="text-secondary/70 text-sm flex-grow group-hover:text-secondary/80 transition-colors">
          {description}
        </p>
        <div className="mt-4 pt-4 border-t border-accent/20 group-hover:border-accent/40 transition-colors">
          <button className="text-accent text-sm font-semibold hover:text-accent-light transition-colors">
            Learn More →
          </button>
        </div>
      </div>
    </div>
  );
};

export default BentoGridItem;

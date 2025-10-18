import React from 'react';
import { useDirectionalHover } from '../hooks/useDirectionalHover';
import { useTilt3D } from '../hooks/useTilt3D';
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
  const { ref: hoverRef, hovering, direction } = useDirectionalHover();
  const { ref: tiltRef, transform } = useTilt3D();

  const getOverlayClass = () => {
    if (hovering) {
      return 'in';
    }
    return `out-${direction}`;
  };

  return (
    <div
      ref={tiltRef}
      style={{ transform }}
      className="h-full transition-transform duration-100"
    >
      <div
        ref={hoverRef}
        className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-accent/15 to-accent/5 border border-accent/30 hover:border-accent/70 p-6 transition-all duration-300 group cursor-pointer h-full shadow-lg hover:shadow-2xl hover:shadow-accent/20 ${className}`}
        style={{ '--accent-color': 'rgba(212, 175, 55, 0.6)' } as React.CSSProperties}
      >
        <div className={`overlay ${getOverlayClass()}`} />
        <div className="relative z-20 h-full flex flex-col">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover rounded-lg mb-4 transition-transform duration-300 group-hover:scale-125"
          />
          <h3 className="text-xl font-bold text-accent-light mb-2 group-hover:text-accent transition-colors">
            <span>{title}</span>
          </h3>
          <p className="text-secondary/70 text-sm flex-grow group-hover:text-secondary transition-colors">
            {description}
          </p>
          <div className="mt-4 pt-4 border-t border-accent/20 group-hover:border-accent/50 transition-colors">
            <button className="text-accent text-sm font-semibold hover:text-accent-light transition-colors group-hover:translate-x-1 inline-block">
              Learn More →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoGridItem;

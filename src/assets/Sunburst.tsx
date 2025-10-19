import React from 'react';

const Sunburst: React.FC = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style={{ stopColor: 'rgba(212, 175, 55, 0.3)', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'rgba(212, 175, 55, 0)', stopOpacity: 1 }} />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="100" height="100" fill="url(#grad1)" />
      {[...Array(24)].map((_, i) => (
        <line
          key={i}
          x1="50"
          y1="50"
          x2="50"
          y2="0"
          stroke="rgba(212, 175, 55, 0.1)"
          strokeWidth="0.5"
          transform={`rotate(${i * 15}, 50, 50)`}
        />
      ))}
    </svg>
  );
};

export default Sunburst;

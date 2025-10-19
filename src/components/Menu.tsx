import React from 'react';

const Menu: React.FC<{ open: boolean; setOpen: (open: boolean) => void }> = ({ open, setOpen }) => {
  return (
    <button onClick={() => setOpen(!open)} className="md:hidden z-50">
      <svg width="23" height="23" viewBox="0 0 23 23">
        <path
          fill="transparent"
          strokeWidth="3"
          stroke="var(--shimmering-silver)"
          strokeLinecap="round"
          d={open ? "M 3 16.5 L 17 2.5" : "M 2 9.423 L 20 9.423"}
        />
        <path
          fill="transparent"
          strokeWidth="3"
          stroke="var(--shimmering-silver)"
          strokeLinecap="round"
          d="M 2 16.346 L 20 16.346"
        />
      </svg>
    </button>
  );
};

export default Menu;

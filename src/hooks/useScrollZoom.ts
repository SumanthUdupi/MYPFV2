import { useEffect, useState } from 'react';

export const useScrollZoom = () => {
  const [scale, setScale] = useState(1);
  const [scrollDepth, setScrollDepth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
      
      // Scale from 1 to 0.95 as you scroll down, then back up
      const baseScale = 1 - scrollPercent * 0.08;
      setScale(Math.max(baseScale, 0.92));
      setScrollDepth(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scale, scrollDepth };
};

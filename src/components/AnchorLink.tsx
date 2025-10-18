import React from 'react';

interface AnchorLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onMouseEnter?: () => void;
}

const AnchorLink: React.FC<AnchorLinkProps> = ({ href, children, className, onMouseEnter }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className} onMouseEnter={onMouseEnter}>
      {children}
    </a>
  );
};

export default AnchorLink;

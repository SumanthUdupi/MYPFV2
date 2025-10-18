import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useMagneticEffect } from '../hooks/useMagneticEffect';
import AnchorLink from './AnchorLink';

interface MagneticLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

const MagneticLink: React.FC<MagneticLinkProps> = ({ href, children, className }) => {
  const { x, y, handleMouseMove, handleMouseEnter, handleMouseLeave } = useMagneticEffect();

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ x, y, display: 'inline-block' }}
      className="relative"
      data-interactive
    >
      <AnchorLink href={href} className={className}>
        {children}
      </AnchorLink>
    </motion.div>
  );
};

export default MagneticLink;

import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import useMagneticEffect from '../hooks/useMagneticEffect';
import useSound from '../hooks/useSound';

const Footer: React.FC = () => {
  const githubRef = useMagneticEffect<HTMLAnchorElement>();
  const linkedinRef = useMagneticEffect<HTMLAnchorElement>();
  const twitterRef = useMagneticEffect<HTMLAnchorElement>();
  const playHoverSound = useSound(660, 0.05, 0.1);

  return (
    <footer className="text-center p-4 bg-primary text-secondary">
      <div className="flex justify-center space-x-4 mb-4">
        <a ref={githubRef} href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-accent transform hover:scale-125 transition-transform duration-300 inline-block" onMouseEnter={playHoverSound}>
          <FaGithub size={24} />
        </a>
        <a ref={linkedinRef} href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-accent transform hover:scale-125 transition-transform duration-300 inline-block" onMouseEnter={playHoverSound}>
          <FaLinkedin size={24} />
        </a>
        <a ref={twitterRef} href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-accent transform hover:scale-125 transition-transform duration-300 inline-block" onMouseEnter={playHoverSound}>
          <FaTwitter size={24} />
        </a>
      </div>
      <p>&copy; 2024 Jules. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
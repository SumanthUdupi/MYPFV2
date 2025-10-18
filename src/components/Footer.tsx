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
    <footer className="relative border-t border-accent/20 bg-primary/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          <div>
            <h3 className="text-accent-light font-bold mb-4">Navigation</h3>
            <ul className="space-y-2 text-secondary/70 text-sm">
              <li><a href="#hero" className="hover:text-accent transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-accent transition-colors">About</a></li>
              <li><a href="#projects" className="hover:text-accent transition-colors">Projects</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-accent-light font-bold mb-4">Social</h3>
            <div className="flex gap-4">
              <a ref={githubRef} href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg bg-accent/10 hover:bg-accent/20 text-secondary hover:text-accent-light transition-all duration-300 transform hover:scale-110" onMouseEnter={playHoverSound}>
                <FaGithub size={20} />
              </a>
              <a ref={linkedinRef} href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg bg-accent/10 hover:bg-accent/20 text-secondary hover:text-accent-light transition-all duration-300 transform hover:scale-110" onMouseEnter={playHoverSound}>
                <FaLinkedin size={20} />
              </a>
              <a ref={twitterRef} href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg bg-accent/10 hover:bg-accent/20 text-secondary hover:text-accent-light transition-all duration-300 transform hover:scale-110" onMouseEnter={playHoverSound}>
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-accent-light font-bold mb-4">Contact</h3>
            <p className="text-secondary/70 text-sm">
              <a href="mailto:jules@example.com" className="hover:text-accent transition-colors">jules@example.com</a>
            </p>
          </div>
        </div>
        <div className="border-t border-accent/10 pt-8 text-center">
          <p className="text-secondary/60 text-sm">&copy; 2024 Jules. All rights reserved.</p>
          <p className="text-secondary/50 text-xs mt-2">Crafted with care and powered by modern web technologies</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

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
    <footer className="relative border-t border-accent/40 bg-primary/60 backdrop-blur-md shadow-2xl shadow-accent/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          <div className="fade-in-up">
            <h3 className="text-accent-light font-bold mb-4 text-lg">Navigation</h3>
            <ul className="space-y-2 text-secondary/70 text-sm">
              <li><a href="#hero" className="hover:text-accent hover:translate-x-1 transition-all duration-300 inline-block">Home</a></li>
              <li><a href="#about" className="hover:text-accent hover:translate-x-1 transition-all duration-300 inline-block">About</a></li>
              <li><a href="#projects" className="hover:text-accent hover:translate-x-1 transition-all duration-300 inline-block">Projects</a></li>
              <li><a href="#contact" className="hover:text-accent hover:translate-x-1 transition-all duration-300 inline-block">Contact</a></li>
            </ul>
          </div>
          <div className="fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-accent-light font-bold mb-4 text-lg">Social</h3>
            <div className="flex gap-4">
              <a ref={githubRef} href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-3 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 hover:from-accent/40 hover:to-accent/20 text-secondary hover:text-accent-light transition-all duration-300 transform hover:scale-125 shadow-lg hover:shadow-accent/30" onMouseEnter={playHoverSound}>
                <FaGithub size={20} />
              </a>
              <a ref={linkedinRef} href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-3 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 hover:from-accent/40 hover:to-accent/20 text-secondary hover:text-accent-light transition-all duration-300 transform hover:scale-125 shadow-lg hover:shadow-accent/30" onMouseEnter={playHoverSound}>
                <FaLinkedin size={20} />
              </a>
              <a ref={twitterRef} href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="p-3 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 hover:from-accent/40 hover:to-accent/20 text-secondary hover:text-accent-light transition-all duration-300 transform hover:scale-125 shadow-lg hover:shadow-accent/30" onMouseEnter={playHoverSound}>
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
          <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-accent-light font-bold mb-4 text-lg">Contact</h3>
            <p className="text-secondary/70 text-sm">
              <a href="mailto:jules@example.com" className="hover:text-accent transition-colors">jules@example.com</a>
            </p>
          </div>
        </div>
        <div className="border-t border-accent/20 pt-8 text-center">
          <p className="text-secondary/60 text-sm">&copy; 2024 Jules. All rights reserved.</p>
          <p className="text-secondary/50 text-xs mt-2">Crafted with care and powered by modern web technologies</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

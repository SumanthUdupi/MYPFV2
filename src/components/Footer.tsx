import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com' },
    { icon: FaLinkedin, href: 'https://linkedin.com' },
    { icon: FaTwitter, href: 'https://twitter.com' },
  ];

  return (
    <footer className="relative z-10 border-t border-white/10 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-text/50 text-sm">
          &copy; {new Date().getFullYear()} Sumanth Udupi. All rights reserved.
        </p>
        <div className="flex gap-6">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text/60 hover:text-accent transition-colors duration-300"
              data-interactive
            >
              <link.icon size={22} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
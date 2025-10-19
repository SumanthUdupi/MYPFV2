import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center py-12 mt-24 border-t border-secondary/10">
      <p className="text-secondary/50 text-sm">
        &copy; {new Date().getFullYear()} Suman. Designed & Built with the Lumina Machine.
      </p>
    </footer>
  );
};

export default Footer;
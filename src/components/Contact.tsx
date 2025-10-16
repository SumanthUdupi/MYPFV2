import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="p-10 bg-secondary">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">Contact Me</h2>
      <div className="text-center">
        <p className="mb-4 text-primary">
          I'm currently available for freelance work. If you have a project in mind, please don't hesitate to get in touch.
        </p>
        <a href="mailto:jules@example.com" className="bg-primary text-secondary px-6 py-3 rounded-lg hover:bg-accent hover:text-primary">
          Email Me
        </a>
      </div>
    </section>
  );
};

export default Contact;
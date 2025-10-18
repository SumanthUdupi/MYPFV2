import React from 'react';
import { motion } from 'framer-motion';

// Reusable Input component for the form
const Input = ({ type = 'text', name, label }: { type?: string, name: string, label: string }) => {
  const inputId = `input-${name}`;
  return (
    <div className="relative">
      <input
        type={type}
        id={inputId}
        name={name}
        className="w-full bg-transparent border-b-2 border-text/30 py-2 text-text placeholder-transparent focus:outline-none focus:border-accent transition-colors peer"
        placeholder={label}
        required
      />
      <label
        htmlFor={inputId}
        className="absolute left-0 -top-5 text-text/50 text-sm transition-all 
                   peer-placeholder-shown:text-base peer-placeholder-shown:text-text/70 
                   peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-accent 
                   peer-focus:text-sm"
      >
        {label}
      </label>
    </div>
  );
};

const Contact: React.FC = () => {
  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl w-full text-center">
        <h2 className="font-display text-5xl md:text-6xl text-accent mb-4">
          Get In Touch
        </h2>
        <p className="text-text/70 mb-12">
          Have a project in mind or just want to say hello?
        </p>

        <form action="#" method="POST" className="space-y-12 text-left">
          <Input name="name" label="Your Name" />
          <Input name="email" type="email" label="Your Email" />
          
          <div className="relative">
            <textarea
              id="input-message"
              name="message"
              rows={4}
              className="w-full bg-transparent border-b-2 border-text/30 py-2 text-text placeholder-transparent focus:outline-none focus:border-accent transition-colors peer"
              placeholder="Your Message"
              required
            />
            <label
              htmlFor="input-message"
              className="absolute left-0 -top-5 text-text/50 text-sm transition-all 
                         peer-placeholder-shown:text-base peer-placeholder-shown:text-text/70 
                         peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-accent 
                         peer-focus:text-sm"
            >
              Your Message
            </label>
          </div>

          <div className="text-center pt-6">
            <motion.button
              type="submit"
              className="px-10 py-3 font-display text-lg tracking-widest uppercase text-background bg-accent rounded-sm border-2 border-accent hover:bg-transparent hover:text-accent transition-all duration-300 ease-in-out"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-interactive
            >
              Send Message
            </motion.button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
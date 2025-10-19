import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const ParallaxSection = ({ imageUrl, children }) => {
  const sectionRef = useRef(null);

  // Track scroll progress relative to this specific section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"], // Animate from when the top of the section hits the bottom of the viewport to when the bottom hits the top
  });

  // Transform the scroll progress (0 to 1) into a vertical movement for the background (-20% to 20%)
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section
      ref={sectionRef}
      className="relative h-96 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          y: backgroundY, // Apply the parallax effect
        }}
      />
      <div className="absolute inset-0 z-10 bg-black/50" /> {/* Optional overlay for text readability */}
      <div className="relative z-20 flex h-full items-center justify-center">
        {children}
      </div>
    </section>
  );
};
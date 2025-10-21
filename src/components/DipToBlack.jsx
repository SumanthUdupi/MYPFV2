import { motion, useScroll, useTransform } from "framer-motion";

const DipToBlack = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 1, 0, 1, 0]
  );

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "black",
        opacity,
        zIndex: 999,
      }}
    />
  );
};

export default DipToBlack;

"use client";

import { motion, AnimatePresence } from "framer-motion";

const FormWrapper = ({ children }) => {
  const formVariants = {
    hidden: {
      opacity: 0,
      y: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute w-[min(95%,700px)] p-3 py-5 top-32 bg-[#faf0e4] z-50 rounded-md border border-white"
    >
      {children}
    </motion.div>
  );
};

export default FormWrapper;

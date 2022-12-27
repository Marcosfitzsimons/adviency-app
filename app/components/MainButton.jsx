"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import present from "../../public/assets/present.svg";

const MainButton = ({ setShowGift }) => {
  const [isAnimated, setIsAnimated] = useState(false);
  return (
    <motion.button
      type="button"
      onClick={() => setShowGift((prevV) => !prevV)}
      initial={false}
      animate={{
        scaleX: isAnimated ? 1.05 : 1,
      }}
      layout
      onHoverStart={() => setIsAnimated((prevV) => !prevV)}
      onHoverEnd={() => setIsAnimated((prevV) => !prevV)}
      className={`pl-3 border font-open-sans min-w-[160px] w-full max-w-[250px] font-medium rounded-md text-lg border-amber-900 text-amber-900 bg-[#fffbef] flex items-center gap-2 justify-center`}
    >
      Add Gift
      <Image
        src={present}
        alt="present"
        width="45"
        height="45"
        className={`relative right-1 transition ease ${
          isAnimated ? "rotate-6" : "rotate-0"
        }`}
      />
    </motion.button>
  );
};

export default MainButton;

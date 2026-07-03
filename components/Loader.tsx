"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
}

const FIRST = "Sai Meghana";
const LAST = "Barla";

export default function Loader({ onComplete }: LoaderProps) {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    // Total loader duration: ~2.6s before it exits
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const containerVariants = {
    exit: {
      y: "-100%",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const lineVariants = {
    hidden: { y: "110%" },
    visible: (i: number) => ({
      y: "0%",
      transition: {
        delay: 0.2 + i * 0.12,
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
    exit: (i: number) => ({
      y: "-110%",
      transition: {
        delay: i * 0.06,
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
      },
    }),
  };

  const progressVariants = {
    initial: { scaleX: 0 },
    animate: {
      scaleX: 1,
      transition: { duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0C0C0C]"
    >
        {/* Name lines */}
        <div className="overflow-hidden mb-1">
          <motion.h1
            custom={0}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-[clamp(2rem,6vw,5rem)] font-serif text-[#F5F0EA] leading-none tracking-tight"
          >
            {FIRST}
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            custom={1}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-[clamp(2rem,6vw,5rem)] font-serif text-[#C8A97E] leading-none tracking-tight"
          >
            {LAST}
          </motion.h1>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-10 left-0 right-0 px-8 md:px-16">
          <div className="w-full h-[1px] bg-[#1E1E1E] overflow-hidden">
            <motion.div
              className="h-full bg-[#C8A97E] origin-left"
              variants={progressVariants}
              initial="initial"
              animate="animate"
            />
          </div>
        </div>
    </motion.div>
  );
}

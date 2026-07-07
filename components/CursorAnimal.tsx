// components/CursorAnimal.tsx

"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CursorAnimal() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const smoothX = useSpring(mouseX, {
    stiffness: 180,
    damping: 22,
    mass: 0.4,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 180,
    damping: 22,
    mass: 0.4,
  });

  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isMoving, setIsMoving] = useState(false);
  const [lastX, setLastX] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleMouseMove = (event: MouseEvent) => {
      const offsetX = 24;
      const offsetY = 28;

      mouseX.set(event.clientX + offsetX);
      mouseY.set(event.clientY + offsetY);

      if (event.clientX > lastX) {
        setDirection("right");
      } else if (event.clientX < lastX) {
        setDirection("left");
      }

      setLastX(event.clientX);
      setIsMoving(true);

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsMoving(false);
      }, 150);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, [lastX, mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
      style={{
        x: smoothX,
        y: smoothY,
      }}
      animate={{
        rotate: isMoving ? [0, -4, 4, -2, 0] : 0,
        y: isMoving ? [0, -3, 0, -2, 0] : 0,
      }}
      transition={{
        duration: 0.35,
        repeat: isMoving ? Infinity : 0,
        ease: "easeInOut",
      }}
    >
      <motion.div
        animate={{
          scaleX: direction === "right" ? 1 : -1,
          scale: isMoving ? 1.05 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <Image
          src="/animal.gif"
          alt="cursor animal"
          width={72}
          height={72}
          priority
          unoptimized
          className="select-none"
        />
      </motion.div>
    </motion.div>
  );
}
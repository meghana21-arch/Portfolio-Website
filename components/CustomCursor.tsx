"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring following
  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only show on pointer: fine (desktop/trackpad)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleEnterLink = () => setIsHovering(true);
    const handleLeaveLink = () => setIsHovering(false);

    window.addEventListener("mousemove", handleMove);

    // Watch all interactive elements
    const interactables = document.querySelectorAll("a, button, [data-cursor='hover']");
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", handleEnterLink);
      el.addEventListener("mouseleave", handleLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnterLink);
        el.removeEventListener("mouseleave", handleLeaveLink);
      });
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] hidden md:block"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{
            width: isHovering ? 48 : 32,
            height: isHovering ? 48 : 32,
            opacity: isVisible ? 1 : 0,
            backgroundColor: isHovering ? "rgba(200,169,126,0.15)" : "transparent",
            borderColor: isHovering ? "#C8A97E" : "#F5F0EA",
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="rounded-full border flex items-center justify-center"
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 4 : 4,
            height: isHovering ? 4 : 4,
            opacity: isVisible ? 1 : 0,
            backgroundColor: isHovering ? "#C8A97E" : "#F5F0EA",
          }}
          transition={{ duration: 0.15 }}
          className="rounded-full"
        />
      </motion.div>
    </>
  );
}

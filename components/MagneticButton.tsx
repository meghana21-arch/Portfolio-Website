"use client";

import { useRef, type ReactNode } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  as?: "a" | "button";
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  onClick,
  href,
  target,
  rel,
  as: Tag = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ x, y }} className="inline-block">
      {Tag === "a" ? (
        <motion.a
          href={href}
          target={target}
          rel={rel}
          className={className}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => {}}
          onMouseLeave={handleMouseLeave}
          data-cursor="hover"
        >
          {children}
        </motion.a>
      ) : (
        <motion.button
          className={className}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={onClick}
          data-cursor="hover"
        >
          {children}
        </motion.button>
      )}
    </motion.div>
  );
}

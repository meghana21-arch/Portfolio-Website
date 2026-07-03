"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MagneticButton from "./MagneticButton";

const LINKS = [
  {
    label: "Email",
    href: "mailto:sbarla1@ufl.edu",
    external: false,
  },
  {
    label: "GitHub",
    href: "https://github.com/meghana21-arch",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/saimeghana-barla03",
    external: true,
  },
  {
    label: "Resume",
    href: "/resume.pdf",
    external: true,
  },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <footer
      id="contact"
      ref={ref}
      className="px-6 md:px-10 pt-24 pb-12 md:pt-36 md:pb-14 border-t border-[#1E1E1E] max-w-screen-xl mx-auto"
    >
      {/* Big closing statement */}
      <div className="mb-16 md:mb-24">
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.5rem,7vw,7rem)] font-serif text-[#F5F0EA] leading-[0.92] tracking-tight"
          >
            Let&apos;s build something
          </motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ delay: 0.12, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.5rem,7vw,7rem)] font-serif text-[#C8A97E] italic leading-[0.92] tracking-tight"
          >
            that scales.
          </motion.h2>
        </div>
      </div>

      {/* Link pills */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap gap-3 mb-16"
      >
        {LINKS.map((link) => (
          <MagneticButton
            key={link.label}
            as="a"
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className="px-6 py-3 rounded-full border border-[#2E2E2E] text-sm text-[#F5F0EA] hover:border-[#C8A97E] hover:text-[#C8A97E] transition-colors duration-300"
          >
            {link.label}
          </MagneticButton>
        ))}
      </motion.div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8 border-t border-[#1A1A1A]"
      >
        <p className="text-xs text-[#3A3A3A] font-mono">
          © {new Date().getFullYear()} Sai Meghana Barla
        </p>
        <p className="text-xs text-[#3A3A3A] font-mono">
          Gainesville / San Francisco
        </p>
      </motion.div>
    </footer>
  );
}

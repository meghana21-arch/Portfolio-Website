"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] px-6 md:px-10 py-5 flex items-center justify-between transition-colors duration-500 ${
        scrolled ? "bg-[#0C0C0C]/90 backdrop-blur-md border-b border-[#1E1E1E]" : ""
      }`}
    >
      {/* Logo / name */}
      <MagneticButton as="a" href="/" className="text-sm font-medium text-[#F5F0EA] tracking-wide">
        SMB
      </MagneticButton>

      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <MagneticButton
            key={link.href}
            as="a"
            href={link.href}
            className="text-sm text-[#6B6B6B] hover:text-[#F5F0EA] transition-colors duration-300"
          >
            {link.label}
          </MagneticButton>
        ))}
      </nav>

      {/* CTA */}
      <MagneticButton
        as="a"
        href="mailto:saikiranannam54@gmail.com"
        className="text-sm font-medium px-5 py-2 rounded-full border border-[#2E2E2E] text-[#F5F0EA] hover:border-[#C8A97E] hover:text-[#C8A97E] transition-colors duration-300"
      >
        Get in touch
      </MagneticButton>
    </motion.header>
  );
}

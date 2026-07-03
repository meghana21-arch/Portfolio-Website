"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export interface Project {
  index: string;        // "01", "02", etc.
  title: string;
  description: string;
  tags: string[];
  href?: string;
}

interface ProjectCardProps {
  project: Project;
  delay?: number;
}

export default function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="hover"
      className="group relative border-t border-[#1E1E1E] py-8 md:py-10 grid md:grid-cols-[5rem_1fr_auto] gap-6 md:gap-10 items-start cursor-pointer"
    >
      {/* Index */}
      <span className="text-xs text-[#3A3A3A] font-mono pt-1 select-none">{project.index}</span>

      {/* Content */}
      <div className="min-w-0">
        <div className="overflow-hidden mb-3">
          <motion.h3
            animate={{ y: hovered ? -4 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(1.4rem,2.8vw,2.2rem)] font-serif text-[#F5F0EA] leading-tight tracking-tight"
          >
            {project.title}
          </motion.h3>
        </div>

        <motion.p
          animate={{ opacity: hovered ? 1 : 0.55 }}
          transition={{ duration: 0.3 }}
          className="text-sm md:text-base text-[#6B6B6B] leading-relaxed max-w-2xl"
        >
          {project.description}
        </motion.p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[11px] rounded-full bg-[#141414] border border-[#2A2A2A] text-[#555] font-mono tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Arrow */}
      <motion.div
        animate={{
          x: hovered ? 0 : -8,
          opacity: hovered ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="self-center text-[#C8A97E] hidden md:block"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M4 10h12M10 4l6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Hover line accent */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-[1px] bg-[#C8A97E] origin-left"
      />
    </motion.div>
  );
}

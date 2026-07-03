"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SKILLS = [
  "AI Agent Infrastructure",
  "Backend Systems",
  "Distributed Workflows",
  "LLM Evals",
  "Observability",
  "Developer Tools",
];

export default function AboutPreview() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="px-6 md:px-10 py-24 md:py-36 max-w-screen-xl mx-auto">
      <div className="grid md:grid-cols-[1fr_1.4fr] gap-16 md:gap-24 items-start">
        {/* Left column */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.15em] text-[#6B6B6B] mb-6"
          >
            About
          </motion.p>

          {/* Skill tags */}
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="px-3 py-1.5 text-xs rounded-full border border-[#2E2E2E] text-[#6B6B6B] hover:border-[#C8A97E] hover:text-[#C8A97E] transition-colors duration-300"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Right column — body text */}
        <div className="overflow-hidden">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(1.25rem,2.5vw,2rem)] text-[#F5F0EA] leading-[1.45] font-light"
          >
            I&apos;m a software engineer who enjoys turning complex systems into
            reliable products. My work sits at the intersection of{" "}
            <span className="text-[#C8A97E] font-normal">AI agents</span>,{" "}
            <span className="text-[#C8A97E] font-normal">backend engineering</span>,{" "}
            distributed workflows, and production-grade developer tools.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-8"
          >
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="inline-flex items-center gap-3 text-sm text-[#6B6B6B] hover:text-[#F5F0EA] transition-colors duration-300 group"
            >
              <span className="w-8 h-[1px] bg-current transition-all duration-300 group-hover:w-12" />
              View Resume
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

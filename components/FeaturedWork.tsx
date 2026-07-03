"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ProjectCard, { type Project } from "./ProjectCard";

// ────────────────────────────────────────────────────────────
// Edit your projects here — no need to touch the component logic
// ────────────────────────────────────────────────────────────
const PROJECTS: Project[] = [
  {
    index: "01",
    title: "AgentOps Runtime",
    description:
      "Durable execution layer for AI agent loops with retries, crash recovery, state persistence, observability, and evaluation traces.",
    tags: ["AI Agents", "Durable Execution", "Go", "TypeScript", "PostgreSQL"],
    href: "https://github.com",
  },
  {
    index: "02",
    title: "AgentForge",
    description:
      "Marketplace for installable AI agents, reusable skills, tools, and memory modules across model providers.",
    tags: ["AI Marketplace", "Claude", "Tools", "Memory", "Next.js"],
    href: "https://github.com",
  },
  {
    index: "03",
    title: "LLM Evals Platform",
    description:
      "Annotation queue and evaluation dashboard for comparing LLM outputs, traces, and scoring workflows.",
    tags: ["LLM Evals", "Human Feedback", "React", "Python", "AWS"],
    href: "https://github.com",
  },
];

export default function FeaturedWork() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="work" className="px-6 md:px-10 py-12 md:py-20 max-w-screen-xl mx-auto">
      {/* Section header */}
      <div ref={headerRef} className="flex items-end justify-between mb-2">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.15em] text-[#6B6B6B]"
        >
          Selected Work
        </motion.p>
        <motion.a
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          href="https://github.com/saimeghanab"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hover"
          className="text-xs text-[#6B6B6B] hover:text-[#F5F0EA] transition-colors duration-300 underline underline-offset-4"
        >
          All projects →
        </motion.a>
      </div>

      {/* Project list */}
      <div>
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.index}
            project={project}
            delay={i * 0.08}
          />
        ))}
        {/* Final bottom border */}
        <div className="border-t border-[#1E1E1E]" />
      </div>
    </section>
  );
}

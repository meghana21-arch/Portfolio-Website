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
    title: "TrueCaptcha.org",
    description:
      "Co-founded and scaled a production AI SaaS platform to 1M+ daily API requests with a 2.8M peak — generating ~$20K revenue. Reduced end-to-end API latency from ~7s to ~1s via Redis caching, async worker queues, horizontal scaling, and distributed processing pipelines.",
    tags: ["SaaS", "Distributed Systems", "Redis", "OCR", "99.99% Uptime"],
    href: "https://truecaptcha.org",
  },
  {
    index: "02",
    title: "AgentOps Runtime",
    description:
      "Durable execution runtime for Claude-powered agent loops, handling 1,000+ simulated multi-step tasks. PostgreSQL-backed state machine with transactional event persistence preventing state corruption across 100+ simulated crashes. Redis retry queues, idempotency keys, and exponential backoff.",
    tags: ["TypeScript", "Go", "PostgreSQL", "Redis", "Docker", "AWS", "Claude API"],
    href: "https://github.com/meghana21-arch",
  },
  {
    index: "03",
    title: "HPC Workflow Orchestrator",
    description:
      "Distributed workflow orchestration system at UF supporting 1K+ users and daily HPC job execution. Built an ML-driven scheduler to reduce job wait times and improve cluster utilization, plus a full-stack React UI that reduced setup time by ~90%.",
    tags: ["Distributed Systems", "ML Scheduling", "React", "HPC", "Research"],
    href: "https://github.com/meghana21-arch",
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
          href="https://github.com/meghana21-arch"
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

"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import ArchitectureFlow, { type FlowNode } from "./ArchitectureFlow";

// ─── Project data ─────────────────────────────────────────────────────────────

interface Project {
  index: string;
  title: string;
  problem: string;
  system: string;
  impact: string;
  tags: string[];
  href: string;
  flow: FlowNode[];
}

const PROJECTS: Project[] = [
  {
    index: "01",
    title: "AgentOps Runtime",
    problem:
      "Agent loops fail silently. State, retries, and tool calls have no durability — a crash loses everything.",
    system:
      "Durable execution layer with a PostgreSQL-backed state machine, transactional event persistence, Redis retry queues, idempotency keys, and exponential backoff. Handles 1,000+ simulated multi-step tasks and 100+ crash scenarios without state corruption.",
    impact:
      "Turns fragile one-shot prompting into reliable, inspectable, production-grade agent loops.",
    tags: ["Go", "TypeScript", "PostgreSQL", "Redis", "Docker", "AWS", "Claude API"],
    href: "https://github.com/meghana21-arch",
    flow: [
      { label: "User Goal" },
      { label: "Agent Loop", accent: true },
      { label: "Tool Call" },
      { label: "State Store", accent: true },
      { label: "Retry Engine" },
      { label: "Trace Dashboard", accent: true },
    ],
  },
  {
    index: "02",
    title: "TrueCaptcha.org",
    problem:
      "CAPTCHA verification at scale is slow and unreliable. Existing solutions had ~7 s latency at peak load.",
    system:
      "Co-founded and scaled a production AI SaaS. Redis caching, async worker queues, horizontal scaling, and distributed OCR pipelines reduced end-to-end latency from ~7 s to ~1 s. Reached 2.8 M peak daily requests.",
    impact:
      "1 M+ daily API requests · 99.99% uptime · ~$20 K revenue · trusted by thousands of developers.",
    tags: ["SaaS", "Distributed Systems", "Redis", "OCR", "FastAPI"],
    href: "https://truecaptcha.org",
    flow: [
      { label: "Request" },
      { label: "Load Balancer" },
      { label: "Redis Cache", accent: true },
      { label: "OCR Worker" },
      { label: "Response", accent: true },
    ],
  },
  {
    index: "03",
    title: "HPC Workflow Orchestrator",
    problem:
      "HPC job setup for 1 K+ users is manual, error-prone, and opaque — no visibility into queue state or scheduling efficiency.",
    system:
      "Distributed workflow orchestration with an ML-driven scheduler that predicts job wait times and optimises cluster utilisation. Full-stack React UI replaces CLI configuration.",
    impact:
      "~90% reduction in setup time · improved cluster utilisation · daily job execution at UF research scale.",
    tags: ["Distributed Systems", "ML Scheduling", "React", "HPC", "Research"],
    href: "https://github.com/meghana21-arch",
    flow: [
      { label: "Job Submission" },
      { label: "ML Scheduler", accent: true },
      { label: "Queue" },
      { label: "HPC Cluster" },
      { label: "Results", accent: true },
    ],
  },
];

// ─── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="border-t border-[#1E1E1E] py-8 md:py-10"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-6 mb-6">
        <div className="flex items-start gap-5 flex-1 min-w-0">
          <span className="text-[11px] font-mono text-[#3A3A3A] mt-1 flex-shrink-0">
            {project.index}
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg md:text-xl font-medium text-[#F5F0EA] mb-1">
              {project.title}
            </h3>
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 text-[10px] font-mono rounded border border-[#2A2A2A] text-[#4A4A4A]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Expand / collapse toggle */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex-shrink-0 w-8 h-8 rounded-full border border-[#2A2A2A] flex items-center justify-center text-[#6B6B6B] hover:border-[#C8A97E] hover:text-[#C8A97E] transition-colors duration-200 mt-0.5"
          aria-label={expanded ? "Collapse" : "Expand"}
        >
          <motion.svg
            width="10" height="10" viewBox="0 0 10 10"
            animate={{ rotate: expanded ? 45 : 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </motion.svg>
        </button>
      </div>

      {/* Architecture flow — always visible */}
      <div className="ml-9 mb-5">
        <ArchitectureFlow nodes={project.flow} />
      </div>

      {/* Expandable case-study layers */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="case"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="ml-9 grid md:grid-cols-3 gap-6 py-4 border-t border-[#1A1A1A]">
              {/* Problem */}
              <CaseLayer
                label="Problem"
                text={project.problem}
                delay={0}
                color="#FF6B6B"
              />
              {/* System */}
              <CaseLayer
                label="System"
                text={project.system}
                delay={0.06}
                color="#6B9FFF"
              />
              {/* Impact */}
              <CaseLayer
                label="Impact"
                text={project.impact}
                delay={0.12}
                color="#C8A97E"
                accent
              />
            </div>

            {/* Link */}
            <div className="ml-9 mt-2">
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-[#6B6B6B] hover:text-[#C8A97E] transition-colors duration-200 group"
              >
                <span className="w-6 h-px bg-current transition-all duration-300 group-hover:w-10" />
                View project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CaseLayer({
  label,
  text,
  delay,
  color,
  accent,
}: {
  label: string;
  text: string;
  delay: number;
  color: string;
  accent?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
    >
      <p
        className="text-[10px] font-mono uppercase tracking-[0.12em] mb-2"
        style={{ color }}
      >
        {label}
      </p>
      <p
        className={`text-sm leading-relaxed ${
          accent ? "text-[#C8A97E]" : "text-[#6B6B6B]"
        }`}
      >
        {text}
      </p>
    </motion.div>
  );
}

// ─── FeaturedWork ─────────────────────────────────────────────────────────────

export default function FeaturedWork() {
  const headerRef  = useRef<HTMLDivElement>(null);
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
          className="text-xs text-[#6B6B6B] hover:text-[#F5F0EA] transition-colors duration-300 underline underline-offset-4"
        >
          All projects →
        </motion.a>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={headerInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="text-[11px] text-[#3A3A3A] font-mono mb-2"
      >
        ↗ click + to expand each project
      </motion.p>

      {/* Project list */}
      <div>
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.index} project={project} delay={i * 0.06} />
        ))}
        <div className="border-t border-[#1E1E1E]" />
      </div>
    </section>
  );
}

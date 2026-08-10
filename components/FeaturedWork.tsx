"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import ArchitectureFlow, { type FlowNode } from "./ArchitectureFlow";

// ─── Project data ─────────────────────────────────────────────────────────────

interface Project {
  title: string;
  description: string;
  highlights: string[];
  tech: string[];
  href: string;
  flow: FlowNode[];
}

const PROJECTS: Project[] = [
  {
    title: "AgentOps Runtime",
    description:
      "Durable execution layer for AI agent loops — state, retries, and tool calls survive a crash instead of disappearing silently.",
    highlights: [
      "PostgreSQL-backed state machine with transactional event persistence",
      "Redis retry queues with idempotency keys and exponential backoff",
      "Validated against 1,000+ simulated multi-step tasks and 100+ crash scenarios without state corruption",
    ],
    tech: ["Go", "TypeScript", "PostgreSQL", "Redis", "Docker", "AWS", "Claude API"],
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
    title: "TrueCaptcha.org",
    description:
      "Co-founded and scaled a production AI SaaS for automated CAPTCHA solving via OCR/ML — from prototype to real production traffic.",
    highlights: [
      "Reduced end-to-end latency from ~7s to ~1s via Redis caching and async worker queues",
      "Scaled to 2.8M peak daily requests and 1M+ daily API requests at 99.99% uptime",
      "Generated ~$20K in revenue, trusted by thousands of developers",
    ],
    tech: ["Python", "FastAPI", "Redis", "OCR", "Distributed Systems"],
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
    title: "Lamprotech.com",
    description:
      "SaaS platform for browser automation via natural language — an LLM-powered engine that turns plain-English commands into automated browser actions.",
    highlights: [
      "LLM-driven browser automation from natural language commands",
      "Production Chrome extension backed by a TypeScript/Go service processing 50K+ tokens daily",
      "200+ active users generating $1K+ in monthly recurring revenue",
    ],
    tech: ["TypeScript", "Next.js", "Go", "AWS", "Redis"],
    href: "https://lamprotech.com/",
    flow: [
      { label: "NL Command" },
      { label: "LLM Engine", accent: true },
      { label: "Automation Layer" },
      { label: "Chrome Extension", accent: true },
      { label: "Result" },
    ],
  },
  {
    title: "HPC Workflow Orchestrator",
    description:
      "Distributed workflow orchestration platform replacing manual, error-prone HPC job setup for 1,000+ research users.",
    highlights: [
      "ML-driven scheduler predicts job wait times and optimizes cluster utilization",
      "Full-stack React UI replaces opaque CLI configuration",
      "~90% reduction in job setup time at University of Florida research scale",
    ],
    tech: ["Distributed Systems", "ML Scheduling", "React", "HPC", "Research"],
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

const TECH_COLORS = ["text-accent border-accent/30 bg-accent/[0.06]", "text-accent2 border-accent2/30 bg-accent2/[0.06]", "text-accent3 border-accent3/30 bg-accent3/[0.06]"];

// ─── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-100px" });
  const reduced = useReducedMotion();
  const reversed = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-surface border border-border rounded-lg overflow-hidden group"
    >
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Text column */}
        <div className={`p-8 lg:p-12 flex flex-col justify-center ${reversed ? "lg:order-2" : ""}`}>
          <div className="flex items-start justify-between gap-4 mb-4">
            <h3 className="text-2xl md:text-3xl font-serif text-ink">{project.title}</h3>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 text-muted hover:text-accent transition-colors mt-1"
              aria-label={`Open ${project.title}`}
            >
              <ExternalLink size={20} />
            </a>
          </div>

          <p className="text-muted mb-6 leading-relaxed text-base md:text-lg">
            {project.description}
          </p>

          <div className="mb-6 space-y-3">
            {project.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-muted">
                <span className="text-accent mt-0.5">▹</span>
                <span>{h}</span>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <h4 className="text-xs font-semibold text-faint mb-3 uppercase tracking-wider">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, i) => (
                <span
                  key={t}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${TECH_COLORS[i % TECH_COLORS.length]}`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-bg self-start transition-transform hover:scale-[1.03]"
            style={{ background: "linear-gradient(90deg, rgb(var(--color-accent-rgb)), rgb(var(--color-accent2-rgb)))" }}
          >
            View Live Site
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Visual column */}
        <div className={`flex items-center justify-center p-10 bg-bg/40 border-border ${reversed ? "lg:order-1 lg:border-r" : "border-t lg:border-t-0 lg:border-l"}`}>
          <ArchitectureFlow nodes={project.flow} />
        </div>
      </div>
    </motion.div>
  );
}

// ─── FeaturedWork ─────────────────────────────────────────────────────────────

export default function FeaturedWork() {
  const headerRef    = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="work" className="px-6 md:px-10 py-20 md:py-28 max-w-screen-xl mx-auto">
      {/* Section header */}
      <div ref={headerRef} className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-serif mb-4"
        >
          <span className="text-ink">Featured </span>
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgb(var(--color-accent-rgb)), rgb(var(--color-accent2-rgb)), rgb(var(--color-accent3-rgb)))",
            }}
          >
            Projects
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-muted max-w-2xl mx-auto"
        >
          Production-grade SaaS platforms and scalable systems I&apos;ve built and shipped.
        </motion.p>
      </div>

      {/* Project cards */}
      <div className="space-y-16">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Skill {
  name: string;
  where: string;   // short "where I used this" note
  tier: "core" | "infra" | "ai";
}

const SKILLS: Skill[] = [
  { name: "AI Agents",          where: "AgentOps Runtime — durable agent loops with Claude",          tier: "ai"   },
  { name: "LLM Evals",          where: "LLM Evals Platform — annotation queues + scoring workflows",  tier: "ai"   },
  { name: "LangGraph",          where: "Multi-step agent orchestration with state machines",           tier: "ai"   },
  { name: "Backend Systems",    where: "TrueCaptcha + HPC orchestrator — high-throughput APIs",        tier: "core" },
  { name: "Distributed Systems",where: "TrueCaptcha (2.8M peak RPS) + UF research workflows",         tier: "core" },
  { name: "Go",                 where: "AgentOps Runtime — concurrency-heavy execution engine",        tier: "core" },
  { name: "TypeScript",         where: "AgentForge marketplace + AgentOps SDK surface",               tier: "core" },
  { name: "PostgreSQL",         where: "Transactional state machine for agent crash recovery",         tier: "infra" },
  { name: "Redis",              where: "Caching layer — cut TrueCaptcha latency from 7s to 1s",       tier: "infra" },
  { name: "Docker / K8s",       where: "Container orchestration across all production services",       tier: "infra" },
  { name: "AWS",                where: "EC2, S3, SQS, Lambda — TrueCaptcha production infra",         tier: "infra" },
  { name: "Observability",      where: "Trace dashboards + eval metrics for agent pipelines",          tier: "ai"   },
];

const TIER_COLOR: Record<Skill["tier"], string> = {
  core:  "border-border2 text-muted2",
  infra: "border-border text-muted",
  ai:    "border-accent/40 text-accent",
};

const TIER_BG: Record<Skill["tier"], string> = {
  core:  "bg-white/[0.03]",
  infra: "bg-transparent",
  ai:    "bg-accent/[0.05]",
};

// ─── SkillCloud ───────────────────────────────────────────────────────────────

export default function SkillCloud() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="px-6 md:px-10 py-16 md:py-24 max-w-screen-xl mx-auto border-t border-border">
      {/* Header */}
      <motion.p
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-xs uppercase tracking-[0.15em] text-muted mb-10"
      >
        Skills &amp; Stack
      </motion.p>

      {/* Skill pills */}
      <div ref={ref} className="flex flex-wrap gap-3">
        {SKILLS.map((skill, i) => {
          const isActive = active === skill.name;
          return (
            <motion.button
              key={skill.name}
              initial={reduced ? false : { opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: i * 0.05,
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              onMouseEnter={() => setActive(skill.name)}
              onFocus={() => setActive(skill.name)}
              onMouseLeave={() => setActive(null)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(isActive ? null : skill.name)}
              className={[
                "relative px-4 py-2 rounded-full border text-sm font-medium",
                "transition-all duration-200 cursor-default select-none",
                TIER_COLOR[skill.tier],
                TIER_BG[skill.tier],
                isActive ? "scale-105" : "hover:scale-[1.04]",
              ].join(" ")}
            >
              {skill.name}

              {/* Tooltip */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    key="tip"
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute z-20 pointer-events-none"
                    style={{ bottom: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)" }}
                  >
                    <div className="relative px-3 py-2 rounded-lg bg-surface border border-border2 shadow-xl whitespace-nowrap max-w-[240px]">
                      <p className="text-[11px] font-normal text-muted2 text-left leading-snug whitespace-normal">
                        {skill.where}
                      </p>
                      <span
                        className="absolute left-1/2 -translate-x-1/2"
                        style={{
                          bottom: -4,
                          width: 0, height: 0,
                          borderLeft: "4px solid transparent",
                          borderRight: "4px solid transparent",
                          borderTop: "4px solid rgb(var(--color-border2-rgb))",
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* Legend */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="flex flex-wrap gap-4 mt-8"
      >
        {(["ai", "core", "infra"] as const).map((tier) => (
          <div key={tier} className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full border ${
                tier === "ai" ? "border-accent bg-accent/30" :
                tier === "core" ? "border-muted2 bg-white/10" :
                "border-faint bg-transparent"
              }`}
            />
            <span className="text-[10px] font-mono text-faint2 uppercase tracking-wider">
              {tier === "ai" ? "AI / ML" : tier === "core" ? "Core" : "Infra"}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

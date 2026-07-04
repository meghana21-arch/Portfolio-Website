"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Card {
  number: string;
  title: string;
  body: string;
  metric: string;
}

interface Bar {
  label: string;
  fill: number; // 0–5
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CARDS: Card[] = [
  {
    number: "01",
    title: "Production-first mindset",
    body: "I've built systems beyond tutorials — APIs, workflows, caching, async workers, and services that handle real traffic.",
    metric: "1M+ daily API requests",
  },
  {
    number: "02",
    title: "Strong backend foundation",
    body: "Experience with Java Spring Boot, PostgreSQL, REST APIs, Redis, batch workflows, and system-level optimization.",
    metric: "30+ APIs designed",
  },
  {
    number: "03",
    title: "AI systems builder",
    body: "I'm building projects around agent loops, evals, durable execution, observability, and reusable AI tooling.",
    metric: "Agent infra focused",
  },
  {
    number: "04",
    title: "Fast learner with proof",
    body: "I connect CS fundamentals to production systems and write about what I learn through projects and system design.",
    metric: "Builder + writer",
  },
];

const BARS: Bar[] = [
  { label: "Backend Systems",     fill: 5 },
  { label: "AI Infrastructure",   fill: 4 },
  { label: "Distributed Systems", fill: 4 },
  { label: "Product Thinking",    fill: 4 },
  { label: "Learning Velocity",   fill: 5 },
];

// ─── Value card ───────────────────────────────────────────────────────────────

function ValueCard({ card, index, inView }: { card: Card; index: number; inView: boolean }) {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group"
    >
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.25 }}
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(200,169,126,0.07) 0%, transparent 70%)",
        }}
      />

      <motion.div
        animate={hovered && !reduced ? { y: -4 } : { y: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className={[
          "relative p-5 rounded-xl border transition-colors duration-250",
          hovered
            ? "border-[#C8A97E]/30 bg-white/[0.035]"
            : "border-[#1E1E1E] bg-white/[0.018]",
        ].join(" ")}
      >
        {/* Top row */}
        <div className="flex items-start justify-between mb-3">
          <span className="text-[10px] font-mono text-[#3A3A3A]">{card.number}</span>
          {/* Metric badge */}
          <motion.span
            animate={hovered ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#C8A97E]/25 text-[#C8A97E]/80 bg-[#C8A97E]/[0.05]"
          >
            {card.metric}
          </motion.span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-medium text-[#F5F0EA] mb-2 leading-snug">
          {card.title}
        </h3>

        {/* Body */}
        <p className="text-xs text-[#5A5A5A] leading-relaxed">
          {card.body}
        </p>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-5 right-5 h-px rounded-full origin-left"
          style={{ background: "linear-gradient(90deg, rgba(200,169,126,0.4), transparent)" }}
          animate={hovered ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── Signal bar ───────────────────────────────────────────────────────────────

function SignalBar({ bar, index, inView }: { bar: Bar; index: number; inView: boolean }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.55 + index * 0.07, duration: 0.5, ease: "easeOut" }}
      className="flex items-center gap-3"
    >
      {/* Label */}
      <span className="text-[11px] font-mono text-[#4A4A4A] w-40 flex-shrink-0">
        {bar.label}
      </span>

      {/* Blocks */}
      <div className="flex items-center gap-[3px]">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < bar.fill;
          return (
            <motion.span
              key={i}
              initial={reduced ? false : { opacity: 0, scaleY: 0.4 }}
              animate={inView ? { opacity: 1, scaleY: 1 } : {}}
              transition={{
                delay: 0.6 + index * 0.07 + i * 0.04,
                duration: 0.3,
                ease: "easeOut",
              }}
              className={[
                "block w-5 h-2.5 rounded-sm",
                filled
                  ? "bg-[#C8A97E]"
                  : "bg-[#1E1E1E] border border-[#2A2A2A]",
              ].join(" ")}
            />
          );
        })}
      </div>

      {/* Numeric */}
      <span className="text-[10px] font-mono text-[#3A3A3A]">
        {bar.fill}/5
      </span>
    </motion.div>
  );
}

// ─── WhyHireMe ────────────────────────────────────────────────────────────────

export default function WhyHireMe() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative px-6 md:px-10 py-20 md:py-32 max-w-screen-xl mx-auto border-t border-[#1E1E1E] overflow-hidden"
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,169,126,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,126,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Faint radial glow top-left */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(200,169,126,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Two-column layout */}
      <div className="relative grid md:grid-cols-[1fr_1.1fr] gap-16 md:gap-24">

        {/* ── Left column ── */}
        <div className="flex flex-col justify-between gap-10">
          <div>
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs uppercase tracking-[0.15em] text-[#6B6B6B] mb-6"
            >
              Candidate brief
            </motion.p>

            <div className="overflow-hidden mb-5">
              <motion.h2
                initial={reduced ? false : { y: "105%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(1.75rem,4vw,3.25rem)] font-serif text-[#F5F0EA] leading-[1.1] tracking-tight"
              >
                Why I&apos;m worth
              </motion.h2>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h2
                initial={reduced ? false : { y: "105%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ delay: 0.18, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(1.75rem,4vw,3.25rem)] font-serif text-[#C8A97E] italic leading-[1.1] tracking-tight"
              >
                interviewing.
              </motion.h2>
            </div>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-sm text-[#5A5A5A] leading-relaxed max-w-sm"
            >
              I bring the mix of production backend experience, AI systems
              curiosity, and builder mindset needed to ship reliable software.
            </motion.p>
          </div>

          {/* CTA line */}
          <div>
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="p-4 rounded-xl border border-[#1E1E1E] bg-white/[0.02]"
            >
              <p className="text-[10px] font-mono text-[#3A3A3A] uppercase tracking-wider mb-2">
                Open to
              </p>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                Software engineering internships in backend systems, AI
                infrastructure, developer tools, or distributed platforms.
              </p>
              <a
                href="mailto:sbarla1@ufl.edu"
                className="inline-flex items-center gap-2 mt-4 text-xs text-[#6B6B6B] hover:text-[#C8A97E] transition-colors duration-200 group"
              >
                <span className="w-6 h-px bg-current transition-all duration-300 group-hover:w-10" />
                Get in touch
              </a>
            </motion.div>

            {/* Signal bars */}
            <div className="mt-8 space-y-2.5">
              <motion.p
                initial={reduced ? false : { opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-[10px] font-mono text-[#2E2E2E] uppercase tracking-wider mb-3"
              >
                Fit meter
              </motion.p>
              {BARS.map((bar, i) => (
                <SignalBar key={bar.label} bar={bar} index={i} inView={inView} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Right column — value cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 content-start">
          {CARDS.map((card, i) => (
            <ValueCard key={card.number} card={card} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

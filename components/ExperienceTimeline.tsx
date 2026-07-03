"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  tags?: string[];
}

// ────────────────────────────────────────────────────────────
// Edit your experience data here
// ────────────────────────────────────────────────────────────
const EXPERIENCES: Experience[] = [
  {
    company: "University of Florida",
    role: "Research / Teaching Assistant",
    period: "2023 – Present",
    description:
      "Research on LLM evaluation pipelines and agentic systems. TA for graduate-level distributed systems courses.",
    tags: ["Research", "LLM Evals", "Distributed Systems"],
  },
  {
    company: "Digit Insurance",
    role: "Software Engineer",
    period: "2022 – 2023",
    description:
      "Built backend microservices and data pipelines handling millions of insurance policy events per day.",
    tags: ["Go", "Kafka", "PostgreSQL", "Microservices"],
  },
  {
    company: "Friday AI",
    role: "Software Engineer Intern",
    period: "2021",
    description:
      "Developed AI-assisted productivity features and LangChain-based pipelines for document Q&A.",
    tags: ["Python", "LangChain", "React", "FastAPI"],
  },
];

interface ExperienceRowProps {
  exp: Experience;
  index: number;
  isLast: boolean;
}

function ExperienceRow({ exp, index, isLast }: ExperienceRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`grid md:grid-cols-[12rem_1fr] gap-4 md:gap-10 py-8 md:py-10 border-t border-[#1E1E1E] ${
        isLast ? "border-b" : ""
      }`}
    >
      {/* Left: company + period */}
      <div>
        <p className="text-sm font-medium text-[#F5F0EA]">{exp.company}</p>
        <p className="text-xs text-[#4A4A4A] mt-1 font-mono">{exp.period}</p>
      </div>

      {/* Right: role + description */}
      <div>
        <p className="text-base md:text-lg text-[#D0CBB8] font-light mb-2">{exp.role}</p>
        <p className="text-sm text-[#6B6B6B] leading-relaxed">{exp.description}</p>
        {exp.tags && (
          <div className="flex flex-wrap gap-2 mt-4">
            {exp.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[11px] rounded-full bg-[#141414] border border-[#2A2A2A] text-[#555] font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function ExperienceTimeline() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section className="px-6 md:px-10 py-20 md:py-32 max-w-screen-xl mx-auto">
      <motion.p
        ref={headerRef}
        initial={{ opacity: 0, y: 10 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-xs uppercase tracking-[0.15em] text-[#6B6B6B] mb-10"
      >
        Experience
      </motion.p>

      <div>
        {EXPERIENCES.map((exp, i) => (
          <ExperienceRow
            key={exp.company}
            exp={exp}
            index={i}
            isLast={i === EXPERIENCES.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

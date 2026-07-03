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
    role: "Research Assistant",
    period: "Jan 2026 – Present",
    description:
      "Scaling a distributed workflow orchestration system to support 1K+ users and daily HPC job execution. Built an ML-driven scheduling system to reduce job wait times and improve cluster utilization. Developed a full-stack React workflow UI that reduced setup time by ~90%.",
    tags: ["Distributed Systems", "ML Scheduling", "React", "HPC", "Python"],
  },
  {
    company: "TrueCaptcha.org",
    role: "Co-Founder & Founding Software Engineer",
    period: "Aug 2020 – Jan 2026",
    description:
      "Built and scaled a production AI SaaS platform to 1M+ daily API requests (2.8M peak) generating ~$20K revenue. Reduced end-to-end API latency from ~7s to ~1s via Redis caching, async workers, and horizontal scaling. Served 300+ daily active developers.",
    tags: ["SaaS", "Redis", "OCR", "Distributed APIs", "99.99% Uptime"],
  },
  {
    company: "Digit Insurance",
    role: "Software Engineer",
    period: "Jun 2024 – Nov 2025",
    description:
      "Re-architected 80 legacy batch workflows into modular Java Spring Boot services. Designed 30+ PostgreSQL-backed REST APIs reducing data retrieval from hours to near real-time. Optimized batch pipelines processing millions of insurance records, cutting execution time by 30%.",
    tags: ["Java", "Spring Boot", "PostgreSQL", "REST APIs", "Batch Processing"],
  },
  {
    company: "Keysoft IT Private Limited",
    role: "Software Engineer Intern",
    period: "Aug 2022 – Mar 2023",
    description:
      "Integrated Strapi CMS with Next.js to streamline product management and order tracking workflows, resulting in a 41% increase in weekly orders.",
    tags: ["Next.js", "Strapi CMS", "Node.js"],
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

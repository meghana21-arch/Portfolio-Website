"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function RevealLine({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={reduced ? false : { y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ delay, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function FadeIn({
  children,
  delay = 0,
  y = 16,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated stat ticker ─────────────────────────────────────────────────────

function StatPill({ label, value, delay }: { label: string; value: string; delay: number }) {
  return (
    <FadeIn delay={delay}>
      <div className="flex items-center gap-2 text-xs text-[#6B6B6B]">
        <span className="w-1 h-1 rounded-full bg-[#C8A97E] opacity-70" />
        <span className="text-[#C8A97E] font-mono font-medium">{value}</span>
        <span>{label}</span>
      </div>
    </FadeIn>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollY } = useScroll();
  const y       = useTransform(scrollY, [0, 600], [0, reduced ? 0 : 80]);
  const opacity = useTransform(scrollY, [0, 400], [1, reduced ? 1 : 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-end pb-16 md:pb-20 px-6 md:px-10 pt-28"
    >
      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-screen-xl w-full mx-auto">
        {/* Meta row */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <FadeIn delay={0.5} y={8}>
            <p className="text-xs md:text-sm text-[#6B6B6B] uppercase tracking-[0.15em]">
              Gainesville, FL — open to SF
            </p>
          </FadeIn>
          <FadeIn delay={0.6} y={8}>
            <p className="text-xs md:text-sm text-[#6B6B6B] uppercase tracking-[0.15em]">
              MS CS · GPA 4.0 · UF
            </p>
          </FadeIn>
        </div>

        {/* Headline — line-by-line reveal */}
        <div className="mb-10 md:mb-14">
          <RevealLine delay={0.15}>
            <h1 className="text-[clamp(3rem,8.5vw,8.5rem)] font-serif text-[#F5F0EA] leading-[0.92] tracking-tight">
              Backend systems,
            </h1>
          </RevealLine>

          <RevealLine delay={0.3}>
            <h1 className="text-[clamp(3rem,8.5vw,8.5rem)] font-serif text-[#F5F0EA] leading-[0.92] tracking-tight">
              {/* "AI tools" reveals with a slight extra delay for accent feel */}
              <motion.span
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.6 }}
                className="italic text-[#C8A97E]"
              >
                AI tools,
              </motion.span>{" "}
              <motion.span
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.5 }}
              >
                built
              </motion.span>
            </h1>
          </RevealLine>

          <RevealLine delay={0.45}>
            <h1 className="text-[clamp(3rem,8.5vw,8.5rem)] font-serif text-[#F5F0EA] leading-[0.92] tracking-tight">
              to{" "}
              <motion.span
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75, duration: 0.6 }}
                className="italic"
              >
                production scale.
              </motion.span>
            </h1>
          </RevealLine>
        </div>

        {/* Subheadline + stats + scroll button */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-xl space-y-5">
            <FadeIn delay={0.75} y={12}>
              <p className="text-[#6B6B6B] text-sm md:text-base leading-relaxed">
                MS CS @ University of Florida (GPA 4.0). Co-founded TrueCaptcha.org —
                scaled from ~1K to 1M+ daily API requests with 99.99% uptime. Now building
                AI developer tools and distributed systems at UF.
              </p>
            </FadeIn>

            {/* Inline stat pills */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <StatPill value="1M+" label="daily API requests"  delay={0.9}  />
              <StatPill value="99.99%" label="uptime"           delay={1.0}  />
              <StatPill value="4.0" label="GPA"                 delay={1.1}  />
            </div>
          </div>

          {/* Scroll button */}
          <FadeIn delay={1.0} y={0} className="self-start md:self-auto">
            <ScrollButton />
          </FadeIn>
        </div>
      </motion.div>

      {/* Bottom divider */}
      <motion.div
        initial={reduced ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#1E1E1E] origin-left"
      />
    </section>
  );
}

// ─── Scroll button ────────────────────────────────────────────────────────────

function ScrollButton() {
  return (
    <button
      onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
      data-cursor="hover"
      className="group relative w-24 h-24 rounded-full border border-[#2E2E2E] hover:border-[#C8A97E] transition-colors duration-400 flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-1">
        <span className="text-[10px] uppercase tracking-[0.15em] text-[#6B6B6B] group-hover:text-[#C8A97E] transition-colors">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="text-[#6B6B6B] group-hover:text-[#C8A97E] transition-colors"
        >
          <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
            <path d="M6 0v14M1 9l5 5 5-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>
    </button>
  );
}

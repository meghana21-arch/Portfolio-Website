"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FlowNode {
  label: string;
  accent?: boolean; // highlights this node in accent colour
}

interface Props {
  nodes: FlowNode[];
  /** Delay (ms) between each node lighting up. Default 220 */
  stepMs?: number;
}

// ─── ArchitectureFlow ─────────────────────────────────────────────────────────
// Horizontal flow: Node → connector line → Node → ...
// Nodes light up one by one when the component enters the viewport.

export default function ArchitectureFlow({ nodes, stepMs = 220 }: Props) {
  const ref      = useRef<HTMLDivElement>(null);
  const inView   = useInView(ref, { once: true, margin: "-60px" });
  const reduced  = useReducedMotion();
  const [lit, setLit] = useState(0); // how many nodes are "lit"

  useEffect(() => {
    if (!inView) return;
    if (reduced) { setLit(nodes.length); return; }

    let i = 0;
    const tick = () => {
      i += 1;
      setLit(i);
      if (i < nodes.length) setTimeout(tick, stepMs);
    };
    const t = setTimeout(tick, 120); // small initial pause
    return () => clearTimeout(t);
  }, [inView, nodes.length, stepMs, reduced]);

  return (
    <div ref={ref} className="flex flex-wrap items-center gap-y-3 gap-x-0">
      {nodes.map((node, i) => {
        const isLit = i < lit;
        return (
          <div key={i} className="flex items-center">
            {/* Node pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={isLit ? { opacity: 1, scale: 1 } : { opacity: 0.2, scale: 0.88 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={[
                "px-2.5 py-1 rounded-md border text-[11px] font-mono font-medium whitespace-nowrap",
                node.accent
                  ? "border-[#C8A97E]/50 text-[#C8A97E] bg-[#C8A97E]/[0.06]"
                  : "border-[#2A2A2A] text-[#6B6B6B] bg-white/[0.02]",
              ].join(" ")}
            >
              {node.label}
            </motion.div>

            {/* Connector line — not after the last node */}
            {i < nodes.length - 1 && (
              <div className="relative mx-2 flex items-center" style={{ width: 28 }}>
                {/* Base track */}
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-px bg-[#2A2A2A]" />
                </div>
                {/* Animated fill */}
                <motion.div
                  className="absolute inset-0 flex items-center overflow-hidden"
                  style={{ originX: 0 }}
                >
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isLit ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="w-full h-px bg-[#C8A97E]/60 origin-left"
                  />
                </motion.div>
                {/* Arrow head */}
                <motion.svg
                  className="absolute right-0"
                  width="6" height="6" viewBox="0 0 6 6"
                  initial={{ opacity: 0 }}
                  animate={isLit ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  <path d="M0 0 L6 3 L0 6" fill="none" stroke="rgba(200,169,126,0.6)" strokeWidth="1" strokeLinecap="round" />
                </motion.svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

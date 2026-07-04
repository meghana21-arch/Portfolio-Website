"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// ─── Boot sequence lines ───────────────────────────────────────────────────────

const LINES = [
  { text: "initializing sai meghana barla...",  delay: 0,    accent: false },
  { text: "loading backend systems...",          delay: 260,  accent: false },
  { text: "connecting AI agents...",             delay: 520,  accent: true  },
  { text: "running eval checks...",              delay: 780,  accent: false },
  { text: "ready.",                              delay: 1050, accent: true  },
];

const SESSION_KEY = "boot_seen";
const TOTAL_MS    = 1800; // total before fade-out begins

// ─── BootLoader ───────────────────────────────────────────────────────────────

export default function BootLoader({ onDone }: { onDone: () => void }) {
  const shouldReduceMotion = useReducedMotion();
  const [visible, setVisible]         = useState(true);
  const [visibleCount, setVisibleCount] = useState(0);
  const [exiting, setExiting]         = useState(false);

  // Skip if already seen this session or reduced motion
  const alreadySeen =
    typeof sessionStorage !== "undefined" &&
    sessionStorage.getItem(SESSION_KEY) === "1";

  useEffect(() => {
    if (alreadySeen || shouldReduceMotion) {
      onDone();
      return;
    }

    // Reveal lines one by one
    LINES.forEach((_, i) => {
      setTimeout(() => setVisibleCount(i + 1), LINES[i].delay);
    });

    // Trigger exit after all lines shown
    const exitTimer = setTimeout(() => {
      setExiting(true);
      sessionStorage.setItem(SESSION_KEY, "1");
      setTimeout(onDone, 500);
    }, TOTAL_MS);

    return () => clearTimeout(exitTimer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (alreadySeen || shouldReduceMotion) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          // Cover everything — sits above all page content
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0C0C0C] cursor-pointer"
          onClick={() => {
            // Skip on click
            sessionStorage.setItem(SESSION_KEY, "1");
            setExiting(true);
            setTimeout(onDone, 400);
          }}
        >
          {/* Terminal window */}
          <div className="w-full max-w-md px-8">
            {/* Window chrome */}
            <div className="flex items-center gap-2 mb-6 opacity-40">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>

            {/* Lines */}
            <div className="font-mono text-[13px] leading-relaxed space-y-1.5">
              <AnimatePresence mode="popLayout">
                {LINES.slice(0, visibleCount).map((line, i) => (
                  <motion.div
                    key={line.text}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-[#2A2A2A] select-none">›</span>
                    <span
                      className={
                        line.accent
                          ? "text-[#C8A97E]"
                          : "text-[#6B6B6B]"
                      }
                    >
                      {line.text}
                    </span>
                    {/* Blinking cursor only on last revealed line */}
                    {i === visibleCount - 1 && !exiting && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 0.9 }}
                        className="inline-block w-1.5 h-3.5 bg-[#C8A97E] ml-0.5"
                      />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Skip hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-10 text-[11px] font-mono text-[#3A3A3A] tracking-wider"
            >
              click to skip
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

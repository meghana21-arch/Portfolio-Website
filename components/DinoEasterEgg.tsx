"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── DinoEasterEgg ────────────────────────────────────────────────────────────
// Triggers on:
//   • Pressing the "D" key (desktop only)
//   • Clicking the #oneko cat element 3 times within 2 seconds
//
// Shows a full-screen tiled dinos pattern for 3 seconds, then fades out.

const DISPLAY_MS = 3000;
const CLICK_WINDOW_MS = 2000;
const CLICK_COUNT = 3;

export default function DinoEasterEgg() {
  const [visible, setVisible] = useState(false);

  // Guard: never run on touch-only devices
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  const trigger = useCallback(() => {
    if (isMobile) return;
    setVisible(true);
    setTimeout(() => setVisible(false), DISPLAY_MS);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    // ── Keyboard trigger: "D" key ──────────────────────────────────────────
    const handleKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      // Ignore if user is typing in an input
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "d" || e.key === "D") trigger();
    };
    window.addEventListener("keydown", handleKey);

    // ── Click trigger: 3 clicks on the oneko cat ───────────────────────────
    let clicks = 0;
    let resetTimer: ReturnType<typeof setTimeout> | null = null;

    const handleCatClick = () => {
      clicks += 1;
      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(() => { clicks = 0; }, CLICK_WINDOW_MS);
      if (clicks >= CLICK_COUNT) {
        clicks = 0;
        if (resetTimer) clearTimeout(resetTimer);
        trigger();
      }
    };

    // Oneko renders asynchronously — poll until it exists, then attach
    let pollInterval: ReturnType<typeof setInterval> | null = null;
    let catEl: HTMLElement | null = null;

    pollInterval = setInterval(() => {
      const el = document.getElementById("oneko");
      if (el && el !== catEl) {
        catEl?.removeEventListener("click", handleCatClick);
        catEl = el;
        catEl.addEventListener("click", handleCatClick);
        catEl.style.cursor = "pointer"; // hint it's clickable
      }
    }, 500);

    return () => {
      window.removeEventListener("keydown", handleKey);
      catEl?.removeEventListener("click", handleCatClick);
      if (resetTimer) clearTimeout(resetTimer);
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [trigger, isMobile]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="dino-easter-egg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          // Pointer-events none so scrolling/interaction underneath is unaffected
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 9999 }}
          aria-hidden="true"
        >
          {/* Tiled dinos pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/dinos.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "320px auto",
              opacity: 0.35,
            }}
          />
          {/* Dark vignette so the page content stays readable */}
          <div className="absolute inset-0 bg-black/55" />
          {/* Fun little label */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="absolute bottom-32 inset-x-0 text-center text-white/60 text-xs font-mono tracking-widest select-none"
          >
            🦕 you found it
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
// ─── Icons — inline SVG, consistent 1.6px stroke weight ──────────────────────

function IconGitHub({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

// LeetCode: stroke-based so it matches Mail/LinkedIn visual weight
function IconLeetCode({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8.5 11.5 13l4.5 4.5" />
      <path d="m8 6 6 6-6 6" />
      <rect x="2" y="3" width="20" height="18" rx="3" />
    </svg>
  );
}

function IconLinkedIn({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconMail({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2.5" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ITEMS = [
  { label: "GitHub",   href: "https://github.com/meghana21-arch",               Icon: IconGitHub   },
  { label: "LeetCode", href: "https://leetcode.com/u/meghana_barla",             Icon: IconLeetCode },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/saimeghana-barla03/",  Icon: IconLinkedIn },
  { label: "Email",    href: "mailto:sbarla1@ufl.edu",                           Icon: IconMail     },
] as const;

// ─── Size constants ───────────────────────────────────────────────────────────

const NORMAL   = 44;   // resting circle diameter (px)
const HOVERED  = 60;   // fully magnified
const NEIGHBOR = 51;   // direct neighbor
const REACH    = 115;  // influence radius (px from icon center)
const GAP      = 20;   // gap between fixed-width slots (px) — never causes overlap

// Spring config for size and lift
const SPRING_CFG = { stiffness: 320, damping: 28, mass: 0.55 };

// ─── AnimatedIcon ─────────────────────────────────────────────────────────────
// Subscribes to a MotionValue<number> and re-renders the SVG at the right px size.

function AnimatedIcon({
  Icon,
  sizeMv,
}: {
  Icon: (p: { size: number }) => JSX.Element;
  sizeMv: ReturnType<typeof useSpring>;
}) {
  const [px, setPx] = useState(Math.round(NORMAL * 0.45));

  useEffect(() => {
    // useEffect so we get proper cleanup and avoid stale subscriptions
    return sizeMv.on("change", (v) => setPx(Math.round(v)));
  }, [sizeMv]);

  return <Icon size={px} />;
}

// ─── DockItem ─────────────────────────────────────────────────────────────────
//
// Layout contract:
//   • Outer <div> has a FIXED width = NORMAL and height = NORMAL at all times.
//     This is what sits inside the flex capsule — it never changes size.
//   • Inner <motion.a> has animated width = height = size (same value → circle).
//     It overflows the slot upward (y lift) and outward (size > NORMAL).
//   • The capsule has overflow-visible, so the button renders outside it cleanly.

function DockItem({
  label,
  href,
  Icon,
  mouseX,
  showTooltip,
  onEnter,
  onLeave,
}: {
  label: string;
  href: string;
  Icon: (p: { size: number }) => JSX.Element;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  showTooltip: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  // Distance from cursor to this button's horizontal center
  const distance = useTransform(mouseX, (x) => {
    const el = ref.current;
    if (!el || x === Infinity) return Infinity;
    const rect = el.getBoundingClientRect();
    return Math.abs(x - (rect.left + rect.width / 2));
  });

  // Map distance → button diameter
  const rawSize = useTransform(
    distance,
    [0, REACH * 0.3, REACH, REACH + 1],
    [HOVERED, HOVERED, NEIGHBOR, NORMAL],
    { clamp: true }
  );
  const size = useSpring(rawSize, SPRING_CFG);

  // Map size → vertical lift (rises proportionally to how much it has grown)
  const rawY = useTransform(
    size,
    [NORMAL, NEIGHBOR, HOVERED],
    [0, -5, -14]
  );
  const yLift = useSpring(rawY, SPRING_CFG);

  // SVG icon size — scales proportionally with button
  const iconMv = useTransform(size, (s) => (s / NORMAL) * Math.round(NORMAL * 0.455));

  return (
    // Fixed slot — capsule layout never shifts
    <div
      className="relative flex-shrink-0 flex items-center justify-center"
      style={{ width: NORMAL, height: NORMAL }}
    >
      {/* Tooltip — absolutely positioned, never affects layout */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            key="tip"
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.92 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
            className="absolute pointer-events-none z-30"
            style={{ bottom: "calc(100% + 22px)", left: "50%", transform: "translateX(-50%)" }}
          >
            <div className="relative px-2.5 py-1 rounded-md bg-neutral-950/90 border border-white/10 backdrop-blur-md shadow-md whitespace-nowrap">
              <span className="text-[11px] font-medium leading-none text-white/70">
                {label}
              </span>
              {/* Triangle pointer */}
              <span
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                  bottom: -4,
                  width: 0,
                  height: 0,
                  borderLeft: "4px solid transparent",
                  borderRight: "4px solid transparent",
                  borderTop: "4px solid rgba(10,10,12,0.90)",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated circle — grows and lifts within the fixed slot */}
      <motion.a
        ref={ref}
        href={href}
        target={href.startsWith("mailto") ? undefined : "_blank"}
        rel="noopener noreferrer"
        aria-label={label}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        // width === height from the SAME spring → guaranteed perfect circle
        style={{ width: size, height: size, y: yLift }}
        className={[
          "aspect-square flex-shrink-0 flex items-center justify-center",
          "rounded-full border transition-colors duration-150 cursor-pointer",
          showTooltip
            ? "bg-white/[0.12] border-white/25 text-white"
            : "bg-white/[0.07] border-white/10 text-white/55 hover:text-white/80",
        ].join(" ")}
      >
        <AnimatedIcon Icon={Icon} sizeMv={iconMv} />
      </motion.a>
    </div>
  );
}

// ─── SocialDock ───────────────────────────────────────────────────────────────

export default function SocialDock() {
  const mouseX     = useMotionValue(Infinity);
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="fixed bottom-6 inset-x-0 z-[80] flex justify-center pointer-events-none">
      <motion.div
        initial={{ y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto"
      >
        {/* Glass capsule — static dimensions, overflow-visible lets icons escape */}
        <div
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => {
            mouseX.set(Infinity);
            setActive(null);
          }}
          className="relative flex items-center overflow-visible rounded-full px-5 py-2"
          style={{
            gap: GAP,
            background: "rgba(14, 14, 16, 0.65)",
            backdropFilter: "blur(32px) saturate(160%)",
            WebkitBackdropFilter: "blur(32px) saturate(160%)",
            border: "1px solid rgba(255,255,255,0.09)",
            boxShadow: [
              "0 20px 80px rgba(0,0,0,0.50)",
              "0 6px 24px rgba(0,0,0,0.40)",
              "inset 0 1px 0 rgba(255,255,255,0.10)",
              "inset 0 -1px 0 rgba(0,0,0,0.20)",
            ].join(", "),
          }}
        >
          {/* Subtle top shimmer */}
          <div
            className="absolute top-0 inset-x-8 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.14) 40%, rgba(255,255,255,0.14) 60%, transparent)",
            }}
          />

          {ITEMS.map((item) => (
            <DockItem
              key={item.label}
              label={item.label}
              href={item.href}
              Icon={item.Icon}
              mouseX={mouseX}
              showTooltip={active === item.label}
              onEnter={() => setActive(item.label)}
              onLeave={() => setActive(null)}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

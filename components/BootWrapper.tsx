"use client";

import { useState } from "react";
import BootLoader from "./BootLoader";

/**
 * Wraps page children with the boot loader.
 * Renders children immediately but keeps them visually hidden behind the loader.
 * Once the loader calls onDone, the children become visible.
 */
export default function BootWrapper({ children }: { children: React.ReactNode }) {
  const alreadySeen =
    typeof sessionStorage !== "undefined" &&
    sessionStorage.getItem("boot_seen") === "1";

  const [done, setDone] = useState(alreadySeen);

  return (
    <>
      <BootLoader onDone={() => setDone(true)} />
      {/* Children are always rendered (good for SEO/perf), just hidden until boot finishes */}
      <div
        style={{
          opacity: done ? 1 : 0,
          transition: "opacity 0.45s ease",
          pointerEvents: done ? "auto" : "none",
        }}
      >
        {children}
      </div>
    </>
  );
}

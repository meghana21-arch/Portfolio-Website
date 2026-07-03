"use client";

import { useEffect } from "react";

/**
 * CatFollower — loads the classic oneko.js cat that chases your cursor.
 *
 * Assets required in /public/oneko/:
 *   oneko.js   ← the movement script
 *   oneko.gif  ← the sprite sheet (download link below)
 *
 * Download oneko.gif from:
 *   https://raw.githubusercontent.com/adryd325/oneko.js/main/oneko.gif
 *   Then place it at: public/oneko/oneko.gif
 *
 * To use a different cat skin, swap oneko.gif with any compatible sprite sheet
 * and update the data-cat attribute below.
 */
export default function CatFollower() {
  useEffect(() => {
    // Skip on touch/mobile devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const script = document.createElement("script");
    script.src = "/oneko/oneko.js";
    script.async = true;
    script.dataset.cat = "/oneko/oneko.gif";

    document.body.appendChild(script);

    return () => {
      script.remove();
      const neko = document.getElementById("oneko");
      if (neko) neko.remove();
      // Clear persisted position so it starts fresh on next load
      // localStorage.removeItem("oneko"); // uncomment to reset position on unmount
    };
  }, []);

  return null;
}

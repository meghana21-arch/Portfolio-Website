"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isLight = mounted && theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      className="w-9 h-9 flex items-center justify-center rounded-full border border-border2 text-muted hover:border-accent hover:text-accent transition-colors duration-300"
    >
      {isLight ? (
        <Sun size={16} strokeWidth={1.75} />
      ) : (
        <Moon size={16} strokeWidth={1.75} />
      )}
    </button>
  );
}

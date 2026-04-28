"use client";

import { useState } from "react";

function getInitialTheme() {
  if (typeof window === "undefined") {
    return false;
  }

  const storedTheme = window.localStorage.getItem("decision-dna-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const shouldUseDark = storedTheme ? storedTheme === "dark" : prefersDark;
  document.documentElement.classList.toggle("dark", shouldUseDark);

  return shouldUseDark;
}

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(getInitialTheme);

  function toggleTheme() {
    const nextIsDark = !isDark;
    document.documentElement.classList.toggle("dark", nextIsDark);
    window.localStorage.setItem("decision-dna-theme", nextIsDark ? "dark" : "light");
    setIsDark(nextIsDark);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur transition hover:border-soft-gold hover:text-slate-950 dark:border-white/10 dark:bg-white/10 dark:text-slate-200 dark:hover:border-soft-gold dark:hover:text-white"
      aria-label="Toggle dark mode"
    >
      <span aria-hidden="true">{isDark ? "Moon" : "Sun"}</span>
      <span className="hidden sm:inline">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}

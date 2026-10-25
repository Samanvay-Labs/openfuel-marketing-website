"use client";

export default function ThemeToggle({ label }: { label: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    if (next === "light") root.dataset.theme = "light";
    else delete root.dataset.theme;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }
  return (
    <button type="button" className="toggle" onClick={toggle} aria-label={label} title={label}>
      <span aria-hidden="true">◐</span>
    </button>
  );
}

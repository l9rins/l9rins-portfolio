"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export function Navbar() {
  const [status] = useState<"available" | "busy">("available");
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const statusColor = status === "available" ? "bg-green-500" : "bg-red-500";
  const statusText = status === "available" ? "Available for work" : "Currently busy";

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="h-12 px-6 rounded-full bg-black/90 backdrop-blur-xl border border-white/10 flex items-center gap-6 hover:border-white/20 transition-all duration-300">
        {/* Monogram */}
        <div className="text-lg font-bold text-[--accent] cursor-pointer hover:opacity-80 transition-opacity" onClick={() => scrollToSection("hero")}>
          JD
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => scrollToSection("work")}
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Work
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("stack")}
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Stack
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Contact
          </button>
        </div>

        {/* Status Dot and Theme Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-zinc-400" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-400" />
            )}
          </button>
          <div
            className={`w-2.5 h-2.5 rounded-full ${statusColor} cursor-pointer`}
            title={statusText}
          />
        </div>
      </div>
    </motion.nav>
  );
}
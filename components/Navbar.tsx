"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Sun, Moon, ArrowRight } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const navLinks = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [status] = useState<"available" | "busy">("available");
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Track scroll for navbar background opacity
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 100], [0.6, 0.95]);

  // Track active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Find active section
      const sections = navLinks.map((link) => link.id);
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <motion.div
        className={`h-14 px-2 rounded-full backdrop-blur-xl border flex items-center gap-1 transition-all duration-500 ${isScrolled
          ? "bg-black/90 border-white/15 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          : "bg-black/70 border-white/10"
          }`}
        style={{ opacity: navOpacity }}
      >
        {/* Monogram with glow */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-[--accent] to-orange-600 flex items-center justify-center text-black font-black text-sm cursor-pointer shadow-[0_0_20px_rgba(255,107,0,0.3)] ml-1"
          onClick={() => scrollToSection("hero")}
        >
          JD
        </motion.div>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 mx-2">
          {navLinks.map((link) => (
            <motion.button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${activeSection === link.id
                ? "text-white"
                : "text-zinc-400 hover:text-white"
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.label}
              {/* Active indicator */}
              {activeSection === link.id && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute inset-0 bg-white/10 rounded-full border border-white/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-white/10" />

        {/* Theme Toggle */}
        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-colors ml-1"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-zinc-400" />
          ) : (
            <Moon className="w-4 h-4 text-zinc-400" />
          )}
        </motion.button>

        {/* Status Dot */}
        <div
          className={`w-2.5 h-2.5 rounded-full ${statusColor} cursor-pointer animate-pulse`}
          title={statusText}
        />

        {/* Let's Talk CTA - V21 Inspired */}
        <motion.button
          onClick={() => scrollToSection("contact")}
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 107, 0, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-5 py-2 ml-1 mr-1 bg-gradient-to-r from-[--accent] to-orange-500 text-black text-sm font-bold rounded-full shadow-[0_0_20px_rgba(255,107,0,0.3)] hover:shadow-[0_0_30px_rgba(255,107,0,0.5)] transition-all duration-300"
        >
          Let's Talk
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </motion.nav>
  );
}
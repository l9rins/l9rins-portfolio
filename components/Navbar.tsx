"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Sun, Moon, ArrowRight } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Magnetic } from "@/components/ui/Magnetic";

const navLinks = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {

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


  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
    >
      <motion.div
        className={`h-14 px-2 rounded-full backdrop-blur-xl border flex items-center gap-1 transition-all duration-500 ${isScrolled
          ? "bg-black/50 border-white/15 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          : "bg-black/40 border-white/10"
          }`}
        style={{ opacity: navOpacity }}
      >
        {/* Monogram - Monochrome - Wrapped in Magnetic */}
        <Magnetic strength={0.3}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] transition-shadow"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            JD
          </motion.button>
        </Magnetic>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 mx-2">
          {navLinks.map((link) => (
            <Magnetic key={link.id} strength={0.5}>
              <motion.button
                onClick={() => scrollToSection(link.id)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 z-10 ${activeSection === link.id ? "text-black" : "text-zinc-400 hover:text-white"
                  }`}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
                {/* Active indicator - Fluid Spring */}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-white rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  />
                )}
              </motion.button>
            </Magnetic>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-white/10" />

        {/* Theme Toggle - Wrapped in Magnetic */}
        <Magnetic strength={0.3}>
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
        </Magnetic>

        {/* Let's Talk CTA - Monochrome - Constant Shimmer */}
        <Magnetic strength={0.2}>
          <motion.button
            onClick={() => scrollToSection("contact")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center gap-2 px-5 py-2 ml-1 mr-1 bg-white text-black text-sm font-bold rounded-full overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 min-h-[48px]"
          >
            {/* Shimmer overlay - Constant subtle animation */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-black/10 opacity-30 animate-shimmer" />

            <span className="relative z-10">Let's Talk</span>
            <ArrowRight className="w-4 h-4 relative z-10" />
          </motion.button>
        </Magnetic>
      </motion.div>
    </motion.nav>
  );
}
"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
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
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 100], [0.6, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = [...navLinks.map((link) => link.id)].reverse();
      for (const section of sections) {
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
    setMobileOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
      >
        {/* Desktop Nav */}
        <motion.div
          className={`hidden md:flex h-10 px-1.5 rounded-full backdrop-blur-xl border items-center gap-0.5 transition-all duration-300 ${
            isScrolled
              ? "bg-black/50 border-white/15 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              : "bg-black/40 border-white/10"
          }`}
          style={{ opacity: navOpacity }}
        >
          <Magnetic strength={0.3}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-4 py-1.5 rounded-full text-[11px] font-bold shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-shadow"
              onClick={() => scrollToSection("contact")}
            >
              MB
            </motion.button>
          </Magnetic>

          <div className="flex items-center gap-0.5 mx-1">
            {navLinks.map((link) => (
              <Magnetic key={link.id} strength={0.5}>
                <motion.button
                  onClick={() => scrollToSection(link.id)}
                  className={`relative px-3 py-1.5 text-[11px] font-medium rounded-full transition-all duration-200 z-10 ${
                    activeSection === link.id ? "text-black" : "text-zinc-500 hover:text-white"
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
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

          <div className="w-px h-4 bg-white/[0.08]" />

          <Magnetic strength={0.2}>
            <motion.button
              onClick={() => scrollToSection("contact")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center gap-1.5 px-4 py-1.5 ml-0.5 mr-0.5 bg-white text-black text-[11px] font-bold rounded-full overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-200"
            >
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-black/10 opacity-30 animate-[shimmer_2s_infinite]" />
              <span className="relative z-10">Let&apos;s Talk</span>
              <ArrowRight className="w-3 h-3 relative z-10" />
            </motion.button>
          </Magnetic>
        </motion.div>
      </motion.nav>

      {/* Mobile Nav */}
      <div className="md:hidden fixed top-3 left-3 right-3 z-50">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`flex items-center justify-between h-11 px-3 rounded-xl backdrop-blur-xl border transition-all duration-300 ${
            isScrolled
              ? "bg-black/60 border-white/15 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              : "bg-black/40 border-white/10"
          }`}
        >
          <button
            onClick={() => scrollToSection("contact")}
            className="bg-white text-black px-3 py-1 rounded-full text-[11px] font-bold"
          >
            MB
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-lg bg-white/5 border border-white/[0.06] flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="md:hidden fixed top-16 left-3 right-3 z-50 bg-zinc-900/95 backdrop-blur-xl border border-white/[0.08] rounded-xl p-3 shadow-2xl"
          >
            <nav className="flex flex-col gap-0.5" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    activeSection === link.id
                      ? "bg-white text-black"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="h-px bg-white/[0.06] my-1.5" />
              <button
                onClick={() => scrollToSection("contact")}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white text-black font-bold rounded-lg text-xs"
              >
                Let&apos;s Talk
                <ArrowRight className="w-3 h-3" />
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

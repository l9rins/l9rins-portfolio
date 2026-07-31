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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
      >
        {/* Desktop Nav */}
        <motion.div
          className={`hidden md:flex h-14 px-2 rounded-full backdrop-blur-xl border items-center gap-1 transition-all duration-500 ${
            isScrolled
              ? "bg-black/50 border-white/15 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
              : "bg-black/40 border-white/10"
          }`}
          style={{ opacity: navOpacity }}
        >
          <Magnetic strength={0.3}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] transition-shadow"
              onClick={() => scrollToSection("contact")}
            >
              MB
            </motion.button>
          </Magnetic>

          <div className="flex items-center gap-1 mx-2">
            {navLinks.map((link) => (
              <Magnetic key={link.id} strength={0.5}>
                <motion.button
                  onClick={() => scrollToSection(link.id)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 z-10 ${
                    activeSection === link.id ? "text-black" : "text-zinc-400 hover:text-white"
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

          <div className="w-px h-6 bg-white/10" />

          <Magnetic strength={0.2}>
            <motion.button
              onClick={() => scrollToSection("contact")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center gap-2 px-5 py-2 ml-1 mr-1 bg-white text-black text-sm font-bold rounded-full overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 min-h-[48px]"
            >
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-black/10 opacity-30 animate-[shimmer_2s_infinite]" />
              <span className="relative z-10">Let&apos;s Talk</span>
              <ArrowRight className="w-4 h-4 relative z-10" />
            </motion.button>
          </Magnetic>
        </motion.div>
      </motion.nav>

      {/* Mobile Nav - Floating pill */}
      <div className="md:hidden fixed top-4 left-4 right-4 z-50">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`flex items-center justify-between h-14 px-4 rounded-2xl backdrop-blur-xl border transition-all duration-500 ${
            isScrolled
              ? "bg-black/60 border-white/15 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
              : "bg-black/40 border-white/10"
          }`}
        >
          <button
            onClick={() => scrollToSection("contact")}
            className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-bold"
          >
            MB
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-20 left-4 right-4 z-50 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    activeSection === link.id
                      ? "bg-white text-black"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <button
                onClick={() => scrollToSection("contact")}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white text-black font-bold rounded-xl"
              >
                Let&apos;s Talk
                <ArrowRight className="w-4 h-4" />
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github, Twitter, Linkedin, Mail, Send, MapPin, Globe, ArrowUp,
  Search, Plus, HelpCircle, FileText, Code, MessageCircle, Layers
} from "lucide-react";
import Link from "next/link";
// components/ui/SuccessAnimation.tsx - Assuming it has colors, but for now removing import if unused or checking valid usage
// Actually, let's keep it but maybe it needs monochrome update? 
// For now, let's focus on visible Footer elements.
import { SuccessAnimation } from "@/components/ui/SuccessAnimation";
import { Magnetic } from "@/components/ui/Magnetic";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Templates", href: "#work" },
  { label: "Blog", href: "#about" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Cookie Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Return Policy", href: "#" },
];



export function Footer() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Trigger success animation
    setShowSuccess(true);
    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative z-10 bg-black overflow-hidden">
      {/* Bottom Stage Light - smooth fade instead of hard edge */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-t from-white/[0.03] to-transparent pointer-events-none" />

      {/* Success Animation */}
      <SuccessAnimation
        show={showSuccess}
        onComplete={() => setShowSuccess(false)}
      />
      {/* Top glow divider */}
      <div className="relative w-full h-32">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-full h-1"
            style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)" }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-3/4 h-24 blur-3xl rounded-full"
            style={{ background: "rgba(255, 255, 255, 0.02)" }}
          />
        </div>
      </div>

      {/* ===== GLOBAL COMMUNITY SECTION ===== */}
      <div className="relative py-16 border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[1100px] mx-auto px-6 md:px-12 text-center"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-zinc-500" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[--accent] font-semibold">
              Availability
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Let&apos;s Build Something <span className="text-[--accent]">Scalable.</span>
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto text-base leading-relaxed">
            Currently open to senior-level front-end roles or high-impact design systems.
          </p>

          {/* Navigation Links */}
          <nav className="flex justify-center gap-8 mt-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-zinc-400 text-sm font-medium hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>
        </motion.div>
      </div>

      {/* ===== CONTACT FORM SECTION ===== */}
      <div id="contact-form" className="max-w-[1100px] mx-auto px-6 md:px-12 py-10 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Brand & Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Logo/Name */}
            <div className="flex items-center gap-4 mb-8">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="w-14 h-14 rounded-lg bg-white text-black flex items-center justify-center font-bold text-lg shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                MB
              </motion.div>
              <div>
                <div className="text-xl font-bold text-white">Mark Lorenz Barangan</div>
                <div className="text-zinc-500 text-sm">marklorenzbarangan@gmail.com</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mb-8">
              {[
                { icon: Github, href: "https://github.com/l9rins/" },
                { icon: Twitter, href: "https://x.com/realmarquee_dev" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/l9rinsishere/" },
                { icon: Mail, href: "mailto:marklorenzbarangan@gmail.com" },
              ].map(({ icon: Icon, href }, i) => (
                <Magnetic key={i} strength={0.4}>
                  <motion.a
                    href={href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-lg bg-zinc-900/80 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all min-h-[48px] min-w-[48px]"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                </Magnetic>
              ))}
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-zinc-500 text-sm">
              <MapPin className="w-4 h-4" />
              <span>Cebu City, CB</span>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/[0.03] border border-white/[0.1] rounded-lg px-5 py-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.5)] transition-all min-h-[48px]"
                />
                <input
                  type="email"
                  placeholder="hello@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/[0.03] border border-white/[0.1] rounded-lg px-5 py-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.5)] transition-all min-h-[48px]"
                />
              </div>
              <textarea
                placeholder="Tell me about your project, timeline, and goals..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="w-full bg-white/[0.03] border border-white/[0.1] rounded-lg px-5 py-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.5)] transition-all resize-none min-h-[120px]"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-4 rounded-lg hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all min-h-[52px]"
              >
                <Send className="w-5 h-5" />
                Start Conversation
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* ===== BOTTOM BAR ===== */}
      <div className="border-t border-white/5">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Signature - Personal Engineering Credit */}
            <p className="text-zinc-600 text-xs">
              Designed in Figma. Engineered in Next.js. Deployed on Vercel.
            </p>

            {/* Performance Badge - Easter Egg */}
            <div className="hidden md:flex items-center gap-4 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/5 text-[10px] font-mono text-zinc-500 hover:border-white/20 hover:text-zinc-300 transition-colors cursor-help group">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span>Next.js 15</span>
              </div>
              <div className="h-3 w-px bg-white/10" />
              <span>Vercel PRO</span>
              <div className="h-3 w-px bg-white/10" />
              <span className="group-hover:text-white transition-colors">0.8s Load Time</span>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-zinc-600 text-xs hover:text-zinc-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Scroll to top */}
            <Magnetic>
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all min-h-[44px] min-w-[44px]"
              >
                <ArrowUp className="w-5 h-5" />
              </motion.button>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
}
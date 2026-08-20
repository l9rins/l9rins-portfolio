"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github, Twitter, Linkedin, Mail, Send, MapPin, Globe, ArrowUp, Check, Loader2
} from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";

export function Footer() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(formData.message + `\n\nFrom: ${formData.name}\nEmail: ${formData.email}`);
    window.location.href = `mailto:marklorenzbarangan@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <footer id="contact" className="relative z-10 bg-black overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-gradient-to-t from-white/[0.02] to-transparent pointer-events-none" />
      {/* Top glow divider */}
      <div className="relative w-full h-20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-3/5 h-px"
            style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)" }}
          />
        </div>
      </div>

      {/* ===== GLOBAL COMMUNITY SECTION ===== */}
      <div className="relative py-10 border-t border-white/[0.04]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[1100px] mx-auto px-6 md:px-10 text-center"
        >
          <div className="inline-flex items-center gap-1.5 mb-3">
            <Globe className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-[9px] uppercase tracking-[0.3em] text-[--accent] font-medium">
              Availability
            </span>
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight mb-2">
            Let&apos;s Build Something <span className="text-[--accent]">Scalable.</span>
          </h2>
          <p className="text-zinc-500 max-w-md mx-auto text-xs leading-relaxed">
            Currently open to senior-level cloud security, full-stack, or AI/ML engineering roles.
          </p>

        </motion.div>
      </div>

      {/* ===== CONTACT FORM SECTION ===== */}
      <div id="contact-form" className="max-w-[1100px] mx-auto px-6 md:px-10 py-8 border-t border-white/[0.04]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Brand & Info */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-5">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="w-10 h-10 rounded-lg bg-white text-black flex items-center justify-center font-bold text-sm shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              >
                MB
              </motion.div>
              <div>
                <div className="text-sm font-bold text-white">Mark Lorenz Barangan</div>
                <div className="text-zinc-500 text-[10px]">marklorenzbarangan@gmail.com</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-2 mb-5">
              {[
                { icon: Github, href: "https://github.com/l9rins/", label: "GitHub", brandColor: "rgba(255,255,255,0.12)" },
                { icon: Twitter, href: "https://x.com/realmarquee_dev", label: "Twitter", brandColor: "rgba(29,161,242,0.15)" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/l9rinsishere/", label: "LinkedIn", brandColor: "rgba(10,102,194,0.15)" },
                { icon: Mail, href: "mailto:marklorenzbarangan@gmail.com", label: "Email", brandColor: "rgba(234,67,53,0.12)" },
              ].map(({ icon: Icon, href, label, brandColor }, i) => (
                <Magnetic key={i} strength={0.4}>
                  <motion.a
                    href={href}
                    aria-label={label}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-lg bg-zinc-900/80 border border-white/[0.06] flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 hover:shadow-[0_0_12px_rgba(255,255,255,0.08)] transition-[border-radius,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:rounded-full"
                    style={{ ['--brand' as string]: brandColor }}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                </Magnetic>
              ))}
            </div>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-zinc-600 text-[11px]">
              <MapPin className="w-3 h-3" />
              <span>Cebu City, CB</span>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="John Doe"
                  aria-label="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/15 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.04)] shadow-[inset_0_1px_3px_0_rgba(0,0,0,0.4)] transition-all duration-200"
                />
                <input
                  type="email"
                  placeholder="hello@example.com"
                  aria-label="Your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/15 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.04)] shadow-[inset_0_1px_3px_0_rgba(0,0,0,0.4)] transition-all duration-200"
                />
              </div>
              <textarea
                placeholder="Tell me about your project, timeline, and goals..."
                aria-label="Your message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/15 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.04)] shadow-[inset_0_1px_3px_0_rgba(0,0,0,0.4)] transition-all duration-200 resize-none min-h-[80px]"
              />
              <motion.button
                type="submit"
                whileHover={submitted ? {} : { scale: 1.02 }}
                whileTap={submitted ? {} : { scale: 0.97 }}
                animate={submitted ? { borderRadius: '9999px' } : { borderRadius: '0.5rem' }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={`group/submit w-full relative flex items-center justify-center gap-2 font-semibold py-2.5 text-xs transition-colors overflow-hidden ${
                  submitted
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-white text-black hover:bg-white/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                }`}
              >
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.span
                      key="success"
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                      <Check className="w-3.5 h-3.5" />
                      Email client opened — send when ready!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="absolute inset-0 -translate-x-full group-hover/submit:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-black/10 to-transparent pointer-events-none" />
                      <Send className="w-3.5 h-3.5 relative z-10" />
                      <span className="relative z-10">Start Conversation</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* ===== BOTTOM BAR ===== */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-700 text-[10px]">
              Designed in Figma. Engineered in Next.js. Deployed on Vercel.
            </p>

            <div className="hidden md:flex items-center gap-3 px-2.5 py-1 rounded-full bg-zinc-900 border border-white/[0.04] text-[9px] font-mono text-zinc-600 hover:border-white/15 hover:text-zinc-400 transition-colors cursor-help group">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span>Next.js 16</span>
              </div>
              <div className="h-2.5 w-px bg-white/[0.06]" />
              <span>Vercel PRO</span>
              <div className="h-2.5 w-px bg-white/[0.06]" />
              <span className="group-hover:text-white transition-colors">0.8s Load</span>
            </div>

            <Magnetic>
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 rounded-lg bg-zinc-900 border border-white/[0.06] flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 hover:shadow-[0_0_12px_rgba(255,255,255,0.08)] transition-all"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4" />
              </motion.button>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
}

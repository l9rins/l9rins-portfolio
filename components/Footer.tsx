"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github, Twitter, Linkedin, Mail, Send, MapPin, Globe, ArrowUp,
  Search, Plus, HelpCircle, FileText, Code, MessageCircle, Layers
} from "lucide-react";
import Link from "next/link";
import { SuccessAnimation } from "@/components/ui/SuccessAnimation";

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

const faqCategories = [
  { id: "all", label: "All", count: 6 },
  { id: "templates", label: "Templates", count: 3 },
  { id: "licensing", label: "Licensing", count: 3 },
  { id: "components", label: "Components", count: 2 },
  { id: "support", label: "Support", count: 2 },
];

const faqs = [
  {
    category: "templates",
    question: "How do I download the templates after purchase?",
  },
  {
    category: "templates",
    question: "Can I request custom modifications to the templates?",
  },
  {
    category: "templates",
    question: "Do the templates work on mobile devices?",
  },
  {
    category: "licensing",
    question: "What license do the templates come with?",
  },
  {
    category: "licensing",
    question: "Can I use templates for commercial projects?",
  },
  {
    category: "components",
    question: "Are components compatible with Next.js 14+?",
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  // Monochrome category styling
  const categoryColors: Record<string, string> = {
    templates: "text-white bg-white/10 border-white/20",
    licensing: "text-white bg-white/10 border-white/20",
    components: "text-white bg-white/10 border-white/20",
    support: "text-white bg-white/10 border-white/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group flex items-center justify-between p-4 bg-zinc-900/50 border border-white/[0.06] rounded-2xl hover:border-white/15 hover:bg-zinc-900/70 transition-all duration-300 cursor-pointer"
    >
      <span className="text-zinc-300 text-sm group-hover:text-white transition-colors pr-4">
        {faq.question}
      </span>
      <span className={`flex-shrink-0 px-3 py-1 text-[10px] uppercase tracking-wider font-medium rounded-full border ${categoryColors[faq.category]}`}>
        {faq.category}
      </span>
    </motion.div>
  );
}

export function Footer() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
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

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <footer id="contact" className="relative z-10 bg-black overflow-hidden">
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

      {/* ===== FAQ SECTION ===== */}
      <div className="relative py-16">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-4xl mx-auto px-4">
          {/* FAQ Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/60 mb-4 block font-semibold">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
              Got <span className="gradient-text">Questions?</span>
            </h2>
            <p className="text-zinc-500 max-w-lg mx-auto text-sm leading-relaxed">
              Find answers to common questions about our templates, components, and licensing options.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mb-8"
          >
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-800/80 backdrop-blur-sm border-2 border-zinc-700 rounded-2xl py-4 px-14 text-sm text-white placeholder-zinc-400 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 focus:bg-zinc-800 transition-all min-h-[48px]"
            />
          </motion.div>

          {/* Category Tabs with counts */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 min-h-[44px] ${activeCategory === cat.id
                  ? "bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                  : "bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20"
                  }`}
              >
                {cat.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeCategory === cat.id
                  ? "bg-black/20 text-black"
                  : "bg-zinc-800 text-zinc-500"
                  }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-3 mb-12">
            {filteredFaqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
            {filteredFaqs.length === 0 && (
              <div className="text-center py-12 text-zinc-500 text-sm">
                No questions found matching your search.
              </div>
            )}
          </div>

          {/* Still have questions CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center p-8 bg-gradient-to-br from-zinc-900/60 to-zinc-950/60 border border-white/[0.08] rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, transparent 50%)',
            }}
          >
            <h3 className="text-lg font-bold text-white mb-2">Still have questions?</h3>
            <p className="text-zinc-500 text-sm mb-6">
              Can't find the answer you're looking for? Please contact our support team.
            </p>
            <motion.a
              href="#contact-form"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition-colors shadow-[0_0_35px_rgba(255,255,255,0.15)] min-h-[48px]"
            >
              <MessageCircle className="w-4 h-4" />
              Contact Support
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* ===== GLOBAL COMMUNITY SECTION ===== */}
      <div className="relative py-16 border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 text-center"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-white" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-semibold">
              Global User Community
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-4">
            Join thousands of developers worldwide
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto text-sm leading-relaxed">
            Our templates are being used across the globe to create stunning web experiences.
            Join the community and build something amazing.
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
      <div id="contact-form" className="max-w-7xl mx-auto px-4 py-10 border-t border-white/5">
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
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center text-white font-semibold text-lg shadow-[0_0_30px_rgba(255,255,255,0.1)] border border-white/20"
              >
                JD
              </motion.div>
              <div>
                <div className="text-xl font-bold text-white">John Doe</div>
                <div className="text-zinc-500 text-sm">your@email.com</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mb-8">
              {[
                { icon: Github, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Mail, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-2xl bg-zinc-900/80 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all min-h-[44px] min-w-[44px]"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-zinc-500 text-sm">
              <MapPin className="w-4 h-4" />
              <span>San Francisco, CA</span>
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
                  className="bg-zinc-900/60 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 focus:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all min-h-[48px]"
                />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-zinc-900/60 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 focus:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all min-h-[48px]"
                />
              </div>
              <textarea
                placeholder="Tell us about your project requirements, custom work needs, or reskin requests..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="w-full bg-zinc-900/60 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 focus:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all resize-none min-h-[120px]"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-4 rounded-2xl hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all min-h-[52px]"
              >
                <Send className="w-5 h-5" />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* ===== BOTTOM BAR ===== */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-zinc-600 text-xs">
              © 2026 Aniq-ui - Next.js UI Templates
            </p>

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
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all min-h-[44px] min-w-[44px]"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
"use client";

import { motion, useMotionValue } from "framer-motion";
import { Globe, Palette, Code, Play, Sparkles, ArrowUpRight } from "lucide-react";
import { useRef, MouseEvent } from "react";

const services = [
  {
    icon: Globe,
    title: "Website & Product Design",
    description: "Optimised for results, with stunning design in mind. Creating experiences users remember.",
    color: "from-white/20 to-white/10",
    accentColor: "#ffffff",
    stats: { value: "30+", label: "Projects" },
  },
  {
    icon: Palette,
    title: "Branding & Pitch Decks",
    description: "Visual identity with deep brand strategy and guidelines in place. Make your startup stand out.",
    color: "from-white/15 to-white/5",
    accentColor: "#e5e5e5",
    stats: { value: "50+", label: "Brands" },
  },
  {
    icon: Code,
    title: "Full-stack & Smart Contract Development",
    description: "Showcases your project's value through animations & experience. Built for performance.",
    color: "from-white/10 to-gray-500/10",
    accentColor: "#cccccc",
    stats: { value: "99%", label: "Uptime" },
  },
  {
    icon: Play,
    title: "Launch Videos",
    description: "Make sure no one misses your next launch or update! Cinematic quality that converts.",
    color: "from-gray-500/10 to-white/5",
    accentColor: "#b4b4b4",
    isNew: true,
    stats: { value: "2M+", label: "Views" },
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const Icon = service.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1]
      }}
      viewport={{ once: true }}
      className="relative group"
    >
      {/* Hover border reveal effect - mouse tracking glow */}
      <motion.div
        className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${service.accentColor}30, transparent 40%)`,
        }}
      />

      {/* Card container */}
      <div className="relative h-full bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 hover:border-white/20 transition-all duration-500 overflow-hidden min-h-[380px] flex flex-col group-hover:shadow-2xl">
        {/* Atmospheric corner glow - top right */}
        <div
          className={`absolute -top-24 -right-24 w-56 h-56 bg-gradient-to-br ${service.color} opacity-[0.06] rounded-full blur-3xl group-hover:opacity-[0.15] group-hover:scale-125 transition-all duration-700`}
        />

        {/* Secondary glow - bottom left */}
        <div
          className={`absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr ${service.color} opacity-0 rounded-full blur-3xl group-hover:opacity-[0.1] transition-opacity duration-700`}
        />

        {/* Animated gradient line at top */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${service.accentColor}60, transparent)`,
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
        />

        <div className="relative z-10 flex flex-col h-full">
          {/* Header with icon and NEW badge */}
          <div className="flex items-start justify-between mb-6">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="w-16 h-16 rounded-2xl border-2 flex items-center justify-center relative overflow-hidden"
              style={{
                borderColor: `${service.accentColor}40`,
                background: `linear-gradient(135deg, ${service.accentColor}20, ${service.accentColor}05)`,
                boxShadow: `0 8px 32px ${service.accentColor}20`,
              }}
            >
              <Icon className="w-7 h-7" style={{ color: service.accentColor }} />
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>
            {service.isNew && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-400 border border-red-500/30 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.3)]"
              >
                <Sparkles className="w-3 h-3 animate-pulse" />
                NEW!
              </motion.span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-3 leading-tight group-hover:text-white/95 transition-colors">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6 group-hover:text-zinc-300 transition-colors flex-grow">
            {service.description}
          </p>

          {/* Bottom section: Stats + CTA */}
          <div className="flex items-end justify-between mt-auto pt-6 border-t border-white/5">
            {/* Stats */}
            {service.stats && (
              <div>
                <div
                  className="text-2xl font-black"
                  style={{ color: service.accentColor }}
                >
                  {service.stats.value}
                </div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
                  {service.stats.label}
                </div>
              </div>
            )}

            {/* View Project CTA */}
            <motion.button
              whileHover={{ scale: 1.05, x: 3 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors group/btn"
            >
              Learn More
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function WhatIBuild() {
  return (
    <section className="relative z-10">
      {/* Atmospheric background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] bg-[--accent]/[0.03] rounded-full blur-[180px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/[0.02] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/[0.02] rounded-full blur-[100px]" />
      </div>

      {/* Section Header - V21 Studio inspired */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16"
      >
        {/* Label pill */}
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-block text-[10px] uppercase tracking-[0.4em] text-[--accent] mb-8 px-5 py-2.5 border border-[--accent]/30 rounded-full font-semibold backdrop-blur-sm bg-[--accent]/5 shadow-[0_0_20px_rgba(255,107,0,0.1)]"
        >
          ✦ Services
        </motion.span>

        {/* Two-tone heading - V21 Style */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-600 tracking-tighter mb-6">
          <span className="text-zinc-500">Tailor Made</span>{" "}
          <span className="text-white">Solutions</span>
        </h2>

        {/* Subtle subtext */}
        <p className="text-zinc-500 text-sm md:text-base max-w-lg mx-auto mt-4">
          Premium digital services designed to elevate your brand and captivate your audience.
        </p>
      </motion.div>

      {/* 2x2 Bento Grid with enhanced spacing */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {services.map((service, index) => (
          <ServiceCard key={service.title} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
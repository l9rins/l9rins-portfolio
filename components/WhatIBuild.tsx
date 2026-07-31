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
    description: "Visual identity with deep brand strategy and guidelines. Make your startup stand out.",
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
    description: "Make sure no one misses your next launch! Cinematic quality that converts.",
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
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: [0.25, 0.8, 0.25, 1] }}
      viewport={{ once: true }}
      className="relative group"
    >
      {/* Hover spotlight */}
      <motion.div
        className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${service.accentColor}12, transparent 40%)`,
        }}
      />

      {/* Card */}
      <div className="relative h-full bg-zinc-900/80 border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.12] transition-all duration-200 overflow-hidden min-h-[260px] flex flex-col">
        {/* Corner glow */}
        <div
          className={`absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br ${service.color} opacity-[0.05] rounded-full blur-2xl group-hover:opacity-[0.08] transition-opacity duration-300`}
        />

        {/* Dot grid */}
        <div className="absolute inset-0 z-0 opacity-[0.05] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

        {/* Animated top line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${service.accentColor}50, transparent)`,
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: index * 0.08 + 0.2 }}
        />

        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="w-9 h-9 rounded-lg border flex items-center justify-center relative overflow-hidden"
              style={{
                borderColor: `${service.accentColor}30`,
                background: `linear-gradient(135deg, ${service.accentColor}15, ${service.accentColor}05)`,
              }}
            >
              <Icon className="w-4 h-4" style={{ color: service.accentColor }} />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
            {service.isNew && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-white/15 text-white border border-white/15 rounded-full"
              >
                <Sparkles className="w-2.5 h-2.5 animate-pulse" />
                NEW
              </motion.span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-white tracking-tight mb-1.5 leading-snug group-hover:text-white/95 transition-colors">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-zinc-500 text-xs leading-relaxed mb-4 group-hover:text-zinc-400 transition-colors flex-grow">
            {service.description}
          </p>

          {/* Bottom: Stats + CTA */}
          <div className="flex items-end justify-between mt-auto pt-3 border-t border-white/[0.04]">
            {service.stats && (
              <div>
                <div className="text-base font-bold" style={{ color: service.accentColor }}>
                  {service.stats.value}
                </div>
                <div className="text-[8px] text-zinc-600 uppercase tracking-wider">
                  {service.stats.label}
                </div>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.05, x: 2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 text-[11px] font-medium text-zinc-500 hover:text-white transition-colors group/btn"
            >
              Learn
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
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
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[--accent]/[0.02] rounded-full blur-[150px]" />
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-10"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-block text-[9px] uppercase tracking-[0.4em] text-[--accent] mb-5 px-4 py-1.5 border border-[--accent]/20 rounded-full font-medium bg-[--accent]/[0.03]"
        >
          ✦ Services
        </motion.span>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter mb-3">
          <span className="text-zinc-500">Tailor Made</span>{" "}
          <span className="text-white">Solutions</span>
        </h2>

        <p className="text-zinc-500 text-xs md:text-sm max-w-md mx-auto mt-2">
          Premium digital services designed to elevate your brand and captivate your audience.
        </p>
      </motion.div>

      {/* 2x2 Grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
        {services.map((service, index) => (
          <ServiceCard key={service.title} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}

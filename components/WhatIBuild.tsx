"use client";

import { motion, useMotionValue } from "framer-motion";
import { Globe, Palette, Code, Play, Sparkles } from "lucide-react";
import { useRef, MouseEvent } from "react";

const services = [
  {
    icon: Globe,
    title: "Website & Product Design",
    description: "Optimised for results, with stunning design in mind.",
    color: "from-blue-500 to-cyan-500",
    accentColor: "#0ea5e9",
  },
  {
    icon: Palette,
    title: "Branding & Pitch Decks",
    description: "Visual identity with deep brand strategy and guidelines in place.",
    color: "from-purple-500 to-pink-500",
    accentColor: "#a855f7",
  },
  {
    icon: Code,
    title: "Full-stack & Smart Contract Development",
    description: "Showcases your project's value through animations & experience.",
    color: "from-orange-500 to-amber-500",
    accentColor: "#f59e0b",
  },
  {
    icon: Play,
    title: "Launch Videos",
    description: "Make sure no one misses your next launch or update!",
    color: "from-emerald-500 to-teal-500",
    accentColor: "#10b981",
    isNew: true,
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
          background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${service.accentColor}25, transparent 40%)`,
        }}
      />

      {/* Card container */}
      <div className="relative h-full bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-7 hover:border-white/20 transition-all duration-500 overflow-hidden min-h-[320px] flex flex-col group-hover:shadow-2xl">
        {/* Atmospheric corner glow - top right */}
        <div
          className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${service.color} opacity-[0.06] rounded-full blur-3xl group-hover:opacity-[0.12] group-hover:scale-125 transition-all duration-700`}
        />

        {/* Secondary glow - bottom left */}
        <div
          className={`absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr ${service.color} opacity-0 rounded-full blur-3xl group-hover:opacity-[0.08] transition-opacity duration-700`}
        />

        {/* Animated gradient line at top */}
        <div className="absolute top-0 left-0 right-0 h-px">
          <motion.div
            className="h-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${service.accentColor}50, transparent)`,
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
          />
        </div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Header with icon and NEW badge */}
          <div className="flex items-start justify-between mb-5">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="w-14 h-14 rounded-2xl border-2 flex items-center justify-center"
              style={{
                borderColor: `${service.accentColor}30`,
                background: `linear-gradient(135deg, ${service.accentColor}15, ${service.accentColor}05)`,
                boxShadow: `0 8px 32px ${service.accentColor}15`,
              }}
            >
              <Icon className="w-6 h-6" style={{ color: service.accentColor }} />
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
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6 group-hover:text-zinc-300 transition-colors">
            {service.description}
          </p>

          {/* Preview visual - animated gradient box */}
          <div className="mt-auto">
            <motion.div
              className={`w-full h-28 rounded-2xl bg-gradient-to-br ${service.color} opacity-15 group-hover:opacity-25 transition-all duration-500 relative overflow-hidden`}
              style={{
                boxShadow: `0 12px 40px ${service.accentColor}15`,
              }}
            >
              {/* Animated shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />

              {/* Floating particles */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-white/30"
                    style={{
                      left: `${25 + i * 25}%`,
                      top: `${30 + i * 15}%`,
                    }}
                    animate={{
                      y: [-5, 5, -5],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function WhatIBuild() {
  return (
    <section id="services" className="relative z-10">
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
        {/* Label pill - subtle styling per Round 2 audit */}
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-block text-[10px] uppercase tracking-[0.4em] text-white/60 mb-8 px-5 py-2 border border-white/20 rounded-full font-semibold backdrop-blur-sm bg-white/5"
        >
          Services
        </motion.span>

        {/* Two-tone heading - White text, no vibrating gradient per Round 2 audit */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6">
          <span className="text-zinc-400">TAILOR MADE</span>{" "}
          <span className="text-white">SOLUTIONS</span>
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
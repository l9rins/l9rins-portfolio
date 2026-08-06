"use client";

import { motion, useMotionValue } from "framer-motion";
import { Cloud, Code, Brain, Link, ArrowUpRight } from "lucide-react";
import { useRef, MouseEvent } from "react";

const services = [
  {
    icon: Cloud,
    title: "Cloud Security",
    description: "AWS, JumpCloud, Fortinet, ISC2 — hardening cloud infrastructure and identity management for production environments.",
    color: "from-white/20 to-white/10",
    accentColor: "#ffffff",
    stats: { value: "5+", label: "Certifications" },
  },
  {
    icon: Code,
    title: "Full-Stack Development",
    description: "Spring Boot, React, Node.js — end-to-end application development from database to deployment.",
    color: "from-white/20 to-white/10",
    accentColor: "#ffffff",
    stats: { value: "24", label: "Projects" },
  },
  {
    icon: Brain,
    title: "AI/ML Systems",
    description: "Anthropic API, Python, Streamlit — intelligent systems for cybersecurity coaching, candidate scoring, and predictive analytics.",
    color: "from-white/20 to-white/10",
    accentColor: "#ffffff",
    stats: { value: "4", label: "AI Apps" },
  },
  {
    icon: Link,
    title: "Blockchain & Fintech",
    description: "Stellar SDK, on-chain lending protocols — APAC Demo Day winner, building decentralized financial infrastructure.",
    color: "from-white/20 to-white/10",
    accentColor: "#ffffff",
    stats: { value: "APAC", label: "Demo Day" },
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
      <div className="relative h-full bg-zinc-900/80 border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.12] transition-all duration-200 overflow-hidden min-h-[200px] md:min-h-[260px] flex flex-col">
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
              className="hidden md:flex items-center gap-1 text-[11px] font-medium text-zinc-500 hover:text-white transition-colors group/btn"
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
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-1.5 mb-3">
          <Code className="w-3.5 h-3.5 text-zinc-600" />
          <span className="text-[9px] uppercase tracking-[0.3em] text-[--accent] font-medium">
            What I Build
          </span>
        </div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight mb-2">
          Engineering <span className="text-[--accent]">Pillars</span>
        </h2>
        <p className="text-zinc-500 max-w-md mx-auto text-xs leading-relaxed">
          Specialized systems across four domains — from cloud infrastructure to decentralized finance.
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

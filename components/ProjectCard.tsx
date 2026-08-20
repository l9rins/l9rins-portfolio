"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight, Github, Eye, TrendingUp, Users, Zap } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface ProjectProps {
  project: {
    id: number;
    title: string;
    description: string;
    tech: string[];
    tags?: string[];
    category?: string;
    image: string;
    video: string;
    link: string;
    github?: string;
    stats?: { label: string; value: string }[];
    color: string;
  };
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(imageRef, { once: true, margin: "-50px" });

  const handleHoverStart = () => {
    setIsHovered(true);
    setTimeout(() => {
      if (videoRef.current && videoRef.current.src) {
        videoRef.current.play().catch(() => {});
        videoRef.current.currentTime = 0;
      }
    }, 50);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // Featured card layout (larger, with stats)
  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="group relative w-full rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 cursor-pointer transition-all duration-500 hover:border-[--accent]/40"
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
        whileHover={{ y: -4 }}
        style={{
          boxShadow: isHovered ? `0 0 80px rgba(255, 255, 255, 0.15)` : 'none'
        }}
      >
        {/* Visual Fill - Dot Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.07] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] rounded-3xl" />

        {/* Corner gradient blob */}
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-[60px] pointer-events-none" />

        <div className="grid md:grid-cols-2 min-h-[320px] md:min-h-[400px] relative z-10">
          {/* Left: Image/Video */}
          <div className="relative aspect-video md:aspect-auto overflow-hidden">
            {/* Gradient accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1.5 z-40"
              style={{
                background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)`,
              }}
            />

            {/* Static thumbnail */}
            <motion.div
              ref={imageRef}
              className="absolute inset-0 z-20"
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{
                scale: isHovered ? 1.25 : inView ? 1.1 : 1.2,
                opacity: isHovered ? 0 : 1,
              }}
              transition={{ duration: 0.7, ease: [0.25, 0.8, 0.25, 1] }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            </motion.div>

            {/* Video layer */}
            {project.video && (
              <div className={`absolute inset-0 z-10 transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                <video
                  ref={videoRef}
                  src={project.video}
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Colored overlay on hover */}
            <motion.div
              className="absolute inset-0 z-25 pointer-events-none"
              animate={{ opacity: isHovered ? 0.15 : 0 }}
              style={{ backgroundColor: project.color }}
            />
          </div>

          {/* Right: Content - The "Control Panel" with texture */}
          <div className="relative p-5 md:p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-br from-zinc-900 to-zinc-950 overflow-hidden">
            {/* Info Panel Texture - Dot Grid for precision feel */}
            <div className="absolute inset-0 z-0 opacity-[0.05] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            {/* Inner glow from corner */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-[60px] pointer-events-none" />

            {/* Top section */}
            <div className="relative z-10">
              {/* Featured badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-[10px] uppercase tracking-wider font-bold rounded-full border"
                style={{
                  borderColor: `${project.color}40`,
                  backgroundColor: `${project.color}15`,
                  color: project.color,
                }}
              >
                <Zap className="w-3 h-3" />
                Featured Project
              </motion.div>

              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4 group-hover:text-[--foreground] transition-colors">
                {project.title}
              </h3>

              <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Tech Pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((t) => (
                  <Badge
                    key={t}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 text-zinc-400 text-xs px-3 py-1.5 font-medium hover:border-[--accent]/50 hover:text-white transition-colors"
                  >
                    {t}
                  </Badge>
                ))}
              </div>

              {/* Mock Stats */}
              <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-white/5">
                {project.stats ? (
                  project.stats.map((s) => (
                    <div key={s.label} className="text-center group/stat">
                      <div className="text-xl font-bold text-white group-hover/stat:text-[--accent] transition-colors">{s.value}</div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider">{s.label}</div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="text-center">
                      <div className="text-xl font-bold text-white">4.2M</div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Users</div>
                    </div>
                    <div className="text-center border-x border-white/5">
                      <div className="text-xl font-bold text-white">99%</div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Uptime</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-white">0.8s</div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Load Time</div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Bottom: CTA */}
            <div className="flex gap-3 mt-6">
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-black transition-all min-h-[48px]"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: `0 0 30px rgba(255, 255, 255, 0.2)`,
                }}
              >
                View Project
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href={project.github || "#"}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm text-white bg-white/5 border border-white/10 hover:border-white/20 transition-all min-h-[48px]"
              >
                <Github className="w-4 h-4" />
                Source
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Standard card layout
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative w-full aspect-[4/3] md:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 cursor-pointer transition-all duration-500 hover:border-[--accent]/40"
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      whileHover={{ y: -4 }}
      style={{
        boxShadow: isHovered ? `0 0 60px rgba(255, 255, 255, 0.1)` : 'none'
      }}
    >
      {/* Visual Fill - Dot Grid Pattern */}
      <div className="absolute inset-0 z-[5] opacity-[0.07] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] rounded-2xl pointer-events-none" />

      {/* Corner gradient blob */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/20 blur-[50px] pointer-events-none" />

      {/* Gradient accent bar at top */}
      <div
        className="absolute top-0 left-0 right-0 h-1 z-40"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)`,
        }}
      />

      {/* Static thumbnail */}
      <div ref={imageRef} className={`absolute inset-0 z-20 transition-all duration-700 ${isHovered ? "opacity-0 scale-110" : "opacity-100 scale-100"}`}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover transition-all duration-700 ${isHovered ? "opacity-100 grayscale-0" : "opacity-90 grayscale-[20%]"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Video layer */}
      {project.video && (
        <div className="absolute inset-0 z-10">
          <video
            ref={videoRef}
            src={project.video}
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
      )}

      {/* Colored glow overlay */}
      <motion.div
        className="absolute inset-0 z-25 pointer-events-none"
        animate={{ opacity: isHovered ? 0.08 : 0 }}
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      />

      {/* Content overlay */}
      <div className="absolute inset-0 z-30 p-5 flex flex-col justify-between">
        {/* Top: Action buttons */}
        <div className="flex justify-end gap-2 translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full hover:bg-white text-white hover:text-black transition-all duration-300 min-h-[48px] min-w-[48px] flex items-center justify-center"
          >
            <Eye className="w-4 h-4" />
          </motion.a>
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full hover:bg-white text-white hover:text-black transition-all duration-300 min-h-[48px] min-w-[48px] flex items-center justify-center"
            >
              <Github className="w-4 h-4" />
            </motion.a>
          )}
        </div>

        {/* Bottom: Title & Info */}
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-xl font-bold tracking-tight text-white mb-2 drop-shadow-lg">
            {project.title}
          </h3>

          {/* Tech Pills - show on hover */}
          <div className="flex flex-wrap gap-1.5 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75">
            {project.tech.slice(0, 3).map((t) => (
              <Badge
                key={t}
                className="bg-black/50 backdrop-blur-sm border border-white/10 text-white/80 text-[10px] px-2 py-0.5 font-medium"
              >
                {t}
              </Badge>
            ))}
          </div>

          <p className="text-zinc-400 text-xs line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 mb-3">
            {project.description}
          </p>

          {/* Project Stats - show on hover */}
          {project.stats && (
            <div className="flex justify-between gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150 py-2 border-t border-white/5">
              {project.stats.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-white font-bold text-[10px]">{s.value}</span>
                  <span className="text-zinc-500 text-[8px] uppercase tracking-tighter">{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
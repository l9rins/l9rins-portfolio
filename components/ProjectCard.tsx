"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Eye } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProjectProps {
  project: {
    id: number;
    title: string;
    description: string;
    tech: string[];
    image: string;
    video: string;
    link: string;
    color: string;
  };
}

export function ProjectCard({ project }: ProjectProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  const handleHoverStart = () => {
    setIsHovered(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 cursor-pointer transition-all duration-300 hover:border-[--accent]/40"
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      whileHover={{ y: -4 }}
      style={{
        boxShadow: isHovered ? '0 0 60px rgba(255, 107, 0, 0.15)' : 'none'
      }}
    >
      {/* 1. STATIC THUMBNAIL - Brightened per UX audit */}
      <div ref={imageRef} className={`absolute inset-0 z-20 transition-all duration-700 ${isHovered ? "opacity-0 scale-110" : "opacity-100 scale-100"}`}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          className={`object-cover transition-all duration-700 ${isHovered ? "opacity-100 grayscale-0" : "opacity-85 grayscale-[30%]"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* 2. VIDEO LAYER */}
      <div className="absolute inset-0 z-10">
        <video
          ref={videoRef}
          src={project.video}
          loop
          muted
          playsInline
          className="w-full h-full object-cover grayscale-0 opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Orange glow effect on hover */}
      <div className={`absolute inset-0 z-15 transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-[--accent]/15 via-transparent to-transparent" />
      </div>

      {/* 3. CONTENT OVERLAY */}
      <div className="absolute inset-0 z-30 p-6 flex flex-col justify-between">

        {/* Top: Links */}
        <div className="flex justify-end gap-2 translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <button className="p-2 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full hover:bg-white text-white hover:text-black transition-all duration-300">
            <Eye className="w-5 h-5" />
          </button>
          <Link href={project.link} target="_blank" className="p-2 bg-[--accent]/20 backdrop-blur-sm border border-[--accent]/30 rounded-full hover:bg-[--accent] text-white hover:text-black transition-all duration-300">
            <ArrowUpRight className="w-5 h-5" />
          </Link>
          <Link href="#" className="p-2 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full hover:bg-white text-white hover:text-black transition-all duration-300">
            <Github className="w-5 h-5" />
          </Link>
        </div>

        {/* Bottom: Title & Info */}
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-2xl font-bold tracking-tight text-white drop-shadow-lg">{project.title}</h3>
          </div>

          {/* Tech Pills */}
          <div className="flex flex-wrap gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
            {project.tech.map((t, i) => (
              <Badge
                key={t}
                className="bg-black/50 backdrop-blur-sm border border-white/10 text-white text-xs px-3 py-1 font-medium hover:border-[--accent]/50 hover:text-[--accent] transition-colors"
              >
                {t}
              </Badge>
            ))}
          </div>

          <p className="text-zinc-400 text-sm max-w-md line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
            {project.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
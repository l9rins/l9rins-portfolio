"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Atom, Zap, Code, Palette, Server, Database, Container, Cloud, GitBranch, PenTool, Shield, Brain, Link } from "lucide-react";

interface TechIcon {
  name: string;
  icon: React.ReactNode;
  color: string;
}

const techStack: TechIcon[] = [
  { name: "React", icon: <Atom className="w-3.5 h-3.5" />, color: "#61DAFB" },
  { name: "Next.js", icon: <Zap className="w-3.5 h-3.5" />, color: "#000000" },
  { name: "TypeScript", icon: <Code className="w-3.5 h-3.5" />, color: "#3178C6" },
  { name: "Tailwind", icon: <Palette className="w-3.5 h-3.5" />, color: "#06B6D4" },
  { name: "Node.js", icon: <Server className="w-3.5 h-3.5" />, color: "#339933" },
  { name: "Python", icon: <Code className="w-3.5 h-3.5" />, color: "#3776AB" },
  { name: "PostgreSQL", icon: <Database className="w-3.5 h-3.5" />, color: "#336791" },
  { name: "MongoDB", icon: <Database className="w-3.5 h-3.5" />, color: "#47A248" },
  { name: "Docker", icon: <Container className="w-3.5 h-3.5" />, color: "#2496ED" },
  { name: "AWS", icon: <Cloud className="w-3.5 h-3.5" />, color: "#FF9900" },
  { name: "Stellar", icon: <Link className="w-3.5 h-3.5" />, color: "#14B6E7" },
  { name: "Java", icon: <Shield className="w-3.5 h-3.5" />, color: "#ED8B00" },
  { name: "Spring Boot", icon: <Server className="w-3.5 h-3.5" />, color: "#6DB33F" },
  { name: "Git", icon: <GitBranch className="w-3.5 h-3.5" />, color: "#F05032" },
  { name: "Figma", icon: <PenTool className="w-3.5 h-3.5" />, color: "#F24E1E" },
  { name: "AI/ML", icon: <Brain className="w-3.5 h-3.5" />, color: "#D97757" },
];

export function TechMarquee() {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const items = [...techStack, ...techStack, ...techStack];

  return (
    <div className="flex-1 min-w-0 overflow-hidden">
      <motion.div
        className="flex gap-3 md:gap-4 w-max"
        animate={{
          x: ["0%", "-33.333%"],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {items.map((tech, index) => (
          <motion.div
            key={`${tech.name}-${index}`}
            className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] transition-all duration-200 cursor-pointer relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setIsHovered(tech.name)}
            onHoverEnd={() => setIsHovered(null)}
          >
            {/* Brand color glow on hover */}
            <span
              className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 20% 50%, ${tech.color}18, transparent 70%)`,
                opacity: isHovered === tech.name ? 1 : 0,
              }}
            />
            <span
              className="relative z-10 transition-all duration-300"
              style={{
                color: isHovered === tech.name ? tech.color : undefined,
                transform: isHovered === tech.name ? 'rotate(360deg)' : 'rotate(0deg)',
              }}
            >
              {tech.icon}
            </span>
            <span
              className={`relative z-10 text-[10px] font-medium whitespace-nowrap transition-colors duration-200 ${
                isHovered === tech.name ? "text-white" : "text-zinc-500"
              }`}
            >
              {tech.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

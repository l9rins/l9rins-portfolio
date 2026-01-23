"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Atom, Zap, Code, Palette, Server, Database, Container, Cloud, GitBranch, PenTool } from "lucide-react";

interface TechIcon {
  name: string;
  icon: React.ReactNode;
  color: string;
}

const techStack: TechIcon[] = [
  { name: "React", icon: <Atom className="w-5 h-5" />, color: "#61DAFB" },
  { name: "Next.js", icon: <Zap className="w-5 h-5" />, color: "#000000" },
  { name: "TypeScript", icon: <Code className="w-5 h-5" />, color: "#3178C6" },
  { name: "Tailwind", icon: <Palette className="w-5 h-5" />, color: "#06B6D4" },
  { name: "Node.js", icon: <Server className="w-5 h-5" />, color: "#339933" },
  { name: "Python", icon: <Code className="w-5 h-5" />, color: "#3776AB" },
  { name: "PostgreSQL", icon: <Database className="w-5 h-5" />, color: "#336791" },
  { name: "MongoDB", icon: <Database className="w-5 h-5" />, color: "#47A248" },
  { name: "Docker", icon: <Container className="w-5 h-5" />, color: "#2496ED" },
  { name: "AWS", icon: <Cloud className="w-5 h-5" />, color: "#FF9900" },
  { name: "Git", icon: <GitBranch className="w-5 h-5" />, color: "#F05032" },
  { name: "Figma", icon: <PenTool className="w-5 h-5" />, color: "#F24E1E" },
];

export function TechMarquee() {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  return (
    <div className="w-full overflow-hidden relative">
      <motion.div
        className="flex gap-8"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* First set */}
        {techStack.map((tech, index) => (
          <motion.div
            key={`${tech.name}-${index}`}
            className="flex-shrink-0 flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setIsHovered(tech.name)}
            onHoverEnd={() => setIsHovered(null)}
          >
            <span
              className={`transition-colors duration-300 ${
                isHovered === tech.name ? "text-white" : "text-zinc-400"
              }`}
              style={{ color: isHovered === tech.name ? tech.color : undefined }}
            >
              {tech.icon}
            </span>
            <span
              className={`text-sm font-medium transition-colors duration-300 ${
                isHovered === tech.name ? "text-white" : "text-zinc-400"
              }`}
            >
              {tech.name}
            </span>
          </motion.div>
        ))}

        {/* Duplicate set for seamless loop */}
        {techStack.map((tech, index) => (
          <motion.div
            key={`${tech.name}-duplicate-${index}`}
            className="flex-shrink-0 flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setIsHovered(tech.name)}
            onHoverEnd={() => setIsHovered(null)}
          >
            <span
              className={`transition-colors duration-300 ${
                isHovered === tech.name ? "text-white" : "text-zinc-400"
              }`}
              style={{ color: isHovered === tech.name ? tech.color : undefined }}
            >
              {tech.icon}
            </span>
            <span
              className={`text-sm font-medium transition-colors duration-300 ${
                isHovered === tech.name ? "text-white" : "text-zinc-400"
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
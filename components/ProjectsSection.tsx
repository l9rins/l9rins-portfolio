"use client";

import { motion, useMotionValue } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useState, useRef, MouseEvent } from "react";

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Web", "Mobile"];

  return (
    <motion.section
      id="work"
      className="relative z-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Atmospheric background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[--accent-secondary]/5 rounded-full blur-[150px]" />
      </div>

      {/* Section Header with Filter */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[--accent] mb-4 block font-medium">
            Portfolio
          </span>
          <h2 className="h2 mb-4 tracking-tight">
            Selected <span className="gradient-text">Works</span>
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-md">
            A collection of digital products focused on
            <span className="text-white font-medium"> interaction </span>
            and <span className="text-white font-medium">performance</span>.
          </p>
        </div>

        {/* Filter Tabs with hover effect */}
        <div className="flex gap-1 bg-zinc-900/60 p-1 rounded-full border border-white/10">
          {filters.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${activeFilter === tab
                  ? "bg-[--accent] text-black"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* The Grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
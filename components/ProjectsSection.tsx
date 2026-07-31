// components/ProjectsSection.tsx
"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Magnetic } from "@/components/ui/Magnetic";

const filters = ['All', 'Web', 'Mobile', 'Dashboard'];

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <motion.section
      id="work"
      className="relative z-10 py-14 max-w-7xl mx-auto px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Section Header - V21 Studio style */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
        <div>
          {/* Label */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-[10px] uppercase tracking-[0.4em] text-[--accent] mb-4 font-semibold"
          >
            ✦ Portfolio
          </motion.span>

          {/* Two-tone heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-4"
          >
            <span className="text-zinc-500">Selected</span>{" "}
            <span className="text-white">Works</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 max-w-lg text-sm md:text-base leading-relaxed"
          >
            A collection of digital products focused on{' '}
            <span className="text-white font-medium">interaction</span>
            {' '}and{' '}
            <span className="text-white font-medium">performance</span>.
          </motion.p>
        </div>

        {/* Filter Tabs - Enhanced */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex gap-2 bg-zinc-900/60 p-1.5 rounded-full border border-white/10 backdrop-blur-xl"
        >
          {filters.map((filter) => (
            <Magnetic key={filter} strength={0.3}>
              <motion.button
                onClick={() => setActiveFilter(filter)}
                className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${activeFilter === filter
                  ? 'text-black'
                  : 'text-zinc-400 hover:text-white'
                  }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {activeFilter === filter && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-white rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </motion.button>
            </Magnetic>
          ))}
        </motion.div>
      </div>

      {/* Featured Project (First project larger) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <ProjectCard project={filteredProjects[0]} featured />
      </motion.div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.slice(1).map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>

      {/* View All Projects CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex justify-center mt-16"
      >
        <Magnetic>
          <motion.a
            href="https://github.com/l9rins?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(255, 255, 255, 0.1)" }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 px-8 py-4 bg-zinc-900/80 border border-white/10 rounded-full text-white font-medium hover:border-white/30 transition-all duration-300 group"
          >
            View All Projects
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </motion.a>
        </Magnetic>
      </motion.div>
    </motion.section>
  );
}
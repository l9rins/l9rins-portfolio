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
      className="relative z-10 py-10 max-w-7xl mx-auto px-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-[9px] uppercase tracking-[0.4em] text-[--accent] mb-3 font-medium"
          >
            ✦ Portfolio
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter text-white mb-2"
          >
            <span className="text-zinc-500">Selected</span>{" "}
            <span className="text-white">Works</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 max-w-md text-xs md:text-sm leading-relaxed"
          >
            A collection of digital products focused on{' '}
            <span className="text-white font-medium">interaction</span>
            {' '}and{' '}
            <span className="text-white font-medium">performance</span>.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex gap-1 bg-zinc-900/60 p-1 rounded-full border border-white/[0.06]"
        >
          {filters.map((filter) => (
            <Magnetic key={filter} strength={0.3}>
              <motion.button
                onClick={() => setActiveFilter(filter)}
                className={`relative px-4 py-1.5 text-[11px] font-medium rounded-full transition-all duration-200 ${activeFilter === filter
                  ? 'text-black'
                  : 'text-zinc-500 hover:text-white'
                  }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
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

      {/* Featured Project */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-5"
      >
        <ProjectCard project={filteredProjects[0]} featured />
      </motion.div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.slice(1).map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            viewport={{ once: true }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>

      {/* View All */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex justify-center mt-10"
      >
        <Magnetic>
          <motion.a
            href="https://github.com/l9rins?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-6 py-2.5 bg-zinc-900/80 border border-white/[0.06] rounded-full text-white text-xs font-medium hover:border-white/20 transition-all duration-200 group"
          >
            View All Projects
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </motion.a>
        </Magnetic>
      </motion.div>
    </motion.section>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import { ArrowRight, Folder } from "lucide-react";
import { useState } from "react";
import { Magnetic } from "@/components/ui/Magnetic";

const filters = ['All', 'Blockchain', 'AI/ML', 'Security', 'Infrastructure'];

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.tags.includes(activeFilter));

  return (
    <motion.section
      id="work"
      className="relative z-10 py-10 max-w-7xl mx-auto px-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Section Header + Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-1.5 mb-3">
              <Folder className="w-3.5 h-3.5 text-zinc-600" />
              <span className="text-[9px] uppercase tracking-[0.3em] text-[--accent] font-medium">
                Projects
              </span>
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight mb-2">
              Open Source <span className="text-[--accent]">Projects</span>
            </h2>
            <p className="text-zinc-500 max-w-md text-xs leading-relaxed">
              Repositories spanning{' '}
              <span className="text-white font-medium">blockchain</span>
              ,{' '}
              <span className="text-white font-medium">cloud security</span>
              , and{' '}
              <span className="text-white font-medium">AI/ML systems</span>.
            </p>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-1 bg-zinc-900/60 p-1 rounded-full border border-white/[0.06]"
        >
          {filters.map((filter) => {
            const count = filter === 'All'
              ? projects.length
              : projects.filter(p => p.tags.includes(filter)).length;

            return (
              <Magnetic key={filter} strength={0.3}>
                <motion.button
                  onClick={() => setActiveFilter(filter)}
                  className={`relative px-3 py-1.5 text-[11px] font-medium rounded-full transition-all duration-200 flex items-center gap-1.5 ${activeFilter === filter
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
                  <span className={`relative z-10 text-[8px] font-bold px-1 py-0.5 rounded-full min-w-[18px] text-center ${activeFilter === filter
                    ? 'bg-black/15'
                    : 'bg-white/10 text-zinc-600'
                    }`}>
                    {count}
                  </span>
                </motion.button>
              </Magnetic>
            );
          })}
        </motion.div>
      </div>

      {/* Featured Project (first one, full width) */}
      <AnimatePresence mode="wait">
        {filteredProjects.length > 0 && (
          <motion.div
            key={`featured-${activeFilter}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mb-5"
          >
            <ProjectCard project={filteredProjects[0]} featured />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`grid-${activeFilter}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredProjects.slice(1).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <p className="text-zinc-600 text-sm">No projects found in this category.</p>
        </motion.div>
      )}

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
            View All 24 Projects
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </motion.a>
        </Magnetic>
      </motion.div>
    </motion.section>
  );
}

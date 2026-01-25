"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Trophy, Rocket, Star, ChevronRight } from "lucide-react";

const timelineData = [
  {
    year: "2026",
    title: "Senior Design Engineer",
    company: "Vercel (Fictional)",
    description: "Leading the design system migration to React Server Components. Building the future of web development.",
    icon: Rocket,
    iconColor: "#ff6b00",
    tags: ["Next.js 15", "Turborepo", "Design Systems"],
    isCurrent: true,
    achievement: "Led team of 8",
  },
  {
    year: "2024",
    title: "Full Stack Developer",
    company: "Freelance",
    description: "Shipped 15+ products for Series A startups. 95+ Lighthouse scores across all projects.",
    icon: Trophy,
    iconColor: "#22c55e",
    tags: ["React", "Supabase", "Stripe"],
    achievement: "$1.2M+ Generated",
  },
  {
    year: "2023",
    title: "BS Computer Science",
    company: "University of Technology",
    description: "Specialized in Human-Computer Interaction and WebGL performance. Graduated with honors.",
    icon: GraduationCap,
    iconColor: "#0070f3",
    tags: ["Thesis", "3.8 GPA", "HCI"],
    achievement: "Magna Cum Laude",
  },
];

function TimelineItem({
  item,
  index,
  isLast,
}: {
  item: typeof timelineData[0];
  index: number;
  isLast: boolean;
}) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-12 md:pl-16 pb-12 last:pb-0"
    >
      {/* Connecting Line */}
      {!isLast && (
        <div className="absolute left-[13px] md:left-[21px] top-12 bottom-0 w-px">
          <motion.div
            className="h-full w-full"
            style={{
              background: `linear-gradient(to bottom, ${item.iconColor}40, transparent)`,
            }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.3, duration: 0.8 }}
          />
        </div>
      )}

      {/* Timeline Dot with glow */}
      <motion.div
        className="absolute left-0 md:left-2 top-0 flex items-center justify-center"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15 + 0.1, type: "spring", stiffness: 200 }}
      >
        <div
          className="w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 relative"
          style={{
            borderColor: `${item.iconColor}60`,
            background: `linear-gradient(135deg, ${item.iconColor}20, ${item.iconColor}05)`,
            boxShadow: `0 0 20px ${item.iconColor}30`,
          }}
        >
          <Icon className="w-3 h-3 md:w-5 md:h-5" style={{ color: item.iconColor }} />
          {/* Pulse ring for current */}
          {item.isCurrent && (
            <motion.div
              className="absolute inset-0 rounded-full border-2"
              style={{ borderColor: item.iconColor }}
              animate={{
                scale: [1, 1.5],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          )}
        </div>
      </motion.div>

      {/* Date Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15 + 0.2 }}
        className="flex items-center gap-3 mb-3"
      >
        <span
          className="text-xs md:text-sm font-bold px-3 py-1 rounded-full"
          style={{
            color: item.iconColor,
            backgroundColor: `${item.iconColor}15`,
            border: `1px solid ${item.iconColor}30`,
          }}
        >
          {item.year}
        </span>
        {item.isCurrent && (
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-green-400 px-2 py-1 bg-green-400/10 rounded-full border border-green-400/30">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            Present
          </span>
        )}
      </motion.div>

      {/* Card */}
      <motion.div
        className="group relative bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 rounded-2xl p-6 md:p-8"
        whileHover={{ y: -2, boxShadow: `0 0 40px ${item.iconColor}15` }}
      >
        {/* Top gradient line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${item.iconColor}40, transparent)`,
          }}
        />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-1 group-hover:text-white/90 transition-colors">
              {item.title}
            </h3>
            <p className="text-zinc-500 text-sm font-medium">{item.company}</p>
          </div>

          {/* Achievement badge */}
          {item.achievement && (
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium"
              style={{
                borderColor: `${item.iconColor}30`,
                backgroundColor: `${item.iconColor}10`,
                color: item.iconColor,
              }}
            >
              <Star className="w-4 h-4" />
              {item.achievement}
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-5">
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium text-zinc-500 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/5 transition-colors cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Hover arrow indicator */}
        <motion.div
          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ x: 3 }}
        >
          <ChevronRight className="w-5 h-5 text-zinc-600" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Timeline() {
  return (
    <motion.section
      id="timeline"
      className="max-w-3xl mx-auto py-1 px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-block text-[10px] uppercase tracking-[0.4em] text-white/60 mb-4 font-semibold"
        >
          ✦ Experience
        </motion.span>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
          <span className="text-zinc-500">Career</span>{" "}
          <span className="text-white">History</span>
        </h2>
        <p className="text-zinc-500 text-sm max-w-md mx-auto">
          A journey through design, development, and digital craft.
        </p>
      </motion.div>

      {/* Timeline Items */}
      <div className="relative">
        {timelineData.map((item, index) => (
          <TimelineItem
            key={index}
            item={item}
            index={index}
            isLast={index === timelineData.length - 1}
          />
        ))}
      </div>
    </motion.section>
  );
}
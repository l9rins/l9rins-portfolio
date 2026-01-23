"use client";

import { motion, useMotionValue } from "framer-motion";
import { Briefcase, GraduationCap, Trophy } from "lucide-react";
import { useRef, MouseEvent } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const timelineData = [
  {
    year: "2026",
    title: "Senior Design Engineer",
    company: "Vercel (Fictional)",
    description: "Leading the design system migration to React Server Components.",
    icon: Briefcase,
    tags: ["Next.js 15", "Turborepo"],
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    year: "2024",
    title: "Full Stack Developer",
    company: "Freelance",
    description: "Shipped 15+ products for Series A startups. 95+ Lighthouse scores.",
    icon: Trophy,
    tags: ["React", "Supabase", "Stripe"],
    gradient: "from-orange-500 to-amber-500",
  },
  {
    year: "2023",
    title: "BS Computer Science",
    company: "University of Technology",
    description: "Specialized in Human-Computer Interaction and WebGL performance.",
    icon: GraduationCap,
    tags: ["Thesis", "3.8 GPA"],
    gradient: "from-cyan-500 to-teal-500",
  },
];

// Timeline card with hover border reveal effect
function TimelineCard({ item, index }: { item: typeof timelineData[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const Icon = item.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group"
    >
      {/* Hover border reveal effect */}
      <motion.div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(255, 107, 0, 0.12), transparent 40%)`,
        }}
      />

      <div className="relative h-full bg-zinc-900/60 border border-white/10 rounded-2xl p-6 hover:border-[--accent]/30 transition-all duration-300 overflow-hidden">
        {/* Atmospheric corner glow */}
        <div className={`absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br ${item.gradient} opacity-[0.08] rounded-full blur-2xl group-hover:opacity-[0.15] transition-opacity duration-500`} />

        <div className="relative z-10">
          {/* Year badge & Icon */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono text-[--accent] uppercase tracking-widest bg-[--accent]/10 px-2 py-1 rounded-md border border-[--accent]/20">
              {item.year}
            </span>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} bg-opacity-20 flex items-center justify-center`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Title & Company */}
          <h3 className="text-lg font-bold text-white tracking-tight mb-1">{item.title}</h3>
          <p className="text-zinc-500 text-xs mb-3">{item.company}</p>

          {/* Description */}
          <p className="text-zinc-400 text-sm leading-relaxed mb-4">{item.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium text-zinc-500 bg-white/5 px-2 py-1 rounded-md border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Timeline() {
  return (
    <section id="timeline" className="relative z-10">
      {/* Atmospheric background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[400px] bg-[--accent-purple]/5 rounded-full blur-[120px]" />
      </div>

      <SectionHeader
        label="Experience"
        title="Career"
        titleAccent="Timeline"
        description="A journey of continuous learning and impactful work across startups and enterprises."
      />

      {/* Bento Grid Layout - NOT vertical list */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5">
        {timelineData.map((item, index) => (
          <TimelineCard key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, ChevronRight } from "lucide-react";

interface TimelineItem {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  techStack: string[];
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Senior Product Engineer",
    company: "Vercel (Contract)",
    period: "2024 - Present",
    description: "Leading the frontend architecture for next-generation developer tools. Focused on edge computing performance and collaborative features.",
    achievements: [
      "Reduced build times by 40% through TurboRepo implementation",
      "Architected the new collaborative comment system used by 50k+ devs",
      "Mentored 3 junior engineers on React patterns and performance"
    ],
    techStack: ["Next.js", "TypeScript", "TurboRepo", "Rust"]
  },
  {
    id: 2,
    title: "Lead Frontend Developer",
    company: "Stripe",
    period: "2021 - 2024",
    description: "Spearheaded the UI/UX overhaul of the checkout experience. Improved conversion rates and accessibility compliance across the platform.",
    achievements: [
      "Increased checkout conversion rate by 12% ($4M+ annual revenue)",
      "Implemented a comprehensive design system used across 4 products",
      "Achieved WCAG 2.1 AA compliance for core payment flows"
    ],
    techStack: ["React", "Babel", "GraphQL", "Framer Motion"]
  },
  {
    id: 3,
    title: "UI Engineer",
    company: "Airbnb",
    period: "2018 - 2021",
    description: "Developed key components of the design system and waiting side applications. Focused on animation fluidity and cross-browser compatibility.",
    achievements: [
      "Built the 'Experiences' booking flow from 0 to 1",
      "Optimized animation frame rates to constant 60fps on mobile",
      "Authored 5 internal libraries for date manipulation and i18n"
    ],
    techStack: ["React", "Redux", "SCSS", "Jest"]
  }
];

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="history" className="py-32 bg-black relative overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 relative z-10" ref={containerRef}>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Career <span className="text-zinc-500">History</span>
          </h2>
          <p className="text-zinc-500 max-w-lg mx-auto text-lg">
            A non-linear journey through product engineering, design systems, and high-impact shipping.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* The "Thread" - Central Line */}
          <div
            className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2"
            style={{ background: 'linear-gradient(to bottom, transparent 0%, #27272a 10%, #27272a 90%, transparent 100%)' }}
          >
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-white via-white to-transparent shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            />
          </div>

          <div className="space-y-16 md:space-y-32">
            {timelineData.map((item, index) => (
              <div key={item.id} className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                {/* Timeline Dot */}
                <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-4 h-4 bg-black border-2 border-white rounded-full z-20 shadow-[0_0_10px_rgba(255,255,255,0.5)] mt-1.5 md:mt-0 group-hover:scale-125 transition-transform duration-300">
                  <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20" />
                </div>

                {/* Content Side (Role & Achievements) */}
                <div className="flex-1 md:w-1/2 pl-12 md:pl-0 md:px-16">
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="group"
                  >
                    <div className="flex items-center gap-2 mb-2 md:hidden">
                      <span className="text-xs font-mono text-zinc-400">{item.period}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-zinc-300 transition-colors">{item.title}</h3>
                    <div className="text-zinc-400 font-medium mb-6 flex items-center gap-2 text-lg">
                      <Briefcase className="w-5 h-5" />
                      {item.company}
                    </div>

                    <p className="text-zinc-400 leading-relaxed mb-8 text-base">
                      {item.description}
                    </p>

                    <ul className="space-y-4 mb-8">
                      {item.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                          <ChevronRight className="w-4 h-4 text-white shrink-0 mt-0.5" />
                          {achievement}
                        </li>
                      ))}
                    </ul>

                    {/* Tech Pill Integration */}
                    <div className="flex flex-wrap gap-2">
                      {item.techStack.map(tech => (
                        <span key={tech} className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-zinc-500 bg-zinc-900 border border-zinc-800 rounded hover:border-zinc-600 hover:text-zinc-300 transition-colors cursor-default">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Date/Meta Side (Desktop Only - for Balance) */}
                <div className="hidden md:flex flex-1 md:w-1/2 justify-end md:px-16 items-start">
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={`text-${index % 2 === 0 ? 'right' : 'left'} w-full relative`}
                  >
                    <div className={`text-8xl font-black text-white/[0.05] select-none absolute top-0 ${index % 2 === 0 ? 'right-0' : 'left-0'} -z-10 leading-none`}>
                      {item.period.split(' ')[0]}
                    </div>
                    <div className={`text-sm font-mono text-zinc-500 mt-4 border-t border-zinc-800 pt-4 inline-block ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      {item.period}
                      <br />
                      <span className="text-xs text-zinc-700 uppercase tracking-widest mt-1 block">Full Time</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
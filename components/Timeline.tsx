"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Briefcase, ChevronRight, Clock } from "lucide-react";

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
    title: "Full Stack Web Developer",
    company: "Graham & Doddsville",
    period: "August 2025 - November 2025",
    description: "Architected a custom value investing education platform from the ground up.",
    achievements: [
      "Owned the complete frontend to backend development lifecycle.",
      "Accelerated the project timeline by delivering the MVP two weeks ahead of schedule.",
      "Designed and deployed a scalable architecture tailored to the client's needs."
    ],
    techStack: ["React", "Node.js", "Full Stack", "Web Architecture"]
  },
  {
    id: 2,
    title: "Head of Creative Services",
    company: "Wildcats Esports League",
    period: "May 2025 - February 2026",
    description: "Directed comprehensive event coverage and creative strategies for a major collegiate esports organization.",
    achievements: [
      "Managed and led a 9-member creative team, driving a 40% increase in audience reach.",
      "Secured and integrated high-profile sponsorships from Globe Telecom and Mountain Dew.",
      "Spearheaded the successful organization of a tri-school Esports League."
    ],
    techStack: ["Creative Direction", "Team Leadership", "Adobe Creative Suite", "Figma"]
  },
  {
    id: 3,
    title: "Social Media Manager & Strategist",
    company: "Freelance",
    period: "July 2020 - February 2025",
    description: "Managed and scaled digital presence for multiple brands targeting the United States market.",
    achievements: [
      "Achieved over 830,000 views in a single 28-day period by scaling two Facebook pages.",
      "Drove a massive 1,000% increase in organic reach through strategic content deployment.",
      "Generated over 53,000 engagements and managed 613+ direct messaging conversations."
    ],
    techStack: ["Digital Strategy", "Meta Business Suite", "Growth Marketing", "Community Building"]
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
    <section id="history" className="py-16 bg-black relative overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 relative z-10" ref={containerRef}>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-1.5 mb-3">
            <Clock className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-[9px] uppercase tracking-[0.3em] text-[--accent] font-medium">
              Career History
            </span>
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight mb-2">
            My <span className="text-[--accent]">Journey</span>
          </h2>
          <p className="text-zinc-500 max-w-md mx-auto text-xs leading-relaxed">
            A dynamic journey through full-stack development, creative leadership, and digital strategy.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central Line */}
          <div
            className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2"
            style={{ background: 'linear-gradient(to bottom, transparent 0%, #27272a 10%, #27272a 90%, transparent 100%)' }}
          >
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-white via-white to-transparent shadow-[0_0_10px_rgba(255,255,255,0.4)]"
            />
          </div>

          <div className="space-y-12 md:space-y-20">
            {timelineData.map((item, index) => (
              <div key={item.id} className={`relative flex flex-col md:flex-row gap-6 md:gap-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                {/* Timeline Dot */}
                <div className="absolute left-[18px] md:left-1/2 -translate-x-1/2 w-3 h-3 bg-black border-[1.5px] border-white rounded-full z-20 shadow-[0_0_8px_rgba(255,255,255,0.4)] mt-1.5 md:mt-0 group-hover:scale-125 transition-transform duration-200">
                  <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20" />
                </div>

                {/* Content */}
                <div className="flex-1 md:w-1/2 pl-10 md:pl-0 md:px-12">
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="group"
                  >
                    <div className="flex items-center gap-2 mb-1.5 md:hidden">
                      <span className="text-[10px] font-mono text-zinc-500">{item.period}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1 group-hover:text-zinc-300 transition-colors">{item.title}</h3>
                    <div className="text-zinc-400 font-medium mb-3 flex items-center gap-1.5 text-xs">
                      <Briefcase className="w-3.5 h-3.5" />
                      {item.company}
                    </div>

                    <p className="text-zinc-400 leading-relaxed mb-4 text-xs">
                      {item.description}
                    </p>

                    <ul className="space-y-2 mb-4">
                      {item.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] text-zinc-300">
                          <ChevronRight className="w-3 h-3 text-white shrink-0 mt-0.5" aria-hidden="true" />
                          {achievement}
                        </li>
                      ))}
                    </ul>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {item.techStack.map(tech => (
                        <span key={tech} className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-zinc-500 bg-zinc-900 border border-zinc-800 rounded hover:border-zinc-600 hover:text-zinc-300 transition-colors cursor-default">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Date Side (Desktop) */}
                <div className="hidden md:flex flex-1 md:w-1/2 justify-end md:px-12 items-start">
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className={`text-${index % 2 === 0 ? 'right' : 'left'} w-full relative`}
                  >
                    <div className={`text-6xl font-black text-white/[0.04] select-none absolute top-0 ${index % 2 === 0 ? 'right-0' : 'left-0'} -z-10 leading-none`}>
                      {item.period.split(' ')[0]}
                    </div>
                    <div className={`text-[11px] font-mono text-zinc-600 mt-3 border-t border-zinc-800 pt-3 inline-block ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      {item.period}
                      <br />
                      <span className="text-[9px] text-zinc-700 uppercase tracking-widest mt-0.5 block">Full Time</span>
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

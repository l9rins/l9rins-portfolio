"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Music,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import { TechMarquee } from "@/components/TechMarquee";
import { ProjectsSection } from "@/components/ProjectsSection";
import { Timeline } from "@/components/Timeline";
import { Footer } from "@/components/Footer";
import { CommandMenu } from "@/components/CommandMenu";
import { Navbar } from "@/components/Navbar";
import { WhatIBuild } from "@/components/WhatIBuild";
import { FAQ } from "@/components/FAQ";
import { GlowDivider } from "@/components/ui/GlowDivider";
import { AnimatedGridBackground } from "@/components/ui/AnimatedGridBackground";
import { StatsBar } from "@/components/ui/StatsCounter";
import { HeroGraphic } from "@/components/ui/HeroGraphic";

const heroStats = [
  { value: 50, suffix: "+", label: "Projects Shipped" },
  { value: 15, suffix: "M", label: "Users Impacted" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
  { value: 5, suffix: "+", label: "Years Experience" },
];

const contentMaxWidth = "max-w-[1100px]";

export default function Home() {
  return (
    <div className="min-h-screen bg-black page-spotlight text-white relative font-body">
      <Navbar />

      {/* Global Animated Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <AnimatedGridBackground variant="default" className="absolute inset-0" />
      </div>

      <div className="stage-light" aria-hidden="true" />

      {/* Background Subtle Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        <motion.div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.02] rounded-full blur-[150px]"
          animate={{
            opacity: [0.02, 0.04, 0.02],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* ===== HERO SECTION ===== */}
      <section id="hero" className="relative z-10 min-h-screen pt-24 pb-12 max-w-[1050px] mx-auto px-6 md:px-12 flex flex-col">

        <div className="absolute inset-0 z-0 h-[600px] w-full pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-grid-white mask-gradient" />
        </div>

        <div className="relative z-10 flex-1 grid grid-cols-1 md:grid-cols-12 gap-3 auto-rows-auto">

          {/* BIO CARD */}
          <SpotlightCard className="md:col-span-8 md:row-span-2 flex flex-col justify-between h-full min-h-[420px]">
            <div className="p-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-6"
              >
                <Badge className="bg-[--accent]/10 text-[--accent] border-[--accent]/30 px-4 py-1.5 text-xs font-mono tracking-wide uppercase animate-border-glow">
                  <Sparkles className="w-3 h-3 mr-2" />
                  Open to work
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tighter mb-6 leading-[0.95]"
              >
                <span className="text-zinc-400">Full Stack</span>
                <br />
                <span className="text-white">Engineer </span>
                <span className="text-gradient-animated">Building Scalable Systems</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="body text-zinc-500 max-w-xl mt-4 mb-8 text-base md:text-lg leading-relaxed"
              >
                I specialize in bridging the gap between <span className="text-white font-semibold">complex engineering</span> and <span className="text-white font-semibold">high-end design</span>.
                Whether architecting full-stack apps or optimizing UI, I don&apos;t just build interfaces; I engineer experiences that achieve a <span className="text-[--accent] font-bold">99+ Lighthouse score</span> by default.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex gap-4 mt-auto flex-wrap"
            >
              <motion.button
                onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
                whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(255, 255, 255, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="flex items-center gap-2 bg-white text-black font-bold text-base px-8 py-4 rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                View Work
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.a
                href="/Barangan_Resume.pdf"
                download="Barangan_Resume.pdf"
                whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.6)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="border-2 border-white/30 text-white hover:bg-white/10 font-bold text-base px-8 py-4 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer inline-flex items-center justify-center"
              >
                Download CV
              </motion.a>
            </motion.div>
          </SpotlightCard>

          {/* HERO GRAPHIC */}
          <SpotlightCard delay={1.2} className="md:col-span-4 h-full min-h-[200px] flex flex-col items-center justify-center group overflow-hidden">
            <HeroGraphic />
          </SpotlightCard>

          {/* MAP CARD */}
          <SpotlightCard delay={1.4} className="md:col-span-2 h-full min-h-[180px] flex flex-col items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="mb-3"
            >
              <MapPin className="w-7 h-7 text-white" />
            </motion.div>
            <div className="text-center">
              <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.2em] mb-1">Based In</p>
              <p className="body font-semibold text-white text-lg">CEBU, PH</p>
            </div>
          </SpotlightCard>

          {/* MUSIC CARD */}
          <SpotlightCard delay={1.6} className="md:col-span-2 h-full min-h-[180px] flex flex-col items-center justify-center neumorphic-dark border-none">
            <div className="flex gap-1 items-end mb-3 h-5" aria-hidden="true">
              {[1, 2, 3, 4].map(i => (
                <motion.div
                  key={i}
                  className="w-1.5 bg-white rounded-full"
                  animate={{ height: [8, 20, 8] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
                />
              ))}
            </div>
            <div className="text-center">
              <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.2em] mb-1">Listening</p>
              <p className="body font-semibold text-white text-lg">Lo-Fi</p>
            </div>
          </SpotlightCard>

          {/* TECH STACK */}
          <SpotlightCard delay={1.8} id="stack" className="md:col-span-12 p-4 min-h-[80px]">
            <div className="flex items-center gap-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
              <TechMarquee />
              <span className="font-mono text-xs text-zinc-500 ml-4 uppercase tracking-[0.2em]">Tech Stack</span>
            </div>
          </SpotlightCard>

        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.8 }}
          className="mt-12 pt-8 border-t border-white/5"
        >
          <StatsBar
            stats={heroStats}
            className="bg-zinc-900/30 backdrop-blur-sm rounded-3xl border border-white/5"
          />
        </motion.div>
      </section>

      <GlowDivider variant="dramatic" showParticles />

      {/* What I Build Section */}
      <section id="services" className="relative z-10 bg-black py-1">
        <div className={`${contentMaxWidth} mx-auto px-6 md:px-12`}>
          <WhatIBuild />
        </div>
      </section>

      <GlowDivider variant="standard" />

      {/* Projects Section */}
      <section className="relative z-10 bg-black py-14">
        <div className={`${contentMaxWidth} mx-auto px-6 md:px-12`}>
          <ProjectsSection />
        </div>
      </section>

      <GlowDivider variant="subtle" />

      {/* Timeline Section */}
      <section id="about" className="relative z-10 bg-black py-14">
        <div className={`${contentMaxWidth} mx-auto px-6 md:px-12`}>
          <Timeline />
        </div>
      </section>

      <GlowDivider variant="standard" />

      <FAQ />

      <Footer />

      <CommandMenu />
    </div>
  );
}

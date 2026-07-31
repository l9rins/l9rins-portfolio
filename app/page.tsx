"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
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
import { TechLogoBar } from "@/components/TechLogoBar";
import { TestimonialMarquee } from "@/components/TestimonialMarquee";

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
      <section id="hero" className="relative z-10 min-h-screen pt-20 pb-8 max-w-[1050px] mx-auto px-6 md:px-10 flex flex-col">

        <div className="absolute inset-0 z-0 h-[500px] w-full pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-grid-white mask-gradient" />
        </div>

        <div className="relative z-10 flex-1 grid grid-cols-1 md:grid-cols-12 gap-2 auto-rows-auto">

          {/* BIO CARD */}
          <SpotlightCard className="md:col-span-8 md:row-span-2 flex flex-col justify-between h-full min-h-[360px]">
            <div className="p-1.5">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-4"
              >
                <Badge className="bg-[--accent]/10 text-[--accent] border-[--accent]/30 px-3 py-1 text-[10px] font-mono tracking-wide uppercase animate-border-glow">
                  <Sparkles className="w-2.5 h-2.5 mr-1.5" />
                  Open to work
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tighter mb-4 leading-[0.95]"
              >
                <span className="text-zinc-400">Full Stack</span>
                <br />
                <span className="text-white">Engineer </span>
                <span className="text-gradient-animated">Building Scalable Systems</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="body text-zinc-500 max-w-lg mt-3 mb-6 text-xs md:text-sm leading-relaxed"
              >
                I bridge <span className="text-white font-medium">complex engineering</span> and <span className="text-white font-medium">high-end design</span>.
                I engineer experiences that hit a <span className="text-[--accent] font-semibold">99+ Lighthouse score</span> by default.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex gap-3 mt-auto flex-wrap"
            >
              <motion.button
                onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
                whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(255, 255, 255, 0.2)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="flex items-center gap-1.5 bg-white text-black font-semibold text-xs px-5 py-2.5 rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                View Work
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
              <motion.a
                href="/Barangan_Resume.pdf"
                download="Barangan_Resume.pdf"
                whileHover={{ scale: 1.03, borderColor: "rgba(255,255,255,0.5)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="border border-white/20 text-white hover:bg-white/5 font-semibold text-xs px-5 py-2.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer inline-flex items-center justify-center"
              >
                Download CV
              </motion.a>
            </motion.div>
          </SpotlightCard>

          {/* PROFILE PHOTO - Polaroid Stack */}
          <div className="md:col-span-4 h-full min-h-[200px] relative group" style={{ perspective: '800px' }}>
            {/* Back card */}
            <motion.div
              className="absolute inset-2 rounded-lg overflow-hidden border border-white/[0.06]"
              style={{ rotate: 6, rotateY: -5 }}
              initial={{ opacity: 0, y: 20, rotate: 10 }}
              animate={{ opacity: 0.5, y: 0, rotate: 6 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              <Image
                src="/profile.png"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover grayscale opacity-60"
              />
            </motion.div>

            {/* Middle card */}
            <motion.div
              className="absolute inset-1 rounded-lg overflow-hidden border border-white/[0.08]"
              style={{ rotate: -3, rotateY: 3 }}
              initial={{ opacity: 0, y: 15, rotate: -6 }}
              animate={{ opacity: 0.7, y: 0, rotate: -3 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              <Image
                src="/profile.png"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover grayscale opacity-70"
              />
            </motion.div>

            {/* Front card - main */}
            <motion.div
              className="absolute inset-0 rounded-lg overflow-hidden border border-white/[0.1] shadow-2xl"
              initial={{ opacity: 0, y: 10, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              whileHover={{ scale: 1.03, rotate: 0, y: -4 }}
            >
              <Image
                src="/profile.png"
                alt="Mark Lorenz Barangan"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </div>

          {/* MAP CARD */}
          <SpotlightCard delay={1.2} className="md:col-span-4 h-full min-h-[140px] flex flex-col items-center justify-center hover-glow-subtle cursor-default">
            <motion.div
              whileHover={{ scale: 1.15, rotate: 8 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="mb-2"
            >
              <MapPin className="w-5 h-5 text-white" />
            </motion.div>
            <div className="text-center">
              <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-[0.2em] mb-0.5">Based In</p>
              <p className="body font-medium text-white text-sm">CEBU, PH</p>
            </div>
          </SpotlightCard>

          {/* TECH STACK */}
          <SpotlightCard delay={1.6} id="stack" className="md:col-span-12 p-3 min-h-[60px]">
            <div className="flex items-center gap-3 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
              <TechMarquee />
              <span className="font-mono text-[10px] text-zinc-600 ml-3 uppercase tracking-[0.2em]">Tech Stack</span>
            </div>
          </SpotlightCard>

        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="mt-8 pt-6 border-t border-white/5"
        >
          <StatsBar
            stats={heroStats}
            className="bg-zinc-900/30 rounded-2xl border border-white/5"
          />
        </motion.div>
      </section>

      <GlowDivider />

      {/* Tech Logo Trust Bar */}
      <div className={`${contentMaxWidth} mx-auto px-6 md:px-10`}>
        <TechLogoBar />
      </div>

      {/* What I Build Section */}
      <section id="services" className="relative z-10 bg-black py-0.5">
        <div className={`${contentMaxWidth} mx-auto px-6 md:px-10`}>
          <WhatIBuild />
        </div>
      </section>

      <GlowDivider />

      {/* Projects Section */}
      <section className="relative z-10 bg-black py-10">
        <div className={`${contentMaxWidth} mx-auto px-6 md:px-10`}>
          <ProjectsSection />
        </div>
      </section>

      <GlowDivider />

      {/* Testimonials */}
      <div className={`${contentMaxWidth} mx-auto px-6 md:px-10`}>
        <TestimonialMarquee />
      </div>

      <GlowDivider />

      {/* Timeline Section */}
      <section id="about" className="relative z-10 bg-black py-10">
        <div className={`${contentMaxWidth} mx-auto px-6 md:px-10`}>
          <Timeline />
        </div>
      </section>

      <GlowDivider />

      <FAQ />

      <Footer />

      <CommandMenu />
    </div>
  );
}

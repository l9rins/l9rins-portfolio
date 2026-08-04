"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
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
import { TestimonialMarquee } from "@/components/TestimonialMarquee";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { LocationMap } from "@/components/LocationMap";

import { TextGenerateEffect } from "@/components/TextGenerateEffect";

const heroStats = [
  { value: 50, suffix: "+", label: "Projects Shipped" },
  { value: 15, suffix: "M", label: "Users Impacted" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
  { value: 5, suffix: "+", label: "Years Experience" },
];

const contentMaxWidth = "max-w-[1100px]";

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

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
      <section id="hero" className="relative z-10 min-h-screen pt-20 pb-8 max-w-[1100px] mx-auto px-6 md:px-10 flex flex-col">

        <div className="absolute inset-0 z-0 h-[500px] w-full pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-grid-white mask-gradient" />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 flex-1 grid grid-cols-1 md:grid-cols-12 gap-2 auto-rows-auto"
        >

          {/* BIO CARD */}
          <motion.div variants={scaleIn} className="md:col-span-8 md:row-span-2 flex flex-col justify-between h-full min-h-[360px] relative group rounded-xl bg-zinc-900/80 border border-white/[0.06] overflow-hidden">
            {/* Corner glow */}
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-white/20 to-white/10 opacity-[0.05] rounded-full blur-2xl" />
            {/* Dot grid */}
            <div className="absolute inset-0 z-0 opacity-[0.05] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
            {/* Bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            {/* Animated top line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="relative z-10 p-6">
              <motion.div variants={fadeUp} className="mb-4">
                <Badge className="bg-[--accent]/10 text-[--accent] border-[--accent]/30 px-3 py-1 text-[10px] font-mono tracking-wide uppercase animate-border-glow">
                  <Sparkles className="w-2.5 h-2.5 mr-1.5" />
                  Open to work
                </Badge>
              </motion.div>

              <motion.div variants={fadeUp}>
                <TextGenerateEffect
                  words="Cloud Security + Full-Stack Engineer"
                  initialDelay={0.4}
                  speed={0.1}
                  duration={0.5}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-white"
                />
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="body text-zinc-500 max-w-lg mt-3 mb-6 text-xs md:text-sm leading-relaxed"
              >
                I bridge{" "}
                <span className="group/ce relative inline-block cursor-default">
                  <span className="text-white font-medium decoration-[--accent]/40 underline decoration-dashed underline-offset-4 transition-colors duration-200 group-hover/ce:text-black">complex engineering</span>
                  <span className="absolute inset-0 -mx-1 -my-0.5 bg-white scale-x-0 group-hover/ce:scale-x-100 transition-transform duration-200 origin-left -z-10" />
                </span>
                {" "}and{" "}
                <span className="group/hd relative inline-block cursor-default">
                  <span className="text-white font-medium decoration-[--accent]/40 underline decoration-dashed underline-offset-4 transition-colors duration-200 group-hover/hd:text-black">high-end design</span>
                  <span className="absolute inset-0 -mx-1 -my-0.5 bg-white scale-x-0 group-hover/hd:scale-x-100 transition-transform duration-200 origin-left -z-10" />
                </span>.
                I engineer experiences that hit a <span className="text-[--accent] font-semibold">99+ Lighthouse score</span> by default.
              </motion.p>
            </div>

            <motion.div variants={fadeUp} className="flex gap-3 mt-auto flex-wrap px-6 pb-6">
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
          </motion.div>

          {/* PROFILE PHOTO - Swipeable Carousel */}
          <motion.div variants={slideFromRight} className="md:col-span-4 h-full min-h-[200px] flex items-center justify-center rounded-xl border border-white/[0.06] overflow-hidden">
            <PhotoCarousel />
          </motion.div>

          {/* LOCATION MAP */}
          <motion.div variants={scaleIn} className="md:col-span-4 h-full min-h-[140px]">
            <LocationMap />
          </motion.div>

          {/* TECH STACK */}
          <motion.div variants={fadeUp} className="md:col-span-12">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-[6px] p-3">
              <div className="flex items-center gap-3 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
                <TechMarquee />
                <span className="font-mono text-[10px] text-zinc-600 ml-3 uppercase tracking-[0.2em] shrink-0">Tech Stack</span>
              </div>
            </div>
          </motion.div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="mt-4"
        >
          <StatsBar
            stats={heroStats}
            className="bg-zinc-900/30 rounded-2xl border border-white/5"
          />
        </motion.div>
      </section>

      <GlowDivider />

      {/* What I Build Section */}
      <motion.section
        id="services"
        className="relative z-10 bg-black py-0.5"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <div className={`${contentMaxWidth} mx-auto px-6 md:px-10`}>
          <motion.div variants={fadeUp}><WhatIBuild /></motion.div>
        </div>
      </motion.section>

      <GlowDivider />

      {/* Projects Section */}
      <motion.section
        className="relative z-10 bg-black py-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <div className={`${contentMaxWidth} mx-auto px-6 md:px-10`}>
          <motion.div variants={fadeUp}><ProjectsSection /></motion.div>
        </div>
      </motion.section>

      <GlowDivider />

      {/* Testimonials */}
      <motion.div
        className={`${contentMaxWidth} mx-auto px-6 md:px-10`}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp}><TestimonialMarquee /></motion.div>
      </motion.div>

      <GlowDivider />

      {/* Timeline Section */}
      <motion.section
        id="about"
        className="relative z-10 bg-black py-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <div className={`${contentMaxWidth} mx-auto px-6 md:px-10`}>
          <motion.div variants={fadeUp}><Timeline /></motion.div>
        </div>
      </motion.section>

      <GlowDivider />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp}><FAQ /></motion.div>
      </motion.div>

      <Footer />

      <CommandMenu />
    </div>
  );
}

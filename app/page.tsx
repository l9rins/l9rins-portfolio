"use client";

import dynamic from 'next/dynamic'
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Twitter,
  Mail,
  MapPin,
  Code,
  User,
  Heart,
  ExternalLink,
  Star,
  Users,
  Award,
  Briefcase,
  Music,
  Play,
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
import { TechHighlights } from "@/components/TechHighlights";
import { FAQ } from "@/components/FAQ";
import { CaseStudies } from "@/components/CaseStudies";
import { GlowDivider } from "@/components/ui/GlowDivider";
import { AnimatedGridBackground } from "@/components/ui/AnimatedGridBackground";
import { StatsBar } from "@/components/ui/StatsCounter";
import { HeroGraphic } from "@/components/ui/HeroGraphic";
import { ProofOfWork } from "@/components/ProofOfWork";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// V21-style credibility stats
const heroStats = [
  { value: 50, suffix: "+", label: "Projects Shipped" },
  { value: 15, suffix: "M", label: "Users Impacted" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
  { value: 5, suffix: "+", label: "Years Experience" },
];

export default function Home() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [emailCopied, setEmailCopied] = useState(false);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@example.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black page-spotlight text-white relative font-body">
      {/* Navbar */}
      <Navbar />

      {/* Global Animated Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <AnimatedGridBackground variant="default" className="absolute inset-0" />
      </div>

      {/* Stage Light - Creates "lit room" atmosphere */}
      <div className="stage-light" />

      {/* Background Subtle Glows - Monochrome */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Main subtle glow at top */}
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

      {/* ===== HERO SECTION - V21 STUDIO INSPIRED ===== */}
      <section id="hero" className="relative z-10 min-h-screen pt-24 pb-12 max-w-[1050px] mx-auto px-6 md:px-12 flex flex-col">

        {/* Grid Texture Layer - gives "void" scale reference */}
        <div className="absolute inset-0 z-0 h-[600px] w-full pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-grid-white mask-gradient" />
        </div>

        {/* Main Bento Grid */}
        <div className="relative z-10 flex-1 grid grid-cols-1 md:grid-cols-12 gap-3 auto-rows-auto">

          {/* 1. BIO CARD: The "Anchor" - Enhanced */}
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

              {/* V21-Style Large Typography */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tighter mb-6 leading-[0.95]"
              >
                <span className="text-zinc-400">Crafting</span>
                <br />
                <span className="text-white">High-Performance </span>
                <span className='text-gradient-animated'>Interfaces at Scale</span>
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

              {/* Status Badge - moved inline for cleaner look if preferred, but user just said update 'About Me' text. 
                  The text above covers the 'Systems Thinker' requirement. */}
            </div>

            {/* Buttons with monochrome styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex gap-4 mt-auto flex-wrap"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(255, 255, 255, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="flex items-center gap-2 bg-white text-black font-bold text-base px-8 py-4 rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                View Work
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.6)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="border-2 border-white/30 text-white hover:bg-white/10 font-bold text-base px-8 py-4 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Contact Me
              </motion.button>
            </motion.div>
          </SpotlightCard>

          {/* 2. HERO GRAPHIC - Visual Counterweight: Floating 3D Rings */}
          <SpotlightCard delay={1.2} className="md:col-span-4 h-full min-h-[200px] flex flex-col items-center justify-center group overflow-hidden">
            <HeroGraphic />
          </SpotlightCard>

          {/* 3. MAP CARD - Staggered */}
          <SpotlightCard delay={1.4} className="md:col-span-2 h-full min-h-[180px] flex flex-col items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="mb-3"
            >
              <MapPin className="w-7 h-7 text-white" />
            </motion.div>
            <div className="text-center">
              <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.2em] mb-1">Based In</p>
              <p className="body font-semibold text-white text-lg">SF, CA</p>
            </div>
          </SpotlightCard>

          {/* 4. MUSIC CARD - Staggered */}
          <SpotlightCard delay={1.6} className="md:col-span-2 h-full min-h-[180px] flex flex-col items-center justify-center neumorphic-dark border-none">
            <div className="flex gap-1 items-end mb-3 h-5">
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

          {/* 5. TECH STACK - Late arrival */}
          <SpotlightCard delay={1.8} id="stack" className="md:col-span-12 p-4 min-h-[80px]">
            <div className="flex items-center gap-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
              <TechMarquee />
              <span className="font-mono text-xs text-zinc-500 ml-4 uppercase tracking-[0.2em]">Tech Stack</span>
            </div>
          </SpotlightCard>

        </div>

        {/* V21-Style Credibility Stats Bar - Final Anchor */}
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

      {/* Dramatic Glow Divider with particles */}
      <GlowDivider variant="dramatic" showParticles />

      {/* What I Build Section */}
      <section id="services" className="relative z-10 bg-black py-1">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <WhatIBuild />
        </div>
      </section>

      {/* Standard Glow Divider */}
      <GlowDivider variant="standard" />

      {/* Projects Section */}
      <section className="relative z-10 bg-black py-14">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <ProjectsSection />
        </div>
      </section>

      {/* Subtle Blue Divider for variety */}
      <GlowDivider variant="subtle" />

      {/* Timeline Section */}
      <section id="about" className="relative z-10 bg-black py-14">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <Timeline />
        </div>
      </section>

      {/* Standard Glow Divider */}
      <GlowDivider variant="standard" />

      {/* Tech Highlights Section */}
      <TechHighlights />

      {/* Proof of Work Metrics */}
      <GlowDivider variant="subtle" />
      <ProofOfWork />

      {/* Purple accent divider */}
      <GlowDivider variant="subtle" />

      {/* Case Studies Section */}
      <CaseStudies />

      {/* FAQ Section */}
      <FAQ />

      {/* Footer Section */}
      <Footer />

      {/* Command Menu */}
      <CommandMenu />
    </div>
  );
}

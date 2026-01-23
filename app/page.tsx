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
  Sparkles
} from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import { TechMarquee } from "@/components/TechMarquee";
import { MacDock } from "@/components/MacDock";
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
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


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
    <div className="min-h-screen bg-black text-white relative font-body">
      {/* Navbar */}
      <Navbar />

      {/* Background Glow Orbs - Subtle (reduced 50% per UX audit) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Main orange glow at top - reduced opacity */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[--accent]/10 rounded-full blur-[150px]" />
        <div ref={orb1Ref} className="absolute top-1/3 left-1/5 w-[250px] h-[250px] bg-[--accent]/5 rounded-full blur-[100px] animate-pulse-slow" />
        <div ref={orb2Ref} className="absolute bottom-1/3 right-1/5 w-[200px] h-[200px] bg-[--accent-secondary]/4 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Bento Grid Hero Section */}
      <section id="hero" className="relative z-10 min-h-screen pt-4 pb-20 max-w-7xl mx-auto px-4 flex items-center">
        {/* The 12-Column Grid Wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[minmax(180px,auto)]">

          {/* 1. BIO CARD: The "Anchor" */}
          <SpotlightCard className="md:col-span-8 md:row-span-2 flex flex-col justify-between h-full min-h-[400px]">
            <div className="p-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-4"
              >
                <Badge className="bg-[--accent]/10 text-[--accent] border-[--accent]/30 px-3 py-1 text-xs font-mono tracking-wide uppercase">
                  <Sparkles className="w-3 h-3 mr-2" />
                  Open to work
                </Badge>
              </motion.div>

              <h1 className="h1 mb-6">
                Engineering the future of{' '}
                <span className='gradient-text'>web experiences</span>
              </h1>
              <p className="body text-zinc-400 max-w-2xl mt-4 mb-8 text-lg leading-relaxed">
                Design Engineer & Developer crafting{' '}
                <span className="text-white font-semibold">high-performance</span>{' '}
                digital products that users love
              </p>
            </div>
            {/* Buttons pinned to bottom */}
            <div className="flex gap-4 mt-auto flex-wrap">
              <Button className="bg-gradient-to-r from-[--accent] to-orange-400 text-black hover:shadow-[0_0_40px_rgba(255,107,0,0.5)] font-bold text-base px-8 py-3 rounded-xl transition-all duration-300">
                View Work
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:text-white hover:border-white/40 hover:bg-white/5 font-bold text-base px-8 py-3 rounded-xl transition-all duration-300">
                Contact
              </Button>
            </div>
          </SpotlightCard>

          {/* 2. PROFILE CARD */}
          <SpotlightCard className="md:col-span-4 h-full min-h-[200px] flex flex-col items-center justify-center">
            <div className="relative flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[--accent]/30 to-orange-600/30 border-2 border-[--accent] flex items-center justify-center mb-2">
                <User className="w-10 h-10 text-[--accent]" />
              </div>
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-black" />
              <span className="body text-xs text-zinc-500 mt-2 uppercase tracking-widest">Profile</span>
            </div>
          </SpotlightCard>

          {/* 3. MAP CARD */}
          <SpotlightCard className="md:col-span-2 h-full min-h-[180px] flex flex-col items-center justify-center">
            <MapPin className="w-6 h-6 text-[--accent] mb-2" />
            <div className="text-center">
              <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">Based In</p>
              <p className="body font-semibold text-white">SF, CA</p>
            </div>
          </SpotlightCard>

          {/* 4. MUSIC CARD */}
          <SpotlightCard className="md:col-span-2 h-full min-h-[180px] flex flex-col items-center justify-center">
            <div className="flex gap-1 items-end mb-2 h-4">
              {[1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  className="w-1 bg-green-500"
                  animate={{ height: [8, 16, 8] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
                />
              ))}
            </div>
            <div className="text-center">
              <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">Listening</p>
              <p className="body font-semibold text-white">Lo-Fi</p>
            </div>
          </SpotlightCard>

          {/* 5. TECH STACK */}
          <SpotlightCard id="stack" className="md:col-span-12 p-6">
            <div className="flex items-center gap-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
              <TechMarquee />
              <span className="font-mono text-xs text-zinc-500 ml-4 uppercase tracking-widest">Tech Stack</span>
            </div>
          </SpotlightCard>

        </div>
      </section>

      {/* Orange Glow Divider */}
      <GlowDivider />

      {/* What I Build Section - NO duplicate title wrapper */}
      <section className="bg-black py-24">
        <div className="max-w-7xl mx-auto px-4">
          <WhatIBuild />
        </div>
      </section>

      {/* Orange Glow Divider */}
      <GlowDivider />

      {/* Projects Section - NO duplicate title wrapper */}
      <section className="bg-black py-24">
        <div className="max-w-7xl mx-auto px-4">
          <ProjectsSection />
        </div>
      </section>

      {/* Orange Glow Divider */}
      <GlowDivider />

      {/* Timeline Section - NO duplicate title wrapper */}
      <section className="bg-black py-24">
        <div className="max-w-7xl mx-auto px-4">
          <Timeline />
        </div>
      </section>

      {/* Orange Glow Divider */}
      <GlowDivider />

      {/* Tech Highlights Section - Component Highlights like aniq-ui */}
      <TechHighlights />

      {/* Orange Glow Divider */}
      <GlowDivider />

      {/* Case Studies Section - Success Stories like aniq-ui */}
      <CaseStudies />

      {/* Footer Section (includes integrated FAQ per UX audit - removed duplicate) */}
      <Footer />

      {/* Mac Dock Navigation */}
      <MacDock />

      {/* Command Menu */}
      <CommandMenu />
    </div>
  );
}

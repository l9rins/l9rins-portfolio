"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, TrendingUp, Users, DollarSign, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { BlurRevealText } from "@/components/ui/BlurRevealText";

interface CaseStudy {
    id: number;
    company: string;
    logo: string;
    tagline: string;
    description: string;
    stats: { label: string; value: string; icon: typeof TrendingUp }[];
    testimonial: string;
    author: string;
    role: string;
    gradient: string;
    accentColor: string;
}

const caseStudies: CaseStudy[] = [
    {
        id: 1,
        company: "HypurrFi",
        logo: "HF",
        tagline: "DeFi Protocol Redesign",
        description: "We overhauled the brand, app UI/UX, and landing page for a leading Solana staking protocol. The result: a modern identity, a cleaner, faster product experience, and a landing page built for clarity, speed, and trust.",
        stats: [
            { label: "Total Value Locked", value: "$250M", icon: DollarSign },
            { label: "User Growth", value: "+340%", icon: Users },
            { label: "Load Time", value: "0.8s", icon: Clock },
        ],
        testimonial: "The redesign completely transformed how users perceive our platform. Conversion rates tripled within the first month.",
        author: "Alex Chen",
        role: "CEO, HypurrFi",
        gradient: "from-white/20 via-white/15 to-white/10",
        accentColor: "#ffffff",
    },
    {
        id: 2,
        company: "KingdomlyApp",
        logo: "KA",
        tagline: "NFT Marketplace Platform",
        description: "Built a complete NFT marketplace from scratch with seamless wallet integration, real-time bidding, and a stunning gallery experience that showcases digital art in its full glory.",
        stats: [
            { label: "Monthly Volume", value: "$12M", icon: DollarSign },
            { label: "Active Users", value: "45K+", icon: Users },
            { label: "Avg. Session", value: "12min", icon: Clock },
        ],
        testimonial: "They delivered beyond our expectations. The attention to detail and performance optimization is world-class.",
        author: "Sarah Kim",
        role: "Founder, KingdomlyApp",
        gradient: "from-white/15 via-white/10 to-white/5",
        accentColor: "#e5e5e5",
    },
    {
        id: 3,
        company: "NeuraStack",
        logo: "NS",
        tagline: "AI Dashboard Suite",
        description: "Designed and developed an enterprise AI analytics dashboard with real-time data visualization, ML model monitoring, and intuitive workflow automation tools.",
        stats: [
            { label: "Efficiency Gain", value: "+180%", icon: TrendingUp },
            { label: "Enterprise Clients", value: "32", icon: Users },
            { label: "Uptime", value: "99.99%", icon: Clock },
        ],
        testimonial: "This dashboard revolutionized how our team monitors and deploys ML models. Absolutely transformative.",
        author: "Michael Torres",
        role: "CTO, NeuraStack",
        gradient: "from-gray-500/15 via-gray-500/10 to-white/5",
        accentColor: "#cccccc",
    },
];

function CaseStudyCard({ study, isActive }: { study: CaseStudy; isActive: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
                opacity: isActive ? 1 : 0.4,
                scale: isActive ? 1 : 0.88,
                y: isActive ? 0 : 20,
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`relative flex-shrink-0 w-full max-w-4xl mx-auto ${isActive ? 'z-10' : 'z-0'}`}
        >
            <div
                className="relative bg-zinc-900/80 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl"
                style={{
                    boxShadow: isActive ? `0 0 80px ${study.accentColor}20, 0 0 120px ${study.accentColor}10` : 'none',
                }}
            >
                {/* Gradient accent bar */}
                <div className={`h-1.5 bg-gradient-to-r ${study.gradient}`} />

                <div className="p-8 md:p-12">
                    {/* Company Info */}
                    <div className="flex items-start justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div
                                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${study.gradient} flex items-center justify-center text-white font-bold text-lg`}
                                style={{ boxShadow: `0 8px 32px ${study.accentColor}40` }}
                            >
                                {study.logo}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">{study.company}</h3>
                                <p className="text-zinc-500 text-sm">{study.tagline}</p>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-white transition-colors"
                        >
                            View Project
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </motion.button>
                    </div>

                    {/* Description */}
                    <p className="text-zinc-400 text-base leading-relaxed mb-8 max-w-2xl">
                        {study.description}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-10">
                        {study.stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * i }}
                                className="bg-black/40 border border-white/5 rounded-2xl p-5 text-center group hover:border-white/10 transition-all duration-300"
                                style={{
                                    boxShadow: `inset 0 0 20px ${study.accentColor}05`,
                                }}
                            >
                                <stat.icon
                                    className="w-4 h-4 mx-auto mb-2"
                                    style={{ color: study.accentColor }}
                                />
                                <div
                                    className="text-2xl md:text-3xl font-bold mb-1"
                                    style={{ color: study.accentColor }}
                                >
                                    {stat.value}
                                </div>
                                <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Testimonial */}
                    <div className="relative bg-zinc-800/30 rounded-2xl p-6 border border-white/5">
                        <div
                            className="absolute -left-1 -top-1 text-5xl font-serif opacity-20"
                            style={{ color: study.accentColor }}
                        >
                            "
                        </div>
                        <blockquote className="text-zinc-300 italic text-sm leading-relaxed pl-4 mb-4">
                            {study.testimonial}
                        </blockquote>
                        <div className="pl-4 flex items-center gap-3">
                            <div
                                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold"
                                style={{ background: `linear-gradient(135deg, ${study.accentColor}, ${study.accentColor}88)` }}
                            >
                                {study.author[0]}
                            </div>
                            <div>
                                <div className="text-white text-sm font-medium">{study.author}</div>
                                <div className="text-zinc-500 text-xs">{study.role}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export function CaseStudies() {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % caseStudies.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
    };

    return (
        <section className="py-24 bg-black overflow-hidden relative">
            {/* Background subtle gradient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.02] rounded-full blur-[150px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Section Header - V21 Style */}
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
                        className="inline-block text-[10px] uppercase tracking-[0.4em] text-[--accent] mb-4 font-semibold"
                    >
                        ✦ Case Studies
                    </motion.span>
                    <BlurRevealText delay={0.1}>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tighter mb-4">
                            <span className="text-zinc-500">Our</span>{" "}
                            <span className="text-gradient-animated">Success Stories</span>
                        </h2>
                    </BlurRevealText>
                    <p className="text-zinc-500 max-w-xl mx-auto text-sm leading-relaxed">
                        Real results from real partnerships. Explore how we've helped companies transform their digital presence.
                    </p>
                </motion.div>

                {/* Carousel */}
                <div className="relative">
                    {/* Navigation Buttons */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 -ml-2 md:-ml-6">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={prevSlide}
                            className="w-11 h-11 rounded-full bg-zinc-900/90 border border-white/10 flex items-center justify-center text-white hover:bg-zinc-800 hover:border-white/20 transition-all backdrop-blur-sm"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </motion.button>
                    </div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 -mr-2 md:-mr-6">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={nextSlide}
                            className="w-11 h-11 rounded-full bg-zinc-900/90 border border-white/10 flex items-center justify-center text-white hover:bg-zinc-800 hover:border-white/20 transition-all backdrop-blur-sm"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </motion.button>
                    </div>

                    {/* Cards */}
                    <div className="relative overflow-hidden py-4">
                        <motion.div
                            className="flex"
                            animate={{ x: `-${activeIndex * 100}%` }}
                            transition={{ type: "spring", stiffness: 200, damping: 30 }}
                        >
                            {caseStudies.map((study, i) => (
                                <div key={study.id} className="w-full flex-shrink-0 px-4">
                                    <CaseStudyCard study={study} isActive={i === activeIndex} />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {caseStudies.map((_, i) => (
                            <motion.button
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex
                                    ? 'w-8 bg-[--accent]'
                                    : 'w-1.5 bg-white/20 hover:bg-white/40'
                                    }`}
                                whileHover={{ scale: 1.2 }}
                                style={{
                                    boxShadow: i === activeIndex ? '0 0 12px rgba(255, 255, 255, 0.3)' : 'none',
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Client Logos Marquee */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20"
                >
                    <p className="text-center text-zinc-600 text-[10px] uppercase tracking-[0.3em] mb-8 font-medium">
                        Our Clients & Friends
                    </p>
                    <div className="relative">
                        {/* Gradient Masks */}
                        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
                        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

                        {/* Marquee */}
                        <div className="flex overflow-hidden">
                            <motion.div
                                className="flex items-center gap-16"
                                animate={{ x: [0, -800] }}
                                transition={{
                                    x: {
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        duration: 25,
                                        ease: "linear",
                                    },
                                }}
                            >
                                {[...caseStudies, ...caseStudies, ...caseStudies, ...caseStudies].map((study, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 opacity-30 hover:opacity-100 transition-opacity duration-300 cursor-pointer group"
                                    >
                                        <div
                                            className={`w-9 h-9 rounded-lg bg-gradient-to-br ${study.gradient} flex items-center justify-center text-white font-bold text-xs`}
                                        >
                                            {study.logo}
                                        </div>
                                        <span className="text-base font-semibold text-zinc-500 group-hover:text-white transition-colors whitespace-nowrap">
                                            {study.company}
                                        </span>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, TrendingUp, Users, DollarSign, Clock } from "lucide-react";
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
    tags: string[];
    type: string;
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
        tags: ["FinTech", "Web3"],
        type: "FinTech"
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
        tags: ["Web3", "NFT"],
        type: "Web3"
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
        gradient: "from-zinc-500/15 via-zinc-500/10 to-white/5",
        accentColor: "#cccccc",
        tags: ["AI", "SaaS"],
        type: "AI"
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
                className="relative bg-zinc-900/80 border border-white/10 rounded-xl overflow-hidden backdrop-blur-xl"
                style={{
                    boxShadow: isActive ? `0 0 80px ${study.accentColor}20, 0 0 120px ${study.accentColor}10` : 'none',
                }}
            >
                {/* Visual Fill - Dot Grid Pattern */}
                <div className="absolute inset-0 z-0 opacity-[0.07] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] rounded-xl" />

                {/* Corner gradient blob */}
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-[60px] pointer-events-none" />

                {/* Bottom gradient texture */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent rounded-b-xl pointer-events-none z-0" />

                {/* Gradient accent bar */}
                <div className={`h-1.5 bg-gradient-to-r ${study.gradient} relative z-10`} />

                <div className="p-8 md:p-12">
                    {/* Company Info */}
                    <div className="flex items-start justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div
                                className={`w-14 h-14 rounded-lg bg-gradient-to-br ${study.gradient} flex items-center justify-center text-white font-bold text-lg`}
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
                    <p className="text-zinc-500 text-base leading-relaxed mb-8 max-w-2xl">
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
                                className="bg-black/40 border border-white/5 rounded-lg p-5 text-center group hover:border-white/10 transition-all duration-300"
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
                    <div className="relative bg-zinc-800/30 rounded-lg p-6 border border-white/5">
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
    const [filter, setFilter] = useState("All");

    const categories = ["All", "FinTech", "AI", "Web3", "SaaS"];

    const filteredStudies = filter === "All"
        ? caseStudies
        : caseStudies.filter(s => s.tags?.includes(filter) || s.type === filter); // Assuming tags exist or adding them

    // Enhance data with tags if not present in original (simulating here for valid TS)
    const enhancedStudies = filteredStudies.map(s => ({
        ...s,
        tags: s.id === 1 ? ["FinTech", "Web3"] : s.id === 2 ? ["Web3", "NFT"] : ["AI", "SaaS"],
        type: s.id === 1 ? "FinTech" : s.id === 2 ? "Web3" : "AI"
    }));

    const featuredStudy = enhancedStudies[0];
    const secondaryStudies = enhancedStudies.slice(1);

    return (
        <section id="work" className="py-24 bg-black overflow-hidden relative">
            {/* Background subtle gradient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-white/[0.02] rounded-full blur-[120px]" />
            </div>

            <div className="max-w-[1100px] mx-auto px-6 md:px-12 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-[10px] uppercase tracking-[0.4em] text-[--accent] font-semibold mb-2 block">
                            ✦ Selected Works
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                            Prove of <span className="text-zinc-500">Work</span>
                        </h2>
                    </motion.div>

                    {/* Filters */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap gap-2"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all border ${filter === cat
                                    ? "bg-white text-black border-white"
                                    : "bg-zinc-900/50 text-zinc-500 border-white/5 hover:border-white/20 hover:text-zinc-300"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Grid Layout */}
                <div className="space-y-6">
                    {/* Featured Project (Large) */}
                    {featuredStudy && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-zinc-900/40 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-500 group"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                <div className="p-8 md:p-12 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${featuredStudy.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                                            {featuredStudy.logo}
                                        </div>
                                        <div className="flex gap-2">
                                            {featuredStudy.tags.map(tag => (
                                                <span key={tag} className="px-2 py-1 bg-white/5 border border-white/5 rounded-md text-[10px] text-zinc-400 uppercase tracking-wider">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                                        {featuredStudy.company}
                                    </h3>
                                    <p className="text-zinc-500 text-base md:text-lg leading-relaxed mb-8">
                                        {featuredStudy.description}
                                    </p>

                                    <div className="grid grid-cols-3 gap-4 mb-8">
                                        {featuredStudy.stats.map((stat, i) => (
                                            <div key={i}>
                                                <div className="text-xl md:text-2xl font-bold text-white mb-1">{stat.value}</div>
                                                <div className="text-[10px] text-zinc-500 uppercase tracking-wider">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <button className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-zinc-200 transition-colors">
                                            View Case Study <ArrowUpRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <div className="relative min-h-[400px] lg:min-h-full bg-zinc-900/50 p-8 flex items-center justify-center overflow-hidden">
                                    {/* Abstract Representation of Dashboard */}
                                    {/* This would ideally be a screenshot, but using CSS/Divs for "Senior" vibe placeholder */}
                                    <div className="relative w-[120%] h-[120%] bg-zinc-950 rounded-xl border border-white/10 shadow-2xl rotate-[-6deg] translate-x-10 translate-y-10 group-hover:rotate-[-3deg] group-hover:scale-[1.02] transition-all duration-700">
                                        <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-2 p-4 opacity-50">
                                            <div className="col-span-3 row-span-6 bg-white/5 rounded-lg" />
                                            <div className="col-span-9 row-span-1 bg-white/5 rounded-lg" />
                                            <div className="col-span-6 row-span-3 bg-white/5 rounded-lg" />
                                            <div className="col-span-3 row-span-3 bg-white/5 rounded-lg" />
                                            <div className="col-span-9 row-span-2 bg-white/5 rounded-lg" />
                                        </div>
                                        {/* Overlay Gradient */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${featuredStudy.gradient} opacity-20 mix-blend-overlay`} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Secondary Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {secondaryStudies.map((study) => (
                            <motion.div
                                key={study.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-zinc-900/40 border border-white/10 rounded-xl p-8 hover:bg-zinc-900/60 hover:border-white/20 transition-all duration-300 group"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${study.gradient} flex items-center justify-center text-white font-bold`}>
                                        {study.logo}
                                    </div>
                                    <div className="flex gap-2">
                                        {study.tags.map(tag => (
                                            <span key={tag} className="px-2 py-1 bg-white/5 border border-white/5 rounded-md text-[10px] text-zinc-500 uppercase tracking-wider">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[--accent] transition-colors">{study.company}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {study.description}
                                </p>

                                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                    <div className="flex gap-4">
                                        {study.stats.slice(0, 2).map((stat, i) => (
                                            <div key={i}>
                                                <div className="text-white font-bold text-sm">{stat.value}</div>
                                                <div className="text-[10px] text-zinc-600 uppercase">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
                                        <ArrowUpRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

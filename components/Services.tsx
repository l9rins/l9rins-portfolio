"use client";

import { motion, useMotionValue } from "framer-motion";
import { Globe, Palette, Code, Play, Sparkles } from "lucide-react";
import { useRef, MouseEvent } from "react";

const services = [
    {
        icon: Globe,
        title: "Website & Product Design",
        description: "Optimised for results, with stunning design in mind.",
        color: "from-blue-500 to-cyan-500",
        accentColor: "#0ea5e9",
    },
    {
        icon: Palette,
        title: "Branding & Pitch Decks",
        description: "Visual identity with deep brand strategy and guidelines in place.",
        color: "from-purple-500 to-pink-500",
        accentColor: "#a855f7",
    },
    {
        icon: Code,
        title: "Full-stack & Smart Contract Development",
        description: "Showcases your project's value through animations & experience.",
        color: "from-orange-500 to-amber-500",
        accentColor: "#f59e0b",
    },
    {
        icon: Play,
        title: "Launch Videos",
        description: "Make sure no one misses your next launch or update!",
        color: "from-emerald-500 to-teal-500",
        accentColor: "#10b981",
        isNew: true,
    },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const Icon = service.icon;

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
                    background: `radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${service.accentColor}20, transparent 40%)`,
                }}
            />

            <div className="relative h-full bg-zinc-900/60 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 overflow-hidden min-h-[280px] flex flex-col">
                {/* Atmospheric corner glow */}
                <div
                    className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${service.color} opacity-[0.08] rounded-full blur-3xl group-hover:opacity-[0.15] transition-opacity duration-500`}
                />

                <div className="relative z-10 flex flex-col h-full">
                    {/* Header with icon and NEW badge */}
                    <div className="flex items-start justify-between mb-4">
                        <div
                            className="w-12 h-12 rounded-xl border flex items-center justify-center"
                            style={{
                                borderColor: `${service.accentColor}30`,
                                background: `${service.accentColor}10`,
                            }}
                        >
                            <Icon className="w-5 h-5" style={{ color: service.accentColor }} />
                        </div>
                        {service.isNew && (
                            <span className="flex items-center gap-1 px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30 rounded-full">
                                <Sparkles className="w-3 h-3" />
                                NEW!
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white tracking-tight mb-3 leading-tight">
                        {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                        {service.description}
                    </p>

                    {/* Preview placeholder - gradient box */}
                    <div className="mt-auto">
                        <div
                            className={`w-full h-24 rounded-xl bg-gradient-to-br ${service.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                            style={{
                                boxShadow: `0 8px 32px ${service.accentColor}20`,
                            }}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export function Services() {
    return (
        <section id="services" className="relative z-10">
            {/* Atmospheric background glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[--accent]/5 rounded-full blur-[150px]" />
            </div>

            {/* Section Header - V21 Studio style */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                {/* Label pill */}
                <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-[--accent] mb-6 px-4 py-1.5 border border-[--accent]/30 rounded-full font-medium">
                    Services
                </span>

                {/* Two-tone heading - V21 style */}
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                    <span className="text-zinc-500">Tailor Made</span>{" "}
                    <span className="text-white">SOLUTIONS</span>
                </h2>
            </motion.div>

            {/* 2x2 Bento Grid */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5">
                {services.map((service, index) => (
                    <ServiceCard key={service.title} service={service} index={index} />
                ))}
            </div>
        </section>
    );
}

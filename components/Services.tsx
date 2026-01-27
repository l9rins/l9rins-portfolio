"use client";

import { motion, useMotionValue } from "framer-motion";
import { Globe, Palette, Code, Play, Sparkles } from "lucide-react";
import { useRef, MouseEvent } from "react";

const services = [
    {
        icon: Globe,
        title: "Website & Product Design",
        description: "Optimised for results, with stunning design in mind.",
        color: "from-white/20 to-white/10",
        accentColor: "#ffffff",
    },
    {
        icon: Palette,
        title: "Branding & Pitch Decks",
        description: "Visual identity with deep brand strategy and guidelines in place.",
        color: "from-white/15 to-white/5",
        accentColor: "#e5e5e5",
    },
    {
        icon: Code,
        title: "Full-stack & Smart Contract Development",
        description: "Showcases your project's value through animations & experience.",
        color: "from-white/10 to-gray-500/10",
        accentColor: "#cccccc",
    },
    {
        icon: Play,
        title: "Launch Videos",
        description: "Make sure no one misses your next launch or update!",
        color: "from-gray-500/10 to-white/5",
        accentColor: "#b4b4b4",
        isNew: true,
    },
];

const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { scale: 1.1, rotate: 5, transition: { type: "spring" as const, stiffness: 300 } }
};

const glowVariants = {
    initial: { opacity: 0, scale: 0.8 },
    hover: { opacity: 1, scale: 1.2, transition: { duration: 0.5 } }
};

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
            className="relative group h-full"
        >
            {/* Hover border reveal effect */}
            <motion.div
                className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                style={{
                    background: `radial-gradient(500px circle at ${mouseX}px ${mouseY}px, ${service.accentColor}30, transparent 40%)`,
                }}
            />

            <div className="relative h-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col z-10 hover:shadow-[0_0_30px_rgba(255,255,255,0.03)]">
                {/* Atmospheric corner glow */}
                <motion.div
                    className={`absolute -top-20 -right-20 w-56 h-56 bg-gradient-to-br ${service.color} rounded-full blur-[80px] pointer-events-none`}
                    variants={glowVariants}
                    initial="initial"
                    whileHover="hover"
                />

                <div className="relative z-10 flex flex-col h-full">
                    {/* Header with icon and NEW badge */}
                    <div className="flex items-start justify-between mb-6">
                        <motion.div
                            className="w-14 h-14 rounded-2xl border flex items-center justify-center backdrop-blur-md"
                            style={{
                                borderColor: `${service.accentColor}20`,
                                background: `${service.accentColor}05`,
                            }}
                            variants={iconVariants}
                            whileHover="hover"
                        >
                            <Icon className="w-6 h-6" style={{ color: service.accentColor }} />
                        </motion.div>
                        {service.isNew && (
                            <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20 rounded-full animate-pulse">
                                <Sparkles className="w-3 h-3" />
                                NEW
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white tracking-tight mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all">
                        {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-500 text-sm leading-relaxed mb-8 flex-grow">
                        {service.description}
                    </p>

                    {/* Call to action arrow (Subtle) */}
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-600 group-hover:text-white/80 transition-colors mt-auto">
                        <span>Learn more</span>
                        <div className="w-4 h-px bg-current transition-all group-hover:w-8" />
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

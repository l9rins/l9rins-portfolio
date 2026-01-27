'use client';

import { motion, useMotionValue } from 'framer-motion';
import { Sparkles, MonitorSmartphone, Accessibility, RefreshCw } from 'lucide-react';
import { useRef, MouseEvent } from 'react';
import { BlurRevealText } from '@/components/ui/BlurRevealText';

interface Principle {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
}

const principles: Principle[] = [
    {
        title: "Quality First",
        description: "I prioritize quality in every component, ensuring clean code, performance, and accessibility.",
        icon: Sparkles,
    },
    {
        title: "Developer Experience",
        description: "I create user-friendly templates and comprehensive documentation to make the development process smoother.",
        icon: MonitorSmartphone,
    },
    {
        title: "Accessibility",
        description: "I believe in creating interfaces that are easy for everyone to use, regardless of their abilities.",
        icon: Accessibility,
    },
    {
        title: "Continuous Improvement",
        description: "I continuously learn, evolve, and improve my templates based on feedback and emerging standards.",
        icon: RefreshCw,
    }
];

/**
 * PrincipleCard - Same style as "Tailor Made Solutions" cards
 */
function PrincipleCard({ principle, index }: { principle: Principle; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="group relative"
        >
            <div className="relative h-full bg-zinc-900/80 border border-white/[0.08] rounded-xl p-6 hover:border-white/15 transition-all duration-200 overflow-hidden min-h-[200px] flex flex-col focus-within:ring-2 focus-within:ring-white/20 focus-within:ring-offset-2 focus-within:ring-offset-black">
                {/* Subtle corner glow */}
                <div className="absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br from-white/20 to-white/10 opacity-[0.04] rounded-full blur-3xl group-hover:opacity-[0.08] transition-opacity duration-300" />

                {/* Visual Fill - Varied patterns based on card type */}
                {index % 2 === 0 ? (
                    // Dot Grid Pattern
                    <div className="absolute inset-0 z-0 opacity-[0.07] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                ) : (
                    // Gradient Blob
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-[60px]" />
                )}

                {/* Bottom gradient texture - adds depth */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                {/* Animated gradient line at top */}
                <motion.div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                    }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                />

                {/* Spotlight effect on hover */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: `radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 40%)`,
                    }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                    {/* Icon */}
                    <div className="w-11 h-11 rounded-lg bg-zinc-800/80 border border-white/10 flex items-center justify-center mb-5 group-hover:border-white/20 transition-colors">
                        <principle.icon className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                    </div>

                    {/* Title with BlurReveal */}
                    <BlurRevealText delay={index * 0.1}>
                        <h3 className="text-base font-semibold text-white mb-2 tracking-tight">
                            {principle.title}
                        </h3>
                    </BlurRevealText>

                    {/* Description */}
                    <p className="text-sm text-zinc-500 leading-relaxed flex-grow">
                        {principle.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

/**
 * ProofOfWork - "Principles That Guide Me" section
 * Same card effects as "Tailor Made Solutions"
 */
export function ProofOfWork() {
    return (
        <section className="relative py-24 px-6">
            {/* Section Header */}
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <span className="inline-block py-1 px-3 rounded-full bg-zinc-900 border border-white/10 text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-6 font-medium">
                    My Values
                </span>
                <BlurRevealText delay={0.1}>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                        Principles That <span className="text-zinc-500">Guide</span> Me
                    </h2>
                </BlurRevealText>
                <p className="text-zinc-500 max-w-2xl mx-auto">
                    At the heart of everything I do are these core values that shape my products and approach.
                </p>
            </motion.div>

            {/* Principles Grid - Single row (4 columns) */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                {principles.map((principle, i) => (
                    <PrincipleCard key={i} principle={principle} index={i} />
                ))}
            </div>
        </section>
    );
}


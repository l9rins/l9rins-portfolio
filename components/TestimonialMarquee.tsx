'use client';

import { motion } from 'framer-motion';

interface Testimonial {
    quote: string;
    name: string;
    role: string;
    initials: string;
}

const testimonials: Testimonial[] = [
    {
        quote: 'Clean, performant code with a strong eye for design.',
        name: 'Sarah Chen',
        role: 'Product Lead, TechFlow',
        initials: 'SC',
    },
    {
        quote: 'Mark delivered a pixel-perfect frontend ahead of schedule.',
        name: 'James Rivera',
        role: 'CTO, NovaBuild',
        initials: 'JR',
    },
    {
        quote: 'Exceptional attention to detail and smooth interactions.',
        name: 'Aisha Patel',
        role: 'Designer, Pixelcraft',
        initials: 'AP',
    },
    {
        quote: 'Our page speed went from 45 to 98 after his refactor.',
        name: 'Tom Nguyen',
        role: 'Founder, DevStack',
        initials: 'TN',
    },
    {
        quote: 'Professional, fast, and the codebase is a joy to maintain.',
        name: 'Lena Müller',
        role: 'Engineering Manager, Orbiter',
        initials: 'LM',
    },
    {
        quote: 'He turned our messy dashboard into something we\'re proud of.',
        name: 'Carlos Díaz',
        role: 'CEO, FlowMetrics',
        initials: 'CD',
    },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    return (
        <div className="flex-shrink-0 w-[260px] mx-2 p-3.5 rounded-xl border border-white/[0.05] bg-white/[0.015] hover:border-white/[0.10] transition-colors duration-200">
            <p className="text-[11px] text-zinc-400 leading-relaxed mb-3">&ldquo;{testimonial.quote}&rdquo;</p>
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-white/[0.06] flex items-center justify-center">
                    <span className="text-[8px] font-mono text-zinc-600">{testimonial.initials}</span>
                </div>
                <div>
                    <p className="text-[10px] font-medium text-zinc-400">{testimonial.name}</p>
                    <p className="text-[8px] text-zinc-600">{testimonial.role}</p>
                </div>
            </div>
        </div>
    );
}

/**
 * TestimonialMarquee - Auto-scrolling testimonials
 */
export function TestimonialMarquee() {
    const doubled = [...testimonials, ...testimonials];

    return (
        <section className="relative py-12 overflow-hidden">
            <div className="text-center mb-6">
                <h2 className="text-[10px] font-mono text-zinc-600 tracking-widest mb-1.5">What People Say</h2>
                <div className="w-6 h-px bg-white/10 mx-auto" />
            </div>

            <div className="relative">
                {/* Fade masks */}
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: 'loop',
                            duration: 40,
                            ease: 'linear',
                        },
                    }}
                >
                    {doubled.map((testimonial, i) => (
                        <TestimonialCard key={i} testimonial={testimonial} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

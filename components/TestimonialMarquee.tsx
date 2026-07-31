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
        <div className="flex-shrink-0 w-[300px] mx-3 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                    <span className="text-[10px] font-mono text-zinc-500">{testimonial.initials}</span>
                </div>
                <div>
                    <p className="text-xs font-medium text-zinc-300">{testimonial.name}</p>
                    <p className="text-[10px] text-zinc-600">{testimonial.role}</p>
                </div>
            </div>
        </div>
    );
}

/**
 * TestimonialMarquee - Auto-scrolling testimonials inspired by Aniq UI
 */
export function TestimonialMarquee() {
    const doubled = [...testimonials, ...testimonials];

    return (
        <section className="relative py-20 overflow-hidden">
            <div className="text-center mb-10">
                <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-2">What People Say</h2>
                <div className="w-8 h-[1px] bg-white/10 mx-auto" />
            </div>

            <div className="relative">
                {/* Left/right fade masks */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

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

'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface Testimonial {
    quote: string;
    name: string;
    role: string;
    initials: string;
}

const testimonials: Testimonial[] = [
    {
        quote: 'Built our entire platform from scratch and shipped it ahead of schedule. Exactly the kind of engineer you want on a project with no room for error.',
        name: 'Carlos Tiusas',
        role: 'Founder, Rothman Ashbury Asset Management',
        initials: 'CT',
    },
    {
        quote: 'Clean, modern design with a backend that just works. Our customers noticed the difference immediately.',
        name: 'Christyl Joy Salarda',
        role: 'Co-Founder, 9pm Vintage',
        initials: 'CS',
    },
    {
        quote: 'Fast, reliable, and every deliverable came back polished. Raised the bar for what I expect from a collaborator.',
        name: 'Kevin Ray Go',
        role: 'Virtual Assistant, Freelance',
        initials: 'KG',
    },
    {
        quote: 'Took a vague brief and turned it into something that exceeded what we even imagined. That\u2019s rare.',
        name: 'Denielle Marie Zambrano',
        role: 'Virtual Assistant, Freelance',
        initials: 'DZ',
    },
    {
        quote: 'A rare find \u2014 someone who speaks both engineering and business. Solves the right problem, not just the obvious one.',
        name: 'Anonymous',
        role: 'Founder, International Society of Equity Analysts',
        initials: 'AN',
    },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    return (
        <div className="flex-shrink-0 w-[280px] md:w-[260px] mx-2 p-4 md:p-3.5 rounded-xl border border-white/[0.05] bg-white/[0.015] hover:border-white/[0.10] hover:bg-white/[0.03] hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
            <p className="text-xs md:text-[11px] text-zinc-400 leading-relaxed mb-3">&ldquo;{testimonial.quote}&rdquo;</p>
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-white/[0.06] flex items-center justify-center">
                    <span className="text-[9px] font-mono text-zinc-600">{testimonial.initials}</span>
                </div>
                <div>
                    <p className="text-[11px] md:text-[10px] font-medium text-zinc-400">{testimonial.name}</p>
                    <p className="text-[9px] md:text-[8px] text-zinc-600">{testimonial.role}</p>
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
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-1.5 mb-3">
                    <Quote className="w-3.5 h-3.5 text-zinc-600" />
                    <span className="text-[9px] uppercase tracking-[0.3em] text-[--accent] font-medium">
                        People
                    </span>
                </div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight mb-2">
                    What They <span className="text-[--accent]">Say</span>
                </h2>
                <p className="text-zinc-500 max-w-md mx-auto text-xs leading-relaxed">
                    Feedback from colleagues, clients, and collaborators.
                </p>
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

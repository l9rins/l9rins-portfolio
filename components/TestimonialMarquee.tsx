'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { useRef, useState } from 'react';

interface Testimonial {
    quote: string;
    name: string;
    role: string;
    initials: string;
    rating?: number;
}

const testimonials: Testimonial[] = [
    {
        quote: 'Built our entire platform from scratch and shipped it ahead of schedule. Exactly the kind of engineer you want on a project with no room for error.',
        name: 'Carlos Tiusas',
        role: 'Founder, Rothman Ashbury Asset Management',
        initials: 'CT',
        rating: 5,
    },
    {
        quote: 'Clean, modern design with a backend that just works. Our customers noticed the difference immediately.',
        name: 'Christyl Joy Salarda',
        role: 'Co-Founder, 9pm Vintage',
        initials: 'CS',
        rating: 5,
    },
    {
        quote: 'Fast, reliable, and every deliverable came back polished. Raised the bar for what I expect from a collaborator.',
        name: 'Kevin Ray Go',
        role: 'Virtual Assistant, Freelance',
        initials: 'KG',
        rating: 5,
    },
    {
        quote: 'Took a vague brief and turned it into something that exceeded what we even imagined. That\u2019s rare.',
        name: 'Denielle Marie Zambrano',
        role: 'Virtual Assistant, Freelance',
        initials: 'DZ',
        rating: 5,
    },
    {
        quote: 'A rare find \u2014 someone who speaks both engineering and business. Solves the right problem, not just the obvious one.',
        name: 'Anonymous',
        role: 'Founder, International Society of Equity Analysts',
        initials: 'AN',
        rating: 5,
    },
];

function StarRating({ count = 5, isHovered = false }: { count?: number; isHovered?: boolean }) {
    return (
        <div className="flex gap-0.5 mb-2.5">
            {Array.from({ length: count }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, rotate: -30 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        delay: i * 0.05 + 0.2,
                        duration: 0.3,
                        ease: [0.34, 1.56, 0.64, 1],
                    }}
                >
                    <motion.div
                        animate={isHovered
                            ? { scale: [1, 1.2, 1], rotate: [0, 10, 0] }
                            : {}
                        }
                        transition={{
                            delay: i * 0.08,
                            duration: 0.3,
                            ease: [0.34, 1.56, 0.64, 1],
                        }}
                    >
                        <Star className="w-3 h-3 fill-white/60 text-white/60" />
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ['start end', 'end start'],
    });

    const quoteY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

    return (
        <div
            ref={cardRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex-shrink-0 w-[280px] md:w-[260px] mx-2 rounded-xl border border-white/[0.05] bg-white/[0.015] hover:border-white/[0.10] hover:bg-white/[0.03] hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] relative overflow-hidden p-4 md:p-3.5"
        >
            {/* Quote mark parallax */}
            <motion.span
                className="absolute -top-4 -left-2 text-[80px] md:text-[70px] font-serif leading-none text-white/[0.03] pointer-events-none select-none z-0"
                style={{ y: quoteY }}
                aria-hidden="true"
            >
                &ldquo;
            </motion.span>

            {/* Content */}
            <div className="relative z-10">
                <StarRating count={testimonial.rating} isHovered={isHovered} />
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

            <div className="relative group/marquee">
                {/* Fade masks */}
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex [animation-play-state:running] group-hover/marquee:[animation-play-state:paused]"
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
                        <TestimonialCard key={i} testimonial={testimonial} index={i % testimonials.length} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

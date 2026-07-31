'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { projects } from '@/lib/projects';

/**
 * HeroMockups - Floating project screenshots in 3D perspective
 * Inspired by Aniq UI's hero with floating dashboard cards
 */
export function HeroMockups() {
    const showcaseProjects = projects.slice(0, 3);

    return (
        <div className="relative w-full h-full min-h-[300px] flex items-center justify-center overflow-hidden">
            {/* Ambient glow behind mockups */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-white/[0.03] rounded-full blur-[80px]" />
            </div>

            {/* 3D Perspective container */}
            <div
                className="relative w-full h-[280px]"
                style={{ perspective: '1200px' }}
            >
                {/* Main card - center, largest */}
                <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[150px] rounded-xl overflow-hidden border border-white/10 shadow-2xl z-30"
                    style={{
                        transformStyle: 'preserve-3d',
                        rotateY: -5,
                        rotateX: 5,
                    }}
                    initial={{ opacity: 0, y: 40, rotateY: -15, rotateX: 15 }}
                    animate={{ opacity: 1, y: 0, rotateY: -5, rotateX: 5 }}
                    transition={{ delay: 1.0, duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
                >
                    <div className="relative w-full h-full bg-zinc-900">
                        <Image
                            src={showcaseProjects[0].image}
                            alt={showcaseProjects[0].title}
                            fill
                            sizes="220px"
                            className="object-cover grayscale"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-[9px] font-mono text-white/60 truncate">{showcaseProjects[0].title}</p>
                        </div>
                    </div>
                    {/* Glass reflection */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-xl" />
                </motion.div>

                {/* Back-left card - smaller, rotated */}
                <motion.div
                    className="absolute left-[8%] top-[15%] w-[160px] h-[110px] rounded-lg overflow-hidden border border-white/8 shadow-xl z-20"
                    style={{
                        transformStyle: 'preserve-3d',
                        rotateY: 15,
                        rotateX: 8,
                    }}
                    initial={{ opacity: 0, x: -30, rotateY: 25 }}
                    animate={{ opacity: 0.8, x: 0, rotateY: 15 }}
                    transition={{ delay: 1.3, duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
                >
                    <div className="relative w-full h-full bg-zinc-900">
                        <Image
                            src={showcaseProjects[1].image}
                            alt={showcaseProjects[1].title}
                            fill
                            sizes="160px"
                            className="object-cover grayscale"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-1.5 left-2 right-2">
                            <p className="text-[8px] font-mono text-white/50 truncate">{showcaseProjects[1].title}</p>
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent pointer-events-none rounded-lg" />
                </motion.div>

                {/* Back-right card - smaller, rotated opposite */}
                <motion.div
                    className="absolute right-[8%] top-[25%] w-[160px] h-[110px] rounded-lg overflow-hidden border border-white/8 shadow-xl z-20"
                    style={{
                        transformStyle: 'preserve-3d',
                        rotateY: -15,
                        rotateX: 8,
                    }}
                    initial={{ opacity: 0, x: 30, rotateY: -25 }}
                    animate={{ opacity: 0.8, x: 0, rotateY: -15 }}
                    transition={{ delay: 1.5, duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
                >
                    <div className="relative w-full h-full bg-zinc-900">
                        <Image
                            src={showcaseProjects[2].image}
                            alt={showcaseProjects[2].title}
                            fill
                            sizes="160px"
                            className="object-cover grayscale"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-1.5 left-2 right-2">
                            <p className="text-[8px] font-mono text-white/50 truncate">{showcaseProjects[2].title}</p>
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent pointer-events-none rounded-lg" />
                </motion.div>

                {/* Floating accent dots */}
                {[
                    { x: '20%', y: '10%', delay: 2.0 },
                    { x: '75%', y: '15%', delay: 2.2 },
                    { x: '15%', y: '80%', delay: 2.4 },
                    { x: '80%', y: '75%', delay: 2.6 },
                ].map((dot, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/30 rounded-full"
                        style={{ left: dot.x, top: dot.y }}
                        animate={{
                            y: [0, -10, 0],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: dot.delay,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>

            {/* Label */}
            <motion.div
                className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-zinc-600 uppercase tracking-widest"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0 }}
            >
                Selected Work
            </motion.div>
        </div>
    );
}

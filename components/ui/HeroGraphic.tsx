'use client';

import { motion } from 'framer-motion';

/**
 * HeroGraphic - Floating abstract element for Hero section
 * Creates visual counterweight with glowing 3D rings inspired by Lighthouse gauges
 */
export function HeroGraphic() {
    return (
        <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
            {/* Core glow - anchors the 3D shapes to background (enhanced) */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 bg-emerald-500/15 rounded-full blur-[80px]" />
            </div>

            {/* Outer glow */}
            <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent rounded-full blur-3xl" />

            {/* Main container with perspective */}
            <div className="relative" style={{ perspective: '1000px' }}>
                {/* Orbiting Ring 1 - Large outer */}
                <motion.div
                    className="absolute inset-0 w-64 h-64 -translate-x-1/2 -translate-y-1/2"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{ rotateX: 75, rotateZ: [0, 360] }}
                    transition={{ rotateZ: { duration: 20, repeat: Infinity, ease: 'linear' } }}
                >
                    <div className="absolute inset-0 rounded-full border border-white/10" />
                    {/* Glowing accent point */}
                    <motion.div
                        className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_20px_8px_rgba(255,255,255,0.3)]"
                        style={{ top: '0%', left: '50%', transform: 'translateX(-50%)' }}
                    />
                </motion.div>

                {/* Orbiting Ring 2 - Medium */}
                <motion.div
                    className="absolute w-48 h-48 -translate-x-1/2 -translate-y-1/2"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{ rotateX: 65, rotateZ: [0, -360] }}
                    transition={{ rotateZ: { duration: 15, repeat: Infinity, ease: 'linear' } }}
                >
                    <div className="absolute inset-0 rounded-full border border-white/15" />
                    <motion.div
                        className="absolute w-1.5 h-1.5 bg-white/80 rounded-full shadow-[0_0_15px_6px_rgba(255,255,255,0.25)]"
                        style={{ top: '0%', left: '50%', transform: 'translateX(-50%)' }}
                    />
                </motion.div>

                {/* Orbiting Ring 3 - Small inner */}
                <motion.div
                    className="absolute w-32 h-32 -translate-x-1/2 -translate-y-1/2"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{ rotateX: 80, rotateZ: [0, 360] }}
                    transition={{ rotateZ: { duration: 10, repeat: Infinity, ease: 'linear' } }}
                >
                    <div className="absolute inset-0 rounded-full border border-white/20" />
                </motion.div>

                {/* Center core - pulsing */}
                <motion.div
                    className="relative w-4 h-4 bg-white rounded-full shadow-[0_0_40px_15px_rgba(255,255,255,0.2)]"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Floating particles - deterministic positions to avoid hydration mismatch */}
                {[
                    { top: '-25%', left: '-30%', duration: 3.5 },
                    { top: '15%', left: '35%', duration: 4.2 },
                    { top: '-40%', left: '-15%', duration: 3.8 },
                    { top: '30%', left: '-45%', duration: 4.5 },
                    { top: '-20%', left: '40%', duration: 3.2 },
                    { top: '25%', left: '48%', duration: 4.0 },
                ].map((particle, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/40 rounded-full"
                        style={{
                            top: particle.top,
                            left: particle.left,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.2, 0.6, 0.2],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>

            {/* Performance indicator text - connects to brand */}
            <motion.div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-mono text-zinc-600 uppercase tracking-widest"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                Performance-Focused
            </motion.div>
        </div>
    );
}

"use client";

import { motion } from "framer-motion";

/**
 * Subtle Orange Glow Divider - Clean section separator
 * Reduced opacity for better text legibility (50% reduction per UX audit)
 */
export function GlowDivider() {
    return (
        <div className="relative w-full h-32 overflow-hidden">
            {/* Main glowing horizontal line - subtle */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div
                    className="w-full h-[1px] opacity-70"
                    style={{ background: 'linear-gradient(to right, transparent, #ff6b00, transparent)' }}
                />
            </div>
            {/* Gentle glow spread - reduced by 50% */}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    className="w-full h-24 blur-[80px]"
                    style={{ background: 'linear-gradient(to right, transparent, rgba(255, 107, 0, 0.15), transparent)' }}
                    animate={{
                        opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>
            {/* Secondary glow layer - subtle */}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    className="w-1/2 h-16 blur-[60px] rounded-full"
                    style={{ background: 'rgba(255, 107, 0, 0.12)' }}
                    animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.15, 0.25, 0.15],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>
        </div>
    );
}

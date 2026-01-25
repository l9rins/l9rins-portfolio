"use client";

import { motion } from "framer-motion";

interface GlowDividerProps {
    variant?: "subtle" | "standard" | "dramatic";
    color?: "orange" | "blue" | "purple" | "cyan";
    showParticles?: boolean;
    className?: string;
}

/**
 * Enhanced Glow Divider - V21 Studio and Aniq UI inspired section separator
 * Features animated glow effects with optional floating particles
 */
export function GlowDivider({
    variant = "standard",
    color = "orange",
    showParticles = false,
    className = "",
}: GlowDividerProps) {
    const colorMap = {
        orange: {
            primary: "#ff6b00",
            secondary: "rgba(255, 107, 0, 0.15)",
            tertiary: "rgba(255, 107, 0, 0.08)",
        },
        blue: {
            primary: "#0070f3",
            secondary: "rgba(0, 112, 243, 0.15)",
            tertiary: "rgba(0, 112, 243, 0.08)",
        },
        purple: {
            primary: "#7928ca",
            secondary: "rgba(121, 40, 202, 0.15)",
            tertiary: "rgba(121, 40, 202, 0.08)",
        },
        cyan: {
            primary: "#00c2ff",
            secondary: "rgba(0, 194, 255, 0.15)",
            tertiary: "rgba(0, 194, 255, 0.08)",
        },
    };

    const colors = colorMap[color];

    const variantConfig = {
        subtle: {
            lineOpacity: 0.5,
            glowIntensity: 0.1,
            blurAmount: 60,
            height: "h-16",
        },
        standard: {
            lineOpacity: 0.7,
            glowIntensity: 0.15,
            blurAmount: 80,
            height: "h-24",
        },
        dramatic: {
            lineOpacity: 1,
            glowIntensity: 0.25,
            blurAmount: 100,
            height: "h-32",
        },
    };

    const config = variantConfig[variant];

    return (
        <div className={`relative w-full ${config.height} overflow-hidden ${className}`}>
            {/* Main glowing horizontal line */}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    className="w-full h-[1px]"
                    style={{
                        background: `linear-gradient(to right, transparent, ${colors.primary}, transparent)`,
                        opacity: config.lineOpacity,
                    }}
                    animate={{
                        opacity: [config.lineOpacity * 0.8, config.lineOpacity, config.lineOpacity * 0.8],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            {/* Primary glow spread */}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    className={`w-4/5 h-20 blur-[${config.blurAmount}px]`}
                    style={{
                        background: `linear-gradient(to right, transparent, ${colors.secondary}, transparent)`,
                        filter: `blur(${config.blurAmount}px)`,
                    }}
                    animate={{
                        opacity: [config.glowIntensity * 0.6, config.glowIntensity, config.glowIntensity * 0.6],
                        scaleX: [0.95, 1, 0.95],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            {/* Secondary concentrated glow */}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    className="w-1/2 h-16 rounded-full"
                    style={{
                        background: colors.tertiary,
                        filter: `blur(${config.blurAmount * 0.75}px)`,
                    }}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [config.glowIntensity * 0.5, config.glowIntensity, config.glowIntensity * 0.5],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            {/* Floating particles (optional) */}
            {showParticles && (
                <div className="absolute inset-0 flex items-center justify-center">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full"
                            style={{
                                backgroundColor: colors.primary,
                                left: `${20 + i * 15}%`,
                                boxShadow: `0 0 10px ${colors.primary}`,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0.3, 0.8, 0.3],
                                scale: [0.8, 1.2, 0.8],
                            }}
                            transition={{
                                duration: 2 + i * 0.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.3,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Edge highlight points */}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    className="absolute left-1/4 w-2 h-2 rounded-full"
                    style={{
                        backgroundColor: colors.primary,
                        boxShadow: `0 0 20px ${colors.primary}, 0 0 40px ${colors.secondary}`,
                    }}
                    animate={{
                        opacity: [0.3, 0.7, 0.3],
                        scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute right-1/4 w-2 h-2 rounded-full"
                    style={{
                        backgroundColor: colors.primary,
                        boxShadow: `0 0 20px ${colors.primary}, 0 0 40px ${colors.secondary}`,
                    }}
                    animate={{
                        opacity: [0.3, 0.7, 0.3],
                        scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.5,
                    }}
                />
            </div>
        </div>
    );
}

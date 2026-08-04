"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

interface StatsCounterProps {
    value: number;
    suffix?: string;
    prefix?: string;
    label: string;
    icon?: ReactNode;
    duration?: number;
    delay?: number;
    className?: string;
}

export function StatsCounter({
    value,
    suffix = "",
    prefix = "",
    label,
    icon,
    duration = 2,
    delay = 0,
    className = "",
}: StatsCounterProps) {
    const [isInView, setIsInView] = useState(false);
    const [shimmer, setShimmer] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const count = useMotionValue(0);
    const [displayValue, setDisplayValue] = useState("0");

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isInView) {
                    setIsInView(true);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [isInView]);

    useEffect(() => {
        if (isInView) {
            const timeout = setTimeout(() => {
                const controls = animate(count, value, {
                    duration,
                    ease: [0.16, 1, 0.3, 1],
                    onUpdate: (latest) => {
                        if (value >= 1000000) {
                            setDisplayValue(`${(latest / 1000000).toFixed(1)}M`);
                        } else if (value >= 1000) {
                            setDisplayValue(`${Math.round(latest / 1000)}K`);
                        } else if (value < 1) {
                            setDisplayValue(latest.toFixed(1));
                        } else {
                            setDisplayValue(Math.round(latest).toString());
                        }
                    },
                    onComplete: () => setShimmer(true),
                });
                return () => controls.stop();
            }, delay * 1000);
            return () => clearTimeout(timeout);
        }
    }, [isInView, value, duration, delay, count]);

    return (
        <motion.div
            ref={ref}
            className={`text-center group cursor-default ${className}`}
            initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
        >
            {/* Icon */}
            {icon && (
                <div className="flex justify-center mb-2 text-zinc-500 group-hover:text-[--accent] transition-colors duration-200">
                    {icon}
                </div>
            )}

            {/* Value with shimmer */}
            <div className="relative inline-block">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight transition-colors duration-200 group-hover:text-[--accent]">
                    {prefix}{displayValue}{suffix}
                </div>

                {/* Shimmer sweep after count-up */}
                {shimmer && (
                    <motion.div
                        className="absolute inset-0 pointer-events-none overflow-hidden"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                    >
                        <motion.div
                            className="absolute inset-0 -skew-x-12"
                            initial={{ x: "-100%" }}
                            animate={{ x: "200%" }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            style={{
                                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                            }}
                        />
                    </motion.div>
                )}
            </div>

            {/* Label */}
            <div className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-[0.2em] mt-2 font-medium transition-colors duration-200 group-hover:text-zinc-400">
                {label}
            </div>
        </motion.div>
    );
}

interface StatItem {
    value: number;
    suffix?: string;
    prefix?: string;
    label: string;
    icon?: ReactNode;
}

interface StatsBarProps {
    stats: StatItem[];
    className?: string;
}

export function StatsBar({ stats, className = "" }: StatsBarProps) {
    return (
        <div
            className={`flex flex-wrap items-center justify-center gap-8 md:gap-16 py-8 px-6 ${className}`}
        >
            {stats.map((stat, i) => (
                <div key={i} className="relative group/stat">
                    <StatsCounter
                        value={stat.value}
                        suffix={stat.suffix}
                        prefix={stat.prefix}
                        label={stat.label}
                        icon={stat.icon}
                        delay={i * 0.1}
                    />
                    {/* Divider line between stats */}
                    {i < stats.length - 1 && (
                        <div className="hidden md:block absolute right-[-2rem] top-1/2 -translate-y-1/2 w-px h-12 overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-b from-transparent via-white/10 to-transparent group-hover/stat:via-white/25 transition-all duration-300" />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

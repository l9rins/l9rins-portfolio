"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface StatsCounterProps {
    value: number;
    suffix?: string;
    prefix?: string;
    label: string;
    duration?: number;
    delay?: number;
    className?: string;
    valueClassName?: string;
    labelClassName?: string;
}

/**
 * Animated Stats Counter - Inspired by V21 Studio's credibility bar
 * Counts up to the target value when the element comes into view
 */
export function StatsCounter({
    value,
    suffix = "",
    prefix = "",
    label,
    duration = 2,
    delay = 0,
    className = "",
    valueClassName = "",
    labelClassName = "",
}: StatsCounterProps) {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => {
        // Format large numbers with K, M suffixes
        if (value >= 1000000) {
            return `${(latest / 1000000).toFixed(1)}M`;
        }
        if (value >= 1000) {
            return `${(latest / 1000).toFixed(0)}K`;
        }
        return Math.round(latest).toString();
    });
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
                        // Format the value based on magnitude
                        if (value >= 1000000) {
                            setDisplayValue(`${(latest / 1000000).toFixed(1)}M`);
                        } else if (value >= 1000) {
                            setDisplayValue(`${Math.round(latest / 1000)}K`);
                        } else {
                            setDisplayValue(Math.round(latest).toString());
                        }
                    },
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay, duration: 0.6 }}
            viewport={{ once: true }}
        >
            <div className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight transition-colors duration-200 group-hover:text-[--accent] ${valueClassName}`}>
                {prefix}
                {displayValue}
                {suffix}
            </div>
            <div className={`text-[10px] md:text-xs text-zinc-500 uppercase tracking-[0.2em] mt-2 font-medium transition-colors duration-200 group-hover:text-zinc-400 ${labelClassName}`}>
                {label}
            </div>
        </motion.div>
    );
}

/**
 * Stats Bar - V21 Studio-style horizontal credibility bar
 */
interface StatItem {
    value: number;
    suffix?: string;
    prefix?: string;
    label: string;
}

interface StatsBarProps {
    stats: StatItem[];
    className?: string;
}

export function StatsBar({ stats, className = "" }: StatsBarProps) {
    return (
        <motion.div
            className={`flex flex-wrap items-center justify-center gap-8 md:gap-16 py-8 px-6 ${className}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            {stats.map((stat, i) => (
                <div key={i} className="relative group/stat">
                    <StatsCounter
                        value={stat.value}
                        suffix={stat.suffix}
                        prefix={stat.prefix}
                        label={stat.label}
                        delay={i * 0.15}
                    />
                    {/* Divider line between stats */}
                    {i < stats.length - 1 && (
                        <div className="hidden md:block absolute right-[-2rem] top-1/2 -translate-y-1/2 w-px h-12 overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-b from-transparent via-white/10 to-transparent group-hover/stat:via-white/25 transition-all duration-300" />
                        </div>
                    )}
                </div>
            ))}
        </motion.div>
    );
}

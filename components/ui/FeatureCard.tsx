"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent, ReactNode } from "react";

interface FeatureCardProps {
    title: string;
    description?: string;
    children?: ReactNode;
    className?: string;
    isSmallHeight?: boolean;
}

export function FeatureCard({
    title,
    description,
    children,
    className = '',
    isSmallHeight = false
}: FeatureCardProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent<HTMLDivElement>) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-black p-6 md:p-8 transition-colors hover:border-white/20 ${isSmallHeight ? 'h-48' : 'min-h-[320px]'
                } ${className}`}
            onMouseMove={handleMouseMove}
        >
            {/* Mouse Follow Glow Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
                }}
            />

            {/* Content */}
            <div className="relative z-10">
                {children ? (
                    children
                ) : (
                    <>
                        <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">{title}</h3>
                        {description && (
                            <p className="text-sm md:text-base font-medium text-white/60">{description}</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

// Bento Grid Layout Component
interface FeatureGridProps {
    children: ReactNode;
    className?: string;
}

export function FeatureGrid({ children, className = '' }: FeatureGridProps) {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 ${className}`}>
            {children}
        </div>
    );
}

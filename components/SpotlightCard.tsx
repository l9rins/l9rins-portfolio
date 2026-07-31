'use client';

import { motion, useMotionValue } from 'framer-motion';
import { useRef, useState, MouseEvent } from 'react';
import { cn } from '@/lib/utils';
import { memo } from 'react';

interface SpotlightCardProps {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
    id?: string;
    variant?: 'default' | 'glow' | 'premium';
    delay?: number;
}

function SpotlightCardComponent({
    children,
    className,
    spotlightColor = 'rgba(255, 255, 255, 0.06)',
    id,
    variant = 'default',
    delay = 0,
}: SpotlightCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const variantStyles = {
        default: {
            bg: 'bg-white/[0.02]',
            border: 'border-white/[0.06] hover:border-white/[0.10]',
            glow: '0 0 50px rgba(255, 255, 255, 0.02)',
            innerHighlight:
                'inset 0 0 0 1px rgba(255, 255, 255, 0.03), inset 0 1px 0 0 rgba(255, 255, 255, 0.04)',
        },
        glow: {
            bg: 'bg-white/[0.03]',
            border: 'border-white/[0.08] hover:border-white/[0.12]',
            glow: '0 0 60px rgba(255, 255, 255, 0.04)',
            innerHighlight:
                'inset 0 0 0 1px rgba(255, 255, 255, 0.04), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
        },
        premium: {
            bg: 'bg-gradient-to-br from-white/[0.03] to-transparent',
            border: 'border-white/[0.08] hover:border-white/[0.12]',
            glow: '0 0 80px rgba(255, 255, 255, 0.04)',
            innerHighlight:
                'inset 0 0 0 1px rgba(255, 255, 255, 0.04), inset 0 1px 0 0 rgba(255, 255, 255, 0.06)',
        },
    };

    const styles = variantStyles[variant];

    return (
        <motion.div
            id={id}
            ref={cardRef}
            className={cn(
                'relative overflow-hidden rounded-xl p-6',
                styles.bg,
                'border',
                styles.border,
                'transition-all duration-200 ease-out',
                'backdrop-blur-md',
                'group',
                'focus-within:ring-2 focus-within:ring-white/20 focus-within:ring-offset-2 focus-within:ring-offset-black',
                className
            )}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay, ease: [0.25, 0.8, 0.25, 1] }}
        >
            {/* Hover glow */}
            <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{ boxShadow: styles.glow }}
            />

            {/* Spotlight gradient */}
            <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{
                    background: `radial-gradient(500px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 40%)`,
                }}
            />

            {/* Top edge highlight */}
            <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-40 transition-opacity duration-200 pointer-events-none"
                style={{
                    background:
                        'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
                }}
            />

            {/* Inner highlight */}
            <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{ boxShadow: styles.innerHighlight }}
            />

            {/* Subtle dot grid */}
            <div className="absolute inset-0 z-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] rounded-xl pointer-events-none" />

            {/* Corner gradient blob - softer */}
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/[0.015] blur-[60px] pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}

export const SpotlightCard = memo(SpotlightCardComponent);
export default SpotlightCard;

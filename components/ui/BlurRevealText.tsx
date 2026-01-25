"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BlurRevealTextProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export const BlurRevealText: React.FC<BlurRevealTextProps> = ({
    children,
    className = '',
    delay = 0
}) => {
    return (
        <motion.div
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.22, 1, 0.36, 1] // Premium easing curve
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Specialized variant for headers
export const BlurRevealHeading: React.FC<BlurRevealTextProps> = ({
    children,
    className = '',
    delay = 0
}) => {
    return (
        <BlurRevealText
            className={`text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white ${className}`}
            delay={delay}
        >
            {children}
        </BlurRevealText>
    );
};

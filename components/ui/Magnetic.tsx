"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, MouseEvent, ReactElement, cloneElement } from "react";

interface MagneticProps {
    children: ReactElement;
    strength?: number; // How far the element moves (default 0.5)
}

export function Magnetic({ children, strength = 0.5 }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null);
    const position = { x: useMotionValue(0), y: useMotionValue(0) };

    // Smooth spring physics for the magnetic effect
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const x = useSpring(position.x, springConfig);
    const y = useSpring(position.y, springConfig);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();

        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        position.x.set(middleX * strength);
        position.y.set(middleY * strength);
    };

    const handleMouseLeave = () => {
        position.x.set(0);
        position.y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
            className="relative"
        >
            {cloneElement(children, {
                // Determine if children already has style prop to merge or just style
                // If the child is a motion component, it might conflict, but usually composition works fine 
                // if we don't pass style down explicitly to the child's style prop if we wrapper it.
                // Actually, wrapping with motion.div is safer.
            })}
        </motion.div>
    );
}

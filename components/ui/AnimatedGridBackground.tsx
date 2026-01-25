"use client";

interface AnimatedGridBackgroundProps {
    variant?: "default" | "dense" | "dots";
    className?: string;
    children?: React.ReactNode;
}

/**
 * Animated Grid Background - Aniq UI Style
 * Creates a subtle, monochrome grid overlay
 */
export function AnimatedGridBackground({
    variant = "default",
    className = "",
    children
}: AnimatedGridBackgroundProps) {
    const gridClasses = {
        default: "grid-background-aniq",
        dense: "grid-background-aniq-dense",
        dots: "grid-background-dots",
    };

    return (
        <div className={`relative ${className}`}>
            {/* Base grid layer - Aniq UI style */}
            <div className={`absolute inset-0 ${gridClasses[variant]} pointer-events-none`} />

            {/* Gradient fade at edges for depth */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black via-transparent to-black opacity-30" />

            {/* Content */}
            <div className="relative z-10">{children}</div>
        </div>
    );
}

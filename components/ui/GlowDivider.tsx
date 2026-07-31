'use client';

interface GlowDividerProps {
    className?: string;
}

/**
 * GlowDivider - Subtle, clean section separator
 * Thin line with soft ambient glow — Aniq UI inspired
 */
export function GlowDivider({ className = '' }: GlowDividerProps) {
    return (
        <div className={`relative w-full h-12 flex items-center justify-center overflow-hidden ${className}`}>
            {/* Thin horizontal line */}
            <div
                className="w-3/5 h-px"
                style={{
                    background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)',
                }}
            />
            {/* Soft ambient glow */}
            <div
                className="absolute w-1/3 h-6 rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse, rgba(255,255,255,0.04), transparent 70%)',
                }}
            />
        </div>
    );
}

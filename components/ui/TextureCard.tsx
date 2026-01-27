'use client';

import { cn } from "@/lib/utils";

interface TextureCardProps {
    children: React.ReactNode;
    className?: string;
    variant?: "dots" | "gradient" | "mesh";
    intensity?: "low" | "medium" | "high";
}

/**
 * TextureCard - Unified "World Class" container
 * Combines Glass Border + Texture Layer + Premium depth effects
 * 
 * @param variant - "dots" (technical), "gradient" (creative), "mesh" (atmospheric)
 * @param intensity - Controls texture opacity: low (0.03), medium (0.07), high (0.12)
 */
export function TextureCard({
    children,
    className,
    variant = "dots",
    intensity = "medium"
}: TextureCardProps) {
    const opacityMap = {
        low: "opacity-[0.03]",
        medium: "opacity-[0.07]",
        high: "opacity-[0.12]"
    };

    return (
        <div className={cn(
            "relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.01]",
            "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]", // Glass cut top highlight
            "hover:border-white/15 transition-all duration-300",
            className
        )}>

            {/* 1. The Texture Layer */}
            <div className={cn(
                "absolute inset-0 z-0 pointer-events-none",
                opacityMap[intensity]
            )}>
                {variant === "dots" && (
                    <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                )}
                {variant === "gradient" && (
                    <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/30 blur-[60px]" />
                )}
                {variant === "mesh" && (
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-500/30 blur-[100px] rounded-full mix-blend-screen" />
                )}
            </div>

            {/* 2. Bottom gradient texture */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-0" />

            {/* 3. Content Layer */}
            <div className="relative z-10 h-full">
                {children}
            </div>
        </div>
    );
}

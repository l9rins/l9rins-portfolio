"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
    label: string;
    title: string;
    titleAccent?: string;
    description?: string;
    align?: "left" | "center";
    className?: string;
}

/**
 * Consistent section header with typography hierarchy:
 * - Label: Small uppercase tracking-widest in accent color
 * - Title: Large heading with optional gradient accent word
 * - Description: Muted body text
 */
export function SectionHeader({
    label,
    title,
    titleAccent,
    description,
    align = "center",
    className = "",
}: SectionHeaderProps) {
    const alignClass = align === "center" ? "text-center" : "text-left";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`mb-12 ${alignClass} ${className}`}
        >
            {/* Label - Muted uppercase */}
            <span className="text-[10px] uppercase tracking-[0.3em] text-[--accent] mb-4 block font-medium">
                {label}
            </span>

            {/* Title - Bold with tight tracking */}
            <h2 className="h2 mb-4 tracking-tight">
                {title}
                {titleAccent && (
                    <>
                        {" "}
                        <span className="gradient-text">{titleAccent}</span>
                    </>
                )}
            </h2>

            {/* Description - Muted */}
            {description && (
                <p className={`text-zinc-500 text-sm leading-relaxed ${align === "center" ? "max-w-xl mx-auto" : "max-w-lg"}`}>
                    {description}
                </p>
            )}
        </motion.div>
    );
}

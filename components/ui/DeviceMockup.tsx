"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface DeviceMockupProps {
    src?: string;
    alt?: string;
    type?: "laptop" | "mobile" | "browser";
    className?: string;
    children?: React.ReactNode;
}

/**
 * Device Mockup - Premium device frames for project screenshots
 * Inspired by V21 Studio's immersive case study presentations
 */
export function DeviceMockup({
    src,
    alt = "Project screenshot",
    type = "laptop",
    className = "",
    children,
}: DeviceMockupProps) {
    if (type === "browser") {
        return (
            <motion.div
                className={`relative ${className}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                {/* Browser frame */}
                <div className="relative bg-zinc-900 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                    {/* Browser header */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800/80 border-b border-white/5">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <div className="flex-1 mx-4">
                            <div className="bg-zinc-700/50 rounded-md py-1.5 px-3 text-[10px] text-zinc-400 font-mono">
                                https://yourproject.com
                            </div>
                        </div>
                    </div>
                    {/* Content area */}
                    <div className="relative aspect-[16/10] bg-zinc-950">
                        {src ? (
                            <Image
                                src={src}
                                alt={alt}
                                fill
                                sizes="(max-width: 768px) 100vw, 800px"
                                className="object-cover"
                            />
                        ) : children ? (
                            children
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-zinc-600">
                                <span className="text-sm font-mono">Preview</span>
                            </div>
                        )}
                    </div>
                </div>
                {/* Reflection/shadow */}
                <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-b from-white/5 to-transparent blur-xl rounded-full" />
            </motion.div>
        );
    }

    if (type === "mobile") {
        return (
            <motion.div
                className={`relative ${className}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                {/* Mobile frame */}
                <div className="relative bg-zinc-900 rounded-[2.5rem] p-2 border border-white/10 shadow-2xl max-w-[280px] mx-auto">
                    {/* Inner bezel */}
                    <div className="relative bg-black rounded-[2rem] overflow-hidden">
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-xl z-10" />
                        {/* Screen */}
                        <div className="relative aspect-[9/19.5] bg-zinc-950">
                            {src ? (
                                <Image
                                    src={src}
                                    alt={alt}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 280px"
                                    className="object-cover"
                                />
                            ) : children ? (
                                children
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-zinc-600">
                                    <span className="text-sm font-mono">Preview</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* Shadow */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-8 bg-black/50 blur-2xl rounded-full" />
            </motion.div>
        );
    }

    // Laptop (default)
    return (
        <motion.div
            className={`relative ${className}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            {/* Laptop screen */}
            <div className="relative bg-zinc-800 rounded-t-xl p-2 border-t border-x border-white/10">
                {/* Screen bezel */}
                <div className="relative bg-black rounded-lg overflow-hidden">
                    {/* Camera notch */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-zinc-700 z-10" />
                    {/* Screen content */}
                    <div className="relative aspect-[16/10] bg-zinc-950">
                        {src ? (
                            <Image
                                src={src}
                                alt={alt}
                                fill
                                sizes="(max-width: 768px) 100vw, 800px"
                                className="object-cover"
                            />
                        ) : children ? (
                            children
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-zinc-600">
                                <span className="text-sm font-mono">Preview</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Laptop base */}
            <div className="relative h-4 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-b-lg border-b border-x border-white/5">
                {/* Trackpad notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-zinc-600 rounded-b-sm" />
            </div>
            {/* Extended base for perspective */}
            <div className="relative h-2 bg-zinc-900 rounded-b-xl mx-4" />
            {/* Shadow */}
            <div className="absolute -bottom-4 left-8 right-8 h-8 bg-black/40 blur-2xl rounded-full" />
        </motion.div>
    );
}

/**
 * Dual Device Mockup - Shows both laptop and mobile side by side
 */
interface DualMockupProps {
    desktopSrc?: string;
    mobileSrc?: string;
    alt?: string;
    className?: string;
}

export function DualDeviceMockup({
    desktopSrc,
    mobileSrc,
    alt = "Project screenshot",
    className = "",
}: DualMockupProps) {
    return (
        <div className={`relative flex items-end justify-center gap-8 ${className}`}>
            <DeviceMockup
                type="laptop"
                src={desktopSrc}
                alt={`${alt} - Desktop`}
                className="flex-shrink-0"
            />
            <DeviceMockup
                type="mobile"
                src={mobileSrc}
                alt={`${alt} - Mobile`}
                className="-ml-16 relative z-10"
            />
        </div>
    );
}

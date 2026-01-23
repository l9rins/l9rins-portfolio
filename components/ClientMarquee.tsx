"use client";

import { motion } from "framer-motion";

// Client/Technology logos as text (can be replaced with actual logos)
const clients = [
    { name: "Vercel", icon: "▲" },
    { name: "Next.js", icon: "N" },
    { name: "React", icon: "⚛" },
    { name: "TypeScript", icon: "TS" },
    { name: "TailwindCSS", icon: "🌊" },
    { name: "Prisma", icon: "◇" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "Stripe", icon: "S" },
];

function MarqueeContent() {
    return (
        <>
            {clients.map((client, i) => (
                <div
                    key={i}
                    className="flex items-center gap-3 mx-8 group cursor-pointer"
                >
                    <span className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity">
                        {client.icon}
                    </span>
                    <span className="text-xl font-medium text-zinc-500 group-hover:text-white transition-colors whitespace-nowrap">
                        {client.name}
                    </span>
                </div>
            ))}
        </>
    );
}

export function ClientMarquee() {
    return (
        <section className="py-16 bg-black border-y border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-8">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center text-zinc-500 text-sm uppercase tracking-widest"
                >
                    Technologies & Tools I Work With
                </motion.p>
            </div>

            {/* Marquee Container */}
            <div className="relative">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

                {/* Scrolling Content */}
                <div className="flex overflow-hidden">
                    <motion.div
                        className="flex"
                        animate={{ x: [0, -1920] }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 30,
                                ease: "linear",
                            },
                        }}
                    >
                        <MarqueeContent />
                        <MarqueeContent />
                        <MarqueeContent />
                        <MarqueeContent />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

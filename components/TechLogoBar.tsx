'use client';

import { motion } from 'framer-motion';

const techLogos = [
    { name: 'React', abbr: 'React' },
    { name: 'Next.js', abbr: 'Next' },
    { name: 'TypeScript', abbr: 'TS' },
    { name: 'Tailwind CSS', abbr: 'TW' },
    { name: 'Node.js', abbr: 'Node' },
    { name: 'Python', abbr: 'Py' },
    { name: 'PostgreSQL', abbr: 'PG' },
    { name: 'Docker', abbr: 'Dkr' },
    { name: 'AWS', abbr: 'AWS' },
    { name: 'Git', abbr: 'Git' },
    { name: 'Figma', abbr: 'Figma' },
    { name: 'MongoDB', abbr: 'Mongo' },
];

/**
 * TechLogoBar - Horizontal scrolling tech trust bar
 */
export function TechLogoBar() {
    const doubled = [...techLogos, ...techLogos];

    return (
        <div className="relative w-full py-5 overflow-hidden">
            {/* Fade masks */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

            <motion.div
                className="flex gap-8 items-center"
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: 35,
                        ease: 'linear',
                    },
                }}
            >
                {doubled.map((tech, i) => (
                    <div
                        key={`${tech.name}-${i}`}
                        className="flex-shrink-0 text-[9px] font-mono text-zinc-700 uppercase tracking-widest select-none"
                    >
                        {tech.abbr}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

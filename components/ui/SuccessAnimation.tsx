"use client";

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    color: string;
    shape: 'circle' | 'square';
}

interface SuccessAnimationProps {
    show: boolean;
    onComplete?: () => void;
}

export const SuccessAnimation = ({ show, onComplete }: SuccessAnimationProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number>();

    useEffect(() => {
        if (!show) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Create monochrome particles
        const particleCount = 50;
        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8 - 2,
            size: Math.random() * 6 + 2,
            opacity: 1,
            color: Math.random() > 0.5 ? 'rgba(255, 255, 255, 1)' : 'rgba(200, 200, 200, 1)',
            shape: Math.random() > 0.5 ? 'circle' : 'square',
        }));

        let startTime = Date.now();
        const duration = 2000; // 2 seconds

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((particle) => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vy += 0.2; // Gravity
                particle.opacity = 1 - progress;

                // Draw particle
                ctx.save();
                ctx.globalAlpha = particle.opacity;

                if (particle.shape === 'circle') {
                    ctx.fillStyle = particle.color;
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    ctx.fillStyle = particle.color;
                    ctx.fillRect(
                        particle.x - particle.size / 2,
                        particle.y - particle.size / 2,
                        particle.size,
                        particle.size
                    );
                }

                ctx.restore();
            });

            if (progress < 1) {
                animationFrameRef.current = requestAnimationFrame(animate);
            } else {
                onComplete?.();
            }
        };

        animate();

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [show, onComplete]);

    return (
        <AnimatePresence>
            {show && (
                <>
                    {/* Confetti Canvas */}
                    <canvas
                        ref={canvasRef}
                        className="fixed inset-0 pointer-events-none z-[200]"
                    />

                    {/* Animated Checkmark */}
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center pointer-events-none z-[201]"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                        <motion.div
                            className="relative w-24 h-24 rounded-full bg-black/80 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center"
                            initial={{ rotate: -180 }}
                            animate={{ rotate: 0 }}
                            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                        >
                            {/* Checkmark SVG */}
                            <svg
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <motion.path
                                    d="M5 13l4 4L19 7"
                                    stroke="white"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
                                    style={{
                                        filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))',
                                    }}
                                />
                            </svg>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

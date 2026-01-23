"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { Terminal, Folder, FileCode, ChevronRight, Server, Globe, Zap } from "lucide-react";
import { useState, useEffect, useRef, MouseEvent } from "react";

// ============================================
// SPOTLIGHT CARD - Premium hover effect
// ============================================
interface SpotlightBentoCardProps {
    children: React.ReactNode;
    className?: string;
    glowColor?: string;
}

function SpotlightBentoCard({ children, className = "", glowColor = "rgba(255, 107, 0, 0.15)" }: SpotlightBentoCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`relative overflow-hidden bg-zinc-900/60 border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:border-[--accent]/40 group ${className}`}
        >
            {/* Spotlight gradient that follows mouse */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 40%)`,
                }}
            />
            {/* Border glow on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    boxShadow: `inset 0 0 0 1px rgba(255, 107, 0, 0.2), 0 0 40px rgba(255, 107, 0, 0.1)`,
                }}
            />
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}

// ============================================
// LIGHTHOUSE SCORE CIRCLE
// ============================================
function ScoreCircle({ score, label, delay = 0 }: { score: number; label: string; delay?: number }) {
    const circumference = 2 * Math.PI * 36;
    const strokeDashoffset = circumference - (score / 100) * circumference;
    const color = score >= 90 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444';

    return (
        <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.5 }}
            viewport={{ once: true }}
        >
            <div className="relative w-20 h-20">
                <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="5"
                        fill="none"
                    />
                    <motion.circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke={color}
                        strokeWidth="5"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ strokeDashoffset: circumference }}
                        whileInView={{ strokeDashoffset }}
                        transition={{ delay: delay + 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        style={{ strokeDasharray: circumference }}
                        filter={`drop-shadow(0 0 6px ${color})`}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-white">{score}</span>
                </div>
            </div>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-medium">{label}</span>
        </motion.div>
    );
}

// ============================================
// TERMINAL CARD
// ============================================
function TerminalCard() {
    const [currentLine, setCurrentLine] = useState(0);
    const lines = [
        { text: "> git checkout main && npm install", type: "command" },
        { text: "Checking dependencies...", type: "info" },
        { text: "Initializing environment...", type: "info" },
        { text: "✓ Compiled successfully", type: "success" },
        { text: "✓ Deployed to production", type: "success" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentLine((prev) => (prev < lines.length - 1 ? prev + 1 : 0));
        }, 1200);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-black/60 rounded-xl border border-white/10 overflow-hidden backdrop-blur-sm">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-zinc-900/80">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-[10px] text-zinc-500 ml-2 font-mono uppercase tracking-wider">terminal</span>
            </div>
            <div className="p-4 font-mono text-xs space-y-1.5 min-h-[120px]">
                {lines.slice(0, currentLine + 1).map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex items-center gap-2 ${line.type === "command" ? "text-zinc-300" :
                            line.type === "success" ? "text-green-400" : "text-zinc-500"
                            }`}
                    >
                        {line.text}
                    </motion.div>
                ))}
                <span className="inline-block w-2 h-3 bg-[--accent]/70 animate-pulse" />
            </div>
        </div>
    );
}

// ============================================
// PROJECT STRUCTURE (File Explorer)
// ============================================
function ProjectStructure() {
    const files = [
        { name: "src", type: "folder", indent: 0 },
        { name: "components", type: "folder", indent: 1 },
        { name: "ui", type: "folder", indent: 2 },
        { name: "Hero.tsx", type: "file", indent: 2 },
        { name: "lib", type: "folder", indent: 1 },
        { name: "utils.ts", type: "file", indent: 2 },
        { name: "app", type: "folder", indent: 1 },
        { name: "page.tsx", type: "file", indent: 2 },
    ];

    return (
        <div className="bg-black/60 rounded-xl border border-white/10 overflow-hidden backdrop-blur-sm">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-zinc-900/80">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-[10px] text-zinc-500 ml-2 uppercase tracking-wider">Explorer</span>
                <span className="text-[10px] text-zinc-600 ml-auto font-mono">PROJECT_01</span>
            </div>
            <div className="p-3 font-mono text-xs">
                {files.map((file, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 py-1 text-zinc-400 hover:bg-white/5 px-2 rounded cursor-pointer hover:text-white transition-colors"
                        style={{ paddingLeft: `${file.indent * 14 + 8}px` }}
                    >
                        {file.type === "folder" ? (
                            <>
                                <ChevronRight className="w-3 h-3 text-zinc-600" />
                                <Folder className="w-3.5 h-3.5 text-amber-500/80" />
                            </>
                        ) : (
                            <>
                                <span className="w-3" />
                                <FileCode className="w-3.5 h-3.5 text-blue-400/80" />
                            </>
                        )}
                        <span className={file.type === "folder" ? "font-medium text-zinc-300" : ""}>{file.name}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// ============================================
// PERFORMANCE METRICS
// ============================================
function PerformanceMetrics() {
    const metrics = [
        { label: "First Contentful Paint", value: "0.8s", status: "Fast" },
        { label: "Largest Contentful Paint", value: "1.2s", status: "Fast" },
        { label: "Total Blocking Time", value: "0ms", status: "Fast" },
        { label: "Cumulative Layout Shift", value: "0", status: "Good" },
        { label: "Speed Index", value: "1.4s", status: "Fast" },
    ];

    return (
        <div className="space-y-2.5">
            <h4 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-3">Performance Metrics</h4>
            {metrics.map((metric, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between text-xs"
                >
                    <span className="text-zinc-500">{metric.label}</span>
                    <div className="flex items-center gap-2">
                        <span className="text-white font-mono font-medium">{metric.value}</span>
                        <span className="text-green-400 text-[10px] px-1.5 py-0.5 bg-green-400/10 rounded-md border border-green-400/20">{metric.status}</span>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

// ============================================
// MAIN COMPONENT
// ============================================
export function TechHighlights() {
    return (
        <section className="py-24 bg-black">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header - Renamed per Round 2 audit */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/60 mb-4 block font-medium">What I Deliver</span>
                    <h2 className="h2 mb-4">
                        Technical <span className="text-white">Expertise</span>
                    </h2>
                    <p className="text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed">
                        Real metrics from recent projects. Optimized dashboards, automated deployments, and scalable infrastructure.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* Lighthouse Performance - Large Card */}
                    <SpotlightBentoCard className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-[--accent]/10 flex items-center justify-center">
                                <Zap className="w-4 h-4 text-[--accent]" />
                            </div>
                            <h3 className="text-base font-semibold text-white">Lighthouse Performance</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Scores */}
                            <div className="flex justify-around items-center py-4">
                                <ScoreCircle score={99} label="Performance" delay={0} />
                                <ScoreCircle score={100} label="Accessibility" delay={0.1} />
                                <ScoreCircle score={100} label="Best Practices" delay={0.2} />
                                <ScoreCircle score={100} label="SEO" delay={0.3} />
                            </div>

                            {/* Metrics */}
                            <PerformanceMetrics />
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-600">
                            <span>Analysis Complete</span>
                            <span className="font-mono">1/22/2026</span>
                        </div>
                    </SpotlightBentoCard>

                    {/* Deployment Pipeline */}
                    <SpotlightBentoCard>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-[--accent]/10 flex items-center justify-center">
                                <Terminal className="w-4 h-4 text-[--accent]" />
                            </div>
                            <h3 className="text-base font-semibold text-white">Deployment Pipeline</h3>
                        </div>
                        <TerminalCard />
                        {/* Pipeline Steps */}
                        <div className="mt-4 flex items-center justify-between">
                            {["Prepare", "Build", "Deploy", "Live"].map((step, i) => (
                                <div key={step} className="flex items-center gap-1">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${i <= 3 ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-zinc-800 text-zinc-600'
                                        }`}>
                                        {i + 1}
                                    </div>
                                    <span className="text-[10px] text-zinc-500 hidden sm:inline">{step}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] text-zinc-600 mt-3 uppercase tracking-wider">CI/CD Pipeline • Automated Deployment</p>
                    </SpotlightBentoCard>

                    {/* Project Structure */}
                    <SpotlightBentoCard>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-[--accent]/10 flex items-center justify-center">
                                <Folder className="w-4 h-4 text-[--accent]" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-white">Ideal Project Structure</h3>
                                <p className="text-[10px] text-zinc-600">Next.js App • Optimized for Performance</p>
                            </div>
                        </div>
                        <ProjectStructure />
                    </SpotlightBentoCard>

                    {/* Resource Scaling */}
                    <SpotlightBentoCard>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-[--accent]/10 flex items-center justify-center">
                                <Server className="w-4 h-4 text-[--accent]" />
                            </div>
                            <h3 className="text-base font-semibold text-white">Resource Scaling</h3>
                        </div>
                        <p className="text-[10px] text-zinc-600 uppercase tracking-wider mb-3">Resource Usage (24h)</p>
                        <div className="space-y-4">
                            <div className="flex items-end justify-between h-20 gap-1">
                                {[40, 65, 45, 80, 55, 70, 60, 75, 50, 85, 65, 78].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        className="flex-1 bg-gradient-to-t from-[--accent] to-[--accent-light] rounded-t"
                                        initial={{ height: 0 }}
                                        whileInView={{ height: `${h}%` }}
                                        transition={{ delay: i * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                        viewport={{ once: true }}
                                        style={{ filter: 'drop-shadow(0 0 4px rgba(255, 107, 0, 0.3))' }}
                                    />
                                ))}
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-zinc-500">Active Servers</span>
                                <span className="text-2xl font-bold text-white">5</span>
                            </div>
                            <p className="text-[10px] text-zinc-600 uppercase tracking-wider">Auto-scaling Platform • Handles Any Load</p>
                        </div>
                    </SpotlightBentoCard>

                    {/* Global Deployments */}
                    <SpotlightBentoCard>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-[--accent]/10 flex items-center justify-center">
                                    <Globe className="w-4 h-4 text-[--accent]" />
                                </div>
                                <h3 className="text-base font-semibold text-white">Global Deployments</h3>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-[10px] text-green-400 font-medium">Live</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-center mb-4">
                            <div className="bg-zinc-800/50 rounded-xl p-3 border border-white/5">
                                <div className="text-xl font-bold text-white">1094</div>
                                <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Deployments</div>
                            </div>
                            <div className="bg-zinc-800/50 rounded-xl p-3 border border-white/5">
                                <div className="text-xl font-bold text-white">99.9%</div>
                                <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Uptime</div>
                            </div>
                            <div className="bg-zinc-800/50 rounded-xl p-3 border border-white/5">
                                <div className="text-xl font-bold text-white">8</div>
                                <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Regions</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="relative w-20 h-20">
                                <motion.div
                                    className="absolute inset-0 border-2 border-[--accent]/20 rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                />
                                <motion.div
                                    className="absolute inset-2 border border-[--accent]/10 rounded-full"
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Globe className="w-6 h-6 text-[--accent]/60" />
                                </div>
                            </div>
                        </div>
                    </SpotlightBentoCard>
                </div>
            </div>
        </section>
    );
}

"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { Terminal, Folder, FileCode, ChevronRight, Server, Globe, Zap } from "lucide-react";
import { useState, useEffect, useRef, MouseEvent } from "react";
import { BlurRevealText } from "@/components/ui/BlurRevealText";

// ============================================
// SPOTLIGHT CARD - Premium hover effect
// ============================================
interface SpotlightBentoCardProps {
    children: React.ReactNode;
    className?: string;
    glowColor?: string;
}

function SpotlightBentoCard({ children, className = "", glowColor = "rgba(255, 255, 255, 0.08)" }: SpotlightBentoCardProps) {
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
            className={`relative overflow-hidden bg-zinc-900/60 border border-white/10 rounded-lg p-6 transition-all duration-500 hover:border-[--accent]/40 group ${className}`}
        >
            {/* Spotlight gradient that follows mouse */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 40%)`,
                }}
            />
            {/* Border glow on hover */}
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    boxShadow: `inset 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 40px rgba(255, 255, 255, 0.05)`,
                }}
            />

            {/* Visual Fill - Dot Grid Pattern (unified premium look) */}
            <div className="absolute inset-0 z-0 opacity-[0.07] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] rounded-lg" />

            {/* Corner gradient blob */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/20 blur-[50px] pointer-events-none" />

            {/* Bottom gradient texture */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent rounded-b-lg pointer-events-none" />

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
    // Using green for high scores but WITHOUT glow effect
    const color = score >= 90 ? '#4ade80' : score >= 50 ? '#facc15' : '#f87171';

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
                    // NO drop-shadow filter - clean look per aniq-ui
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
    const [isComplete, setIsComplete] = useState(false);
    const lines = [
        { text: "> aws cloudfront deploy --", type: "command" },
        { text: "  environment=prod", type: "info" },
    ];

    useEffect(() => {
        if (isComplete) return;

        const interval = setInterval(() => {
            setCurrentLine((prev) => {
                if (prev < lines.length - 1) {
                    return prev + 1;
                } else {
                    setIsComplete(true);
                    return prev;
                }
            });
        }, 1200);
        return () => clearInterval(interval);
    }, [isComplete, lines.length]);

    const handleRestart = () => {
        setCurrentLine(0);
        setIsComplete(false);
    };

    return (
        <div
            className="bg-black/60 rounded-xl border border-white/10 overflow-hidden backdrop-blur-sm cursor-pointer transition-colors hover:border-white/20"
            onMouseEnter={handleRestart}
        >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-zinc-900/80">
                <div className="w-3 h-3 rounded-full bg-zinc-600/50" />
                <div className="w-3 h-3 rounded-full bg-zinc-600/50" />
                <div className="w-3 h-3 rounded-full bg-zinc-600/50" />
                <span className="text-[10px] text-zinc-500 ml-2 font-mono uppercase tracking-wider">terminal</span>
            </div>
            <div className="p-4 font-mono text-xs space-y-1.5 min-h-[120px]">
                {lines.slice(0, currentLine + 1).map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex items-center gap-2 ${line.type === "command" ? "text-zinc-300" :
                            line.type === "success" ? "text-zinc-100" : "text-zinc-500"
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
        { name: "common", type: "folder", indent: 2 },
        { name: "layout", type: "folder", indent: 2 },
        { name: "pages", type: "folder", indent: 2 },
        { name: "lib", type: "folder", indent: 1 },
        { name: "app", type: "folder", indent: 1 },
        { name: "layout.tsx", type: "file", indent: 2 },
        { name: "page.tsx", type: "file", indent: 2 },
        { name: "about", type: "folder", indent: 1 },
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
                                <Folder className="w-3.5 h-3.5 text-zinc-400" />
                            </>
                        ) : (
                            <>
                                <span className="w-3" />
                                <FileCode className="w-3.5 h-3.5 text-zinc-500" />
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
            <dl className="space-y-2">
                {metrics.map((metric, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-between text-xs"
                    >
                        <dt className="text-zinc-500">{metric.label}</dt>
                        <dd className="flex items-center gap-2">
                            <span className="text-white font-mono font-medium">{metric.value}</span>
                            <span className="text-zinc-200 text-[10px] px-1.5 py-0.5 bg-white/10 rounded-md border border-white/20">{metric.status}</span>
                        </dd>
                    </motion.div>
                ))}
            </dl>
        </div>
    );
}

// ============================================
// MAIN COMPONENT
// ============================================
export function TechHighlights() {
    return (
        <section className="py-14 bg-black relative overflow-hidden">
            {/* Background subtle gradient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[--accent]/[0.03] rounded-full blur-[150px]" />
            </div>

            <div className="max-w-[1100px] mx-auto px-6 md:px-12 relative z-10">
                {/* Section Header - Aniq-UI Style */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="inline-block text-[10px] uppercase tracking-[0.4em] text-white/60 mb-4 font-semibold"
                    >
                        ✦ Top Features
                    </motion.span>
                    <BlurRevealText delay={0.1}>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tighter mb-4">
                            <span className="text-zinc-500">Designed for</span>{" "}
                            <span className="text-white">Developers</span>
                        </h2>
                    </BlurRevealText>
                    <p className="text-zinc-500 max-w-xl mx-auto text-sm leading-relaxed">
                        Expertly crafted components with a focus on delivering exceptional user experiences.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Lighthouse Performance - Large Card - Enhanced */}
                    <SpotlightBentoCard className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                                    <Zap className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Lighthouse Performance</h3>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                            {/* Detailed Scores */}
                            <ScoreCircle score={100} label="Performance" delay={0} />
                            <ScoreCircle score={100} label="Accessibility" delay={0.1} />
                            <ScoreCircle score={100} label="Best Practices" delay={0.2} />
                            <ScoreCircle score={100} label="SEO" delay={0.3} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/5">
                            <PerformanceMetrics />

                            {/* New: Data Viz - Response Times */}
                            <div className="space-y-3">
                                <h4 className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">Server Response (ms)</h4>
                                <div className="flex items-end justify-between h-24 gap-1.5 p-2 bg-black/40 rounded-lg border border-white/5">
                                    {[120, 85, 140, 90, 60, 45, 80, 50, 40, 70].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${h / 2}px` }}
                                            transition={{ delay: i * 0.05 }}
                                            className="w-full bg-zinc-700 hover:bg-white transition-colors rounded-sm relative group"
                                        >
                                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-white text-black text-[8px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                {h}ms
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </SpotlightBentoCard>

                    {/* Deployment Pipeline */}
                    <SpotlightBentoCard>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                <Terminal className="w-4 h-4 text-white" />
                            </div>
                            <h3 className="text-base font-semibold text-white">Deployment Pipeline</h3>
                        </div>
                        <TerminalCard />
                        {/* Pipeline Steps - aniq-ui style with checkmarks */}
                        <div className="mt-4 flex items-center justify-between">
                            {[
                                { name: "Prepare", completed: true },
                                { name: "Build", completed: true },
                                { name: "Deploy", completed: false, current: true, step: 3 },
                                { name: "Live", completed: false }
                            ].map((step, i) => (
                                <div key={step.name} className="flex flex-col items-center gap-1">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step.completed
                                        ? 'bg-white text-black'
                                        : step.current
                                            ? 'bg-white text-black'
                                            : 'bg-zinc-800 text-zinc-500 border border-zinc-700'
                                        }`}>
                                        {step.completed ? (
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : step.current ? (
                                            step.step
                                        ) : (
                                            i + 1
                                        )}
                                    </div>
                                    <span className={`text-[10px] ${step.completed || step.current ? 'text-white' : 'text-zinc-500'}`}>
                                        {step.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center justify-between mt-4 text-[10px] text-zinc-600 uppercase tracking-wider">
                            <span>CI/CD Pipeline</span>
                            <span>Automated Deployment</span>
                        </div>
                    </SpotlightBentoCard>

                    {/* Project Structure */}
                    <SpotlightBentoCard>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                <Folder className="w-4 h-4 text-white" />
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
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                <Server className="w-4 h-4 text-white" />
                            </div>
                            <h3 className="text-base font-semibold text-white">Resource Scaling</h3>
                        </div>

                        {/* Line Graph Container */}
                        <div className="border border-white/10 rounded-lg p-4 mb-4">
                            <p className="text-[10px] text-zinc-400 mb-2">Resource Usage (24h)</p>
                            <div className="relative h-16">
                                {/* Y-axis labels */}
                                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[8px] text-zinc-500 -ml-1">
                                    <span>100</span>
                                    <span>50</span>
                                    <span>0</span>
                                </div>
                                {/* Line chart SVG */}
                                <svg className="w-full h-full ml-4" viewBox="0 0 200 60" preserveAspectRatio="none">
                                    {/* Grid lines */}
                                    <line x1="0" y1="30" x2="200" y2="30" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                                    {/* Area fill */}
                                    <motion.path
                                        d="M0,45 Q25,35 50,40 T100,30 T150,35 T200,40 L200,60 L0,60 Z"
                                        fill="rgba(255,255,255,0.05)"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ duration: 0.8 }}
                                        viewport={{ once: true }}
                                    />
                                    {/* Line */}
                                    <motion.path
                                        d="M0,45 Q25,35 50,40 T100,30 T150,35 T200,40"
                                        fill="none"
                                        stroke="rgba(255,255,255,0.4)"
                                        strokeWidth="2"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        transition={{ duration: 1.2, ease: "easeOut" }}
                                        viewport={{ once: true }}
                                    />
                                </svg>
                                {/* X-axis labels */}
                                <div className="flex justify-between text-[8px] text-zinc-500 mt-1 ml-4">
                                    <span>00:00</span>
                                    <span>08:00</span>
                                    <span>16:00</span>
                                    <span>24:00</span>
                                </div>
                            </div>
                        </div>

                        {/* Active Servers Row */}
                        <div className="border border-white/10 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[10px] text-zinc-400">Active Servers</span>
                                <span className="text-xl font-bold text-white">3</span>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-10 h-10 bg-zinc-700 rounded-md" />
                                <div className="w-10 h-10 bg-zinc-700 rounded-md" />
                                <div className="w-10 h-10 bg-zinc-700 rounded-md" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-4 text-[10px] text-zinc-600 uppercase tracking-wider">
                            <span>Auto-scaling Platform</span>
                            <span>Handles Any Load</span>
                        </div>
                    </SpotlightBentoCard>

                    {/* Global Deployments */}
                    <SpotlightBentoCard>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                    <Globe className="w-4 h-4 text-white" />
                                </div>
                                <h3 className="text-base font-semibold text-white">Global Deployments</h3>
                            </div>
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-800/50 rounded-full border border-white/5">
                                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                                <span className="text-[10px] text-zinc-200 font-medium">Status</span>
                            </div>
                        </div>

                        {/* Dotted Globe Hemisphere */}
                        <div className="relative h-48 flex items-center justify-center overflow-hidden">
                            {/* Globe with dotted pattern */}
                            <motion.div
                                className="relative w-72 h-72"
                                animate={{ rotateY: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                <svg viewBox="0 0 200 100" className="w-full h-full opacity-60">
                                    {/* Generate dotted pattern for globe */}
                                    {Array.from({ length: 15 }).map((_, row) => (
                                        Array.from({ length: 30 }).map((_, col) => {
                                            const x = (col / 30) * 200;
                                            const y = (row / 15) * 100;
                                            // Create hemisphere curve effect
                                            const distFromCenter = Math.abs(x - 100) / 100;
                                            const curveY = y * (1 - distFromCenter * 0.3);
                                            // Deterministic opacity based on position to avoid hydration mismatch
                                            const seed = (row * 30 + col) % 7;
                                            const opacity = 0.3 + (seed / 7) * 0.4;
                                            return (
                                                <circle
                                                    key={`${row}-${col}`}
                                                    cx={x}
                                                    cy={curveY}
                                                    r={0.8}
                                                    fill={`rgba(255, 255, 255, ${opacity})`}
                                                />
                                            );
                                        })
                                    ))}
                                    {/* Highlight points (deployment locations) */}
                                    <circle cx="60" cy="40" r="3" fill="#22d3ee" />
                                    <circle cx="120" cy="35" r="3" fill="#22d3ee" />
                                    <circle cx="150" cy="50" r="3" fill="#22d3ee" />
                                    <circle cx="80" cy="60" r="3" fill="#22d3ee" />
                                    <circle cx="170" cy="45" r="3" fill="#22d3ee" />
                                </svg>
                            </motion.div>

                            {/* Stats overlay at bottom of globe */}
                            <div className="absolute bottom-0 left-0 right-0 flex gap-4 p-2">
                                <div className="bg-zinc-900/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
                                    <div className="text-lg font-bold text-white">1094</div>
                                    <div className="text-[9px] text-zinc-400 uppercase tracking-wider">Deployments</div>
                                </div>
                                <div className="bg-zinc-900/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
                                    <div className="text-lg font-bold text-white">99.8%</div>
                                    <div className="text-[9px] text-zinc-400 uppercase tracking-wider">Uptime</div>
                                </div>
                                <div className="bg-zinc-900/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
                                    <div className="text-lg font-bold text-white">8</div>
                                    <div className="text-[9px] text-zinc-400 uppercase tracking-wider">Regions</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-4 text-[10px] text-zinc-600 uppercase tracking-wider">
                            <span>Edge Network</span>
                            <span>Global Coverage</span>
                        </div>
                    </SpotlightBentoCard>
                </div>
            </div>
        </section>
    );
}

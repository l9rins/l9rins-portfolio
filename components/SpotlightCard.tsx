"use client";

import { motion, useMotionValue } from "framer-motion";
import { useRef, useState, MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { memo } from "react";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  glowColor?: string;
  id?: string;
  variant?: "default" | "glow" | "premium";
}

function SpotlightCardComponent({
  children,
  className,
  spotlightColor = "rgba(255, 107, 0, 0.15)",
  glowColor = "rgba(255, 107, 0, 0.12)",
  id,
  variant = "default",
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  const variantStyles = {
    default: {
      bg: "bg-[#0a0a0a]",
      border: "border-white/10 hover:border-[--accent]/40",
      glow: "0 0 60px rgba(255, 107, 0, 0.12)",
    },
    glow: {
      bg: "bg-gradient-to-br from-zinc-900/90 to-zinc-950/90",
      border: "border-[--accent]/20 hover:border-[--accent]/50",
      glow: "0 0 80px rgba(255, 107, 0, 0.2)",
    },
    premium: {
      bg: "bg-gradient-to-br from-zinc-900/80 via-zinc-900/60 to-zinc-950/80",
      border: "border-white/[0.08] hover:border-white/20",
      glow: "0 0 100px rgba(255, 107, 0, 0.15), 0 0 40px rgba(255, 107, 0, 0.08)",
    },
  };

  const styles = variantStyles[variant];

  return (
    <motion.div
      id={id}
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-3xl p-8",
        styles.bg,
        "border",
        styles.border,
        "transition-all duration-500 ease-out",
        "backdrop-blur-sm",
        "group",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
      whileHover={{ y: -4 }}
    >
      {/* Animated border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: styles.glow,
        }}
      />

      {/* Gradient border overlay */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: `linear-gradient(135deg, rgba(255, 107, 0, 0.1) 0%, transparent 50%, rgba(255, 107, 0, 0.05) 100%)`,
          }}
        />
      </div>

      {/* Spotlight gradient that follows mouse */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 40%)`,
        }}
      />

      {/* Top edge highlight */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255, 107, 0, 0.5), transparent)",
        }}
      />

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 rounded-3xl opacity-[0.015] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export const SpotlightCard = memo(SpotlightCardComponent);
export default SpotlightCard;
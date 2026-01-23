"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { User, Code, Briefcase, Mail } from "lucide-react";

interface DockItem {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
}

const dockItems: DockItem[] = [
  { icon: User, href: "#home", label: "Home" },
  { icon: Code, href: "#about", label: "About" },
  { icon: Briefcase, href: "#projects", label: "Projects" },
  { icon: Mail, href: "#contact", label: "Contact" },
];

export function MacDock() {
  const mouseX = useMotionValue(Infinity);
  const dockRef = useRef<HTMLDivElement>(null);

  return (
    <motion.nav
      ref={dockRef}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1, type: "spring", stiffness: 100 }}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-2xl"
      onMouseMove={(e) => {
        if (dockRef.current) {
          const rect = dockRef.current.getBoundingClientRect();
          mouseX.set(e.clientX - rect.left);
        }
      }}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      <div className="flex items-center gap-8">
        {dockItems.map((item, index) => (
          <DockIcon
            key={item.label}
            Icon={item.icon}
            href={item.href}
            mouseX={mouseX}
            index={index}
          />
        ))}
      </div>
    </motion.nav>
  );
}

interface DockIconProps {
  Icon: React.ComponentType<{ className?: string }>;
  href: string;
  mouseX: any;
  index: number;
}

function DockIcon({ Icon, href, mouseX, index }: DockIconProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      return Math.abs(val - centerX);
    }
    return Infinity;
  });

  const scale = useTransform(distance, [0, 100, 200], [1.5, 1.2, 1]);
  const y = useTransform(distance, [0, 100, 200], [-8, -4, 0]);

  return (
    <motion.a
      ref={ref}
      href={href}
      className="relative flex items-center justify-center w-10 h-10 rounded-full text-gray-400 hover:text-white transition-colors duration-200"
      style={{ scale, y }}
      whileHover={{ scale: 1.6, y: -12 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Icon className="w-5 h-5" />
    </motion.a>
  );
}
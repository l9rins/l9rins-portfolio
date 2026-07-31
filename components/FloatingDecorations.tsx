'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * FloatingDecorations - Clouds + airplane that float across the hero
 * Inspired by duyle.dev's floating illustrations
 */
export function FloatingDecorations() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]" aria-hidden="true">
      {/* Cloud 1 - top right, large */}
      <motion.div
        className="absolute -top-4 right-[10%] opacity-[0.08]"
        animate={{
          x: [0, 30, 0],
          y: [0, -8, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="w-32 h-12 bg-white/20 rounded-full blur-xl" />
      </motion.div>

      {/* Cloud 2 - top left, medium */}
      <motion.div
        className="absolute top-8 left-[5%] opacity-[0.05]"
        animate={{
          x: [0, -20, 0],
          y: [0, 6, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      >
        <div className="w-24 h-8 bg-white/15 rounded-full blur-lg" />
      </motion.div>

      {/* Cloud 3 - middle right, small */}
      <motion.div
        className="absolute top-[40%] right-[5%] opacity-[0.04]"
        animate={{
          x: [0, 15, 0],
          y: [0, -5, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      >
        <div className="w-16 h-6 bg-white/10 rounded-full blur-md" />
      </motion.div>

      {/* Airplane - flies across from left to right */}
      <motion.div
        className="absolute top-[15%] opacity-[0.12]"
        initial={{ x: '-5%', rotate: -5 }}
        animate={{
          x: ['-5%', '110%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
          delay: 3,
        }}
      >
        <div className="flex items-center gap-1">
          {/* Plane body */}
          <div className="w-4 h-1.5 bg-white rounded-full" />
          {/* Trail */}
          <div className="w-8 h-[1px] bg-gradient-to-r from-white/60 to-transparent" />
        </div>
      </motion.div>

      {/* Airplane 2 - slower, higher */}
      <motion.div
        className="absolute top-[60%] opacity-[0.06]"
        initial={{ x: '110%', rotate: -3 }}
        animate={{
          x: ['110%', '-5%'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
          delay: 8,
        }}
      >
        <div className="flex items-center gap-1 -scale-x-100">
          <div className="w-3 h-1 bg-white rounded-full" />
          <div className="w-6 h-[1px] bg-gradient-to-r from-white/40 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}

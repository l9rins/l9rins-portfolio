'use client';

import { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import Image from 'next/image';
import { RotateCcw } from 'lucide-react';

const photos = [
  { src: '/profile/1.png', alt: 'Mark Lorenz Barangan' },
  { src: '/profile/2.png', alt: 'Mark Lorenz Barangan' },
  { src: '/profile/3.png', alt: 'Mark Lorenz Barangan' },
];

/**
 * PhotoCarousel - Swipeable polaroid photos, Ted-style
 * Swipe left/right to go through photos. "Again" button at the end.
 */
export function PhotoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showAgain, setShowAgain] = useState(false);

  const isLast = currentIndex === photos.length - 1;

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      // Swiped left → next
      if (isLast) {
        setShowAgain(true);
      } else {
        setDirection(1);
        setCurrentIndex((prev) => prev + 1);
      }
    } else if (info.offset.x > threshold) {
      // Swiped right → prev
      if (showAgain) {
        setShowAgain(false);
      } else if (currentIndex > 0) {
        setDirection(-1);
        setCurrentIndex((prev) => prev - 1);
      }
    }
  };

  const handleAgain = () => {
    setDirection(-1);
    setCurrentIndex(0);
    setShowAgain(false);
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
      rotate: dir > 0 ? 15 : -15,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotate: 0,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -200 : 200,
      opacity: 0,
      rotate: dir > 0 ? -15 : 15,
      scale: 0.9,
    }),
  };

  return (
    <div className="relative w-full h-full min-h-[200px] flex items-center justify-center select-none">
      {/* Dot indicators */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {photos.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
              i === currentIndex ? 'bg-white' : 'bg-white/20'
            }`}
          />
        ))}
      </div>

      <AnimatePresence custom={direction} mode="wait">
        {showAgain ? (
          <motion.button
            key="again"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={handleAgain}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/15 bg-white/5 text-white text-xs font-medium hover:bg-white/10 hover:border-white/25 transition-all cursor-pointer"
            style={{ height: '240px', width: '180px', justifyContent: 'center' }}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Again
          </motion.button>
        ) : (
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              rotate: { duration: 0.3 },
              scale: { duration: 0.3 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.5}
            onDragEnd={handleDragEnd}
            className="w-[75%] max-w-[200px] rounded-lg overflow-hidden border border-white/[0.1] shadow-2xl cursor-grab active:cursor-grabbing relative"
            style={{ height: '240px' }}
          >
            <Image
              src={photos[currentIndex].src}
              alt={photos[currentIndex].alt}
              fill
              sizes="200px"
              className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

            {/* Swipe hint */}
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <span className="text-[8px] text-white/40 font-mono uppercase tracking-wider">
                {isLast ? 'swipe for again' : 'swipe →'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Photo counter */}
      {!showAgain && (
        <div className="absolute bottom-2 right-3 text-[9px] font-mono text-zinc-600">
          {currentIndex + 1}/{photos.length}
        </div>
      )}
    </div>
  );
}

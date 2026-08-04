'use client';

import { useEffect, memo } from 'react';
import { motion, stagger, useAnimate } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * TextGenerateEffect - Word-by-word blur-to-focus reveal animation.
 * Words appear from blurred to sharp with staggered timing.
 */
export const TextGenerateEffect = memo(function TextGenerateEffect({
  words,
  className,
  filter = true,
  duration = 0.8,
  speed = 0.15,
  initialDelay = 0,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  speed?: number;
  initialDelay?: number;
}) {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(' ').slice(0, 30);

  useEffect(() => {
    const timer = setTimeout(() => {
      animate(
        'span',
        {
          opacity: 1,
          filter: filter ? 'blur(0px)' : 'none',
        },
        {
          duration,
          delay: stagger(speed),
        }
      );
    }, initialDelay * 1000);

    return () => clearTimeout(timer);
  }, [scope.current, animate, duration, filter, speed, initialDelay]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => (
          <motion.span
            key={`${word}-${idx}`}
            className="inline-block opacity-0"
            style={{
              filter: filter ? 'blur(10px)' : 'none',
              fontSize: 'inherit',
            }}
          >
            {word}{' '}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <div className={cn('font-bold', className)}>
      <div className="mt-4">
        <div style={{ fontSize: 'inherit', willChange: 'transform' }}>
          {renderWords()}
        </div>
      </div>
    </div>
  );
});

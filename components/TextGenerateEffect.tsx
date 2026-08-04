'use client';

import { useEffect, useRef, memo } from 'react';
import { motion, stagger, useAnimate } from 'framer-motion';
import { cn } from '@/lib/utils';

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
  const hasAnimated = useRef(false);
  const wordsArray = words.split(' ').slice(0, 30);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn('font-bold', className)}>
      <div>
        <div style={{ fontSize: 'inherit' }}>
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
        </div>
      </div>
    </div>
  );
});

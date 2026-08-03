'use client';

import { useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import Image from 'next/image';
import { RotateCcw } from 'lucide-react';

interface Card {
  id: number;
  src: string;
  alt: string;
}

const initialCards: Card[] = [
  { id: 1, src: '/profile/1.png', alt: 'Mark Lorenz Barangan' },
  { id: 2, src: '/profile/2.png', alt: 'Mark Lorenz Barangan' },
  { id: 3, src: '/profile/3.png', alt: 'Mark Lorenz Barangan' },
];

export function PhotoCarousel() {
  const [cards, setCards] = useState<Card[]>(initialCards);

  const resetCards = () => setCards(initialCards);

  return (
    <div className="relative grid h-[233px] w-[175px] place-items-center mx-auto select-none">
      {/* Reset button when all cards swiped */}
      {cards.length === 0 && (
        <div style={{ gridRow: 1, gridColumn: 1 }} className="z-20">
          <button
            onClick={resetCards}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/15 bg-white/5 text-white text-xs font-medium hover:bg-white/10 hover:border-white/25 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Again
          </button>
        </div>
      )}

      {/* Stacked cards */}
      {cards.map((card, index) => {
        const depth = cards.length - 1 - index;
        return (
          <SwipeCard
            key={card.id}
            card={card}
            cards={cards}
            setCards={setCards}
            depth={depth}
          />
        );
      })}
    </div>
  );
}

function SwipeCard({
  card,
  cards,
  setCards,
  depth,
}: {
  card: Card;
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
  depth: number;
}) {
  const x = useMotionValue(0);

  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0]);

  const isFront = card.id === cards[cards.length - 1]?.id;

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : card.id % 2 ? 6 : -6;
    return `${rotateRaw.get() + offset}deg`;
  });

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (Math.abs(info.offset.x) > 100) {
      setCards((pv) => pv.filter((v) => v.id !== card.id));
    } else {
      animate(x, 0, { type: 'spring', stiffness: 400, damping: 40 });
    }
  };

  return (
    <motion.div
      className="absolute h-[233px] w-[175px] origin-bottom overflow-hidden rounded-lg hover:cursor-grab active:cursor-grabbing"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
        boxShadow: isFront
          ? '0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)'
          : undefined,
      }}
      animate={{
        scale: isFront ? 1 : Math.max(0.85, 0.94 - depth * 0.04),
      }}
      drag={isFront ? 'x' : false}
      dragConstraints={{ left: -150, right: 150, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
    >
      <Image
        src={card.src}
        alt={card.alt}
        width={175}
        height={233}
        sizes="175px"
        draggable={false}
        className="h-full w-full select-none object-cover"
        priority={isFront}
      />
    </motion.div>
  );
}

'use client';

import Image from 'next/image';

/**
 * FloatingDecorations - Clouds + airplane that float across the hero
 * Exact duyle.dev implementation: real webp images with CSS keyframe animations
 */
export function FloatingDecorations() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]" aria-hidden="true">
      {/* Cloud - top left, drifts slowly */}
      <div className="absolute -top-10 -left-10 animate-cloud">
        <Image
          src="/cloud.webp"
          alt=""
          width={390}
          height={347}
          draggable={false}
          className="w-64 h-auto opacity-[0.07] blur-[2px]"
          priority
        />
      </div>

      {/* Plane - flies from bottom-right to top-left */}
      <div className="absolute -right-20 -bottom-20 animate-plane">
        <Image
          src="/plane.webp"
          alt=""
          width={24}
          height={24}
          draggable={false}
          className="w-6 h-6 opacity-[0.15]"
        />
      </div>

      {/* Plane shadow - follows plane */}
      <div className="absolute -right-20 -bottom-20 animate-plane-shadow">
        <Image
          src="/plane-shadow.webp"
          alt=""
          width={24}
          height={24}
          draggable={false}
          className="w-6 h-6 opacity-[0.08]"
        />
      </div>
    </div>
  );
}

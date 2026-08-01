'use client';

/**
 * FloatingDecorations - Clouds + airplane that float across the hero
 * Uses plain <img> tags for decorative images (no next/image container clipping)
 */
export function FloatingDecorations() {
  return (
    <div className="absolute inset-0 overflow-visible pointer-events-none z-[1]" aria-hidden="true">
      {/* Cloud - top left, drifts slowly */}
      <img
        src="/cloud.webp"
        alt=""
        draggable={false}
        className="absolute top-0 -left-20 w-[400px] h-auto opacity-[0.12] blur-[1px] animate-cloud pointer-events-none select-none"
      />

      {/* Plane - flies from bottom-right to top-left */}
      <img
        src="/plane.webp"
        alt=""
        draggable={false}
        className="absolute top-1/4 -right-16 w-8 h-8 animate-plane pointer-events-none select-none"
      />

      {/* Plane shadow - follows plane */}
      <img
        src="/plane-shadow.webp"
        alt=""
        draggable={false}
        className="absolute top-1/4 -right-16 w-8 h-8 animate-plane-shadow pointer-events-none select-none"
      />
    </div>
  );
}

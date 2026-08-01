'use client';

/**
 * FloatingDecorations - Clouds + airplane that float across the hero
 * Uses plain <img> tags for decorative images (no next/image container clipping)
 */
export function FloatingDecorations() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]" aria-hidden="true">
      {/* Cloud - top left, drifts slowly */}
      <img
        src="/cloud.webp"
        alt=""
        draggable={false}
        className="absolute -top-10 -left-10 w-[320px] h-auto opacity-[0.06] blur-[2px] animate-cloud pointer-events-none select-none"
      />

      {/* Plane - flies from bottom-right to top-left */}
      <img
        src="/plane.webp"
        alt=""
        draggable={false}
        className="absolute -right-20 -bottom-20 w-6 h-6 animate-plane pointer-events-none select-none"
      />

      {/* Plane shadow - follows plane */}
      <img
        src="/plane-shadow.webp"
        alt=""
        draggable={false}
        className="absolute -right-20 -bottom-20 w-6 h-6 animate-plane-shadow pointer-events-none select-none"
      />
    </div>
  );
}

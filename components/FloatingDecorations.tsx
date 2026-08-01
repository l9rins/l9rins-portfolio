'use client';

/**
 * FloatingDecorations - Clouds + airplane that float across the viewport
 * duyle.dev inspired - large, visible, atmospheric decorations
 */
export function FloatingDecorations() {
  return (
    <div className="fixed inset-0 overflow-visible pointer-events-none z-[5]" aria-hidden="true">
      {/* Cloud 1 - large, top-left area, slow drift */}
      <img
        src="/cloud.webp"
        alt=""
        draggable={false}
        className="absolute -top-10 left-[5%] w-[500px] max-w-none h-auto opacity-[0.25] animate-cloud pointer-events-none select-none"
        style={{ filter: 'brightness(1.8) blur(1px)' }}
      />

      {/* Cloud 2 - smaller, right side, slower drift */}
      <img
        src="/cloud.webp"
        alt=""
        draggable={false}
        className="absolute top-[15%] right-[8%] w-[280px] max-w-none h-auto opacity-[0.15] animate-cloud pointer-events-none select-none"
        style={{ filter: 'brightness(1.5) blur(2px)', animationDuration: '30s', animationDelay: '5s' }}
      />

      {/* Plane - flies across viewport bottom-right to top-left */}
      <img
        src="/plane.webp"
        alt=""
        draggable={false}
        className="absolute top-[30%] -right-12 w-12 h-12 animate-plane pointer-events-none select-none"
      />

      {/* Plane shadow */}
      <img
        src="/plane-shadow.webp"
        alt=""
        draggable={false}
        className="absolute top-[30%] -right-12 w-12 h-12 animate-plane-shadow pointer-events-none select-none"
      />
    </div>
  );
}

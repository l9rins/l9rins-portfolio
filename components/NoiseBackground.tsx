'use client';

import { useEffect, useRef } from 'react';

/**
 * NoiseBackground - Subtle film grain texture overlay.
 * Generates noise once on a canvas, then uses CSS animation for the living effect.
 * Much more performant than re-rendering every frame.
 */
export function NoiseBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Generate noise once at lower resolution for performance
    const scale = 2;
    canvas.width = Math.floor(window.innerWidth / scale);
    canvas.height = Math.floor(window.innerHeight / scale);

    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const value = Math.random() * 255;
      data[i] = value;     // R
      data[i + 1] = value; // G
      data[i + 2] = value; // B
      data[i + 3] = 12;    // A — very subtle (~5% opacity)
    }

    ctx.putImageData(imageData, 0, 0);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1] noise-overlay"
      aria-hidden="true"
      style={{
        imageRendering: 'pixelated',
      }}
    />
  );
}

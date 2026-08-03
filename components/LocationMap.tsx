'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Map, Overlay } from 'pigeon-maps';

const darkProvider = (x: number, y: number, z: number) => {
  const s = 'abc'[Math.abs(x + y) % 3];
  return `https://${s}.basemaps.cartocdn.com/dark_all/${z}/${x}/${y}@2x.png`;
};

// Cebu coordinates
const CEBU: [number, number] = [10.3157, 123.9065];

// Fly-in config
const FLY_START_ZOOM = 3;
const FLY_END_ZOOM = 15;
const FLY_DURATION_MS = 3000;
const FLY_FRAME_MS = 16; // ~60fps

// Easing: cubic ease-out for smooth deceleration
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function LocationMap() {
  const [time, setTime] = useState('');
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Fly-in state
  const [zoom, setZoom] = useState(FLY_START_ZOOM);
  const [isAnimating, setIsAnimating] = useState(true);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Clock
  useEffect(() => {
    setMounted(true);
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
          timeZone: 'Asia/Manila',
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  // Fly-in animation
  useEffect(() => {
    if (!mounted) return;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / FLY_DURATION_MS, 1);
      const easedProgress = easeOutCubic(progress);

      const currentZoom = FLY_START_ZOOM + (FLY_END_ZOOM - FLY_START_ZOOM) * easedProgress;
      setZoom(currentZoom);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    // Small delay so the map renders first at zoom 3
    const timeout = setTimeout(() => {
      animationRef.current = requestAnimationFrame(animate);
    }, 300);

    return () => {
      clearTimeout(timeout);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [mounted]);

  // Dynamic scale for clouds/plane based on zoom (Duy's formula)
  const decorScale = Math.pow(1.5, zoom - 11);
  const cloudSize1 = 24 * decorScale;
  const cloudSize2 = 16 * decorScale;
  const planeSize = 5 * decorScale;

  return (
    <div
      className="relative w-full h-full min-h-[140px] rounded-xl overflow-hidden border border-white/[0.03] pigeon-map-container"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Map */}
      {mounted && (
        <Map
          center={CEBU}
          zoom={zoom}
          provider={darkProvider}
          mouseEvents={!isAnimating}
          touchEvents={!isAnimating}
          attribution={false}
          animate={false}
          zoomSnap={false}
          onBoundsChanged={({ zoom: newZoom }) => {
            if (!isAnimating) setZoom(newZoom);
          }}
        >
          <Overlay anchor={CEBU} offset={[6, 6]}>
            <div className="relative pointer-events-none">
              <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.6)] border-2 border-white/80" />
              <div className="absolute inset-0 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-30" />
            </div>
          </Overlay>
        </Map>
      )}

      {/* Interaction blocker during fly-in */}
      {isAnimating && (
        <div className="absolute inset-0 z-[20] cursor-default" />
      )}

      {/* Clouds - hide on hover, scale with zoom */}
      <div className={`absolute inset-0 pointer-events-none z-[1] transition-opacity duration-300 ${hovered ? 'opacity-0' : 'opacity-100'}`} aria-hidden="true">
        <img
          src="/cloud.webp"
          alt=""
          draggable={false}
          className="absolute -top-6 -left-8 h-auto opacity-[0.2] animate-cloud select-none"
          style={{
            width: `${cloudSize1}px`,
            filter: 'brightness(1.8) blur(1px)',
          }}
        />
        <img
          src="/cloud.webp"
          alt=""
          draggable={false}
          className="absolute top-[20%] -right-6 h-auto opacity-[0.12] animate-cloud select-none"
          style={{
            width: `${cloudSize2}px`,
            filter: 'brightness(1.5) blur(2px)',
            animationDuration: '30s',
            animationDelay: '5s',
          }}
        />
      </div>

      {/* Plane - hide on hover, scale with zoom */}
      <div className={`absolute inset-0 pointer-events-none z-[2] transition-opacity duration-300 ${hovered ? 'opacity-0' : 'opacity-100'}`} aria-hidden="true">
        <img
          src="/plane.webp"
          alt=""
          draggable={false}
          className="absolute top-[30%] -right-4 animate-plane select-none"
          style={{ width: `${planeSize}px`, height: `${planeSize}px` }}
        />
        <img
          src="/plane-shadow.webp"
          alt=""
          draggable={false}
          className="absolute top-[30%] -right-4 animate-plane-shadow select-none"
          style={{ width: `${planeSize}px`, height: `${planeSize}px` }}
        />
      </div>

      {/* Clock */}
      <div className="absolute top-2 right-2 z-10 px-2 py-1 rounded bg-black/60 backdrop-blur-sm border border-white/[0.08]">
        <span className="text-[9px] font-mono text-white/80 tracking-wider">{time}</span>
      </div>

      {/* Label */}
      <div className="absolute bottom-2 left-2 z-10">
        <p className="text-[8px] font-mono text-white/50 uppercase tracking-[0.15em]">Cebu, PH</p>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
}

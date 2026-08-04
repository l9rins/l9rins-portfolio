'use client';

import { useState, useEffect, useRef } from 'react';
import { Map, Overlay } from 'pigeon-maps';

const darkProvider = (x: number, y: number, z: number) => {
  const s = 'abc'[Math.abs(x + y) % 3];
  return `https://${s}.basemaps.cartocdn.com/dark_all/${z}/${x}/${y}@2x.png`;
};

const CEBU: [number, number] = [10.3157, 123.9065];

const FLY_START_ZOOM = 3;
const FLY_END_ZOOM = 12;
const FLY_DURATION_MS = 2500;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function LocationMap() {
  const [time, setTime] = useState('');
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [zoom, setZoom] = useState(FLY_START_ZOOM);
  const [isAnimating, setIsAnimating] = useState(true);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

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

  useEffect(() => {
    if (!mounted) return;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / FLY_DURATION_MS, 1);
      const easedProgress = easeOutCubic(progress);

      setZoom(FLY_START_ZOOM + (FLY_END_ZOOM - FLY_START_ZOOM) * easedProgress);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    const timeout = setTimeout(() => {
      animationRef.current = requestAnimationFrame(animate);
    }, 500);

    return () => {
      clearTimeout(timeout);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [mounted]);

  const decorScale = Math.min(Math.pow(1.5, zoom - 8), 1.8);
  const cloudSize1 = 50 * decorScale;
  const cloudSize2 = 35 * decorScale;
  const planeSize = 14 * decorScale;

  return (
    <div
      className="relative w-full h-full min-h-[140px] rounded-xl overflow-hidden border border-black pigeon-map-container"
      style={{ isolation: 'isolate' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Black base behind map */}
      <div className="absolute inset-0 bg-black" />

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
          <Overlay anchor={CEBU} offset={[7, 7]}>
            <div className="relative pointer-events-none">
              <div className="absolute -inset-1.5 bg-blue-500/20 rounded-full animate-ping" />
              <div
                className="w-3.5 h-3.5 rounded-full border-2 border-white"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #60a5fa, #3b82f6)',
                  boxShadow: '0 0 10px rgba(59,130,246,0.7), 0 0 20px rgba(59,130,246,0.3)',
                }}
              />
            </div>
          </Overlay>
        </Map>
      )}

      {/* Interaction blocker during fly-in */}
      {isAnimating && (
        <div className="absolute inset-0 z-[20] cursor-default" />
      )}

      {/* Clouds - on top of map, hide on hover */}
      <div className={`absolute inset-0 pointer-events-none z-10 transition-opacity duration-300 ${hovered ? 'opacity-0' : 'opacity-100'}`} aria-hidden="true">
        <img
          src="/cloud.webp"
          alt=""
          draggable={false}
          className="absolute -top-2 -left-4 h-auto opacity-40 animate-cloud select-none"
          style={{
            width: `${cloudSize1}px`,
            filter: 'brightness(0.8)',
          }}
        />
        <img
          src="/cloud.webp"
          alt=""
          draggable={false}
          className="absolute top-[20%] -right-2 h-auto opacity-25 animate-cloud select-none"
          style={{
            width: `${cloudSize2}px`,
            filter: 'brightness(0.7)',
            animationDuration: '30s',
            animationDelay: '5s',
          }}
        />
      </div>

      {/* Plane - on top of map, hide on hover */}
      <div className={`absolute inset-0 pointer-events-none z-10 transition-opacity duration-300 ${hovered ? 'opacity-0' : 'opacity-100'}`} aria-hidden="true">
        <img
          src="/plane.webp"
          alt=""
          draggable={false}
          className="absolute top-[20%] right-[15%] animate-plane select-none"
          style={{ width: `${planeSize}px`, height: `${planeSize}px`, opacity: 0.6 }}
        />
        <img
          src="/plane-shadow.webp"
          alt=""
          draggable={false}
          className="absolute top-[20%] right-[15%] animate-plane-shadow select-none"
          style={{ width: `${planeSize}px`, height: `${planeSize}px`, opacity: 0.3 }}
        />
      </div>

      {/* Clock */}
      <div className="absolute top-2.5 right-2.5 z-20 px-2 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/[0.08]">
        <span className="text-[9px] font-mono text-white/90 tracking-wider">{time}</span>
      </div>

      {/* Label */}
      <div className="absolute bottom-2.5 left-2.5 z-20">
        <p className="text-[8px] font-mono text-white/50 uppercase tracking-[0.15em]">Cebu, PH</p>
      </div>

      {/* Subtle vignette */}
      <div className="absolute inset-0 pointer-events-none z-20 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.3)_100%)]" />
    </div>
  );
}

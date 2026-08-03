'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Map, Overlay } from 'pigeon-maps';

const darkProvider = (x: number, y: number, z: number) => {
  const s = 'abc'[Math.abs(x + y) % 3];
  return `https://${s}.basemaps.cartocdn.com/dark_all/${z}/${x}/${y}@2x.png`;
};

const CEBU: [number, number] = [10.3157, 123.9065];

export function LocationMap() {
  const [time, setTime] = useState('');
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [zoom, setZoom] = useState(2);
  const [center, setCenter] = useState<[number, number]>([20, 0]);
  const [flying, setFlying] = useState(true);
  const frameRef = useRef<number>(0);

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

  // Fly-in animation: zoom 2 → 15, center from global → Cebu
  const flyIn = useCallback(() => {
    const duration = 3000;
    const start = performance.now();
    const startZoom = 2;
    const endZoom = 15;
    const startCenter: [number, number] = [20, 0];

    const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = ease(t);

      const newZoom = startZoom + (endZoom - startZoom) * eased;
      const newLat = startCenter[0] + (CEBU[0] - startCenter[0]) * eased;
      const newLng = startCenter[1] + (CEBU[1] - startCenter[1]) * eased;

      setZoom(newZoom);
      setCenter([newLat, newLng]);

      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setFlying(false);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(flyIn, 500);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frameRef.current);
    };
  }, [mounted, flyIn]);

  // Dynamic sizing based on zoom (duyle.dev approach)
  const planeSize = Math.round(24 * Math.pow(1.5, zoom - 11));
  const cloudOpacity = zoom > 11 && zoom < 14 ? 0.15 : 0;
  const planeOpacity = zoom > 11 && zoom < 14 ? 1 : 0;

  return (
    <div
      className="relative w-full h-full min-h-[140px] rounded-xl overflow-hidden border border-white/[0.03]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Black background behind map to cover pigeon-maps gray default */}
      <div className="absolute inset-0 bg-black" />

      {/* Map - draggable */}
      {mounted && (
        <Map
          center={center}
          zoom={zoom}
          provider={darkProvider}
          mouseEvents={!flying}
          touchEvents={!flying}
          attribution={false}
          animate={false}
          zoomSnap={false}
        >
          <Overlay anchor={CEBU} offset={[6, 6]}>
            <div className="relative pointer-events-none">
              <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.6)] border-2 border-white/80" />
              <div className="absolute inset-0 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-30" />
            </div>
          </Overlay>
        </Map>
      )}

      {/* Loading overlay - blocks interaction during fly-in */}
      {flying && (
        <div className="absolute inset-0 z-[5] cursor-default" />
      )}

      {/* Clouds - hide on hover, dynamic opacity based on zoom */}
      <div
        className={`absolute inset-0 pointer-events-none z-[1] transition-opacity duration-500 ${hovered ? 'opacity-0' : 'opacity-100'}`}
        data-hidden={flying}
        aria-hidden="true"
        style={{ opacity: flying ? 0 : undefined }}
      >
        <img
          src="/cloud.webp"
          alt=""
          draggable={false}
          className="absolute -top-6 -left-8 h-auto select-none"
          width={planeSize * 8}
          style={{
            opacity: cloudOpacity,
            filter: 'brightness(1.8) blur(1px)',
          }}
        />
        <img
          src="/cloud.webp"
          alt=""
          draggable={false}
          className="absolute top-[20%] -right-6 h-auto select-none"
          width={planeSize * 5}
          style={{
            opacity: cloudOpacity * 0.6,
            filter: 'brightness(1.5) blur(2px)',
            animationDuration: '30s',
            animationDelay: '5s',
          }}
        />
      </div>

      {/* Plane - hide on hover, dynamic size based on zoom */}
      <div
        className={`absolute inset-0 pointer-events-none z-[2] transition-opacity duration-500 ${hovered ? 'opacity-0' : 'opacity-100'}`}
        style={{ opacity: flying ? 0 : undefined }}
        aria-hidden="true"
      >
        <img
          src="/plane.webp"
          alt=""
          draggable={false}
          className="absolute top-[30%] -right-5 animate-plane select-none"
          width={planeSize}
          height={planeSize}
          style={{ opacity: planeOpacity }}
        />
        <img
          src="/plane-shadow.webp"
          alt=""
          draggable={false}
          className="absolute top-[30%] -right-5 animate-plane-shadow select-none"
          width={planeSize}
          height={planeSize}
          style={{ opacity: planeOpacity }}
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

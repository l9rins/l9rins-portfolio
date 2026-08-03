'use client';

import { useState, useEffect, useRef } from 'react';
import { Map } from 'pigeon-maps';

const darkProvider = (x: number, y: number, z: number) => {
  const s = 'abc'[Math.abs(x + y) % 3];
  return `https://${s}.basemaps.cartocdn.com/dark_all/${z}/${x}/${y}@2x.png`;
};

export function LocationMap() {
  const [time, setTime] = useState('');
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

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

  return (
    <div
      className="relative w-full h-full min-h-[140px] rounded-xl overflow-hidden border border-white/[0.06]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Map - draggable */}
      {mounted && (
        <Map
          center={[10.3157, 123.9065]}
          zoom={15}
          provider={darkProvider}
          mouseEvents={true}
          touchEvents={true}
          attribution={false}
          animate={false}
          zoomSnap={false}
        />
      )}

      {/* Blue pin - absolute positioned SIBLING of Map, not child.
          pigeon-maps internal transforms only affect its own children,
          so this stays centered in the card regardless of map drag. */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[10]">
        <div className="relative">
          <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.6)] border-2 border-white/80" />
          <div className="absolute inset-0 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-30" />
        </div>
      </div>

      {/* Clouds - hide on hover */}
      <div className={`absolute inset-0 pointer-events-none z-[1] transition-opacity duration-300 ${hovered ? 'opacity-0' : 'opacity-100'}`} aria-hidden="true">
        <img
          src="/cloud.webp"
          alt=""
          draggable={false}
          className="absolute -top-6 -left-8 w-[200px] h-auto opacity-[0.2] animate-cloud select-none"
          style={{ filter: 'brightness(1.8) blur(1px)' }}
        />
        <img
          src="/cloud.webp"
          alt=""
          draggable={false}
          className="absolute top-[20%] -right-6 w-[120px] h-auto opacity-[0.12] animate-cloud select-none"
          style={{ filter: 'brightness(1.5) blur(2px)', animationDuration: '30s', animationDelay: '5s' }}
        />
      </div>

      {/* Plane - hide on hover */}
      <div className={`absolute inset-0 pointer-events-none z-[2] transition-opacity duration-300 ${hovered ? 'opacity-0' : 'opacity-100'}`} aria-hidden="true">
        <img
          src="/plane.webp"
          alt=""
          draggable={false}
          className="absolute top-[30%] -right-4 w-5 h-5 animate-plane select-none"
        />
        <img
          src="/plane-shadow.webp"
          alt=""
          draggable={false}
          className="absolute top-[30%] -right-4 w-5 h-5 animate-plane-shadow select-none"
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

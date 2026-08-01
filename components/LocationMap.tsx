'use client';

import { useState, useEffect } from 'react';
import { Map } from 'pigeon-maps';

/**
 * Custom dark tile provider using CartoDB dark matter tiles
 * with labels/roads for better street visibility
 */
const darkProvider = (x: number, y: number, z: number) => {
  const s = 'abc'[Math.abs(x + y) % 3];
  return `https://${s}.basemaps.cartocdn.com/dark_all/${z}/${x}/${y}@2x.png`;
};

/**
 * LocationMap - Dark styled interactive map with live clock
 * Uses pigeon-maps with CartoDB dark tiles (no API key needed)
 */
export function LocationMap() {
  const [time, setTime] = useState('');
  const [mounted, setMounted] = useState(false);

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
    <div className="relative w-full h-full min-h-[140px] rounded-xl overflow-hidden border border-white/[0.06] group">
      {/* Dark map */}
      {mounted && (
        <Map
          center={[10.3157, 123.9065]}
          zoom={15}
          provider={darkProvider}
          mouseEvents={true}
          touchEvents={true}
          attribution={false}
          animate={true}
          zoomSnap={false}
          metaWheelZoom={false}
          boxClassname="!w-full !h-full"
        />
      )}

      {/* Pulsing location dot - ALWAYS stays fixed, not affected by map drag */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <div className="relative">
          <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.6)] border-2 border-white/80" />
          <div className="absolute inset-0 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-30" />
        </div>
      </div>

      {/* Live clock - top right */}
      <div className="absolute top-2 right-2 z-10 px-2 py-1 rounded bg-black/60 backdrop-blur-sm border border-white/[0.08]">
        <span className="text-[9px] font-mono text-white/80 tracking-wider">{time}</span>
      </div>

      {/* Label - bottom left */}
      <div className="absolute bottom-2 left-2 z-10">
        <p className="text-[8px] font-mono text-white/50 uppercase tracking-[0.15em]">Cebu, PH</p>
      </div>

      {/* Vignette overlay for depth */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
}

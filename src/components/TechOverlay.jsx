import React, { useState, useEffect } from 'react';
import { Activity, Wifi, Disc, Compass } from 'lucide-react';

export default function TechOverlay() {
  const [fps, setFps] = useState(60);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const updateFPS = () => {
      frameCount++;
      const now = performance.now();
      if (now >= lastTime + 1000) {
        setFps(Math.min(60, Math.round((frameCount * 1000) / (now - lastTime))));
        frameCount = 0;
        lastTime = now;
      }
      requestAnimationFrame(updateFPS);
    };

    const animId = requestAnimationFrame(updateFPS);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden font-mono text-[10px] select-none text-slate-400">
      
      {/* TOP LEFT TECH HUD */}
      <div className="absolute top-24 left-6 hidden lg:flex items-center gap-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
        <div className="flex items-center gap-1 text-[#ff5500]">
          <Activity className="w-3 h-3 animate-pulse" />
          <span className="font-bold">{fps} FPS</span>
        </div>
        <span className="text-white/20">|</span>
        <span className="text-slate-300">ACTIVE THEORY CORE v2.4</span>
        <span className="text-white/20">|</span>
        <span className="text-cyan-400 font-semibold">28.4704° N, 16.2501° W</span>
      </div>

      {/* TOP RIGHT TECH LINES */}
      <div className="absolute top-24 right-6 hidden lg:flex flex-col items-end gap-1">
        <div className="flex items-center gap-2 text-slate-400 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          <Wifi className="w-3 h-3 text-emerald-400" />
          <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-400">STUDIO NODES ACTIVE</span>
        </div>
        <div className="flex items-center gap-1.5 text-[9px] text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500]"></span>
          <span>SANTA CRUZ</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          <span>TABAIBA BAJA</span>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
          <span>TATTOO TRUCK</span>
        </div>
      </div>

      {/* BOTTOM LEFT AUDIO FREQUENCY BARS */}
      <div className="absolute bottom-6 left-6 hidden md:flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/10">
        <Disc className="w-3.5 h-3.5 text-[#ff5500] animate-spin" style={{ animationDuration: '6s' }} />
        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-300">AUDIO ENGINE</span>
        <div className="flex items-end gap-0.5 h-3 ml-2">
          {[40, 80, 60, 100, 70, 90, 50, 85, 95, 30].map((h, idx) => (
            <span
              key={idx}
              className="w-1 bg-[#ff5500] rounded-full animate-pulse"
              style={{
                height: `${h}%`,
                animationDuration: `${0.4 + idx * 0.15}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* BOTTOM RIGHT HUD TARGET CROSSHAIR */}
      <div className="absolute bottom-6 right-6 hidden md:flex items-center gap-2 text-slate-500">
        <Compass className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '12s' }} />
        <span className="tracking-widest uppercase">TENERIFE • CANARIAS</span>
      </div>

      {/* CORNER HUD BRACKETS */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#ff5500]/30 pointer-events-none" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#ff5500]/30 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#ff5500]/30 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#ff5500]/30 pointer-events-none" />

    </div>
  );
}

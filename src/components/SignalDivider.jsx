import React from 'react';

/**
 * "Signal convergence" — the transition from the reviews wall into the
 * footer. Echoes the TechOverlay HUD's "STUDIO NODES ACTIVE" legend: the
 * same orange (Santa Cruz) / cyan (Tabaiba) signals that have been blinking
 * in the corner the whole visit finally meet in one point. Purely
 * decorative, so it's aria-hidden; the moving pulses are SMIL (cheap, no
 * JS) and sit in a reduced-motion-only group so they can be switched off
 * without touching the static glow.
 */
export default function SignalDivider({ language }) {
  const isEs = language === 'es';

  return (
    <div className="relative py-4 sm:py-8 overflow-hidden select-none" aria-hidden="true">
      <svg
        viewBox="0 0 1200 220"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-[150px] sm:h-[200px] lg:h-[220px] block"
      >
        <defs>
          <linearGradient id="wireLeft" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff5500" stopOpacity="0" />
            <stop offset="100%" stopColor="#ff5500" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="wireRight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0" />
            <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.55" />
          </linearGradient>
          <radialGradient id="convergeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff2e0" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#ff8a00" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
          </radialGradient>
          <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* slow-rotating starburst behind the convergence point */}
        <g style={{ transformOrigin: '600px 168px', animation: 'signal-spin 24s linear infinite' }} opacity="0.35">
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1="600" y1="168"
              x2={600 + Math.cos((i * Math.PI) / 4) * 46}
              y2={168 + Math.sin((i * Math.PI) / 4) * 46}
              stroke="#ffb27a"
              strokeWidth="1"
            />
          ))}
        </g>

        {/* the two wires */}
        <path id="wireL" d="M 0 26 C 300 26, 470 150, 600 168" fill="none" stroke="url(#wireLeft)" strokeWidth="1.5" />
        <path id="wireR" d="M 1200 26 C 900 26, 730 150, 600 168" fill="none" stroke="url(#wireRight)" strokeWidth="1.5" />

        {/* relay nodes along each wire */}
        <circle cx="180" cy="30" r="2.5" fill="#ff5500" opacity="0.6" />
        <circle cx="380" cy="70" r="2.5" fill="#ff5500" opacity="0.6" />
        <circle cx="1020" cy="30" r="2.5" fill="#00f0ff" opacity="0.6" />
        <circle cx="820" cy="70" r="2.5" fill="#00f0ff" opacity="0.6" />

        {/* convergence glow + core */}
        <circle cx="600" cy="168" r="42" fill="url(#convergeGlow)" filter="url(#softBlur)" className="signal-glow" />
        <circle cx="600" cy="168" r="4.5" fill="#fff8ef" className="signal-core" />

        {/* travelling signal pulses — hidden under prefers-reduced-motion */}
        <g className="signal-pulses">
          <circle r="3.5" fill="#ffb27a" filter="url(#softBlur)">
            <animateMotion dur="3.4s" repeatCount="indefinite" begin="0s">
              <mpath href="#wireL" />
            </animateMotion>
          </circle>
          <circle r="3" fill="#ff8a3d" filter="url(#softBlur)">
            <animateMotion dur="3.4s" repeatCount="indefinite" begin="1.7s">
              <mpath href="#wireL" />
            </animateMotion>
          </circle>
          <circle r="3.5" fill="#7be9f7" filter="url(#softBlur)">
            <animateMotion dur="3.8s" repeatCount="indefinite" begin="0.4s">
              <mpath href="#wireR" />
            </animateMotion>
          </circle>
          <circle r="3" fill="#3ad4e8" filter="url(#softBlur)">
            <animateMotion dur="3.8s" repeatCount="indefinite" begin="2.1s">
              <mpath href="#wireR" />
            </animateMotion>
          </circle>
        </g>
      </svg>

      <div className="absolute inset-x-0 bottom-1 sm:bottom-3 flex justify-center">
        <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-slate-500">
          {isEs ? 'Santa Cruz + Tabaiba Baja · una sola firma' : 'Santa Cruz + Tabaiba Baja · one signature'}
        </span>
      </div>
    </div>
  );
}

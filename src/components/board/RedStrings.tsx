'use client';

import React, { useEffect, useState } from 'react';

export function RedStrings() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Glow filter for Electric Blue / White Threads */}
        <filter id="blueStringGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#00D9FF" floodOpacity="0.75" />
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#000000" floodOpacity="0.9" />
        </filter>
        <linearGradient id="threadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D9FF" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#0088FF" />
        </linearGradient>
      </defs>

      {/* Electric Blue & White Investigation Connection Lines */}
      <g filter="url(#blueStringGlow)">
        {/* String 1: Hero to Problem Note */}
        <path
          d="M 50% 180 C 42% 380, 25% 420, 22% 580"
          fill="none"
          stroke="url(#threadGradient)"
          strokeWidth="2"
          strokeDasharray="5 2"
          className="opacity-85"
        />

        {/* String 2: Hero to How It Works Flow */}
        <path
          d="M 50% 180 C 62% 350, 78% 440, 78% 620"
          fill="none"
          stroke="url(#threadGradient)"
          strokeWidth="2.2"
          strokeLinecap="round"
          className="opacity-90"
        />

        {/* String 3: How it Works to Recent Scams Feed */}
        <path
          d="M 78% 850 C 65% 1050, 40% 1150, 32% 1320"
          fill="none"
          stroke="url(#threadGradient)"
          strokeWidth="1.8"
          strokeDasharray="6 2"
          className="opacity-80"
        />

        {/* String 4: Recent Scams to Live Stats Note */}
        <path
          d="M 32% 1520 C 45% 1650, 60% 1720, 68% 1840"
          fill="none"
          stroke="url(#threadGradient)"
          strokeWidth="2"
          className="opacity-85"
        />

        {/* String 5: Live Stats to Report Form */}
        <path
          d="M 68% 2050 C 50% 2180, 35% 2240, 30% 2380"
          fill="none"
          stroke="url(#threadGradient)"
          strokeWidth="2.2"
          className="opacity-90"
        />

        {/* String 6: Report Form to Emergency Hotline */}
        <path
          d="M 30% 2600 C 42% 2720, 65% 2780, 70% 2920"
          fill="none"
          stroke="url(#threadGradient)"
          strokeWidth="2"
          strokeDasharray="5 2"
          className="opacity-80"
        />
      </g>
    </svg>
  );
}

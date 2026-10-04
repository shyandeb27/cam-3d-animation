'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isScamTarget, setIsScamTarget] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('button') ||
          target.closest('a') ||
          target.closest('[data-note]') ||
          target.closest('input') ||
          target.closest('textarea')
        );
        setIsHovered(isInteractive);

        const isScam = Boolean(target.closest('[data-scam="true"]'));
        setIsScamTarget(isScam);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Magnifying Glass Reticle (Strictly Black, Dark Blue, White) */}
      <motion.div
        animate={{
          x: pos.x - 20,
          y: pos.y - 20,
          scale: isHovered ? 1.3 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 400,
          mass: 0.25,
        }}
        className="relative w-10 h-10 flex items-center justify-center"
      >
        {/* Glass lens rim */}
        <div
          className={`w-8 h-8 rounded-full border-2 transition-colors duration-200 flex items-center justify-center backdrop-blur-[1px] shadow-lg ${
            isScamTarget
              ? 'border-cyan-400 bg-cyan-950/40 shadow-[0_0_20px_rgba(0,217,255,0.7)]'
              : isHovered
              ? 'border-white bg-blue-950/40 shadow-[0_0_15px_rgba(255,255,255,0.4)]'
              : 'border-zinc-500/70 bg-black/40'
          }`}
        >
          {/* Crosshair Dot */}
          <div
            className={`w-1 h-1 rounded-full transition-colors ${
              isScamTarget ? 'bg-cyan-300 animate-ping' : 'bg-white'
            }`}
          />
        </div>

        {/* Magnifier Handle */}
        <div
          className={`absolute bottom-0 right-0 w-3 h-1 rounded-full origin-top-left rotate-45 transition-colors ${
            isScamTarget ? 'bg-cyan-400' : 'bg-zinc-400'
          }`}
        />

        {/* Dynamic Threat Tag */}
        {isScamTarget && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-blue-950 border border-cyan-400 text-cyan-300 font-mono text-[9px] font-bold uppercase tracking-wider shadow-md whitespace-nowrap"
          >
            FLAGGED EVIDENCE
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

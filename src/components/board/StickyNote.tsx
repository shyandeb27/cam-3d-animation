'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PinAndTape } from './PinAndTape';
import { useAppStore } from '@/store/useAppStore';
import { sounds } from '@/components/audio/soundEffects';

export interface StickyNoteProps {
  id?: string;
  color?: 'yellow' | 'cyan' | 'red' | 'emerald' | 'charcoal';
  rotation?: number; // degrees
  pinType?: 'red-pin' | 'blue-pin' | 'tape-top' | 'tape-corners' | 'none';
  className?: string;
  isScam?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export function StickyNote({
  id,
  color = 'charcoal',
  rotation = -2,
  pinType = 'blue-pin',
  className = '',
  isScam = false,
  onClick,
  children,
}: StickyNoteProps) {
  const { isMuted } = useAppStore();

  // STRICT 3-COLOR SYSTEM: Pure Black, Dark Blue, and Crisp White
  const colorStyles = {
    yellow: {
      bg: 'bg-[#080d1a]/95 hover:bg-[#0c1426] text-white border-blue-500/35',
      glow: 'hover:shadow-[0_20px_45px_rgba(0,217,255,0.2)]',
      accent: 'text-cyan-300',
      badge: 'bg-blue-950/80 text-cyan-300 border-cyan-500/40',
    },
    cyan: {
      bg: 'bg-[#061224]/95 hover:bg-[#0a1a33] text-white border-cyan-500/40',
      glow: 'hover:shadow-[0_20px_45px_rgba(0,217,255,0.25)]',
      accent: 'text-cyan-300',
      badge: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50',
    },
    red: {
      bg: 'bg-[#070b16]/95 hover:bg-[#0b1222] text-white border-blue-400/40',
      glow: 'hover:shadow-[0_20px_45px_rgba(0,136,255,0.25)]',
      accent: 'text-cyan-300',
      badge: 'bg-blue-950/90 text-cyan-200 border-cyan-500/40',
    },
    emerald: {
      bg: 'bg-[#050e1f]/95 hover:bg-[#09162e] text-white border-cyan-500/35',
      glow: 'hover:shadow-[0_20px_45px_rgba(0,217,255,0.22)]',
      accent: 'text-cyan-300',
      badge: 'bg-blue-950/80 text-cyan-300 border-cyan-500/40',
    },
    charcoal: {
      bg: 'bg-[#050811]/95 hover:bg-[#080d1c] text-white border-zinc-800 hover:border-cyan-500/40',
      glow: 'hover:shadow-[0_20px_45px_rgba(0,0,0,0.85)]',
      accent: 'text-zinc-200',
      badge: 'bg-black text-zinc-300 border-zinc-800',
    },
  }[color];

  const handleMouseEnter = () => {
    if (!isMuted) {
      sounds.playPaperNote();
    }
  };

  return (
    <motion.div
      id={id}
      data-note="true"
      data-scam={isScam ? 'true' : 'false'}
      initial={{ opacity: 0, y: 35, scale: 0.96 }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: 'spring',
          damping: 22,
          stiffness: 150,
          mass: 0.8,
        },
      }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{
        scale: 1.025,
        rotate: rotation * 0.45,
        y: -7,
        zIndex: 30,
        transition: { duration: 0.22, ease: 'easeOut' },
      }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      style={{
        rotate: `${rotation}deg`,
        transformOrigin: 'top center',
      }}
      className={`relative p-6 sm:p-7 rounded-2xl border paper-drop-shadow hover:paper-drop-shadow-hover backdrop-blur-xl transition-all duration-300 ${
        colorStyles.bg
      } ${colorStyles.glow} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Pushpin / Tape attachment */}
      <PinAndTape type={pinType} />

      {/* Subtle Blue Grid Fiber Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#00d9ff_1px,transparent_1px)] [background-size:18px_18px] opacity-[0.035] pointer-events-none rounded-2xl" />

      {/* Top subtle paper edge bevel highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';

export function TransitionFlash() {
  const { isTransitioning, scene } = useAppStore();

  const showFlash = isTransitioning || scene === 'transitioning';

  return (
    <AnimatePresence>
      {showFlash && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden"
        >
          {/* Intense Radial Light Warp (Pure White & Dark Blue) */}
          <div className="absolute inset-0 bg-gradient-radial from-white via-cyan-300/80 to-[#0055FF]/60 mix-blend-screen animate-pulse" />

          {/* Flash Solid Layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.8, 0] }}
            transition={{ duration: 1.1, times: [0, 0.3, 0.7, 1] }}
            className="absolute inset-0 bg-white"
          />

          {/* Shockwave Rings */}
          <motion.div
            initial={{ scale: 0.2, opacity: 1 }}
            animate={{ scale: 3.5, opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="w-96 h-96 rounded-full border-4 border-cyan-400 shadow-[0_0_80px_rgba(0,217,255,1)]"
          />

          {/* Zoom streaks */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-400/40 via-blue-950/30 to-black backdrop-blur-xl" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

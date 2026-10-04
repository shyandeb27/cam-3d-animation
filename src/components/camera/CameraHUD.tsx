'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { sounds } from '@/components/audio/soundEffects';
import { Shield, Sparkles, Volume2, VolumeX, ArrowDown, ChevronRight, Eye, Radio, Crosshair, Zap } from 'lucide-react';

export function CameraHUD() {
  const {
    openProgress,
    setOpenProgress,
    triggerFlyThrough,
    isMuted,
    toggleMute,
    isTransitioning,
  } = useAppStore();

  const fStopValue = (16.0 - openProgress * 14.8).toFixed(1);
  const percentage = Math.round(openProgress * 100);

  const handleSkip = () => {
    if (!isMuted) {
      sounds.playShutterSnap();
      sounds.playFlyThroughWhoosh();
    }
    triggerFlyThrough();
  };

  const handleOpenStep = () => {
    const next = Math.min(1, openProgress + 0.35);
    setOpenProgress(next);
    if (!isMuted) sounds.playApertureTick(next);
    if (next >= 1) {
      setTimeout(() => {
        handleSkip();
      }, 150);
    }
  };

  return (
    <div
      className={`absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6 sm:p-8 md:p-10 transition-opacity duration-500 ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between w-full">
        {/* Brand Logo & Telemetry */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-b from-cyan-500/20 to-blue-900/40 border border-cyan-500/40 text-cyan-300 shadow-[0_0_25px_rgba(0,217,255,0.3)] backdrop-blur-xl">
            <Shield className="w-5 h-5 text-cyan-300 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(0,217,255,1)]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] tracking-widest text-cyan-300 uppercase font-bold flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-950/70 border border-cyan-500/40">
                <Radio className="w-2.5 h-2.5 text-cyan-400 animate-pulse" /> SURVEILLANCE ACTIVE
              </span>
              <span className="text-zinc-600 text-xs">•</span>
              <span className="font-mono text-[10px] text-zinc-400">SENSOR v4.9</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white font-display flex items-center gap-1.5 mt-0.5">
              <span className="text-gradient-silver">SCAM</span>
              <span className="text-gradient-cyan">SHIELD</span>
            </h1>
          </div>
        </div>

        {/* Top Controls */}
        <div className="pointer-events-auto flex items-center gap-2.5 sm:gap-3.5">
          <button
            onClick={toggleMute}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/80 border border-zinc-800 text-zinc-300 hover:text-white hover:border-cyan-500/50 hover:bg-zinc-900/90 backdrop-blur-xl transition-all text-xs font-mono shadow-md"
            title={isMuted ? 'Unmute SFX' : 'Mute SFX'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-zinc-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
            )}
            <span className="hidden sm:inline font-bold">{isMuted ? 'SFX OFF' : 'AUDIO ON'}</span>
          </button>

          <button
            onClick={handleSkip}
            className="group flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-blue-950/60 via-black to-blue-900/60 hover:from-blue-900/80 hover:to-cyan-900/80 border border-cyan-500/40 hover:border-cyan-300 text-white font-mono text-xs font-bold tracking-wider transition-all backdrop-blur-xl shadow-[0_0_20px_rgba(0,217,255,0.2)] hover:scale-105 active:scale-95"
          >
            <span className="text-gradient-silver">ENTER DOSSIER BOARD</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-cyan-400" />
          </button>
        </div>
      </div>

      {/* Center Viewfinder Optical Telemetry */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[340px] h-[340px] md:w-[480px] md:h-[480px] rounded-full border border-cyan-500/20 flex items-center justify-center">
          {/* Segmented Dashed Compass Ring */}
          <div
            className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/30 transition-transform duration-300"
            style={{ transform: `rotate(${openProgress * 180}deg)` }}
          />

          {/* Precision Reticle Marks */}
          <div className="absolute -top-4 -left-4 w-7 h-7 border-t-2 border-l-2 border-cyan-400/80" />
          <div className="absolute -top-4 -right-4 w-7 h-7 border-t-2 border-r-2 border-cyan-400/80" />
          <div className="absolute -bottom-4 -left-4 w-7 h-7 border-b-2 border-l-2 border-cyan-400/80" />
          <div className="absolute -bottom-4 -right-4 w-7 h-7 border-b-2 border-r-2 border-cyan-400/80" />

          {/* Crosshair Laser Lines */}
          <div className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" />
          <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

          {/* Central Target Ring with Dynamic Scale */}
          <div
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-cyan-400/50 flex items-center justify-center transition-all duration-300 backdrop-blur-[0.5px]"
            style={{
              transform: `scale(${0.75 + openProgress * 0.7})`,
              borderColor: openProgress > 0.85 ? '#00D9FF' : 'rgba(0,217,255,0.6)',
              boxShadow:
                openProgress > 0.85
                  ? '0 0 35px rgba(0,217,255,0.8), inset 0 0 20px rgba(0,217,255,0.4)'
                  : '0 0 25px rgba(0,217,255,0.35), inset 0 0 15px rgba(0,217,255,0.2)',
            }}
          >
            <div
              className="w-2.5 h-2.5 rounded-full transition-all duration-300 bg-cyan-400"
              style={{
                transform: `scale(${1 + openProgress * 3.5})`,
                boxShadow: '0 0 10px rgba(0,217,255,1)',
              }}
            />
          </div>

          {/* Top-Left Telemetry Box */}
          <div className="absolute top-6 left-8 font-mono text-[10px] md:text-xs text-cyan-300 tracking-wider flex flex-col gap-1 p-2.5 rounded-xl bg-black/80 border border-cyan-500/30 backdrop-blur-md">
            <div className="flex items-center gap-1.5 font-bold text-white">
              <Crosshair className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              <span>50MM OPTICAL ZOOM</span>
            </div>
            <div className="text-zinc-300">
              APERTURE: <strong className="text-cyan-400 font-bold text-xs">f/{fStopValue}</strong>
            </div>
            <div className="text-zinc-500 text-[9px]">EXPOSURE // 1/2500s • ISO 80</div>
          </div>

          {/* Bottom-Right Telemetry Box */}
          <div className="absolute bottom-6 right-8 font-mono text-[10px] md:text-xs text-right flex flex-col gap-0.5 p-2.5 rounded-xl bg-black/80 border border-cyan-500/30 backdrop-blur-md">
            <div className="text-zinc-400 font-bold">LENS ROTATION & IRIS</div>
            <div className="text-lg md:text-xl font-black text-white font-mono">
              <span className="text-cyan-400">{percentage}%</span>
            </div>
            <div className="text-[9px] font-bold text-cyan-300">
              {openProgress > 0.85 ? '⚡ READY FOR FLY-THROUGH' : 'ROTATING BARREL'}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Interactive Controls */}
      <div className="w-full flex flex-col items-center gap-4">
        {/* Interaction Glass Pill */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="pointer-events-auto flex flex-col sm:flex-row items-center gap-3.5 p-3 sm:px-6 sm:py-3 rounded-2xl bg-black/90 border border-zinc-800 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.9)] ring-1 ring-cyan-500/20"
        >
          <div className="flex items-center gap-2.5 text-xs font-mono text-cyan-200">
            <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/60 flex items-center justify-center animate-bounce shadow-[0_0_10px_rgba(0,217,255,0.4)]">
              <ArrowDown className="w-3.5 h-3.5 text-cyan-300" />
            </div>
            <span className="font-medium">Scroll down or drag cursor downward to rotate lens & open iris</span>
          </div>

          <div className="hidden sm:block w-[1px] h-5 bg-zinc-800" />

          {/* Quick interactive buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenStep}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-200 text-xs font-mono font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_12px_rgba(0,217,255,0.2)]"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>Rotate Step (+35%)</span>
            </button>

            <button
              onClick={handleSkip}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-cyan-400/60 text-white text-xs font-mono font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(0,217,255,0.3)]"
            >
              <Zap className="w-3.5 h-3.5 text-cyan-300" />
              <span>Fly Through</span>
            </button>
          </div>
        </motion.div>

        {/* Dilation Status Bar */}
        <div className="w-full max-w-lg flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-[11px] font-mono">
            <span className="text-zinc-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> OPTICAL CORE DILATION
            </span>
            <span className="text-cyan-400 font-bold tracking-wider">{percentage}% READY</span>
          </div>
          <div className="w-full h-2 rounded-full bg-black border border-zinc-800 overflow-hidden relative p-[1px]">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-900 via-blue-500 to-cyan-400 rounded-full shadow-[0_0_15px_rgba(0,217,255,0.8)]"
              style={{ width: `${percentage}%` }}
              transition={{ ease: 'easeOut', duration: 0.15 }}
            />
          </div>
        </div>

        {/* Keyboard hints */}
        <div className="text-[11px] font-mono text-zinc-500 text-center flex items-center gap-3">
          <span>PRESS <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">ENTER</kbd> OR <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">SPACE</kbd> TO DIVE</span>
          <span>•</span>
          <span className="text-zinc-400">UNCOVER THE CASE FILES</span>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Camera, Volume2, VolumeX, Menu, X, PlusCircle } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { sounds } from '@/components/audio/soundEffects';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isMuted, toggleMute, resetToCamera } = useAppStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReturnCamera = () => {
    if (!isMuted) sounds.playFlyThroughWhoosh();
    resetToCamera();
  };

  const navLinks = [
    { label: 'Case Dossier', href: '#hero-note' },
    { label: 'The Problem', href: '#problem-note' },
    { label: '4-Phase Protocol', href: '#how-it-works' },
    { label: 'AI Scanner', href: '#scam-scanner' },
    { label: 'Evidence Feed', href: '#recent-scams' },
    { label: 'Live Metrics', href: '#stats-note' },
    { label: 'Hotlines', href: '#resources-note' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#05050A]/95 backdrop-blur-2xl border-b border-cyan-500/20 shadow-[0_15px_35px_rgba(0,0,0,0.85)]'
          : 'bg-[#05050A]/70 backdrop-blur-md border-b border-zinc-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero-note" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-b from-cyan-500/20 to-blue-900/40 border border-cyan-500/40 text-cyan-300 shadow-[0_0_20px_rgba(0,217,255,0.3)] group-hover:scale-105 transition-transform backdrop-blur-xl">
            <Shield className="w-5 h-5 text-cyan-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,217,255,0.9)]" />
          </div>
          <div>
            <span className="font-display text-lg font-black tracking-tight text-white flex items-center gap-1">
              <span className="text-gradient-silver">SCAM</span>
              <span className="text-gradient-cyan">SHIELD</span>
            </span>
            <span className="block font-mono text-[9px] text-zinc-400 tracking-widest uppercase -mt-1">
              CYBER INVESTIGATION GRID
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 font-mono text-xs text-zinc-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-1.5 rounded-xl hover:text-cyan-300 hover:bg-blue-950/50 transition-all font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Audio toggle */}
          <button
            onClick={toggleMute}
            className="p-2 rounded-xl bg-black border border-zinc-800 text-zinc-300 hover:text-white hover:border-cyan-500/50 transition-all shadow-sm"
            title={isMuted ? 'Unmute SFX' : 'Mute SFX'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-zinc-500" /> : <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />}
          </button>

          {/* Report Scam Action */}
          <a
            href="#report-scam"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-950/80 hover:bg-blue-900/90 border border-cyan-500/50 text-white font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,217,255,0.25)] hover:scale-105 active:scale-95"
          >
            <PlusCircle className="w-3.5 h-3.5 text-cyan-300" />
            <span>REPORT SCAM</span>
          </a>

          {/* Return to 3D Camera Lens */}
          <button
            onClick={handleReturnCamera}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500/15 to-blue-600/15 hover:from-cyan-500/25 hover:to-blue-600/25 border border-cyan-400/40 hover:border-cyan-400 text-cyan-300 font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,217,255,0.2)] hover:scale-105 active:scale-95"
          >
            <Camera className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">CAMERA INTRO</span>
          </button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl bg-black border border-zinc-800 text-zinc-400 hover:text-white"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#060a14] border-b border-zinc-800 p-4 space-y-2 font-mono text-xs backdrop-blur-2xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block p-3 rounded-xl text-zinc-300 hover:bg-blue-950/80 hover:text-cyan-300"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-zinc-800">
            <a
              href="#report-scam"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-blue-600 text-white font-bold shadow-lg"
            >
              <PlusCircle className="w-4 h-4" />
              <span>REPORT A SCAM NOW</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

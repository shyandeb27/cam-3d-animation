'use client';

import React from 'react';
import { StickyNote } from './StickyNote';
import { Shield, Terminal, Search, Radio, ArrowRight, Lock, Eye } from 'lucide-react';

interface HeroNoteProps {
  onScanClick: () => void;
  onReportClick: () => void;
}

export function HeroNote({ onScanClick, onReportClick }: HeroNoteProps) {
  return (
    <div className="w-full max-w-4xl mx-auto pt-4 pb-2">
      <StickyNote
        id="hero-note"
        color="cyan"
        rotation={-1.0}
        pinType="blue-pin"
        className="border-cyan-500/50 shadow-[0_25px_60px_rgba(0,217,255,0.22)] ring-1 ring-cyan-500/30"
      >
        {/* Top Header Badge Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-900/40 border border-cyan-500/50 text-cyan-300 shadow-[0_0_15px_rgba(0,217,255,0.3)]">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-cyan-300 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-950/80 border border-cyan-500/40">
                  <Radio className="w-2.5 h-2.5 text-cyan-400 animate-pulse" /> CASE FILE #001 // DECLASSIFIED
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-900/40 border border-blue-400/30 text-white font-mono text-[10px] font-bold">
                  LEVEL 4 SURVEILLANCE
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-display mt-0.5">
                <span className="text-gradient-silver">OPERATION </span>
                <span className="text-gradient-cyan">SCAMSHIELD</span>
              </h2>
            </div>
          </div>

          {/* Top Right Rubber Stamp */}
          <div className="font-mono text-right flex flex-col items-end">
            <div className="rubber-stamp text-cyan-300 border-cyan-400/80 text-[10px] -rotate-3 bg-blue-950/60 shadow-[0_0_12px_rgba(0,217,255,0.3)]">
              CLASSIFIED EVIDENCE
            </div>
            <span className="text-[10px] text-zinc-400 mt-1">GRID STATUS: ARMED</span>
          </div>
        </div>

        {/* Tagline & Annotation */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-display text-white leading-tight">
              “Catch it before it catches you.”
            </p>
            <span className="hidden sm:inline-block absolute -top-3 right-4 font-handwriting text-xl text-cyan-300 -rotate-6 font-bold">
              ⚡ Autonomous fraud defense!
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-black/80 border border-zinc-800 font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed space-y-2.5 shadow-inner">
            <div className="flex items-center gap-2 text-cyan-300 font-bold">
              <Terminal className="w-4 h-4" />
              <span>FORENSIC MISSION BRIEFING:</span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-zinc-300">
              Scammers deploy generative AI voice clones, automated SMS traps, and smart contract drainers in seconds.
              <strong className="text-white font-semibold"> ScamShield</strong> operates an autonomous investigation grid—intercepting fraudulent domains, cross-correlating criminal wallet addresses, and dispatching rapid takedowns in real-time.
            </p>
          </div>
        </div>

        {/* Key Metrics Grid inside Hero Note */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3.5 border-y border-zinc-800 mb-6 font-mono text-center">
          <div className="p-3 rounded-xl bg-black/60 border border-zinc-800">
            <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">Live Scams Tracked</div>
            <div className="text-xl sm:text-2xl font-black text-cyan-300 font-display mt-0.5">184,920+</div>
          </div>
          <div className="p-3 rounded-xl bg-black/60 border border-zinc-800">
            <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">Losses Averted</div>
            <div className="text-xl sm:text-2xl font-black text-white font-display mt-0.5">$14.2M</div>
          </div>
          <div className="p-3 rounded-xl bg-black/60 border border-zinc-800">
            <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">Takedown Speed</div>
            <div className="text-xl sm:text-2xl font-black text-cyan-400 font-display mt-0.5">4.2 min</div>
          </div>
          <div className="p-3 rounded-xl bg-black/60 border border-zinc-800">
            <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">Watchdog Sentinels</div>
            <div className="text-xl sm:text-2xl font-black text-white font-display mt-0.5">28,500+</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs sm:text-sm">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onScanClick}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-black font-black tracking-wider transition-all shadow-[0_0_25px_rgba(0,217,255,0.4)] hover:scale-105 active:scale-95"
            >
              <Search className="w-4 h-4 text-black" />
              <span>LAUNCH AI SCAM SCANNER</span>
            </button>

            <button
              onClick={onReportClick}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-950/60 hover:bg-blue-900/80 border border-cyan-500/50 hover:border-cyan-300 text-white font-bold tracking-wider transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(0,217,255,0.2)]"
            >
              <Lock className="w-4 h-4 text-cyan-400" />
              <span>REPORT A THREAT</span>
            </button>
          </div>

          <a
            href="#recent-scams"
            className="flex items-center gap-1.5 text-zinc-400 hover:text-cyan-300 font-bold transition-colors group"
          >
            <span>EXPLORE DOSSIERS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-cyan-400" />
          </a>
        </div>
      </StickyNote>
    </div>
  );
}

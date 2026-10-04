'use client';

import React from 'react';
import { StickyNote } from './StickyNote';
import { TrendingUp, Users, DollarSign, AlertCircle, ShieldAlert } from 'lucide-react';

export function ProblemNote() {
  return (
    <StickyNote
      id="problem-note"
      color="cyan"
      rotation={-2.8}
      pinType="blue-pin"
      isScam={true}
      className="max-w-md w-full shadow-[0_20px_45px_rgba(0,217,255,0.2)]"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3 mb-4">
        <div className="flex items-center gap-2 text-cyan-300">
          <ShieldAlert className="w-5 h-5 text-cyan-400 animate-pulse" />
          <h3 className="font-mono text-sm sm:text-base font-black uppercase tracking-wider text-white">
            EVIDENCE: THE FRAUD EPIDEMIC
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-blue-950/80 text-cyan-300 font-bold border border-cyan-500/40">
          CRITICAL INTEL
        </span>
      </div>

      {/* Main Content */}
      <div className="space-y-4 text-zinc-300 text-xs sm:text-sm font-sans leading-relaxed">
        {/* Alarming Quote */}
        <div className="relative p-3 rounded-xl bg-black/60 border-l-2 border-cyan-400">
          <p className="font-handwriting text-lg sm:text-xl text-white leading-snug font-semibold">
            “Modern fraud doesn’t look like typos anymore. It looks like your bank, sounds like your child, and drains wallets in seconds.”
          </p>
          <span className="block font-mono text-[9px] text-cyan-400 mt-1 uppercase">
            — Forensic Analyst Log #409
          </span>
        </div>

        {/* Key Alarming Stats */}
        <div className="space-y-2.5">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-black/60 border border-zinc-800">
            <div className="p-1.5 rounded-lg bg-blue-950/80 border border-cyan-500/30 text-cyan-300 shrink-0 mt-0.5">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <div className="font-display font-black text-white text-base">$1.03 TRILLION</div>
              <p className="text-[11px] text-zinc-400 font-sans">Global annual consumer losses stolen through synthetic identities & phishing.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-black/60 border border-zinc-800">
            <div className="p-1.5 rounded-lg bg-blue-950/80 border border-cyan-500/30 text-cyan-300 shrink-0 mt-0.5">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="font-display font-black text-white text-base">+380% AI Voice Clones</div>
              <p className="text-[11px] text-zinc-400 font-sans">Acoustic models trained from 3-second social reels used for emergency wire fraud.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-black/60 border border-zinc-800">
            <div className="p-1.5 rounded-lg bg-blue-950/80 border border-cyan-500/30 text-cyan-300 shrink-0 mt-0.5">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="font-display font-black text-white text-base">48h Detection Latency</div>
              <p className="text-[11px] text-zinc-400 font-sans">Traditional banks flag transactions only after funds have crossed 6 bridge protocols.</p>
            </div>
          </div>
        </div>

        {/* Investigator Footer Annotation */}
        <div className="pt-3 border-t border-zinc-800 flex items-center justify-between font-mono text-[11px] text-zinc-400">
          <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
            <AlertCircle className="w-3.5 h-3.5 text-cyan-400" /> STATUS: UNRESOLVED
          </span>
          <span className="font-handwriting text-cyan-300 text-sm font-bold -rotate-1">
            Target: Everyone with a phone!
          </span>
        </div>
      </div>
    </StickyNote>
  );
}

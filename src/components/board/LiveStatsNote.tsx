'use client';

import React, { useEffect, useState } from 'react';
import { StickyNote } from './StickyNote';
import { Activity, Shield, DollarSign, Clock, Users, Zap } from 'lucide-react';
import { useInView } from 'framer-motion';

export function LiveStatsNote() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const [scamsCount, setScamsCount] = useState(0);
  const [lossAmount, setLossAmount] = useState(0);
  const [usersProtected, setUsersProtected] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1800;
    const stepTime = 25;
    const steps = duration / stepTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const ease = 1 - Math.pow(1 - progress, 3);

      setScamsCount(Math.floor(184920 * ease));
      setLossAmount(Math.floor(14.2 * ease * 10) / 10);
      setUsersProtected(Math.floor(28540 * ease));

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <div ref={ref} className="w-full max-w-xl">
      <StickyNote
        id="stats-note"
        color="cyan"
        rotation={2.8}
        pinType="blue-pin"
        className="shadow-[0_25px_50px_rgba(0,217,255,0.22)] border-cyan-500/40"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3 mb-4">
          <div className="flex items-center gap-2.5 text-cyan-300">
            <div className="p-2 rounded-xl bg-blue-950/80 border border-cyan-500/40 text-cyan-300">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-black uppercase tracking-tight text-white">
                LIVE IMPACT METRICS
              </h3>
              <span className="font-mono text-[10px] text-cyan-400">REAL-TIME FORENSIC TELEMETRY</span>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-blue-950/80 text-cyan-300 font-bold border border-cyan-500/40">
            SYNCHRONIZED
          </span>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-2 gap-3.5 font-mono">
          {/* Stat 1 */}
          <div className="p-3.5 rounded-xl bg-black/60 border border-zinc-800 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-bold">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>SCAMS NEUTRALIZED</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-display">
              {scamsCount.toLocaleString()}+
            </div>
            <p className="text-[10px] text-cyan-300 font-sans">
              Phishing, drainers & deepfakes purged
            </p>
          </div>

          {/* Stat 2 */}
          <div className="p-3.5 rounded-xl bg-black/60 border border-zinc-800 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-bold">
              <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
              <span>LOSSES AVERTED</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-cyan-300 font-display">
              ${lossAmount.toFixed(1)}M
            </div>
            <p className="text-[10px] text-cyan-300 font-sans">
              Calculated across victim interventions
            </p>
          </div>

          {/* Stat 3 */}
          <div className="p-3.5 rounded-xl bg-black/60 border border-zinc-800 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-bold">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>SENTINEL WATCHDOGS</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-display">
              {usersProtected.toLocaleString()}+
            </div>
            <p className="text-[10px] text-cyan-300 font-sans">
              Active researchers & automated nodes
            </p>
          </div>

          {/* Stat 4 */}
          <div className="p-3.5 rounded-xl bg-black/60 border border-zinc-800 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-bold">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>TAKEDOWN SPEED</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-cyan-300 font-display">
              4.2 min
            </div>
            <p className="text-[10px] text-cyan-300 font-sans">
              From report to registrar suspension
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-4 pt-3 border-t border-zinc-800 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-cyan-300">
            <Zap className="w-3.5 h-3.5 text-cyan-400" /> SYNC: BLOCK #20,491,822
          </span>
          <span className="font-handwriting text-cyan-300 text-sm font-bold -rotate-1">
            99.98% Network Uptime!
          </span>
        </div>
      </StickyNote>
    </div>
  );
}

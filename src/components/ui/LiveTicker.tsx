'use client';

import React from 'react';
import { Radio, ShieldAlert } from 'lucide-react';

export function LiveTicker() {
  const alerts = [
    'CRITICAL: AI Deepfake CEO Voice Wire Extortion wave detected (+34 reports intercepted)',
    'NEUTRALIZED: claim-hyperliquid-airdrop[.]vip domain seized by registrar',
    'THREAT ACTIVE: Fake FedEx/USPS SMS package fee campaign targeting US/EU networks',
    'METRICS: $14.2M total fraud damages averted by ScamShield community',
    'INTEL: New permit2 batch wallet drainer signature added to scanner database',
  ];

  return (
    <div className="w-full bg-[#050914] border-y border-cyan-500/30 overflow-hidden py-1.5 flex items-center font-mono text-xs">
      <div className="flex items-center gap-1.5 px-4 bg-blue-600 text-white font-bold uppercase tracking-wider text-[10px] shrink-0 z-10 shadow-md">
        <Radio className="w-3 h-3 animate-pulse" />
        <span>LIVE RADAR</span>
      </div>

      {/* Marquee ticker animation */}
      <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
        {alerts.concat(alerts).map((alert, idx) => (
          <div key={idx} className="flex items-center gap-2 text-cyan-200 text-xs font-medium">
            <ShieldAlert className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>{alert}</span>
            <span className="text-zinc-600 ml-4">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}

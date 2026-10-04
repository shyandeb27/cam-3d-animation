'use client';

import React from 'react';
import { StickyNote } from './StickyNote';
import { Cpu, Network, ShieldCheck, Zap } from 'lucide-react';

export function HowItWorksNote() {
  const steps = [
    {
      num: '01',
      title: 'Intercept & Ingest',
      icon: <Zap className="w-4 h-4 text-cyan-400" />,
      desc: 'Telemetry intercepts phishing SMS, AI deepfake audio samples, spoofed emails, and malicious smart contracts submitted by victims and honeypots.',
    },
    {
      num: '02',
      title: 'Neural Forensic Deconstruction',
      icon: <Cpu className="w-4 h-4 text-cyan-400" />,
      desc: 'AI heuristic models scan for synthetic acoustic pitch jitter, permit2 drainer bytecode, typosquatted punycode domains, and psychological pressure hooks.',
    },
    {
      num: '03',
      title: 'Syndicate Cross-Correlation',
      icon: <Network className="w-4 h-4 text-cyan-400" />,
      desc: 'Our knowledge graph traces shared hosting reverse proxies, Telegram bot exfiltration channels, and crypto money-mule networks across isolated cases.',
    },
    {
      num: '04',
      title: 'Automated Global Neutralization',
      icon: <ShieldCheck className="w-4 h-4 text-white" />,
      desc: 'Evidence dossiers are automatically dispatched to domain registrars, telcos, and crypto exchanges for immediate domain suspension and wallet blacklisting.',
    },
  ];

  return (
    <StickyNote
      id="how-it-works"
      color="cyan"
      rotation={2.4}
      pinType="tape-top"
      className="max-w-lg w-full shadow-[0_20px_45px_rgba(0,217,255,0.18)]"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3 mb-4">
        <div className="flex items-center gap-2.5 text-cyan-300">
          <div className="p-1.5 rounded-xl bg-blue-950/80 border border-cyan-500/40 text-cyan-300">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-lg font-black uppercase tracking-tight text-white">
              HOW SCAMSHIELD WORKS
            </h3>
            <span className="font-mono text-[10px] text-cyan-400">4-PHASE NEUTRALIZATION PROTOCOL</span>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-blue-950/80 text-cyan-300 font-bold border border-cyan-500/40">
          AUTOMATED GRID
        </span>
      </div>

      {/* 4 Steps Flow */}
      <div className="space-y-3">
        {steps.map((step) => (
          <div
            key={step.num}
            className="flex items-start gap-3 p-3 rounded-xl bg-black/60 border border-zinc-800 hover:border-cyan-400/60 hover:bg-black/80 transition-all group"
          >
            <div className="flex flex-col items-center justify-center w-8 h-8 rounded-lg bg-blue-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-black shrink-0 mt-0.5 group-hover:bg-cyan-500/20 group-hover:scale-105 transition-all shadow-[0_0_10px_rgba(0,217,255,0.15)]">
              {step.num}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-display text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                {step.icon}
                <span>{step.title}</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Annotation */}
      <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between font-mono text-[11px] text-zinc-400">
        <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          AVG RESPONSE: &lt; 240 SECONDS
        </span>
        <span className="font-handwriting text-cyan-300 text-sm font-bold -rotate-1">
          Zero manual delay!
        </span>
      </div>
    </StickyNote>
  );
}

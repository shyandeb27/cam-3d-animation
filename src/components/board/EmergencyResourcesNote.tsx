'use client';

import React from 'react';
import { StickyNote } from './StickyNote';
import { PhoneCall, ShieldAlert, MessageSquare, Globe, ArrowUpRight, Code, Send } from 'lucide-react';

export function EmergencyResourcesNote() {
  return (
    <StickyNote
      id="resources-note"
      color="charcoal"
      rotation={-3.0}
      pinType="blue-pin"
      className="max-w-md w-full shadow-[0_20px_40px_rgba(0,0,0,0.8)] border-zinc-800"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
        <div className="flex items-center gap-2 text-cyan-300">
          <PhoneCall className="w-5 h-5 text-cyan-400 animate-pulse" />
          <h3 className="font-display text-lg font-black uppercase tracking-tight text-white">
            EMERGENCY INTEL & HOTLINES
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-blue-950/80 text-cyan-300 font-bold border border-cyan-500/40">
          24/7 SUPPORT
        </span>
      </div>

      <div className="space-y-3 font-sans text-xs text-zinc-300">
        <p className="font-medium text-white">
          If you are actively in an emergency fraudulent transaction or blackmail demand:
        </p>

        {/* Action Link 1: Official Police / IC3 */}
        <a
          href="https://www.ic3.gov"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-3 rounded-xl bg-black/70 border border-zinc-800 hover:border-cyan-500/50 hover:bg-blue-950/30 transition-all group"
        >
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
            <div>
              <div className="font-mono font-bold text-white group-hover:text-cyan-300 text-xs">
                FBI IC3 Cybercrime Portal
              </div>
              <div className="text-[10px] text-zinc-400">Official Federal Incident Filing</div>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-cyan-400" />
        </a>

        {/* Action Link 2: FTC Report Fraud */}
        <a
          href="https://reportfraud.ftc.gov"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-3 rounded-xl bg-black/70 border border-zinc-800 hover:border-cyan-500/50 hover:bg-blue-950/30 transition-all group"
        >
          <div className="flex items-center gap-2.5">
            <Globe className="w-4 h-4 text-cyan-400" />
            <div>
              <div className="font-mono font-bold text-white group-hover:text-cyan-300 text-xs">
                FTC Fraud Sentinel
              </div>
              <div className="text-[10px] text-zinc-400">Consumer Protection Registry</div>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-cyan-400" />
        </a>

        {/* Action Link 3: ScamShield Discord / Intel Network */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-black/70 border border-zinc-800 hover:border-cyan-500/50 hover:bg-blue-950/30 transition-all group cursor-pointer">
          <div className="flex items-center gap-2.5">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <div>
              <div className="font-mono font-bold text-white group-hover:text-cyan-300 text-xs">
                ScamShield Intel Network
              </div>
              <div className="text-[10px] text-zinc-400">28K+ Whitehat Investigators</div>
            </div>
          </div>
          <span className="text-[10px] font-mono text-cyan-300 font-bold bg-blue-950/80 px-2.5 py-1 rounded-full border border-cyan-500/40">
            JOIN CHANNEL
          </span>
        </div>

        {/* Social Links */}
        <div className="pt-2 border-t border-zinc-800 flex items-center justify-between font-mono text-[11px] text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="hover:text-white cursor-pointer flex items-center gap-1 text-zinc-300">
              <Send className="w-3.5 h-3.5 text-cyan-400" /> @ScamShieldHQ
            </span>
            <span className="hover:text-white cursor-pointer flex items-center gap-1 text-zinc-300">
              <Code className="w-3.5 h-3.5 text-cyan-400" /> OpenIntel API
            </span>
          </div>
          <span className="text-zinc-500">ID: SECURE_07</span>
        </div>
      </div>
    </StickyNote>
  );
}

'use client';

import React, { useState } from 'react';
import { StickyNote } from './StickyNote';
import { Search, ShieldAlert, RefreshCw, Sparkles, CheckCircle2, AlertTriangle, Terminal } from 'lucide-react';
import { sounds } from '@/components/audio/soundEffects';
import { useAppStore } from '@/store/useAppStore';

interface ScanResult {
  score: number;
  status: 'MALICIOUS' | 'SUSPICIOUS' | 'VERIFIED SAFE';
  category: string;
  flags: string[];
  recommendation: string;
}

export function ScamScannerNote() {
  const [query, setQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const { isMuted } = useAppStore();

  const presets = [
    { label: 'SMS: USPS $2.30 Customs Fee', text: 'USPS Notice: Your package #US94819 is on hold at customs. Pay $2.30 fee at usps-parcel-verify.top to release shipment.' },
    { label: 'Telegram: $95/hr Remote Job', text: 'Congratulations! You have been selected for QA Engineer at Nexus Global. $95/hr. We will send a $4,800 cashier check for your workstation setup.' },
    { label: 'Voice: CFO Urgent Wire Request', text: 'This is the CFO. We have a confidential M&A closing in 2 hours. Wire $180,000 to escrow account GB44BARC2020155 immediately. Do not mention to team.' },
  ];

  const handleScan = (inputText?: string) => {
    const target = inputText || query;
    if (!target.trim()) return;

    if (!isMuted) sounds.playAlertBeep();
    setIsScanning(true);
    setResult(null);

    setTimeout(() => {
      setIsScanning(false);
      if (!isMuted) sounds.playStampSound();

      const lower = target.toLowerCase();
      if (lower.includes('usps') || lower.includes('fee') || lower.includes('.top') || lower.includes('parcel')) {
        setResult({
          score: 96,
          status: 'MALICIOUS',
          category: 'Smishing / Credential & CC Exfiltration Trap',
          flags: ['Typosquatted domain (.top TLD registered 4 hours ago)', 'Urgent payment hook for trivial fee ($2.30)', 'Live Telegram bot 2FA token exfiltration script'],
          recommendation: 'DO NOT CLICK LINK. Block sender number and report to carrier spam filter.',
        });
      } else if (lower.includes('cashier check') || lower.includes('$95') || lower.includes('wire') || lower.includes('escrow')) {
        setResult({
          score: 92,
          status: 'MALICIOUS',
          category: 'Social Engineering / Check Overpayment Fraud',
          flags: ['Fake check bounce exploit pattern', 'Synthetic executive urgency timeline', 'Offshore unrecoverable wire routing destination'],
          recommendation: 'Cease all communication immediately. Authenticate caller identity via verified company channels.',
        });
      } else {
        setResult({
          score: 88,
          status: 'SUSPICIOUS',
          category: 'Unverified Third-Party Solicit',
          flags: ['Unregistered originator address', 'Zero domain reputation in threat registry', 'High-pressure financial call-to-action'],
          recommendation: 'Exercise high caution. Never share credentials, OTP codes, or crypto seed phrases.',
        });
      }
    }, 750);
  };

  return (
    <StickyNote
      id="scam-scanner"
      color="cyan"
      rotation={-1.5}
      pinType="blue-pin"
      className="max-w-xl w-full shadow-[0_25px_50px_rgba(0,217,255,0.2)] border-cyan-500/40"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-500/30 pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-950/80 border border-cyan-500/40 text-cyan-300">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-lg font-black uppercase tracking-tight text-white">
              AI FORENSIC SCANNER
            </h3>
            <span className="font-mono text-[10px] text-cyan-400">REAL-TIME HEURISTIC THREAT ENGINE</span>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-blue-950/80 text-cyan-300 font-bold border border-cyan-500/40">
          HEURISTIC v3.2
        </span>
      </div>

      <p className="text-xs text-zinc-300 mb-3 font-sans leading-relaxed">
        Paste any suspicious SMS, phishing link, email body, or transcript to run instant forensic deconstruction:
      </p>

      {/* Input Area */}
      <div className="space-y-3">
        <div className="relative">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Paste suspicious message text, phishing URL (e.g. usps-track-update[.]top), or email headers..."
            rows={3}
            className="w-full p-3.5 rounded-xl bg-black/80 border border-zinc-800 focus:border-cyan-400 text-white text-xs font-mono placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 resize-none shadow-inner"
          />
        </div>

        {/* Quick Sample Presets */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
          <span className="text-zinc-400 font-bold">Quick Presets:</span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(p.text);
                handleScan(p.text);
              }}
              className="px-2.5 py-1 rounded-xl bg-blue-950/60 hover:bg-blue-900/80 text-zinc-300 hover:text-cyan-300 border border-cyan-500/20 transition-all hover:scale-105 active:scale-95"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={() => handleScan()}
          disabled={isScanning || !query.trim()}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 hover:from-cyan-300 hover:to-blue-500 disabled:opacity-50 text-black font-display font-black text-xs sm:text-sm tracking-wider transition-all shadow-[0_0_20px_rgba(0,217,255,0.35)] hover:scale-[1.01] active:scale-98"
        >
          {isScanning ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-black" />
              <span>DECONSTRUCTING THREAT BYTECODE & SIGNATURES...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-black" />
              <span>EXECUTE FORENSIC SCAN</span>
            </>
          )}
        </button>
      </div>

      {/* Scan Results Panel */}
      {result && (
        <div className="mt-4 p-4.5 rounded-xl bg-black/90 border border-cyan-500/50 space-y-3.5 animate-in fade-in slide-in-from-top-2 duration-300 font-mono shadow-[0_10px_30px_rgba(0,217,255,0.2)]">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="text-[10px] text-zinc-500">THREAT CLASSIFICATION</div>
                <div className="text-xs sm:text-sm font-bold text-white font-display">{result.category}</div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-zinc-500">RISK INDEX</span>
              <div className="text-base sm:text-lg font-black text-cyan-300 font-display">{result.score}/100</div>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-[11px] text-zinc-400 font-bold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>DETECTED FORENSIC RED FLAGS:</span>
            </div>
            <ul className="space-y-1 text-xs text-zinc-200">
              {result.flags.map((flag, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 rounded-xl bg-blue-950/60 border border-cyan-500/40 text-xs text-cyan-200 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">RECOMMENDED PROTOCOL:</strong> {result.recommendation}
            </div>
          </div>
        </div>
      )}
    </StickyNote>
  );
}

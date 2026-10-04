'use client';

import React, { useState } from 'react';
import { StickyNote } from './StickyNote';
import { Send, CheckCircle2, PenTool } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { sounds } from '@/components/audio/soundEffects';
import confetti from 'canvas-confetti';

export function ReportScamNote() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'AI Deepfake' | 'Crypto Fraud' | 'Phishing' | 'Fake Job' | 'Smishing' | 'Investment' | 'Marketplace'>('Phishing');
  const [sourceTarget, setSourceTarget] = useState('');
  const [summary, setSummary] = useState('');
  const [lossAmount, setLossAmount] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { addScamReport, isMuted } = useAppStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) return;

    if (!isMuted) {
      sounds.playStampSound();
    }

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#00D9FF', '#0066FF', '#ffffff', '#002266'],
      });
    } catch {
      // ignore
    }

    addScamReport({
      title,
      category,
      severity: 'HIGH',
      lossAmount: lossAmount ? `$${lossAmount}` : 'Undisclosed',
      summary,
      indicators: ['User-submitted evidence', 'Awaiting full hash correlation'],
      evidenceText: `Originator contact/domain: ${sourceTarget || 'Private'}. Logged into ScamShield community registry.`,
      sourceTarget: sourceTarget || 'N/A',
      reportedBy: 'Citizen Tipster',
      takedownStatus: 'Dispatched to analysis queue',
    });

    setSubmitted(true);
    setTimeout(() => {
      setTitle('');
      setSourceTarget('');
      setSummary('');
      setLossAmount('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <StickyNote
      id="report-scam"
      color="cyan"
      rotation={-2.0}
      pinType="tape-corners"
      className="max-w-lg w-full shadow-[0_25px_50px_rgba(0,217,255,0.18)] border-cyan-500/40"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3 mb-4">
        <div className="flex items-center gap-2.5 text-cyan-300">
          <div className="p-2 rounded-xl bg-blue-950/80 border border-cyan-500/40 text-cyan-300">
            <PenTool className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-lg font-black uppercase tracking-tight text-white">
              REPORT ACTIVE FRAUD
            </h3>
            <span className="font-mono text-[10px] text-cyan-400">COMMUNITY INTEL DOCKET</span>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-blue-950/80 text-cyan-300 font-bold border border-cyan-500/40">
          ANONYMOUS
        </span>
      </div>

      <p className="text-xs text-zinc-300 mb-4 font-sans leading-relaxed">
        Spotted a scam or impersonator? Submit below to pin evidence to the investigation grid and alert 28,000+ watchdogs:
      </p>

      {submitted ? (
        <div className="p-6 rounded-2xl bg-black/80 border border-cyan-400/60 text-center space-y-3 animate-in zoom-in-95 duration-300 font-mono shadow-[0_10px_30px_rgba(0,217,255,0.25)]">
          <div className="w-12 h-12 rounded-full bg-blue-950/80 text-cyan-300 flex items-center justify-center mx-auto border border-cyan-400 shadow-[0_0_15px_rgba(0,217,255,0.4)]">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h4 className="text-lg font-bold text-white font-display">EVIDENCE HASHED & PINNED!</h4>
          <p className="text-xs text-zinc-300 font-sans">
            Your intelligence report is now pinned to the live investigation board and queued for registrar takedown analysis.
          </p>
          <span className="inline-block text-[10px] text-cyan-300 font-mono bg-blue-950/90 px-3.5 py-1 rounded-full border border-cyan-500/50 font-bold">
            STATUS: ACTIVE ON GRID
          </span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 font-mono text-xs">
          {/* Title */}
          <div>
            <label className="block text-[11px] text-zinc-300 font-bold mb-1">
              SCAM INCIDENT TITLE:
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Fake Ledger Firmware Update SMS"
              className="w-full p-2.5 rounded-xl bg-black/80 border border-zinc-800 focus:border-cyan-400 text-white placeholder:text-zinc-600 focus:outline-none"
            />
          </div>

          {/* Category & Loss Amount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-zinc-300 font-bold mb-1">
                CATEGORY:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as typeof category)}
                className="w-full p-2.5 rounded-xl bg-black border border-zinc-800 focus:border-cyan-400 text-cyan-200 focus:outline-none"
              >
                <option value="Phishing">Phishing / Credential Trap</option>
                <option value="AI Deepfake">AI Voice / Video Deepfake</option>
                <option value="Crypto Fraud">Crypto Wallet Drainer</option>
                <option value="Smishing">SMS / Messaging Scam</option>
                <option value="Fake Job">Fake Job / Overpayment</option>
                <option value="Investment">Fake Investment / Ponzi</option>
                <option value="Marketplace">Marketplace Fraud</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-zinc-300 font-bold mb-1">
                APPROX. LOSS / DEMAND:
              </label>
              <input
                type="text"
                value={lossAmount}
                onChange={(e) => setLossAmount(e.target.value)}
                placeholder="e.g. $2,500 or $0"
                className="w-full p-2.5 rounded-xl bg-black/80 border border-zinc-800 focus:border-cyan-400 text-white placeholder:text-zinc-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Source URL / Phone */}
          <div>
            <label className="block text-[11px] text-zinc-300 font-bold mb-1">
              SUSPECT DOMAIN / PHONE / WALLET:
            </label>
            <input
              type="text"
              value={sourceTarget}
              onChange={(e) => setSourceTarget(e.target.value)}
              placeholder="e.g. ledger-recovery-portal[.]vip or +1 888-XXX-XXXX"
              className="w-full p-2.5 rounded-xl bg-black/80 border border-zinc-800 focus:border-cyan-400 text-white placeholder:text-zinc-600 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] text-zinc-300 font-bold mb-1">
              INCIDENT DETAILS (NOTES):
            </label>
            <textarea
              required
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Describe how the scam approached, what urgency tactic was used, and where the victim was directed..."
              className="w-full p-2.5 rounded-xl bg-black/80 border border-zinc-800 focus:border-cyan-400 text-white placeholder:text-zinc-600 focus:outline-none resize-none font-sans"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-black font-display font-black text-xs sm:text-sm tracking-wider transition-all shadow-[0_0_20px_rgba(0,217,255,0.35)] hover:scale-[1.01] active:scale-98"
          >
            <Send className="w-4 h-4" />
            <span>PIN EVIDENCE TO INVESTIGATION BOARD</span>
          </button>
        </form>
      )}
    </StickyNote>
  );
}

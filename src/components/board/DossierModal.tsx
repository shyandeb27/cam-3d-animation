'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { sounds } from '@/components/audio/soundEffects';
import {
  X,
  ShieldAlert,
  AlertTriangle,
  Copy,
  Check,
  FileCheck,
  Lock,
  Radio,
} from 'lucide-react';

export function DossierModal() {
  const { activeModal, setActiveModal, isMuted } = useAppStore();
  const [copied, setCopied] = useState(false);

  if (!activeModal) return null;

  const handleClose = () => {
    if (!isMuted) sounds.playPaperNote();
    setActiveModal(null);
  };

  const handleCopy = () => {
    if (!isMuted) sounds.playStampSound();
    navigator.clipboard.writeText(
      `[SCAMSHIELD EVIDENCE DOSSIER ${activeModal.id}]\nTarget: ${activeModal.sourceTarget}\nCategory: ${activeModal.category}\nIndicators: ${activeModal.indicators.join(', ')}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
        {/* Backdrop click to close */}
        <div className="fixed inset-0" onClick={handleClose} />

        {/* Modal Window with Unfold / Flip Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotateX: 20, y: 30 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, rotateX: -20, y: 30 }}
          transition={{
            type: 'spring',
            damping: 24,
            stiffness: 300,
            mass: 0.8,
          }}
          className="relative w-full max-w-2xl bg-[#090e1a] border border-cyan-500/50 rounded-2xl shadow-[0_30px_70px_rgba(0,217,255,0.25)] overflow-hidden z-10 my-auto ring-1 ring-cyan-500/30"
        >
          {/* Top Classified Header Bar */}
          <div className="bg-gradient-to-r from-blue-950 via-black to-black p-5 sm:p-6 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-blue-950/90 border border-cyan-500/50 text-cyan-300 shadow-[0_0_15px_rgba(0,217,255,0.3)]">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs">
                  <span className="text-cyan-300 font-bold tracking-widest uppercase flex items-center gap-1">
                    <Radio className="w-3 h-3 text-cyan-400 animate-pulse" /> CLASSIFIED CASE // {activeModal.id}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-950 border border-cyan-500/40 text-cyan-200 font-bold">
                    {activeModal.severity}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white font-display mt-0.5">
                  {activeModal.title}
                </h3>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="p-2 rounded-xl bg-black border border-zinc-800 text-zinc-400 hover:text-white hover:border-cyan-500/50 transition-colors shadow-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Rubber Forensic Stamp Overlay */}
          <div className="absolute top-24 right-6 pointer-events-none opacity-90 z-20">
            <div className="rubber-stamp text-cyan-300 border-cyan-400/90 text-xs sm:text-sm -rotate-12 bg-blue-950/80 shadow-[0_0_20px_rgba(0,217,255,0.4)]">
              {activeModal.status === 'NEUTRALIZED' ? 'THREAT NEUTRALIZED' : 'CONFIRMED FRAUD'}
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-6 space-y-5 font-mono text-xs max-h-[75vh] overflow-y-auto">
            {/* Meta Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-xl bg-black/70 border border-zinc-800">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase font-bold">Category</span>
                <div className="text-cyan-300 font-bold font-display text-sm mt-0.5">{activeModal.category}</div>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 uppercase font-bold">First Sighted</span>
                <div className="text-zinc-300 font-bold text-xs mt-0.5">{activeModal.reportedDate}</div>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 uppercase font-bold">Financial Impact</span>
                <div className="text-white font-bold font-display text-sm mt-0.5">{activeModal.lossAmount || 'Active Threat'}</div>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 uppercase font-bold">Verification</span>
                <div className="text-cyan-300 font-bold text-xs mt-0.5">100% Cryptographic</div>
              </div>
            </div>

            {/* Forensic Summary */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-zinc-400 font-bold flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-cyan-400" />
                FORENSIC DECONSTRUCTION:
              </span>
              <p className="text-xs sm:text-sm text-zinc-200 font-sans leading-relaxed p-4 rounded-xl bg-black/80 border border-zinc-800 shadow-inner">
                {activeModal.summary}
              </p>
            </div>

            {/* Indicators of Compromise (IoCs) */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-cyan-300 font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-cyan-400" />
                INDICATORS OF COMPROMISE (IoCs):
              </span>
              <div className="p-3.5 rounded-xl bg-blue-950/40 border border-cyan-500/30 space-y-2">
                <ul className="space-y-1.5 text-zinc-200">
                  {activeModal.indicators.map((indicator, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,217,255,0.8)]" />
                      <span className="text-xs">{indicator}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Suspect Infrastructure Details */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-zinc-400 font-bold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                SUSPECT INFRASTRUCTURE & TAKEDOWN STATUS:
              </span>
              <div className="p-3.5 rounded-xl bg-black/70 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-zinc-300">
                  <span className="text-zinc-500">Originating Vector:</span>
                  <span className="text-cyan-300 font-mono font-bold">{activeModal.sourceTarget}</span>
                </div>
                <div className="flex items-center justify-between text-zinc-300">
                  <span className="text-zinc-500">Takedown Protocol:</span>
                  <span className="text-white font-mono font-bold">{activeModal.takedownStatus || 'Dispatched to registrar'}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black hover:bg-zinc-900 text-zinc-200 font-bold text-xs transition-all border border-zinc-800 shadow-md hover:scale-105 active:scale-95"
              >
                {copied ? <Check className="w-4 h-4 text-cyan-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
                <span>{copied ? 'IoCs COPIED TO CLIPBOARD' : 'COPY FORENSIC IoCs'}</span>
              </button>

              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-black font-display font-black text-xs sm:text-sm tracking-wider transition-all shadow-[0_0_20px_rgba(0,217,255,0.35)] hover:scale-105 active:scale-95"
              >
                CLOSE CASE FILE
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

'use client';

import React from 'react';
import { StickyNote } from './StickyNote';
import { useAppStore } from '@/store/useAppStore';
import { Tag, ShieldCheck, Clock, ExternalLink, Filter } from 'lucide-react';

export function RecentScamsFeed() {
  const {
    scamReports,
    setActiveModal,
    searchFilter,
    categoryFilter,
    setCategoryFilter,
  } = useAppStore();

  const categories = ['ALL', 'AI Deepfake', 'Crypto Fraud', 'Phishing', 'Smishing', 'Fake Job'];

  const filteredReports = scamReports.filter((item) => {
    const matchesCategory = categoryFilter === 'ALL' || item.category === categoryFilter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.sourceTarget.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getRotation = (index: number) => {
    const rotations = [-2.8, 2.2, -1.6, 3.2, -2.4, 2.7, -3.0, 1.8];
    return rotations[index % rotations.length];
  };

  return (
    <div id="recent-scams" className="w-full space-y-6 pt-6">
      {/* Section Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-cyan-300 font-bold uppercase tracking-widest flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-950/80 border border-cyan-500/40">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" /> LIVE EVIDENCE REPOSITORY
            </span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display mt-1">
            FLAGGED SCAM DOSSIERS
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-sans">
            Click any pinned evidence file to unfold full forensic indicators, attack anatomy, and takedown status.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <div className="flex items-center gap-1 text-zinc-500 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>FILTER:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl border transition-all ${
                categoryFilter === cat
                  ? 'bg-blue-950/80 border-cyan-400 text-cyan-300 font-bold shadow-[0_0_15px_rgba(0,217,255,0.35)] scale-105'
                  : 'bg-black border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Pinned Evidence Sticky Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {filteredReports.map((report, idx) => {
          const rotation = getRotation(idx);

          return (
            <StickyNote
              key={report.id}
              color="cyan"
              rotation={rotation}
              pinType="blue-pin"
              isScam={true}
              onClick={() => setActiveModal(report)}
              className="h-full flex flex-col justify-between group cursor-pointer hover:border-cyan-400/80"
            >
              {/* Rubber SCAM Stamp Overlay in top-right */}
              <div className="absolute top-3.5 right-3.5 pointer-events-none z-20">
                <div className="rubber-stamp text-cyan-300 border-cyan-400/90 text-[10px] sm:text-[11px] rotate-12 bg-blue-950/80 shadow-[0_0_12px_rgba(0,217,255,0.35)]">
                  {report.status === 'NEUTRALIZED' ? 'NEUTRALIZED' : 'CONFIRMED SCAM'}
                </div>
              </div>

              {/* Card Body */}
              <div className="space-y-3.5">
                {/* Category & Date */}
                <div className="flex items-center gap-2 text-[10px] font-mono">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-950/70 border border-cyan-500/30 text-cyan-200 font-bold flex items-center gap-1.5">
                    <Tag className="w-3 h-3 text-cyan-400" />
                    {report.category}
                  </span>
                  <span className="text-zinc-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-zinc-500" />
                    {report.reportedDate}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors font-display">
                  {report.title}
                </h4>

                {/* Target Source */}
                <div className="p-2.5 rounded-xl bg-black/70 border border-zinc-800 font-mono text-[11px] text-zinc-400 truncate">
                  <span className="text-zinc-500">TARGET: </span>
                  <span className="text-cyan-300 font-semibold">{report.sourceTarget}</span>
                </div>

                {/* Summary */}
                <p className="text-xs text-zinc-300 font-sans line-clamp-3 leading-relaxed">
                  {report.summary}
                </p>
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between font-mono text-[11px]">
                <div className="text-zinc-400 flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span className="text-white font-bold">{report.lossAmount || 'Active Threat'}</span>
                </div>

                <div className="flex items-center gap-1.5 text-cyan-400 group-hover:translate-x-1 transition-transform font-bold">
                  <span>UNFOLD DOSSIER</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            </StickyNote>
          );
        })}
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { LiveTicker } from '@/components/ui/LiveTicker';
import { RedStrings } from './RedStrings';
import { HeroNote } from './HeroNote';
import { ProblemNote } from './ProblemNote';
import { HowItWorksNote } from './HowItWorksNote';
import { ScamScannerNote } from './ScamScannerNote';
import { ReportScamNote } from './ReportScamNote';
import { RecentScamsFeed } from './RecentScamsFeed';
import { LiveStatsNote } from './LiveStatsNote';
import { EmergencyResourcesNote } from './EmergencyResourcesNote';
import { DossierModal } from './DossierModal';
import { Shield, Lock, Eye } from 'lucide-react';

export function InvestigationBoard() {
  const scrollToScan = () => {
    document.getElementById('scam-scanner')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToReport = () => {
    document.getElementById('report-scam')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#05050A] text-white selection:bg-cyan-500 selection:text-black">
      {/* Investigation Pinboard Background: Pure Black with Dark Blue Vignette */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(#0044aa_1px,transparent_1px)] [background-size:28px_28px] opacity-20" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,102,255,0.15),rgba(255,255,255,0))]" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_60%_at_80%_80%,rgba(0,217,255,0.08),rgba(255,255,255,0))]" />

      {/* Top Ticker & Navbar */}
      <LiveTicker />
      <Navbar />

      {/* Main Board Container */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-20 z-10">
        {/* Electric Blue & White Investigation Connection Lines */}
        <RedStrings />

        {/* 1. Master Case File: Hero Dossier */}
        <HeroNote onScanClick={scrollToScan} onReportClick={scrollToReport} />

        {/* 2. Problem Intelligence & How It Works Protocol */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start relative z-10">
          <div className="flex justify-center lg:justify-end">
            <ProblemNote />
          </div>
          <div className="flex justify-center lg:justify-start">
            <HowItWorksNote />
          </div>
        </div>

        {/* 3. Interactive AI Forensic Scanner & Report Threat Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start relative z-10">
          <div className="flex justify-center lg:justify-end">
            <ScamScannerNote />
          </div>
          <div className="flex justify-center lg:justify-start">
            <ReportScamNote />
          </div>
        </div>

        {/* 4. Flagged Evidence Repository & Dossier Feed */}
        <div className="relative z-10">
          <RecentScamsFeed />
        </div>

        {/* 5. Live Network Metrics & Emergency Resources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start relative z-10">
          <div className="flex justify-center lg:justify-end">
            <LiveStatsNote />
          </div>
          <div className="flex justify-center lg:justify-start">
            <EmergencyResourcesNote />
          </div>
        </div>

        {/* Detective Caseboard Footer */}
        <footer className="pt-12 border-t border-zinc-900 font-mono text-xs text-zinc-500 text-center space-y-4 relative z-10">
          <div className="flex flex-wrap items-center justify-center gap-6 text-zinc-400">
            <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <Shield className="w-4 h-4 text-cyan-400" /> DECENTRALIZED THREAT INTELLIGENCE
            </span>
            <span className="flex items-center gap-1.5 text-white font-bold">
              <Lock className="w-4 h-4 text-cyan-400" /> ZERO-LOG VERIFICATION
            </span>
            <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <Eye className="w-4 h-4 text-cyan-400" /> 24/7 ACTIVE WATCHDOGS
            </span>
          </div>
          <p className="max-w-xl mx-auto text-zinc-500 font-sans text-[11px]">
            ScamShield is an open-source cybersecurity and anti-fraud surveillance initiative. Always independently verify suspicious communications before executing financial transactions.
          </p>
          <div className="text-[10px] text-zinc-600">
            © 2026 SCAMSHIELD TASKFORCE // FORENSIC CASEBOARD ENGINE
          </div>
        </footer>
      </main>

      {/* Unfoldable Case Dossier Modal */}
      <DossierModal />
    </div>
  );
}

'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useAppStore } from '@/store/useAppStore';
import { InvestigationBoard } from '@/components/board/InvestigationBoard';

// Dynamic import of 3D Canvas with ssr: false to prevent hydration mismatch
const CameraCanvas = dynamic(
  () => import('@/components/camera/CameraCanvas').then((mod) => mod.CameraCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen bg-[#05050A] flex flex-col items-center justify-center font-mono text-xs text-cyan-400 gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
        <span>INITIALIZING 3D OPTICAL SENSOR...</span>
      </div>
    ),
  }
);

export default function Home() {
  const { scene } = useAppStore();

  return (
    <div className="relative w-full min-h-screen bg-[#05050A] overflow-x-hidden">
      {/* Scene 1: Camera Intro */}
      {scene !== 'board' && (
        <div className="fixed inset-0 z-30">
          <CameraCanvas />
        </div>
      )}

      {/* Scene 2: Investigation Board (Main Site) */}
      {scene === 'board' && (
        <div className="relative z-10 animate-in fade-in duration-700">
          <InvestigationBoard />
        </div>
      )}
    </div>
  );
}

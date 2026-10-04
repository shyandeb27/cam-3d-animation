'use client';

import React from 'react';

interface PinProps {
  type?: 'red-pin' | 'blue-pin' | 'tape-top' | 'tape-corners' | 'none';
  className?: string;
}

export function PinAndTape({ type = 'blue-pin', className = '' }: PinProps) {
  if (type === 'none') return null;

  if (type === 'red-pin' || type === 'blue-pin') {
    return (
      <div className={`absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center ${className}`}>
        {/* Chrome & Dark Blue Pushpin Head */}
        <div className="relative">
          <div className="w-5 h-5 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.8)] flex items-center justify-center border bg-gradient-to-br from-cyan-300 via-blue-700 to-slate-900 border-cyan-400/80 shadow-[0_0_12px_rgba(0,217,255,0.6)]">
            {/* Specular Highlight */}
            <div className="w-1.5 h-1.5 rounded-full bg-white absolute top-1 left-1" />
          </div>
          {/* Pushpin Needle shadow */}
          <div className="w-1 h-2 bg-black mx-auto -mt-0.5 rounded-b-full opacity-70" />
        </div>
      </div>
    );
  }

  if (type === 'tape-top') {
    return (
      <div className={`absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none ${className}`}>
        <div className="w-24 h-6 bg-blue-900/30 backdrop-blur-[2px] border border-cyan-400/30 -rotate-2 shadow-sm rounded-[2px]" />
      </div>
    );
  }

  if (type === 'tape-corners') {
    return (
      <>
        <div className={`absolute -top-2.5 -left-3.5 z-20 pointer-events-none -rotate-45 ${className}`}>
          <div className="w-14 h-5 bg-blue-900/30 backdrop-blur-[2px] border border-cyan-400/30 shadow-sm rounded-[2px]" />
        </div>
        <div className={`absolute -bottom-2.5 -right-3.5 z-20 pointer-events-none -rotate-45 ${className}`}>
          <div className="w-14 h-5 bg-blue-900/30 backdrop-blur-[2px] border border-cyan-400/30 shadow-sm rounded-[2px]" />
        </div>
      </>
    );
  }

  return null;
}

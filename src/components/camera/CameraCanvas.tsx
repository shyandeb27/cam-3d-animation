'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { ProceduralCamera } from './ProceduralCamera';
import { CameraLights } from './CameraLights';
import { PostEffects } from './PostEffects';
import { CameraHUD } from './CameraHUD';
import { useAppStore } from '@/store/useAppStore';
import { sounds } from '@/components/audio/soundEffects';

export function CameraCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartYRef = useRef<number | null>(null);

  const {
    openProgress,
    setOpenProgress,
    setCursorNormalized,
    triggerFlyThrough,
    isTransitioning,
    scene,
    isMuted
  } = useAppStore();

  const handleProgressUpdate = useCallback(
    (newVal: number) => {
      const clamped = Math.max(0, Math.min(1, newVal));
      setOpenProgress(clamped);

      if (!isMuted && Math.abs(clamped - openProgress) > 0.02) {
        sounds.playApertureTick(clamped);
      }

      if (clamped >= 1 && !isTransitioning && scene === 'camera') {
        if (!isMuted) {
          sounds.playShutterSnap();
          sounds.playFlyThroughWhoosh();
        }
        triggerFlyThrough();
      }
    },
    [openProgress, isMuted, isTransitioning, scene, setOpenProgress, triggerFlyThrough]
  );

  // Mouse move handler for normalized cursor and cursor vertical opening
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth) * 2 - 1;
      const normY = (e.clientY / innerHeight) * 2 - 1;
      setCursorNormalized({ x: normX, y: normY });

      // Cursor vertical position mapping: moving cursor towards lower half of screen opens aperture
      // Y from -1 (top) to +1 (bottom) -> map to progress 0 to 1
      const cursorProgress = Math.max(0, Math.min(1, (normY + 0.65) / 1.5));
      if (dragStartYRef.current === null && !isTransitioning && scene === 'camera') {
        handleProgressUpdate(Math.max(openProgress, cursorProgress));
      }
    };

    // Wheel event handler for scrolling to open
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning || scene !== 'camera') return;
      e.preventDefault();
      const delta = e.deltaY * 0.0015;
      const nextProgress = Math.max(0, Math.min(1, openProgress + delta));
      handleProgressUpdate(nextProgress);
    };

    // Keyboard handlers
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning || scene !== 'camera') return;
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = Math.min(1, openProgress + 0.25);
        handleProgressUpdate(next);
        if (next >= 1) {
          if (!isMuted) {
            sounds.playShutterSnap();
            sounds.playFlyThroughWhoosh();
          }
          triggerFlyThrough();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        handleProgressUpdate(Math.max(0, openProgress - 0.25));
      }
    };

    // Touch events for mobile
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isTransitioning || scene !== 'camera' || e.touches.length === 0) return;
      const currentY = e.touches[0].clientY;
      const diff = (currentY - touchStartY) * 0.003;
      handleProgressUpdate(Math.max(0, Math.min(1, openProgress + diff)));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [openProgress, isTransitioning, scene, setCursorNormalized, handleProgressUpdate, triggerFlyThrough, isMuted]);

  // Click & drag push-forward interaction on canvas container
  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartYRef.current = e.clientY;
  };

  const handleMouseUp = () => {
    dragStartYRef.current = null;
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className="relative w-full h-screen overflow-hidden bg-[#05050A] select-none cursor-grab active:cursor-grabbing"
    >
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false,
        }}
        dpr={[1, 2]} // Performance capped
        className="w-full h-full"
      >
        <color attach="background" args={['#05050A']} />
        <CameraLights />
        <ProceduralCamera openProgress={openProgress} />
        <PostEffects />
      </Canvas>

      {/* 2D Viewfinder HUD Overlay */}
      <CameraHUD />
    </div>
  );
}

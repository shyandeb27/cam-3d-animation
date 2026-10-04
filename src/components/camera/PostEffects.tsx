'use client';

import React from 'react';
import * as THREE from 'three';
import { EffectComposer, Bloom, ChromaticAberration, Vignette, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useAppStore } from '@/store/useAppStore';

export function PostEffects() {
  const { openProgress, isTransitioning } = useAppStore();

  const bloomIntensity = isTransitioning ? 4.5 : 0.8 + openProgress * 2.2;
  const aberrationOffset = isTransitioning
    ? new THREE.Vector2(0.015, 0.015)
    : new THREE.Vector2(0.001 + openProgress * 0.005, 0.001 + openProgress * 0.005);

  return (
    <EffectComposer multisampling={4}>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.75}
        blendFunction={BlendFunction.SCREEN}
      />
      <ChromaticAberration
        offset={aberrationOffset}
        radialModulation={true}
        modulationOffset={0.25}
      />
      <Vignette
        eskil={false}
        offset={0.15}
        darkness={1.1}
      />
      <Noise
        opacity={0.035}
        blendFunction={BlendFunction.OVERLAY}
      />
    </EffectComposer>
  );
}

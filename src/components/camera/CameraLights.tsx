'use client';

import React from 'react';

export function CameraLights() {
  return (
    <>
      {/* Dark Navy Ambient Tone */}
      <ambientLight intensity={0.4} color="#051026" />

      {/* Crisp White Key Light */}
      <directionalLight
        position={[4, 5, 5]}
        intensity={2.4}
        color="#ffffff"
        castShadow
      />

      {/* Electric Blue Rim Light */}
      <directionalLight
        position={[-5, 4, -4]}
        intensity={4.0}
        color="#00D9FF"
      />

      {/* Deep Blue Fill Light from bottom */}
      <pointLight
        position={[-3, -3, 2]}
        intensity={1.5}
        color="#0044AA"
        distance={8}
      />

      {/* Crisp White Top Specular Highlight */}
      <pointLight
        position={[0, 4, 1]}
        intensity={1.2}
        color="#ffffff"
        distance={6}
      />
    </>
  );
}

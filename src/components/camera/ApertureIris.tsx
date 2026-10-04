'use client';

import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface ApertureIrisProps {
  openProgress: number; // 0 (closed) to 1 (fully open)
  bladeCount?: number;
  radius?: number;
}

export function ApertureIris({ openProgress, bladeCount = 10, radius = 0.85 }: ApertureIrisProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bladesRef = useRef<THREE.Mesh[]>([]);

  // Create blade geometry: an elongated wedge / curved trapezoid blade
  const bladeGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const length = radius * 1.35;
    const width = radius * 0.72;

    // Curved iris blade shape
    shape.moveTo(0, 0);
    shape.lineTo(length * 0.85, width * 0.35);
    shape.quadraticCurveTo(length * 1.05, width * 0.65, length * 0.95, width * 0.95);
    shape.lineTo(length * 0.25, width * 0.85);
    shape.quadraticCurveTo(0, width * 0.45, 0, 0);

    const extrudeSettings = {
      depth: 0.012,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.003,
      bevelThickness: 0.003,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, [radius]);

  // High-tech graphite metal material with subtle anisotropic sheen
  const bladeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#111317'),
      metalness: 0.92,
      roughness: 0.28,
      bumpScale: 0.05,
    });
  }, []);

  // Blade pivot points arranged symmetrically around the barrel rim
  const bladeTransforms = useMemo(() => {
    const items = [];
    for (let i = 0; i < bladeCount; i++) {
      const angle = (i / bladeCount) * Math.PI * 2;
      const pivotRadius = radius * 0.82;
      const posX = Math.cos(angle) * pivotRadius;
      const posY = Math.sin(angle) * pivotRadius;
      items.push({
        baseAngle: angle,
        posX,
        posY,
      });
    }
    return items;
  }, [bladeCount, radius]);

  useFrame(() => {
    // Dynamically pivot each blade based on openProgress
    // Closed (0): blades rotated inward, blocking the center
    // Open (1): blades rotated outward against the barrel wall
    const minRot = -0.05;
    const maxRot = 0.82;
    const currentRot = minRot + openProgress * (maxRot - minRot);

    bladesRef.current.forEach((blade, index) => {
      if (!blade) return;
      const { baseAngle } = bladeTransforms[index];
      // Tangential angle + dynamic rotation
      blade.rotation.z = baseAngle + Math.PI / 2 + currentRot;
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, 0.42]}>
      {/* Outer retaining collar ring */}
      <mesh position={[0, 0, -0.01]}>
        <ringGeometry args={[radius * 0.75, radius * 1.15, 32]} />
        <meshStandardMaterial color="#0b0c10" metalness={0.85} roughness={0.3} />
      </mesh>

      {/* Radial Iris Blades */}
      {bladeTransforms.map((t, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) bladesRef.current[i] = el;
          }}
          geometry={bladeGeometry}
          material={bladeMaterial}
          position={[t.posX, t.posY, i * 0.001]} // slight z-layering to prevent z-fighting
        />
      ))}
    </group>
  );
}

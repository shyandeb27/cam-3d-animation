'use client';

import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { ApertureIris } from './ApertureIris';
import { useAppStore } from '@/store/useAppStore';

interface ProceduralCameraProps {
  openProgress: number;
}

export function ProceduralCamera({ openProgress }: ProceduralCameraProps) {
  const cameraRigRef = useRef<THREE.Group>(null);
  const bodyGroupRef = useRef<THREE.Group>(null);
  const lensBarrelRef = useRef<THREE.Group>(null);
  const focusRingRef = useRef<THREE.Group>(null);
  const apertureRingRef = useRef<THREE.Group>(null);
  const frontElementRef = useRef<THREE.Group>(null);
  const glowLightRef = useRef<THREE.PointLight>(null);
  const glowMeshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const { cursorNormalized, isTransitioning, scene } = useAppStore();

  // Strict 3-Color Materials: Black, Dark Blue, White
  const materials = useMemo(() => {
    // Pure Matte Black magnesium alloy chassis
    const bodyMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#080a10'),
      metalness: 0.85,
      roughness: 0.25,
    });

    // Dark Blue anodized metal
    const darkBlueMetalMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0a1b33'),
      metalness: 0.95,
      roughness: 0.15,
    });

    // Knurled grip rubber
    const gripMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#040508'),
      metalness: 0.15,
      roughness: 0.9,
    });

    // White / Chrome highlights
    const chromeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#ffffff'),
      metalness: 0.98,
      roughness: 0.1,
    });

    // Dark Blue / Cyan-Blue LED
    const blueLedMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#00D9FF'),
      emissive: new THREE.Color('#0088FF'),
      emissiveIntensity: 1.8,
      metalness: 0.5,
      roughness: 0.1,
    });

    // Optical Glass front element (icy clear blue-white)
    const lensGlassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#e0f2fe'),
      transmission: 0.96,
      opacity: 1,
      transparent: true,
      roughness: 0.03,
      ior: 1.55,
      reflectivity: 0.95,
      thickness: 0.7,
      attenuationColor: new THREE.Color('#0055FF'),
      attenuationDistance: 1.5,
    });

    return { bodyMat, darkBlueMetalMat, gripMat, chromeMat, blueLedMat, lensGlassMat };
  }, []);

  // Ambient floating particles (blue & white sparks)
  const particleGeo = useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 6;
      positions[i + 2] = (Math.random() - 0.5) * 6 + 1;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  // Frame loop
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (bodyGroupRef.current) {
      if (!isTransitioning && scene === 'camera') {
        // Front-facing alignment with subtle responsive cursor parallax
        const targetRotY = cursorNormalized.x * 0.12;
        const targetRotX = -cursorNormalized.y * 0.08;

        bodyGroupRef.current.rotation.y = THREE.MathUtils.lerp(bodyGroupRef.current.rotation.y, targetRotY, delta * 5);
        bodyGroupRef.current.rotation.x = THREE.MathUtils.lerp(bodyGroupRef.current.rotation.x, targetRotX, delta * 5);

        // Gentle breathing float
        bodyGroupRef.current.position.y = Math.sin(time * 1.2) * 0.03;
        bodyGroupRef.current.position.z = THREE.MathUtils.lerp(bodyGroupRef.current.position.z, openProgress * 0.35, delta * 5);
      } else if (isTransitioning || scene === 'transitioning') {
        // Rapid forward zoom into the lens center
        bodyGroupRef.current.position.z += delta * 20;
        bodyGroupRef.current.scale.x += delta * 0.8;
        bodyGroupRef.current.scale.y += delta * 0.8;
      }
    }

    // PROPER LENS ROTATION:
    // As openProgress changes, the lens barrel rings visibly rotate around the Z axis
    const barrelRotationZ = openProgress * Math.PI * 0.75 + Math.sin(time * 0.3) * 0.04;
    const focusRingRotationZ = -openProgress * Math.PI * 0.5;

    if (lensBarrelRef.current) {
      lensBarrelRef.current.rotation.z = THREE.MathUtils.lerp(lensBarrelRef.current.rotation.z, barrelRotationZ, delta * 6);
    }
    if (focusRingRef.current) {
      focusRingRef.current.rotation.z = THREE.MathUtils.lerp(focusRingRef.current.rotation.z, focusRingRotationZ, delta * 6);
    }
    if (apertureRingRef.current) {
      apertureRingRef.current.rotation.z = THREE.MathUtils.lerp(apertureRingRef.current.rotation.z, barrelRotationZ * 1.3, delta * 6);
    }

    // Dynamic internal lens glow
    if (glowLightRef.current && glowMeshRef.current) {
      const pulse = 0.5 + Math.sin(time * 2.5) * 0.2;
      const baseIntensity = 1.0 + pulse * 0.6;
      const openBurst = Math.pow(openProgress, 2) * 16;
      const totalIntensity = baseIntensity + openBurst;

      glowLightRef.current.intensity = totalIntensity;
      const emissiveMat = glowMeshRef.current.material as THREE.MeshBasicMaterial;
      if (emissiveMat) {
        const glowColor = new THREE.Color().setHSL(
          0.58, // Dark Blue to Cyan
          0.85,
          0.45 + openProgress * 0.55
        );
        emissiveMat.color = glowColor;
      }
    }

    // Drift particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.02;
    }
  });

  return (
    <group ref={cameraRigRef} position={[0, 0, 0]}>
      {/* Background Floating Particles */}
      <points ref={particlesRef} geometry={particleGeo}>
        <pointsMaterial
          size={0.03}
          color="#00D9FF"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Main Front-Facing Camera Model */}
      <group ref={bodyGroupRef} position={[0, 0, 0]}>
        {/* ================= CAMERA BODY CHASSIS ================= */}
        {/* Main Body Chassis */}
        <mesh position={[0, 0, -1.05]} material={materials.bodyMat}>
          <boxGeometry args={[3.2, 2.0, 1.1]} />
        </mesh>

        {/* Viewfinder Prism Top Hump */}
        <mesh position={[0, 1.2, -1.0]} material={materials.bodyMat}>
          <cylinderGeometry args={[0.55, 0.75, 0.5, 4]} />
        </mesh>

        {/* Cold Shoe Mount */}
        <mesh position={[0, 1.48, -1.0]} material={materials.chromeMat}>
          <boxGeometry args={[0.42, 0.08, 0.42]} />
        </mesh>

        {/* Handgrip Rubber (Right Side) */}
        <mesh position={[1.4, -0.05, -0.8]} material={materials.gripMat}>
          <boxGeometry args={[0.45, 1.7, 0.85]} />
        </mesh>

        {/* Shutter Button with Dark Blue Collar */}
        <mesh position={[1.25, 1.05, -0.85]} material={materials.darkBlueMetalMat}>
          <cylinderGeometry args={[0.18, 0.18, 0.08, 24]} />
        </mesh>
        <mesh position={[1.25, 1.12, -0.85]} material={materials.chromeMat}>
          <cylinderGeometry args={[0.14, 0.14, 0.09, 24]} />
        </mesh>

        {/* Top Control Dial */}
        <mesh position={[-1.1, 1.06, -1.0]} material={materials.chromeMat}>
          <cylinderGeometry args={[0.3, 0.3, 0.14, 28]} />
        </mesh>

        {/* Front Tally LED (Electric Blue) */}
        <mesh position={[-1.2, 0.65, -0.45]} material={materials.blueLedMat}>
          <sphereGeometry args={[0.045, 16, 16]} />
        </mesh>

        {/* ================= LENS BARREL ASSEMBLY (ROTATING) ================= */}
        {/* Stationary Lens Base Flange */}
        <mesh position={[0, 0, -0.45]} material={materials.darkBlueMetalMat} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.24, 1.28, 0.25, 48]} />
        </mesh>

        {/* Rotating Outer Lens Group */}
        <group ref={lensBarrelRef}>
          {/* Lens Barrel Body */}
          <mesh position={[0, 0, -0.05]} material={materials.bodyMat} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[1.16, 1.2, 0.6, 48]} />
          </mesh>

          {/* Lens Barrel White Index Stripe */}
          <mesh position={[0, 1.18, -0.05]} material={materials.chromeMat}>
            <boxGeometry args={[0.03, 0.06, 0.55]} />
          </mesh>
        </group>

        {/* Rotating Focus / Zoom Grip Ring (Counter-rotates) */}
        <group ref={focusRingRef}>
          <mesh position={[0, 0, 0.18]} material={materials.gripMat} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[1.2, 1.2, 0.35, 48]} />
          </mesh>
          {/* Radial Ridges on Focus Ring */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
            <mesh
              key={i}
              position={[
                Math.cos((deg * Math.PI) / 180) * 1.21,
                Math.sin((deg * Math.PI) / 180) * 1.21,
                0.18,
              ]}
              rotation={[0, 0, (deg * Math.PI) / 180]}
              material={materials.chromeMat}
            >
              <boxGeometry args={[0.02, 0.04, 0.32]} />
            </mesh>
          ))}
        </group>

        {/* Rotating Aperture Index Ring */}
        <group ref={apertureRingRef}>
          <mesh position={[0, 0, 0.42]} material={materials.darkBlueMetalMat} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[1.14, 1.16, 0.18, 48]} />
          </mesh>
          {/* F-stop white tick marks around the ring */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
            <mesh
              key={i}
              position={[
                Math.cos((deg * Math.PI) / 180) * 1.15,
                Math.sin((deg * Math.PI) / 180) * 1.15,
                0.42,
              ]}
              rotation={[0, 0, (deg * Math.PI) / 180]}
              material={materials.chromeMat}
            >
              <boxGeometry args={[0.025, 0.05, 0.12]} />
            </mesh>
          ))}
        </group>

        {/* Front Housing Bezel Ring */}
        <group ref={frontElementRef}>
          <mesh position={[0, 0, 0.65]} material={materials.darkBlueMetalMat} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[1.1, 1.14, 0.3, 48, 1, true]} />
          </mesh>

          {/* Glowing Front Ring Accent (Electric Blue / White) */}
          <mesh position={[0, 0, 0.72]}>
            <torusGeometry args={[1.04, 0.02, 16, 64]} />
            <meshStandardMaterial
              color="#00D9FF"
              emissive="#0088FF"
              emissiveIntensity={1.5 + openProgress * 2.5}
            />
          </mesh>

          {/* Front Convex Glass Element */}
          <mesh position={[0, 0, 0.68]} material={materials.lensGlassMat}>
            <sphereGeometry args={[1.0, 36, 18, 0, Math.PI * 2, 0, 0.75]} />
          </mesh>

          {/* Inner Glass Element */}
          <mesh position={[0, 0, 0.25]} material={materials.lensGlassMat} rotation={[Math.PI, 0, 0]}>
            <sphereGeometry args={[0.92, 32, 16, 0, Math.PI * 2, 0, 0.6]} />
          </mesh>
        </group>

        {/* ================= ANIMATABLE APERTURE IRIS ================= */}
        <ApertureIris openProgress={openProgress} bladeCount={10} radius={0.84} />

        {/* ================= INTERNAL OPTICAL GLOW CORE ================= */}
        <group position={[0, 0, 0.05]}>
          <pointLight
            ref={glowLightRef}
            color={new THREE.Color('#00D9FF')}
            intensity={2}
            distance={5}
            decay={1.8}
          />
          <mesh ref={glowMeshRef} position={[0, 0, -0.15]}>
            <sphereGeometry args={[0.38, 32, 32]} />
            <meshBasicMaterial color="#0055FF" />
          </mesh>
          <mesh position={[0, 0, 0.18]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.8, 0.25, 0.5, 32, 1, true]} />
            <meshBasicMaterial
              color="#00D9FF"
              transparent
              opacity={0.15 + openProgress * 0.45}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

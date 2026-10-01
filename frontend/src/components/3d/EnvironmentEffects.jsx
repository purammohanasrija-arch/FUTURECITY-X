import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCity } from '../../context/CityContext';
import * as THREE from 'three';

export function EnvironmentEffects() {
  const { weather, timeOfDay, isNight } = useCity();
  const mode = weather?.mode || 'Sunny';

  const isRaining = mode === 'Rain' || mode === 'Storm';
  const isStorm = mode === 'Storm';

  // Rain Particles
  const rainCount = isStorm ? 1800 : isRaining ? 1000 : 0;
  const rainPositions = useMemo(() => {
    if (!isRaining) return new Float32Array(0);
    const pos = new Float32Array(rainCount * 3);
    for (let i = 0; i < rainCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = Math.random() * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    return pos;
  }, [rainCount, isRaining]);

  const rainRef = useRef();
  const lightningLightRef = useRef();

  useFrame((state, delta) => {
    // Animate falling rain
    if (rainRef.current && isRaining) {
      const positions = rainRef.current.geometry.attributes.position.array;
      const speed = isStorm ? 38 : 25;
      for (let i = 0; i < rainCount; i++) {
        positions[i * 3 + 1] -= speed * delta;
        if (positions[i * 3 + 1] < 0) {
          positions[i * 3 + 1] = 40;
        }
      }
      rainRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Animate lightning flash in storm mode
    if (lightningLightRef.current && isStorm) {
      const shouldFlash = Math.random() < 0.02; // Occasional random lightning spike
      lightningLightRef.current.intensity = shouldFlash ? 8.0 : 0.0;
    }
  });

  return (
    <group>
      {/* Falling Rain Particles */}
      {isRaining && (
        <points ref={rainRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={rainCount}
              array={rainPositions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            color="#88ccff"
            size={0.15}
            transparent
            opacity={0.7}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}

      {/* Storm Lightning Flash Light */}
      {isStorm && (
        <directionalLight
          ref={lightningLightRef}
          position={[0, 50, 0]}
          color="#d0e8ff"
          intensity={0}
        />
      )}

      {/* Atmospheric Fog controlled by weather mode */}
      <fog
        attach="fog"
        args={[
          mode === 'Fog' ? '#091322' : isNight ? '#02050c' : '#050c1e',
          mode === 'Fog' ? 10 : 35,
          mode === 'Fog' ? 55 : 120,
        ]}
      />
    </group>
  );
}

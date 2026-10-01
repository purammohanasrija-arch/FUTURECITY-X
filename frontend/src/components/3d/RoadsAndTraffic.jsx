import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCity } from '../../context/CityContext';
import * as THREE from 'three';

export function RoadsAndTraffic() {
  const { telemetry, weather } = useCity();

  // Traffic density factor (from 0 to 100, default 65)
  const density = telemetry?.traffic?.densityControl || 65;
  const isBadWeather = weather?.mode === 'Rain' || weather?.mode === 'Storm';

  // Base road definitions
  const roads = [
    // Main North-South corridors
    { pos: [0, 0.05, 0], rot: [0, 0, 0], length: 80, width: 2.4, color: '#ffaa00' },
    { pos: [-15, 0.05, 0], rot: [0, 0, 0], length: 80, width: 2.2, color: '#00ff9d' },
    { pos: [15, 0.05, 0], rot: [0, 0, 0], length: 80, width: 2.2, color: '#ff3344' },

    // Main East-West corridors
    { pos: [0, 0.05, 0], rot: [0, Math.PI / 2, 0], length: 80, width: 2.4, color: '#00ff9d' },
    { pos: [0, 0.05, -15], rot: [0, Math.PI / 2, 0], length: 80, width: 2.2, color: '#ffaa00' },
    { pos: [0, 0.05, 15], rot: [0, Math.PI / 2, 0], length: 80, width: 2.2, color: '#00ff9d' },

    // Elevated Bridge #12 (Apex Skyway)
    { pos: [0, 2.5, 0], rot: [0, Math.PI / 4, 0], length: 50, width: 1.8, color: '#00f0ff' },
  ];

  // Vehicles pool
  const vehicleCount = Math.round(18 + (density / 100) * 36);

  const initialVehicles = useMemo(() => {
    const list = [];
    const types = ['car', 'bus', 'taxi', 'ambulance'];
    const lanes = [-15, 0, 15];

    for (let i = 0; i < 55; i++) {
      const type = i % 12 === 0 ? 'ambulance' : i % 5 === 0 ? 'bus' : i % 3 === 0 ? 'taxi' : 'car';
      const isEastWest = i % 2 === 0;
      const lane = lanes[i % lanes.length];
      const offset = (Math.random() - 0.5) * 70;
      const baseSpeed = (0.15 + Math.random() * 0.15) * (type === 'bus' ? 0.7 : type === 'ambulance' ? 1.4 : 1.0);

      list.push({
        id: i,
        type,
        isEastWest,
        lane,
        offset,
        speed: baseSpeed,
        direction: Math.random() > 0.5 ? 1 : -1,
        color: type === 'ambulance' ? '#ffffff' : type === 'taxi' ? '#ffaa00' : type === 'bus' ? '#a855f7' : '#00f0ff',
        sirenState: false,
      });
    }
    return list;
  }, []);

  const vehiclesRef = useRef(initialVehicles);
  const meshGroupRef = useRef();

  useFrame((state, delta) => {
    if (!meshGroupRef.current) return;

    const weatherSpeedMod = isBadWeather ? 0.65 : 1.0;
    const densitySpeedMod = density > 80 ? 0.6 : density > 50 ? 0.9 : 1.1;
    const finalSpeedMultiplier = weatherSpeedMod * densitySpeedMod;

    const children = meshGroupRef.current.children;
    const vList = vehiclesRef.current;

    for (let i = 0; i < vehicleCount && i < children.length; i++) {
      const v = vList[i];
      const mesh = children[i];

      v.offset += v.speed * v.direction * finalSpeedMultiplier;

      // Wrap around road bounds
      if (v.offset > 40) v.offset = -40;
      if (v.offset < -40) v.offset = 40;

      if (v.isEastWest) {
        mesh.position.set(v.offset, 0.18, v.lane + (v.direction > 0 ? 0.45 : -0.45));
        mesh.rotation.set(0, v.direction > 0 ? 0 : Math.PI, 0);
      } else {
        mesh.position.set(v.lane + (v.direction > 0 ? 0.45 : -0.45), 0.18, v.offset);
        mesh.rotation.set(0, v.direction > 0 ? Math.PI / 2 : -Math.PI / 2, 0);
      }

      // Flash ambulance siren
      if (v.type === 'ambulance' && mesh.children[1]) {
        mesh.children[1].material.color.set(Math.sin(state.clock.elapsedTime * 12) > 0 ? '#ff1133' : '#0099ff');
      }
    }
  });

  return (
    <group>
      {/* Road Ribbons */}
      {roads.map((r, i) => (
        <group key={`rd-${i}`} position={r.pos} rotation={r.rot}>
          {/* Road Asphalt Bed */}
          <mesh receiveShadow>
            <planeGeometry args={[r.width, r.length]} />
            <meshStandardMaterial color="#090d1a" roughness={0.7} metalness={0.2} />
          </mesh>

          {/* Road Glowing Centerline Divider */}
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[0.08, r.length]} />
            <meshBasicMaterial color={r.color} transparent opacity={0.65} />
          </mesh>

          {/* Elevated Bridge Pillars if Skyway */}
          {r.pos[1] > 1 && (
            <group>
              {[-18, -6, 6, 18].map((pX, pIdx) => (
                <mesh key={pIdx} position={[0, pX, -r.pos[1] / 2]}>
                  <cylinderGeometry args={[0.25, 0.35, r.pos[1], 8]} />
                  <meshStandardMaterial color="#1e293b" metalness={0.8} />
                </mesh>
              ))}
            </group>
          )}
        </group>
      ))}

      {/* Moving Vehicles Pool */}
      <group ref={meshGroupRef}>
        {initialVehicles.slice(0, vehicleCount).map((v) => {
          const vWidth = v.type === 'bus' ? 0.9 : 0.6;
          const vLength = v.type === 'bus' ? 2.2 : v.type === 'ambulance' ? 1.4 : 1.1;
          const vHeight = v.type === 'bus' ? 0.7 : 0.45;

          return (
            <group key={`v-${v.id}`}>
              {/* Vehicle Body */}
              <mesh position={[0, vHeight / 2, 0]}>
                <boxGeometry args={[vLength, vHeight, vWidth]} />
                <meshStandardMaterial
                  color={v.color}
                  metalness={0.7}
                  roughness={0.3}
                  emissive={v.color}
                  emissiveIntensity={0.4}
                />
              </mesh>

              {/* Headlights and Sirens */}
              <mesh position={[vLength / 2 + 0.05, vHeight * 0.4, 0]}>
                <boxGeometry args={[0.08, 0.12, vWidth * 0.7]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>

              {/* Ambulance Flashing Beacon on roof */}
              {v.type === 'ambulance' && (
                <mesh position={[0, vHeight + 0.12, 0]}>
                  <cylinderGeometry args={[0.1, 0.1, 0.16, 8]} />
                  <meshBasicMaterial color="#ff1133" />
                </mesh>
              )}
            </group>
          );
        })}
      </group>
    </group>
  );
}

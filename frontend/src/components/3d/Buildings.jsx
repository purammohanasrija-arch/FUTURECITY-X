import React, { useState, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCity } from '../../context/CityContext';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import {
  getSkyscraperTexture,
  getHospitalTexture,
  getHelipadTexture,
  getSolarPanelTexture,
  getWaterTexture,
  getIndustrialFacadeTexture,
} from './textureUtils';

// ==========================================
// 1. REALISTIC PROCEDURAL TREE (PARKS)
// ==========================================
function Tree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.14, 1.2, 6]} />
        <meshStandardMaterial color="#451a03" roughness={0.9} />
      </mesh>
      {/* Tiered Foliage Cones / Spheres */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <coneGeometry args={[0.7, 1.0, 7]} />
        <meshStandardMaterial color="#15803d" roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.9, 0]} castShadow>
        <coneGeometry args={[0.55, 0.9, 7]} />
        <meshStandardMaterial color="#16a34a" roughness={0.7} />
      </mesh>
      <mesh position={[0, 2.4, 0]} castShadow>
        <coneGeometry args={[0.38, 0.7, 7]} />
        <meshStandardMaterial color="#22c55e" roughness={0.7} />
      </mesh>
    </group>
  );
}

// ==========================================
// 2. REALISTIC SKYSCRAPER ARCHITECTURE
// ==========================================
function SkyscraperBuilding({ obj, isHovered, isSelected, isNight, beaconRef }) {
  const height = obj.floors ? obj.floors * 0.45 : 22;
  const width = 4.2;
  const depth = 4.2;
  const theme = obj.id.includes('2') || obj.id.includes('4') ? 'gold' : 'cyan';
  const facadeTex = useMemo(() => getSkyscraperTexture(theme), [theme]);
  const helipadTex = useMemo(() => getHelipadTexture(), []);

  const hasHelipad = obj.floors >= 50 || obj.id === 'bld-hq-1';
  const podiumHeight = 2.4;
  const towerHeight = height - podiumHeight;
  const setbackHeight = towerHeight * 0.28;
  const mainShaftHeight = towerHeight - setbackHeight;

  return (
    <group>
      {/* Multi-Tier Podium (Grand Lobby Base) */}
      <mesh position={[0, podiumHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width * 1.25, podiumHeight, depth * 1.25]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>
      {/* Glass Entrance Canopy */}
      <mesh position={[0, 1.1, depth * 0.65]}>
        <boxGeometry args={[2.2, 0.1, 1.0]} />
        <meshStandardMaterial color="#00f0ff" transparent opacity={0.6} />
      </mesh>

      {/* Main Tower Shaft with Architectural Window Grid Texture */}
      <mesh position={[0, podiumHeight + mainShaftHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, mainShaftHeight, depth]} />
        <meshStandardMaterial
          map={facadeTex}
          roughness={0.25}
          metalness={0.85}
          emissive={isNight ? '#38bdf8' : '#0369a1'}
          emissiveIntensity={isNight ? 0.35 : 0.08}
        />
      </mesh>

      {/* Setback Upper Terrace Tier */}
      <mesh
        position={[0, podiumHeight + mainShaftHeight + setbackHeight / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[width * 0.78, setbackHeight, depth * 0.78]} />
        <meshStandardMaterial
          map={facadeTex}
          roughness={0.25}
          metalness={0.85}
          emissive={isNight ? '#38bdf8' : '#0369a1'}
          emissiveIntensity={isNight ? 0.4 : 0.1}
        />
      </mesh>

      {/* Rooftop Crown & Mechanical Penthouse (HVAC) */}
      <group position={[0, height, 0]}>
        {/* Parapet Roof Bed */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[width * 0.76, 0.2, depth * 0.76]} />
          <meshStandardMaterial color="#1e293b" roughness={0.8} />
        </mesh>

        {/* HVAC Unit & Louvers */}
        <mesh position={[-0.8, 0.5, -0.6]} castShadow>
          <boxGeometry args={[1.2, 0.7, 1.0]} />
          <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.4} />
        </mesh>
        <mesh position={[-0.8, 0.9, -0.6]}>
          <cylinderGeometry args={[0.3, 0.3, 0.15, 12]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>

        {/* Helipad on top tier if tall tower */}
        {hasHelipad ? (
          <mesh position={[0.4, 0.22, 0.4]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.8, 1.8]} />
            <meshStandardMaterial map={helipadTex} roughness={0.7} />
          </mesh>
        ) : (
          <mesh position={[0.6, 0.45, 0.6]} castShadow>
            <boxGeometry args={[0.8, 0.6, 0.8]} />
            <meshStandardMaterial color="#475569" />
          </mesh>
        )}

        {/* Rooftop Communications Spire / Antenna with Aviation Beacon */}
        <mesh position={[0, 2.5, 0]}>
          <cylinderGeometry args={[0.04, 0.14, 5, 8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Flashing Red Beacon */}
        <mesh ref={beaconRef} position={[0, 5.05, 0]}>
          <sphereGeometry args={[0.16, 8, 8]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
      </group>
    </group>
  );
}

// ==========================================
// 3. REALISTIC HOSPITAL COMPLEX
// ==========================================
function HospitalBuilding({ obj, isHovered, isSelected, isNight }) {
  const hospitalTex = useMemo(() => getHospitalTexture(), []);
  const helipadTex = useMemo(() => getHelipadTexture(), []);
  const mainHeight = 9.5;
  const wingHeight = 6.0;

  return (
    <group>
      {/* Main Medical High-Rise Wing */}
      <mesh position={[0, mainHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.8, mainHeight, 3.8]} />
        <meshStandardMaterial
          map={hospitalTex}
          roughness={0.35}
          metalness={0.6}
          emissive={isNight ? '#0284c7' : '#0369a1'}
          emissiveIntensity={isNight ? 0.2 : 0.05}
        />
      </mesh>

      {/* Emergency Trauma Wing (Cross Pavilion) */}
      <mesh position={[2.6, wingHeight / 2, 0.8]} castShadow receiveShadow>
        <boxGeometry args={[3.2, wingHeight, 3.2]} />
        <meshStandardMaterial
          map={hospitalTex}
          roughness={0.35}
          metalness={0.6}
          emissive={isNight ? '#0284c7' : '#0369a1'}
          emissiveIntensity={isNight ? 0.2 : 0.05}
        />
      </mesh>

      {/* Ground-Level Ambulance Drop-Off Bay Canopy */}
      <group position={[0, 0, 2.5]}>
        <mesh position={[0, 1.4, 0]}>
          <boxGeometry args={[3.4, 0.18, 1.6]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.7} />
        </mesh>
        {/* Canopy Pillars */}
        <mesh position={[-1.5, 0.7, 0.6]}>
          <cylinderGeometry args={[0.07, 0.07, 1.4, 8]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[1.5, 0.7, 0.6]}>
          <cylinderGeometry args={[0.07, 0.07, 1.4, 8]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        {/* Illuminated Red "EMERGENCY" Signage Bar */}
        <mesh position={[0, 1.4, 0.82]}>
          <boxGeometry args={[2.4, 0.2, 0.06]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
      </group>

      {/* Rooftop Medical Helipad with Perimeter Lights */}
      <group position={[0, mainHeight, 0]}>
        <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.2, 3.2]} />
          <meshStandardMaterial map={helipadTex} roughness={0.7} />
        </mesh>
        {/* 4 Corner Green/Yellow Helipad Perimeter Beacons */}
        {[[-1.4, -1.4], [1.4, -1.4], [-1.4, 1.4], [1.4, 1.4]].map(([hx, hz], idx) => (
          <mesh key={idx} position={[hx, 0.18, hz]}>
            <sphereGeometry args={[0.08, 6, 6]} />
            <meshBasicMaterial color="#22c55e" />
          </mesh>
        ))}
      </group>

      {/* Big Illuminated 3D Medical Red Cross */}
      <group position={[0, mainHeight + 1.2, 0]}>
        <mesh>
          <boxGeometry args={[1.6, 0.45, 0.3]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
        <mesh>
          <boxGeometry args={[0.45, 1.6, 0.3]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
      </group>
    </group>
  );
}

// ==========================================
// 4. REALISTIC POWER PLANT (COOLING TOWERS & SOLAR)
// ==========================================
function PowerPlantBuilding({ obj, isHovered, isSelected, isNight }) {
  const solarTex = useMemo(() => getSolarPanelTexture(), []);
  const indTex = useMemo(() => getIndustrialFacadeTexture(), []);

  return (
    <group>
      {/* Hyperbolic Industrial Cooling Tower 1 */}
      <group position={[-2.2, 0, -1.2]}>
        <mesh position={[0, 4.0, 0]} castShadow>
          <cylinderGeometry args={[1.5, 2.4, 8, 24, 1, true]} />
          <meshStandardMaterial
            color="#475569"
            roughness={0.7}
            metalness={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Steam Ring Rim */}
        <mesh position={[0, 8.02, 0]}>
          <torusGeometry args={[1.5, 0.12, 8, 24]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
        {/* Glowing Fusion / Vapor Core inside */}
        <mesh position={[0, 4.0, 0]}>
          <cylinderGeometry args={[0.9, 1.2, 6, 16]} />
          <meshBasicMaterial color="#00ff9d" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* Hyperbolic Industrial Cooling Tower 2 */}
      <group position={[2.2, 0, -1.2]}>
        <mesh position={[0, 4.0, 0]} castShadow>
          <cylinderGeometry args={[1.5, 2.4, 8, 24, 1, true]} />
          <meshStandardMaterial
            color="#475569"
            roughness={0.7}
            metalness={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, 8.02, 0]}>
          <torusGeometry args={[1.5, 0.12, 8, 24]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
        <mesh position={[0, 4.0, 0]}>
          <cylinderGeometry args={[0.9, 1.2, 6, 16]} />
          <meshBasicMaterial color="#00ff9d" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* Central Fusion Reactor Dome */}
      <mesh position={[0, 1.8, 1.8]} castShadow>
        <sphereGeometry args={[2.0, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.3}
          metalness={0.9}
          emissive="#00ff9d"
          emissiveIntensity={isNight ? 0.4 : 0.15}
        />
      </mesh>
      {/* Reactor Structural Rings */}
      <mesh position={[0, 1.0, 1.8]}>
        <torusGeometry args={[2.02, 0.08, 8, 32]} />
        <meshBasicMaterial color="#00ff9d" />
      </mesh>

      {/* Generator Turbine Hall with Solar Rooftop Array */}
      <mesh position={[0, 1.5, -2.5]} castShadow receiveShadow>
        <boxGeometry args={[4.8, 3.0, 2.4]} />
        <meshStandardMaterial map={indTex} roughness={0.6} metalness={0.6} />
      </mesh>
      {/* Photovoltaic Array on Turbine Hall Roof */}
      <mesh position={[0, 3.02, -2.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.6, 2.2]} />
        <meshStandardMaterial map={solarTex} roughness={0.3} />
      </mesh>

      {/* Industrial Steam Exhaust Vents */}
      <mesh position={[-1.2, 3.8, -2.5]}>
        <cylinderGeometry args={[0.15, 0.2, 1.6, 8]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} />
      </mesh>
      <mesh position={[1.2, 3.8, -2.5]}>
        <cylinderGeometry args={[0.15, 0.2, 1.6, 8]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} />
      </mesh>
    </group>
  );
}

// ==========================================
// 5. REALISTIC WATER PURIFICATION PLANT
// ==========================================
function WaterPlantBuilding({ obj, isHovered, isSelected, isNight, bridgeRef }) {
  const waterTex = useMemo(() => getWaterTexture(), []);
  const indTex = useMemo(() => getIndustrialFacadeTexture(), []);

  return (
    <group>
      {/* Circular Sedimentation / Clarifier Basin 1 */}
      <group position={[-2.4, 0, 0]}>
        {/* Concrete Tank Basin Rim */}
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[2.5, 2.6, 2.4, 32, 1, true]} />
          <meshStandardMaterial color="#334155" roughness={0.8} side={THREE.DoubleSide} />
        </mesh>
        {/* Water Surface inside Tank */}
        <mesh position={[0, 2.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[2.45, 32]} />
          <meshStandardMaterial
            map={waterTex}
            roughness={0.1}
            metalness={0.2}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Rotating Clarifier Bridge across Basin */}
        <group ref={bridgeRef} position={[0, 2.3, 0]}>
          <mesh>
            <boxGeometry args={[4.8, 0.15, 0.4]} />
            <meshStandardMaterial color="#eab308" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.2, 0.25, 0.6, 8]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        </group>
      </group>

      {/* Circular Clarifier Basin 2 */}
      <group position={[2.4, 0, 0]}>
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[2.2, 2.3, 2.4, 32, 1, true]} />
          <meshStandardMaterial color="#334155" roughness={0.8} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 2.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[2.15, 32]} />
          <meshStandardMaterial
            map={waterTex}
            roughness={0.1}
            metalness={0.2}
            transparent
            opacity={0.85}
          />
        </mesh>
      </group>

      {/* Main Pumping Station Control House */}
      <mesh position={[0, 2.2, -2.6]} castShadow receiveShadow>
        <boxGeometry args={[3.8, 4.4, 2.4]} />
        <meshStandardMaterial map={indTex} roughness={0.5} metalness={0.6} />
      </mesh>

      {/* Water Transfer Manifold Pipes */}
      <mesh position={[-1.2, 1.2, -1.3]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 2.6, 12]} />
        <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1.2, 1.2, -1.3]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 2.6, 12]} />
        <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

// ==========================================
// 6. REALISTIC WASTE RECYCLING & SORTING PLANT
// ==========================================
function WastePlantBuilding({ obj, isHovered, isSelected, isNight }) {
  const indTex = useMemo(() => getIndustrialFacadeTexture(), []);

  return (
    <group>
      {/* Heavy Sorting Industrial Hangar */}
      <mesh position={[0, 2.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.2, 5.2, 3.8]} />
        <meshStandardMaterial map={indTex} roughness={0.6} metalness={0.5} />
      </mesh>

      {/* Truck Loading Dock Bays */}
      <mesh position={[0, 1.0, 1.95]}>
        <boxGeometry args={[4.4, 2.0, 0.15]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} />
      </mesh>

      {/* Cylindrical Bio-Digester Recycling Silos */}
      {[-2.2, 2.2].map((sx, idx) => (
        <group key={idx} position={[sx, 0, -2.4]}>
          <mesh position={[0, 3.2, 0]} castShadow>
            <cylinderGeometry args={[1.2, 1.2, 6.4, 16]} />
            <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, 6.7, 0]}>
            <sphereGeometry args={[1.2, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#a3e635" metalness={0.7} />
          </mesh>
        </group>
      ))}

      {/* Conveyor Gantry Overhead Bridge */}
      <mesh position={[0, 4.2, -1.2]} rotation={[0, 0, Math.PI / 12]}>
        <boxGeometry args={[4.8, 0.5, 0.8]} />
        <meshStandardMaterial color="#eab308" metalness={0.8} />
      </mesh>
    </group>
  );
}

// ==========================================
// 7. REALISTIC METRO TRANSIT TERMINAL
// ==========================================
function MetroStationBuilding({ obj, isHovered, isSelected, isNight }) {
  return (
    <group>
      {/* Elevated Station Base / Platforms */}
      <mesh position={[0, 0.8, 0]} receiveShadow>
        <boxGeometry args={[7.2, 1.6, 4.2]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.8} />
      </mesh>

      {/* Futuristic Glass Barrel-Vault Canopy */}
      <mesh position={[0, 2.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[2.0, 2.0, 6.8, 24, 1, false, 0, Math.PI]} />
        <meshStandardMaterial
          color="#38bdf8"
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.65}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Structural Steel Arches */}
      {[-2.8, -1.4, 0, 1.4, 2.8].map((ax, idx) => (
        <mesh key={idx} position={[ax, 2.2, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[2.02, 0.08, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} />
        </mesh>
      ))}

      {/* Docked High-Speed Hyperloop / Metro Train */}
      <group position={[0, 1.7, 1.2]}>
        <mesh castShadow>
          <boxGeometry args={[6.2, 0.8, 0.9]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Streamlined Train Nose */}
        <mesh position={[3.3, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.45, 0.8, 12]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.9} />
        </mesh>
        {/* Cyan Window Ribbon */}
        <mesh position={[0, 0.1, 0.46]}>
          <boxGeometry args={[5.6, 0.35, 0.04]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
      </group>

      {/* Illuminated Station Header Display */}
      <mesh position={[0, 3.4, 2.15]}>
        <boxGeometry args={[3.2, 0.35, 0.08]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>
    </group>
  );
}

// ==========================================
// 8. REALISTIC CITY PARK WITH 3D TREES & POND
// ==========================================
function ParkBuilding({ obj, isHovered, isSelected }) {
  const waterTex = useMemo(() => getWaterTexture(), []);

  const treesData = useMemo(
    () => [
      { pos: [-2.8, 0, -2.8], scale: 1.1 },
      { pos: [-1.4, 0, -3.2], scale: 0.9 },
      { pos: [1.8, 0, -2.4], scale: 1.2 },
      { pos: [3.1, 0, -1.8], scale: 1.0 },
      { pos: [-3.2, 0, 1.2], scale: 0.85 },
      { pos: [-2.6, 0, 2.8], scale: 1.15 },
      { pos: [2.5, 0, 2.6], scale: 1.05 },
      { pos: [3.4, 0, 0.8], scale: 0.95 },
    ],
    []
  );

  return (
    <group>
      {/* Lush Green Lawn Ground Base */}
      <mesh position={[0, 0.15, 0]} receiveShadow>
        <boxGeometry args={[8.4, 0.3, 8.4]} />
        <meshStandardMaterial color="#14532d" roughness={0.9} />
      </mesh>

      {/* Decorative Paved Walking Trails */}
      <mesh position={[0, 0.31, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.2, 8.0]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.31, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[1.2, 8.0]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
      </mesh>

      {/* Center Reflective Water Pond */}
      <mesh position={[0, 0.32, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.0, 32]} />
        <meshStandardMaterial
          map={waterTex}
          roughness={0.1}
          metalness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* 3D Realistic Procedural Trees */}
      {treesData.map((t, i) => (
        <Tree key={i} position={t.pos} scale={t.scale} />
      ))}
    </group>
  );
}

// ==========================================
// 9. REALISTIC SCHOOL / ACADEMIC CAMPUS
// ==========================================
function SchoolBuilding({ obj, isHovered, isSelected, isNight }) {
  const facadeTex = useMemo(() => getHospitalTexture(), []);
  const solarTex = useMemo(() => getSolarPanelTexture(), []);

  return (
    <group>
      {/* Main Academic Wing */}
      <mesh position={[-1.2, 2.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 5.0, 4.4]} />
        <meshStandardMaterial map={facadeTex} roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Science & Research Lab Wing */}
      <mesh position={[1.8, 1.8, 0.6]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 3.6, 3.0]} />
        <meshStandardMaterial map={facadeTex} roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Central Glass Atrium Connection */}
      <mesh position={[0.3, 2.0, 0]}>
        <boxGeometry args={[1.4, 4.0, 2.2]} />
        <meshStandardMaterial
          color="#38bdf8"
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Photovoltaic Solar Roof on Main Wing */}
      <mesh position={[-1.2, 5.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.0, 4.2]} />
        <meshStandardMaterial map={solarTex} roughness={0.3} />
      </mesh>
    </group>
  );
}

// ==========================================
// 10. REALISTIC IN-FILL BACKGROUND METROPOLIS
// ==========================================
function InFillMetropolis({ isNight }) {
  const cyanTex = useMemo(() => getSkyscraperTexture('cyan'), []);
  const goldTex = useMemo(() => getSkyscraperTexture('gold'), []);

  // 18 Dense perimeter high-rises to form a stunning skyline
  const towers = useMemo(
    () => [
      { pos: [12, 0, 12], size: [3.4, 16, 3.4], tex: cyanTex },
      { pos: [-10, 0, -10], size: [4.2, 22, 4.2], tex: goldTex },
      { pos: [16, 0, -20], size: [3.8, 15, 3.8], tex: cyanTex },
      { pos: [-18, 0, -8], size: [4.4, 25, 4.4], tex: cyanTex },
      { pos: [8, 0, 22], size: [3.6, 14, 3.6], tex: goldTex },
      { pos: [-22, 0, 14], size: [4.0, 18, 4.0], tex: cyanTex },
      { pos: [20, 0, -4], size: [4.2, 19, 4.2], tex: goldTex },
      { pos: [-6, 0, -24], size: [3.8, 21, 3.8], tex: cyanTex },
      { pos: [24, 0, 10], size: [3.5, 13, 3.5], tex: cyanTex },
      { pos: [-26, 0, -6], size: [4.0, 17, 4.0], tex: goldTex },
      { pos: [14, 0, 30], size: [3.6, 12, 3.6], tex: cyanTex },
      { pos: [-14, 0, 30], size: [3.8, 16, 3.8], tex: goldTex },
      { pos: [30, 0, -14], size: [4.2, 18, 4.2], tex: cyanTex },
      { pos: [-32, 0, 4], size: [3.8, 15, 3.8], tex: cyanTex },
      { pos: [28, 0, 20], size: [4.0, 20, 4.0], tex: goldTex },
      { pos: [-18, 0, -32], size: [4.4, 24, 4.4], tex: cyanTex },
      { pos: [6, 0, -34], size: [3.6, 17, 3.6], tex: goldTex },
      { pos: [-8, 0, 34], size: [4.0, 15, 4.0], tex: cyanTex },
    ],
    [cyanTex, goldTex]
  );

  return (
    <group>
      {towers.map((t, idx) => (
        <group key={`infill-${idx}`} position={[t.pos[0], 0, t.pos[2]]}>
          {/* Main Tower Box with Realistic Window Grid Facade */}
          <mesh position={[0, t.size[1] / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={t.size} />
            <meshStandardMaterial
              map={t.tex}
              roughness={0.3}
              metalness={0.8}
              emissive={isNight ? '#38bdf8' : '#0369a1'}
              emissiveIntensity={isNight ? 0.35 : 0.08}
            />
          </mesh>
          {/* Rooftop HVAC Box */}
          <mesh position={[0, t.size[1] + 0.4, 0]}>
            <boxGeometry args={[t.size[0] * 0.6, 0.8, t.size[2] * 0.6]} />
            <meshStandardMaterial color="#1e293b" metalness={0.7} />
          </mesh>
          {/* Antenna Spire */}
          <mesh position={[0, t.size[1] + 2.0, 0]}>
            <cylinderGeometry args={[0.04, 0.08, 2.4, 6]} />
            <meshStandardMaterial color="#64748b" metalness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ==========================================
// MAIN BUILDINGS ORCHESTRATOR
// ==========================================
export function Buildings() {
  const { cityObjects, selectObject, selectedObject, isNight } = useCity();
  const [hoveredId, setHoveredId] = useState(null);

  // References for subtle animations (spinning bridge in water tanks, blinking beacons)
  const beaconRef = useRef();
  const waterBridgeRef = useRef();

  useFrame((state) => {
    // Blinking red aviation warning beacons on skyscraper antennae
    if (beaconRef.current) {
      const blink = Math.sin(state.clock.elapsedTime * 6) > 0.2;
      beaconRef.current.visible = blink;
    }
    // Slowly rotate water clarifier bridge
    if (waterBridgeRef.current) {
      waterBridgeRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <group>
      {/* Background High-Rise Metropolis */}
      <InFillMetropolis isNight={isNight} />

      {/* Interactive Main City Buildings & Facilities */}
      {cityObjects.map((obj) => {
        const isHovered = hoveredId === obj.id;
        const isSelected = selectedObject?.id === obj.id;
        const height = obj.floors ? obj.floors * 0.45 : 12;

        return (
          <group
            key={obj.id}
            position={[obj.position[0], 0, obj.position[2]]}
            onClick={(e) => {
              e.stopPropagation();
              selectObject(obj);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredId(obj.id);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              setHoveredId(null);
              document.body.style.cursor = 'auto';
            }}
          >
            {/* Render Specific Realistic Architectural Model based on facility type */}
            {obj.type === 'hospital' ? (
              <HospitalBuilding
                obj={obj}
                isHovered={isHovered}
                isSelected={isSelected}
                isNight={isNight}
              />
            ) : obj.type === 'power' ? (
              <PowerPlantBuilding
                obj={obj}
                isHovered={isHovered}
                isSelected={isSelected}
                isNight={isNight}
              />
            ) : obj.type === 'water' ? (
              <WaterPlantBuilding
                obj={obj}
                isHovered={isHovered}
                isSelected={isSelected}
                isNight={isNight}
                bridgeRef={waterBridgeRef}
              />
            ) : obj.type === 'waste' ? (
              <WastePlantBuilding
                obj={obj}
                isHovered={isHovered}
                isSelected={isSelected}
                isNight={isNight}
              />
            ) : obj.type === 'metro' ? (
              <MetroStationBuilding
                obj={obj}
                isHovered={isHovered}
                isSelected={isSelected}
                isNight={isNight}
              />
            ) : obj.type === 'park' ? (
              <ParkBuilding
                obj={obj}
                isHovered={isHovered}
                isSelected={isSelected}
                isNight={isNight}
              />
            ) : obj.type === 'school' ? (
              <SchoolBuilding
                obj={obj}
                isHovered={isHovered}
                isSelected={isSelected}
                isNight={isNight}
              />
            ) : (
              <SkyscraperBuilding
                obj={obj}
                isHovered={isHovered}
                isSelected={isSelected}
                isNight={isNight}
                beaconRef={beaconRef}
              />
            )}

            {/* Selection / Hover Holographic Target Ring */}
            {(isSelected || isHovered) && (
              <mesh position={[0, height + 1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[3.2, 3.6, 32]} />
                <meshBasicMaterial
                  color={isSelected ? '#00f0ff' : '#38bdf8'}
                  side={THREE.DoubleSide}
                  transparent
                  opacity={0.8}
                />
              </mesh>
            )}

            {/* Floating 3D Telemetry HUD Pill on Hover or Selection */}
            {(isHovered || isSelected) && (
              <Html position={[0, height + 2.8, 0]} center distanceFactor={28}>
                <div className="pointer-events-none select-none px-3 py-1.5 rounded-lg bg-[#050b1a]/95 backdrop-blur-md border border-cyan-400 text-cyan-300 font-mono text-xs whitespace-nowrap shadow-neon-cyan flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="font-bold tracking-wider uppercase text-slate-100">{obj.name}</span>
                  <span className="text-[10px] text-cyan-400/80">[{obj.sector}]</span>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

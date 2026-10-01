import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCity } from '../../context/CityContext';
import * as THREE from 'three';
import { getRoadTexture } from './textureUtils';

// ==========================================
// 1. REUSABLE VEHICLE WHEEL COMPONENT
// ==========================================
function Wheel({ position }) {
  return (
    <group position={position}>
      {/* Outer Black Rubber Tire */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.1, 14]} />
        <meshStandardMaterial color="#09090b" roughness={0.9} />
      </mesh>
      {/* Inner Silver Rim / Hubcap */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.105, 10]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}

// ==========================================
// 2. REALISTIC CAR / SEDAN MODEL
// ==========================================
function SedanModel({ color = '#0284c7' }) {
  return (
    <group>
      {/* Lower Sleek Chassis */}
      <mesh position={[0, 0.22, 0]} castShadow>
        <boxGeometry args={[1.5, 0.22, 0.72]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.25} />
      </mesh>

      {/* Aerodynamic Cockpit / Tinted Glass Cabin */}
      <mesh position={[-0.08, 0.40, 0]} castShadow>
        <boxGeometry args={[0.78, 0.22, 0.64]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.95}
          roughness={0.1}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Roof Panel */}
      <mesh position={[-0.08, 0.52, 0]}>
        <boxGeometry args={[0.68, 0.04, 0.62]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Front Windshield Slanted Glass */}
      <mesh position={[0.34, 0.39, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[0.22, 0.04, 0.62]} />
        <meshStandardMaterial color="#0284c7" transparent opacity={0.7} />
      </mesh>

      {/* 4 Rubber Wheels with Rims */}
      <Wheel position={[0.44, 0.16, 0.36]} />
      <Wheel position={[0.44, 0.16, -0.36]} />
      <Wheel position={[-0.44, 0.16, 0.36]} />
      <Wheel position={[-0.44, 0.16, -0.36]} />

      {/* Dual Front Glowing Headlights */}
      <mesh position={[0.76, 0.24, 0.22]}>
        <boxGeometry args={[0.04, 0.08, 0.14]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.76, 0.24, -0.22]}>
        <boxGeometry args={[0.04, 0.08, 0.14]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Dual Rear Glowing Red Taillights */}
      <mesh position={[-0.76, 0.25, 0.22]}>
        <boxGeometry args={[0.04, 0.08, 0.14]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
      <mesh position={[-0.76, 0.25, -0.22]}>
        <boxGeometry args={[0.04, 0.08, 0.14]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
    </group>
  );
}

// ==========================================
// 3. REALISTIC CITY BUS MODEL
// ==========================================
function BusModel() {
  return (
    <group>
      {/* Heavy Transit Bus Body */}
      <mesh position={[0, 0.54, 0]} castShadow>
        <boxGeometry args={[3.2, 0.74, 0.95]} />
        <meshStandardMaterial color="#7c3aed" metalness={0.6} roughness={0.35} />
      </mesh>

      {/* Front Curved Windshield Glass */}
      <mesh position={[1.56, 0.62, 0]}>
        <boxGeometry args={[0.1, 0.44, 0.9]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Passenger Side Window Panoramic Glass Ribbons */}
      <mesh position={[-0.1, 0.62, 0.48]}>
        <boxGeometry args={[2.7, 0.34, 0.04]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.1, 0.62, -0.48]}>
        <boxGeometry args={[2.7, 0.34, 0.04]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Illuminated LED Destination Headboard */}
      <mesh position={[1.61, 0.82, 0]}>
        <boxGeometry args={[0.04, 0.14, 0.68]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>

      {/* Dual Rooftop AC / Battery Units */}
      <mesh position={[0.6, 0.96, 0]} castShadow>
        <boxGeometry args={[0.8, 0.14, 0.62]} />
        <meshStandardMaterial color="#334155" metalness={0.7} />
      </mesh>
      <mesh position={[-0.6, 0.96, 0]} castShadow>
        <boxGeometry args={[0.8, 0.14, 0.62]} />
        <meshStandardMaterial color="#334155" metalness={0.7} />
      </mesh>

      {/* 6 Heavy-Duty Wheels (Dual Rear Axle) */}
      <Wheel position={[1.05, 0.18, 0.48]} />
      <Wheel position={[1.05, 0.18, -0.48]} />
      <Wheel position={[-0.55, 0.18, 0.48]} />
      <Wheel position={[-0.55, 0.18, -0.48]} />
      <Wheel position={[-1.15, 0.18, 0.48]} />
      <Wheel position={[-1.15, 0.18, -0.48]} />

      {/* Dual Front Headlights */}
      <mesh position={[1.61, 0.32, 0.32]}>
        <boxGeometry args={[0.04, 0.12, 0.16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[1.61, 0.32, -0.32]}>
        <boxGeometry args={[0.04, 0.12, 0.16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Rear Vertical Red Brake Light Strips */}
      <mesh position={[-1.61, 0.54, 0.38]}>
        <boxGeometry args={[0.04, 0.45, 0.08]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
      <mesh position={[-1.61, 0.54, -0.38]}>
        <boxGeometry args={[0.04, 0.45, 0.08]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
    </group>
  );
}

// ==========================================
// 4. REALISTIC CITY TAXI MODEL
// ==========================================
function TaxiModel() {
  return (
    <group>
      {/* Yellow Taxi Sedan Body */}
      <SedanModel color="#eab308" />

      {/* Illuminated Rooftop "TAXI" Sign Box */}
      <mesh position={[-0.08, 0.62, 0]}>
        <boxGeometry args={[0.3, 0.12, 0.18]} />
        <meshBasicMaterial color="#fef08a" />
      </mesh>
    </group>
  );
}

// ==========================================
// 5. REALISTIC AMBULANCE / EMERGENCY RESCUE
// ==========================================
function AmbulanceModel({ sirenLightRef }) {
  return (
    <group>
      {/* Driver Front Cab */}
      <mesh position={[0.5, 0.38, 0]} castShadow>
        <boxGeometry args={[0.85, 0.52, 0.88]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Cab Windshield */}
      <mesh position={[0.78, 0.46, 0]}>
        <boxGeometry args={[0.1, 0.28, 0.8]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {/* High-Roof Medical Treatment Box Rear */}
      <mesh position={[-0.42, 0.54, 0]} castShadow>
        <boxGeometry args={[1.35, 0.84, 0.94]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Fluorescent Red Emergency Side Chevron Stripes */}
      <mesh position={[-0.42, 0.54, 0.48]}>
        <boxGeometry args={[1.3, 0.18, 0.02]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
      <mesh position={[-0.42, 0.54, -0.48]}>
        <boxGeometry args={[1.3, 0.18, 0.02]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>

      {/* 4 Heavy-Duty Wheels */}
      <Wheel position={[0.55, 0.18, 0.46]} />
      <Wheel position={[0.55, 0.18, -0.46]} />
      <Wheel position={[-0.65, 0.18, 0.46]} />
      <Wheel position={[-0.65, 0.18, -0.46]} />

      {/* Front Headlights */}
      <mesh position={[0.94, 0.26, 0.28]}>
        <boxGeometry args={[0.04, 0.1, 0.14]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.94, 0.26, -0.28]}>
        <boxGeometry args={[0.04, 0.1, 0.14]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Dual Alternating Red / Blue Strobe Emergency Lightbar */}
      <group position={[0.35, 0.72, 0]}>
        {/* Lightbar Base Mount */}
        <mesh>
          <boxGeometry args={[0.16, 0.06, 0.65]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        {/* Left Strobe Pod */}
        <mesh position={[0, 0.06, 0.22]}>
          <cylinderGeometry args={[0.08, 0.08, 0.1, 8]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
        {/* Right Strobe Pod */}
        <mesh position={[0, 0.06, -0.22]}>
          <cylinderGeometry args={[0.08, 0.08, 0.1, 8]} />
          <meshBasicMaterial color="#0284c7" />
        </mesh>
      </group>
    </group>
  );
}

// ==========================================
// 6. REALISTIC CYBER TRUCK / DELIVERY VEHICLE
// ==========================================
function CyberTruckModel() {
  return (
    <group>
      {/* Angular Chassis */}
      <mesh position={[0, 0.32, 0]} castShadow>
        <boxGeometry args={[1.7, 0.38, 0.84]} />
        <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Angular Fastback Cabin */}
      <mesh position={[-0.05, 0.55, 0]} castShadow>
        <boxGeometry args={[0.85, 0.28, 0.74]} />
        <meshStandardMaterial color="#0f172a" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Continuous Front LED Lightbar Strip */}
      <mesh position={[0.86, 0.36, 0]}>
        <boxGeometry args={[0.04, 0.06, 0.76]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* Continuous Rear Red LED Strip */}
      <mesh position={[-0.86, 0.38, 0]}>
        <boxGeometry args={[0.04, 0.06, 0.76]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>

      {/* 4 Heavy Off-Road Wheels */}
      <Wheel position={[0.55, 0.18, 0.44]} />
      <Wheel position={[0.55, 0.18, -0.44]} />
      <Wheel position={[-0.55, 0.18, 0.44]} />
      <Wheel position={[-0.55, 0.18, -0.44]} />
    </group>
  );
}

// ==========================================
// 7. STREET LAMP POSTS (AVENUE LIGHTING)
// ==========================================
function StreetLamp({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Vertical Steel Pole */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 2.8, 8]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} />
      </mesh>
      {/* Horizontal Curved Arm */}
      <mesh position={[0.3, 2.75, 0]}>
        <boxGeometry args={[0.65, 0.05, 0.05]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} />
      </mesh>
      {/* Glowing Warm Street Light Fixture */}
      <mesh position={[0.6, 2.7, 0]}>
        <boxGeometry args={[0.16, 0.06, 0.12]} />
        <meshBasicMaterial color="#fef08a" />
      </mesh>
    </group>
  );
}

// ==========================================
// MAIN ROADS AND TRAFFIC COMPONENT
// ==========================================
export function RoadsAndTraffic() {
  const { telemetry, weather } = useCity();

  // Traffic density factor (from 0 to 100)
  const density = telemetry?.traffic?.densityControl || 65;
  const isBadWeather = weather?.mode === 'Rain' || weather?.mode === 'Storm';

  // Road canvas texture with asphalt, lane dividers, double yellow line, and curbs
  const roadTex = useMemo(() => getRoadTexture(4), []);

  // Road network definitions
  const roads = useMemo(
    () => [
      // North-South Avenues
      { pos: [0, 0.02, 0], rot: [0, 0, 0], length: 80, width: 3.2, id: 'ns-main' },
      { pos: [-15, 0.02, 0], rot: [0, 0, 0], length: 80, width: 3.2, id: 'ns-west' },
      { pos: [15, 0.02, 0], rot: [0, 0, 0], length: 80, width: 3.2, id: 'ns-east' },

      // East-West Boulevards
      { pos: [0, 0.02, 0], rot: [0, Math.PI / 2, 0], length: 80, width: 3.2, id: 'ew-main' },
      { pos: [0, 0.02, -15], rot: [0, Math.PI / 2, 0], length: 80, width: 3.2, id: 'ew-north' },
      { pos: [0, 0.02, 15], rot: [0, Math.PI / 2, 0], length: 80, width: 3.2, id: 'ew-south' },

      // Elevated Skyway Overpass (Bridge #12)
      { pos: [0, 2.5, 0], rot: [0, Math.PI / 4, 0], length: 54, width: 2.6, id: 'skyway', elevated: true },
    ],
    []
  );

  // Street lamps placed along the main corridors
  const streetLamps = useMemo(() => {
    const list = [];
    const coords = [-30, -18, -6, 6, 18, 30];
    coords.forEach((coord, idx) => {
      // East side of NS Main
      list.push({ pos: [1.8, 0, coord], rot: [0, -Math.PI / 2, 0], key: `lamp-ns1-${idx}` });
      // West side of NS Main
      list.push({ pos: [-1.8, 0, coord], rot: [0, Math.PI / 2, 0], key: `lamp-ns2-${idx}` });
      // North side of EW Main
      list.push({ pos: [coord, 0, -1.8], rot: [0, 0, 0], key: `lamp-ew1-${idx}` });
      // South side of EW Main
      list.push({ pos: [coord, 0, 1.8], rot: [0, Math.PI, 0], key: `lamp-ew2-${idx}` });
    });
    return list;
  }, []);

  // Scale vehicle count with simulated traffic density
  const vehicleCount = Math.round(20 + (density / 100) * 35);

  const initialVehicles = useMemo(() => {
    const list = [];
    const types = ['car', 'bus', 'taxi', 'ambulance', 'truck'];
    const corridors = [-15, 0, 15];

    for (let i = 0; i < 55; i++) {
      const type =
        i % 11 === 0 ? 'ambulance' : i % 5 === 0 ? 'bus' : i % 3 === 0 ? 'taxi' : i % 4 === 0 ? 'truck' : 'car';
      const isEastWest = i % 2 === 0;
      const corridor = corridors[i % corridors.length];
      const offset = (Math.random() - 0.5) * 72;
      const direction = Math.random() > 0.5 ? 1 : -1;

      // Realistic speed differences per vehicle type
      const baseSpeed =
        (0.14 + Math.random() * 0.12) *
        (type === 'bus' ? 0.72 : type === 'ambulance' ? 1.45 : type === 'truck' ? 0.8 : 1.05);

      // Lane offset within corridor: right lane vs left lane
      const laneOffset = direction > 0 ? 0.75 : -0.75;

      list.push({
        id: i,
        type,
        isEastWest,
        corridor,
        laneOffset,
        offset,
        speed: baseSpeed,
        direction,
        color:
          type === 'taxi'
            ? '#eab308'
            : type === 'ambulance'
            ? '#ffffff'
            : type === 'bus'
            ? '#7c3aed'
            : i % 4 === 0
            ? '#0284c7'
            : i % 3 === 0
            ? '#e11d48'
            : '#059669',
      });
    }
    return list;
  }, []);

  const vehiclesRef = useRef(initialVehicles);
  const meshGroupRef = useRef();

  useFrame((state, delta) => {
    if (!meshGroupRef.current) return;

    const weatherSpeedMod = isBadWeather ? 0.65 : 1.0;
    const densitySpeedMod = density > 80 ? 0.65 : density > 50 ? 0.9 : 1.1;
    const finalSpeedMultiplier = weatherSpeedMod * densitySpeedMod;

    const children = meshGroupRef.current.children;
    const vList = vehiclesRef.current;

    for (let i = 0; i < vehicleCount && i < children.length; i++) {
      const v = vList[i];
      const mesh = children[i];

      // Advance vehicle position along road corridor
      v.offset += v.speed * v.direction * finalSpeedMultiplier;

      // Wrap around city perimeter
      if (v.offset > 39) v.offset = -39;
      if (v.offset < -39) v.offset = 39;

      if (v.isEastWest) {
        mesh.position.set(v.offset, 0.05, v.corridor + v.laneOffset);
        mesh.rotation.set(0, v.direction > 0 ? 0 : Math.PI, 0);
      } else {
        mesh.position.set(v.corridor + v.laneOffset, 0.05, v.offset);
        mesh.rotation.set(0, v.direction > 0 ? Math.PI / 2 : -Math.PI / 2, 0);
      }
    }
  });

  return (
    <group>
      {/* 1. Realistic Road Ribbons with Asphalt Texture & Curbs */}
      {roads.map((r) => (
        <group key={r.id} position={r.pos} rotation={r.rot}>
          {/* Asphalt Road Surface Bed with Painted Markings */}
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[r.width, r.length]} />
            <meshStandardMaterial
              map={roadTex}
              roughness={0.75}
              metalness={0.2}
            />
          </mesh>

          {/* Left Concrete Sidewalk Curb */}
          <mesh position={[-r.width / 2 - 0.1, 0.04, 0]}>
            <boxGeometry args={[0.2, 0.08, r.length]} />
            <meshStandardMaterial color="#475569" roughness={0.8} />
          </mesh>

          {/* Right Concrete Sidewalk Curb */}
          <mesh position={[r.width / 2 + 0.1, 0.04, 0]}>
            <boxGeometry args={[0.2, 0.08, r.length]} />
            <meshStandardMaterial color="#475569" roughness={0.8} />
          </mesh>

          {/* Elevated Skyway Pillars if Elevated Bridge */}
          {r.elevated && (
            <group>
              {[-18, -6, 6, 18].map((pX, pIdx) => (
                <mesh key={pIdx} position={[0, pX, -r.pos[1] / 2]}>
                  <cylinderGeometry args={[0.3, 0.4, r.pos[1], 8]} />
                  <meshStandardMaterial color="#1e293b" metalness={0.8} />
                </mesh>
              ))}
            </group>
          )}
        </group>
      ))}

      {/* 2. Avenue Street Lamps */}
      {streetLamps.map((lamp) => (
        <StreetLamp key={lamp.key} position={lamp.pos} rotation={lamp.rot} />
      ))}

      {/* 3. Detailed Realistic Procedural Vehicles */}
      <group ref={meshGroupRef}>
        {initialVehicles.slice(0, vehicleCount).map((v) => (
          <group key={`v-${v.id}`}>
            {v.type === 'bus' ? (
              <BusModel />
            ) : v.type === 'taxi' ? (
              <TaxiModel />
            ) : v.type === 'ambulance' ? (
              <AmbulanceModel />
            ) : v.type === 'truck' ? (
              <CyberTruckModel />
            ) : (
              <SedanModel color={v.color} />
            )}
          </group>
        ))}
      </group>
    </group>
  );
}

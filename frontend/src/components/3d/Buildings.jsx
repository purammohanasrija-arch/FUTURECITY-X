import React, { useState } from 'react';
import { useCity } from '../../context/CityContext';
import { Html } from '@react-three/drei';

export function Buildings() {
  const { cityObjects, selectObject, selectedObject, isNight } = useCity();
  const [hoveredId, setHoveredId] = useState(null);

  // Fallback in-fill background buildings to create a dense metropolis
  const inFillBlocks = [
    { pos: [10, 0, 10], size: [3, 14, 3], color: '#0f1f3d' },
    { pos: [-8, 0, -8], size: [4, 18, 4], color: '#13284f' },
    { pos: [14, 0, -18], size: [3.5, 12, 3.5], color: '#0a162c' },
    { pos: [-16, 0, -6], size: [4, 22, 4], color: '#162e5b' },
    { pos: [6, 0, 20], size: [3, 10, 3], color: '#0d1d3a' },
    { pos: [-20, 0, 12], size: [3.5, 15, 3.5], color: '#112244' },
    { pos: [18, 0, -2], size: [4, 16, 4], color: '#0c1b35' },
    { pos: [-4, 0, -22], size: [3.8, 19, 3.8], color: '#142a54' },
    { pos: [22, 0, 8], size: [3, 11, 3], color: '#0e1c38' },
    { pos: [-24, 0, -4], size: [4, 13, 4], color: '#102449' },
  ];

  return (
    <group>
      {/* Background dense cityscape blocks */}
      {inFillBlocks.map((b, i) => (
        <mesh key={`infill-${i}`} position={[b.pos[0], b.size[1] / 2, b.pos[2]]}>
          <boxGeometry args={b.size} />
          <meshStandardMaterial
            color={b.color}
            roughness={0.4}
            metalness={0.7}
            emissive={isNight ? '#00f0ff' : '#050a18'}
            emissiveIntensity={isNight ? 0.08 : 0.02}
          />
        </mesh>
      ))}

      {/* Main Interactive City Objects (Hospitals, Power, Water, Waste, Metro, Towers) */}
      {cityObjects.map((obj) => {
        const isHovered = hoveredId === obj.id;
        const isSelected = selectedObject?.id === obj.id;

        // Custom styling per facility type
        let height = 12;
        let width = 3.5;
        let depth = 3.5;
        let baseColor = '#1e293b';
        let neonColor = '#00f0ff';

        if (obj.type === 'hospital') {
          height = 10;
          baseColor = '#334155';
          neonColor = '#ff3344'; // Red medical cross glow
        } else if (obj.type === 'school') {
          height = 7;
          width = 4.5;
          baseColor = '#1e293b';
          neonColor = '#ffaa00'; // Amber education glow
        } else if (obj.type === 'power') {
          height = 9;
          width = 5;
          depth = 5;
          baseColor = '#1e1e24';
          neonColor = '#00ff9d'; // Green energy glow
        } else if (obj.type === 'water') {
          height = 6;
          width = 6;
          depth = 6;
          baseColor = '#0c4a6e';
          neonColor = '#38bdf8'; // Blue water glow
        } else if (obj.type === 'waste') {
          height = 6.5;
          width = 5.5;
          depth = 5.5;
          baseColor = '#292524';
          neonColor = '#a3e635'; // Lime green recycling glow
        } else if (obj.type === 'metro') {
          height = 4;
          width = 7;
          depth = 4;
          baseColor = '#172554';
          neonColor = '#818cf8'; // Violet transport glow
        } else if (obj.type === 'skyscraper') {
          height = obj.floors ? obj.floors * 0.45 : 24;
          width = 4;
          depth = 4;
          baseColor = '#0f172a';
          neonColor = '#00f0ff';
        } else if (obj.type === 'park') {
          height = 0.4;
          width = 8;
          depth = 8;
          baseColor = '#064e3b';
          neonColor = '#10b981';
        }

        const emissiveIntensity = isSelected ? 0.9 : isHovered ? 0.6 : isNight ? 0.35 : 0.15;

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
            {/* Primary Building Mesh */}
            <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
              {obj.type === 'power' ? (
                <cylinderGeometry args={[width / 2.2, width / 1.8, height, 16]} />
              ) : (
                <boxGeometry args={[width, height, depth]} />
              )}
              <meshStandardMaterial
                color={baseColor}
                roughness={0.3}
                metalness={0.8}
                emissive={neonColor}
                emissiveIntensity={emissiveIntensity}
              />
            </mesh>

            {/* Glowing Roof Accent / Helipad / Spire */}
            {obj.type === 'skyscraper' && (
              <mesh position={[0, height + 2, 0]}>
                <cylinderGeometry args={[0.08, 0.2, 4, 8]} />
                <meshBasicMaterial color={neonColor} />
              </mesh>
            )}

            {/* Hospital Red Cross Emblem */}
            {obj.type === 'hospital' && (
              <group position={[0, height + 0.5, 0]}>
                <mesh>
                  <boxGeometry args={[1.6, 0.4, 0.4]} />
                  <meshBasicMaterial color="#ff2244" />
                </mesh>
                <mesh>
                  <boxGeometry args={[0.4, 0.4, 1.6]} />
                  <meshBasicMaterial color="#ff2244" />
                </mesh>
              </group>
            )}

            {/* Power Plant Pulsing Core */}
            {obj.type === 'power' && (
              <mesh position={[0, height + 0.6, 0]}>
                <sphereGeometry args={[1.2, 16, 16]} />
                <meshStandardMaterial
                  color="#00ff9d"
                  emissive="#00ff9d"
                  emissiveIntensity={isHovered ? 1.5 : 0.8}
                  roughness={0.1}
                />
              </mesh>
            )}

            {/* Selection / Hover Holographic Ring indicator */}
            {(isSelected || isHovered) && (
              <mesh position={[0, height + 1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[width * 0.7, width * 0.85, 32]} />
                <meshBasicMaterial color={neonColor} side={2} transparent opacity={0.8} />
              </mesh>
            )}

            {/* 3D Floating HUD Pill on Hover or Select */}
            {(isHovered || isSelected) && (
              <Html position={[0, height + 3, 0]} center distanceFactor={28}>
                <div className="pointer-events-none select-none px-3 py-1.5 rounded-md bg-[#050b1a]/90 backdrop-blur-md border border-cyan-400 text-cyan-300 font-mono text-xs whitespace-nowrap shadow-neon-cyan flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: neonColor }} />
                  <span className="font-bold uppercase tracking-wider">{obj.name}</span>
                  <span className="text-[10px] text-slate-400">[{obj.sector}]</span>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

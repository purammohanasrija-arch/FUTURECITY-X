import React from 'react';
import { Html } from '@react-three/drei';

export function DistrictLabels() {
  const districts = [
    { name: 'Central District', pos: [0, 18, 0], color: '#00f0ff', code: 'DIST-01' },
    { name: 'Innovation Hub', pos: [-18, 14, 8], color: '#8b5cf6', code: 'DIST-02' },
    { name: 'Green Valley Eco-Zone', pos: [-26, 10, -20], color: '#00ff9d', code: 'DIST-03' },
    { name: 'Industrial Sector', pos: [26, 12, 14], color: '#ffaa00', code: 'DIST-04' },
  ];

  return (
    <group>
      {districts.map((d, i) => (
        <group key={i} position={d.pos}>
          <Html center distanceFactor={45} className="pointer-events-none select-none">
            <div className="flex flex-col items-center">
              <div
                className="px-2.5 py-1 rounded bg-[#030712]/80 backdrop-blur-md border border-slate-700 text-[10px] font-mono tracking-wider uppercase flex items-center gap-1.5 shadow-lg"
                style={{ borderColor: `${d.color}66`, color: d.color }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="font-bold">{d.name}</span>
                <span className="text-slate-400 text-[9px]">[{d.code}]</span>
              </div>
              <div className="w-px h-6 bg-gradient-to-b from-cyan-400/50 to-transparent" />
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}

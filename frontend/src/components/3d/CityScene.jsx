import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useCity } from '../../context/CityContext';
import { Buildings } from './Buildings';
import { RoadsAndTraffic } from './RoadsAndTraffic';
import { EnvironmentEffects } from './EnvironmentEffects';
import { DistrictLabels } from './DistrictLabels';
import { Camera, Eye, Compass, Layers, Sparkles } from 'lucide-react';
import { soundManager } from '../../utils/sound';

export function CityScene({ height = '100%', showControls = true }) {
  const { timeOfDay, isNight, weather } = useCity();
  const controlsRef = useRef();

  // Calculate sun angle from time of day (0 to 24)
  const sunAngle = ((timeOfDay - 6) / 12) * Math.PI; // at 12:00 = PI/2 (noon high)
  const sunX = Math.cos(sunAngle) * 45;
  const sunY = Math.max(-5, Math.sin(sunAngle) * 45);
  const sunZ = 20;

  // Sky background color interpolation
  const getSkyColor = () => {
    if (weather?.mode === 'Storm') return '#070a12';
    if (weather?.mode === 'Rain') return '#080f1e';
    if (weather?.mode === 'Fog') return '#0b1626';
    if (isNight) return '#02040a';
    if (timeOfDay >= 6 && timeOfDay < 8) return '#1a102f'; // Dawn
    if (timeOfDay >= 17 && timeOfDay <= 19) return '#2a1122'; // Sunset
    return '#050c1e'; // Daytime deep sci-fi blue
  };

  // Camera preset handler
  const setCameraPreset = (x, y, z, target = [0, 0, 0]) => {
    soundManager.playClick();
    if (controlsRef.current) {
      controlsRef.current.object.position.set(x, y, z);
      controlsRef.current.target.set(target[0], target[1], target[2]);
      controlsRef.current.update();
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-cyan-500/20 bg-[#030611] shadow-2xl" style={{ height }}>
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [38, 30, 42], fov: 45, near: 0.1, far: 250 }}
        shadows
        gl={{ antialias: true, alpha: false }}
        style={{ background: getSkyColor() }}
      >
        {/* Ambient & Hemisphere Lighting */}
        <ambientLight intensity={isNight ? 0.3 : weather?.mode === 'Storm' ? 0.4 : 0.75} />
        <hemisphereLight
          skyColor={isNight ? '#00f0ff' : '#60a5fa'}
          groundColor="#050811"
          intensity={isNight ? 0.25 : 0.6}
        />

        {/* Directional Sun / Moon */}
        <directionalLight
          position={[sunX, sunY, sunZ]}
          intensity={isNight ? 0.4 : weather?.mode === 'Storm' ? 0.5 : 1.4}
          color={isNight ? '#7dd3fc' : timeOfDay < 8 || timeOfDay > 17 ? '#f59e0b' : '#ffffff'}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* Cyber Neon Accents Fill Light */}
        <pointLight position={[0, 15, 0]} color="#00f0ff" intensity={isNight ? 1.2 : 0.5} distance={60} />
        <pointLight position={[-15, 8, -15]} color="#8b5cf6" intensity={isNight ? 1.0 : 0.3} distance={40} />
        <pointLight position={[15, 8, 15]} color="#00ff9d" intensity={isNight ? 1.0 : 0.3} distance={40} />

        {/* Stars in night mode */}
        {isNight && (
          <Stars radius={90} depth={40} count={3500} factor={4} saturation={0.8} fade speed={1} />
        )}

        {/* Orbit Camera Controls */}
        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2.05} // prevent going below ground
          minDistance={8}
          maxDistance={120}
        />

        {/* Cyber Circuit Ground Grid */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
          <planeGeometry args={[160, 160]} />
          <meshStandardMaterial
            color="#040714"
            roughness={0.65}
            metalness={0.4}
          />
        </mesh>

        {/* Subtle Urban Ground Coordinate Grid */}
        <gridHelper args={[160, 40, '#0e3a5a', '#061324']} position={[0, 0.005, 0]} />

        {/* City Geometry Modules */}
        <Buildings />
        <RoadsAndTraffic />
        <EnvironmentEffects />
        <DistrictLabels />
      </Canvas>

      {/* Floating HUD Camera Presets & Perspective Toolbar */}
      {showControls && (
        <div className="absolute top-4 right-4 z-10 flex flex-wrap gap-1.5 p-1.5 rounded-lg bg-[#050b1a]/85 backdrop-blur-md border border-cyan-500/25 shadow-lg">
          <button
            onClick={() => setCameraPreset(38, 30, 42, [0, 0, 0])}
            className="px-2.5 py-1 text-xs font-mono rounded bg-slate-900/80 hover:bg-cyan-950 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 transition flex items-center gap-1.5"
            title="Isometric Orbit"
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Isometric</span>
          </button>

          <button
            onClick={() => setCameraPreset(0, 55, 0.01, [0, 0, 0])}
            className="px-2.5 py-1 text-xs font-mono rounded bg-slate-900/80 hover:bg-cyan-950 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 transition flex items-center gap-1.5"
            title="Top-Down Satellite View"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Top-Down</span>
          </button>

          <button
            onClick={() => setCameraPreset(12, 14, -10, [0, 8, -16])}
            className="px-2.5 py-1 text-xs font-mono rounded bg-slate-900/80 hover:bg-cyan-950 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 transition flex items-center gap-1.5"
            title="Downtown Apex Spire"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Downtown</span>
          </button>

          <button
            onClick={() => setCameraPreset(-22, 12, -18, [-24, 0, -20])}
            className="px-2.5 py-1 text-xs font-mono rounded bg-slate-900/80 hover:bg-cyan-950 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 transition flex items-center gap-1.5"
            title="Green Valley Eco-District"
          >
            <Sparkles className="w-3.5 h-3.5 text-green-400" />
            <span className="hidden sm:inline">Eco-Valley</span>
          </button>
        </div>
      )}

      {/* Floating 3D Interaction Tip Badge */}
      <div className="absolute bottom-3 left-3 z-10 px-3 py-1 rounded bg-[#030712]/80 backdrop-blur-md border border-cyan-500/20 text-[11px] font-mono text-cyan-400/80 flex items-center gap-2 pointer-events-none select-none">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>Click any building or facility to open Holographic Telemetry HUD</span>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useCity } from '../context/CityContext';
import { HolographicCard } from '../components/common/HolographicCard';
import { soundManager } from '../utils/sound';
import {
  Car,
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Sliders,
  CheckCircle2,
  ShieldAlert,
  Compass,
  Zap,
  Play
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export function TrafficCenter() {
  const { telemetry, simulateTrafficDensity } = useCity();
  const [sliderDensity, setSliderDensity] = useState(telemetry?.traffic?.densityControl || 65);
  const [selectedRoad, setSelectedRoad] = useState(null);
  const [simulating, setSimulating] = useState(false);

  const traffic = telemetry?.traffic || {
    activeVehicles: 14250,
    averageSpeed: 42,
    congestionPercent: 68,
    congestionLevel: 'Moderate',
    sectors: {}
  };

  const handleSimulate = async () => {
    setSimulating(true);
    soundManager.playClick();
    await simulateTrafficDensity(Number(sliderDensity));
    setSimulating(false);
    soundManager.playSuccess();
  };

  const roads = [
    { id: 'rd-01', name: 'Apex Central Boulevard', sector: 'Central District', vehicles: 142, speed: 38, congestion: 'Moderate', color: '#ffaa00', ai: 'Optimize green-wave phase for Autonomous Bus Pod corridor.' },
    { id: 'rd-02', name: 'Innovation Highway', sector: 'Innovation District', vehicles: 98, speed: 64, congestion: 'Normal', color: '#00ff9d', ai: 'Flow nominal. High-speed lanes unobstructed.' },
    { id: 'rd-03', name: 'Industrial Heavy Freight Corridor', sector: 'Industrial Zone', vehicles: 188, speed: 22, congestion: 'Heavy', color: '#ff3344', ai: 'Divert non-commercial vehicles to Sub-Zero Tunnel bypass.' },
    { id: 'rd-04', name: 'Green Valley Park Parkway', sector: 'Green Valley', vehicles: 42, speed: 48, congestion: 'Normal', color: '#00ff9d', ai: 'Eco-pacing active. Zero tailpipe emissions registered.' },
    { id: 'rd-05', name: 'Sector 3 Transit Expressway', sector: 'Sector 3', vehicles: 176, speed: 26, congestion: 'Heavy', color: '#ff3344', ai: 'Traffic bottleneck detected. Signal cycle extended by +12s.' },
    { id: 'rd-06', name: 'Metro Loop Overpass (Bridge #12)', sector: 'Central District', vehicles: 110, speed: 44, congestion: 'Moderate', color: '#ffaa00', ai: 'Structural strain within nominal 18% tolerance.' },
  ];

  const sectorChartData = Object.entries(traffic.sectors || {}).map(([sec, val]) => ({
    name: sec.replace(' District', '').replace(' Zone', ''),
    density: val.density
  }));

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
        <div>
          <div className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
            // TRAFFIC COMMAND & TELEMETRY
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Autonomous Traffic Control Center
          </h1>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-slate-400">NETWORK STATE:</span>
          <span className="text-cyan-300 font-bold uppercase">{traffic.congestionLevel}</span>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <HolographicCard title="ACTIVE VEHICLES" icon={<Car className="w-4 h-4 text-cyan-400" />}>
          <div className="text-3xl font-bold font-display text-white">
            {traffic.activeVehicles?.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 font-mono mt-1">Autonomous & manual fleet</div>
        </HolographicCard>

        <HolographicCard title="AVERAGE SPEED" icon={<Activity className="w-4 h-4 text-emerald-400" />}>
          <div className="text-3xl font-bold font-display text-emerald-400">
            {traffic.averageSpeed} <span className="text-lg">km/h</span>
          </div>
          <div className="text-xs text-slate-400 font-mono mt-1">Across 8 urban sectors</div>
        </HolographicCard>

        <HolographicCard title="CONGESTION INDEX" icon={<AlertTriangle className="w-4 h-4 text-amber-400" />}>
          <div className="text-3xl font-bold font-display text-amber-400">
            {traffic.congestionPercent}%
          </div>
          <div className="text-xs text-slate-400 font-mono mt-1">{traffic.trend} from baseline</div>
        </HolographicCard>

        <HolographicCard title="EMERGENCY PODS" icon={<ShieldAlert className="w-4 h-4 text-red-400" />}>
          <div className="text-3xl font-bold font-display text-cyan-300">
            18 <span className="text-lg text-slate-400">Active</span>
          </div>
          <div className="text-xs text-emerald-400 font-mono mt-1">Transit priority lock active</div>
        </HolographicCard>
      </div>

      {/* Traffic Density Simulation Control Panel (Section 10) */}
      <div className="p-6 rounded-2xl bg-[#090f25]/90 border border-cyan-500/30 shadow-neon-cyan">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase">
              <Sliders className="w-4 h-4" />
              <span>TRAFFIC DENSITY CONTROL ENGINE</span>
            </div>
            <h3 className="text-lg font-bold font-display text-white">
              Dynamic Fleet Saturation Slider
            </h3>
            <p className="text-xs text-slate-400 font-sans max-w-lg">
              Adjust simulated municipal vehicular volume. Modifying this density recalibrates road congestion heatmaps, speeds, and 3D vehicle movements in real time.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-3 w-full sm:w-64 font-mono text-xs text-slate-300">
              <span className="text-emerald-400 font-bold">LOW</span>
              <input
                type="range"
                min="10"
                max="98"
                value={sliderDensity}
                onChange={(e) => setSliderDensity(e.target.value)}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-red-400 font-bold">HIGH</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-cyan-500/30 text-cyan-300 font-bold min-w-[45px] text-center">
                {sliderDensity}%
              </span>
            </div>

            <button
              onClick={handleSimulate}
              disabled={simulating}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-black font-mono font-bold text-xs shadow-neon-cyan hover:scale-105 active:scale-95 disabled:opacity-50 transition flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>{simulating ? 'SIMULATING...' : 'SIMULATE TRAFFIC'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sector Congestion Bar Chart & Interactive Road Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sector Breakdown Chart */}
        <HolographicCard
          title="SECTOR DENSITY BREAKDOWN"
          subtitle="Real-Time Congestion Distribution"
          icon={<Compass className="w-4 h-4 text-cyan-400" />}
        >
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorChartData}>
                <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#070d1e', borderColor: '#00f0ff', color: '#fff', borderRadius: '8px' }}
                />
                <Bar dataKey="density" fill="#00f0ff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </HolographicCard>

        {/* Road Telemetry Network List & Click Inspector */}
        <HolographicCard
          title="CORRIDOR SENSOR MATRIX"
          subtitle="Click to Inspect AI Recommendation"
          icon={<Zap className="w-4 h-4 text-cyan-400" />}
        >
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {roads.map((r) => (
              <div
                key={r.id}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedRoad(r);
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedRoad?.id === r.id
                    ? 'bg-cyan-950/80 border-cyan-400 shadow-neon-cyan'
                    : 'bg-slate-900/40 hover:bg-slate-900/80 border-cyan-500/15'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: r.color }} />
                    <span className="text-xs font-bold text-white font-mono">{r.name}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    {r.sector} • {r.vehicles} veh/min • {r.speed} km/h
                  </div>
                </div>

                <span
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border"
                  style={{ borderColor: `${r.color}66`, color: r.color }}
                >
                  {r.congestion}
                </span>
              </div>
            ))}
          </div>
        </HolographicCard>
      </div>

      {/* Selected Road Holographic Inspector Note */}
      {selectedRoad && (
        <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
          <div>
            <div className="text-xs font-mono text-cyan-400 font-bold uppercase">
              SELECTED ROAD: {selectedRoad.name} [{selectedRoad.id}]
            </div>
            <div className="text-xs text-slate-300 font-mono mt-1">
              <span className="text-cyan-300 font-bold">AI RECOMMENDATION: </span>
              {selectedRoad.ai}
            </div>
          </div>
          <button
            onClick={() => setSelectedRoad(null)}
            className="text-xs font-mono text-slate-400 hover:text-white px-3 py-1 rounded bg-slate-900"
          >
            Dismiss Inspector
          </button>
        </div>
      )}
    </div>
  );
}

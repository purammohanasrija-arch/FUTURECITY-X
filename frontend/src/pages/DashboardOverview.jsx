import React, { useState } from 'react';
import { useCity } from '../context/CityContext';
import { HolographicCard } from '../components/common/HolographicCard';
import { AIInsightsWidget } from '../components/ai/AIInsightsWidget';
import { AIOptimizerModal } from '../components/ai/AIOptimizerModal';
import { CityScene } from '../components/3d/CityScene';
import { soundManager } from '../utils/sound';
import { Link } from 'react-router-dom';
import {
  Car,
  Zap,
  Droplets,
  Trash2,
  Wind,
  Shield,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Sliders,
  AlertTriangle,
  Layers,
  Activity,
  Flame,
  CheckCircle2,
  Compass
} from 'lucide-react';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis
} from 'recharts';

export function DashboardOverview() {
  const {
    telemetry,
    cityHealth,
    healthScores,
    incidents,
    triggerWaterLeak,
    repairWaterLeak
  } = useCity();

  const [showOptimizer, setShowOptimizer] = useState(false);

  if (!telemetry) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-cyan-400 font-mono">
        <Activity className="w-6 h-6 animate-spin mr-2" />
        <span>STREAMING TELEMETRY BUS...</span>
      </div>
    );
  }

  // Mini Sparkline Data for Cards
  const sparkTraffic = [{ v: 55 }, { v: 62 }, { v: 58 }, { v: 64 }, { v: 68 }];
  const sparkEnergy = [{ v: 95 }, { v: 94 }, { v: 93 }, { v: 92 }, { v: 92 }];
  const sparkWater = [{ v: 76 }, { v: 78 }, { v: 80 }, { v: 79 }, { v: 81 }];
  const sparkWaste = [{ v: 58 }, { v: 64 }, { v: 68 }, { v: 71 }, { v: 74 }];
  const sparkAir = [{ v: 80 }, { v: 76 }, { v: 74 }, { v: 70 }, { v: 68 }];

  // Health Radial Chart Data
  const radialData = [{ name: 'CityHealth', value: cityHealth, fill: '#00f0ff' }];

  const activeIncidents = incidents.filter(i => i.status !== 'Resolved');

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      {/* City Optimizer Modal */}
      <AIOptimizerModal isOpen={showOptimizer} onClose={() => setShowOptimizer(false)} />

      {/* Command Center Title Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
        <div>
          <div className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
            // METROPOLITAN DIGITAL TWIN
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-wide text-white">
            City Command Center
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              setShowOptimizer(true);
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-mono text-xs font-bold shadow-neon-cyan hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-cyan-200" />
            <span>OPTIMIZE CITY</span>
          </button>

          <Link
            to="/app/3d-city"
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-cyan-300 font-mono text-xs transition flex items-center gap-1.5"
          >
            <Layers className="w-4 h-4" />
            <span>Launch Full 3D Twin</span>
          </Link>
        </div>
      </div>

      {/* Live AI Insights Stream */}
      <AIInsightsWidget />

      {/* 6 Core KPI Cards (Section 7) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 1. TRAFFIC */}
        <HolographicCard
          title="TRAFFIC"
          subtitle="Autonomous Grid"
          icon={<Car className="w-5 h-5 text-amber-400" />}
          badge={telemetry.traffic.congestionLevel}
          badgeColor={telemetry.traffic.congestionPercent > 75 ? 'red' : 'amber'}
        >
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-extrabold font-display text-white">
                {telemetry.traffic.congestionPercent}%
              </div>
              <div className="flex items-center gap-1 text-xs font-mono text-amber-400 mt-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>{telemetry.traffic.trend} from baseline</span>
              </div>
            </div>
            <div className="w-24 h-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparkTraffic}>
                  <Area type="monotone" dataKey="v" stroke="#ffaa00" fill="#ffaa0033" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-cyan-500/10 flex justify-between text-[11px] font-mono text-slate-400">
            <span>Active Vehicles: {telemetry.traffic.activeVehicles.toLocaleString()}</span>
            <span>Speed: {telemetry.traffic.averageSpeed} km/h</span>
          </div>
        </HolographicCard>

        {/* 2. ENERGY */}
        <HolographicCard
          title="ENERGY"
          subtitle="Microgrid Power"
          icon={<Zap className="w-5 h-5 text-emerald-400" />}
          badge={telemetry.energy.status}
          badgeColor="green"
        >
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-extrabold font-display text-white">
                {telemetry.energy.gridStability}%
              </div>
              <div className="flex items-center gap-1 text-xs font-mono text-emerald-400 mt-1">
                <ArrowDownRight className="w-3.5 h-3.5" />
                <span>{telemetry.energy.trend} consumption load</span>
              </div>
            </div>
            <div className="w-24 h-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparkEnergy}>
                  <Area type="monotone" dataKey="v" stroke="#00ff9d" fill="#00ff9d33" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-cyan-500/10 flex justify-between text-[11px] font-mono text-slate-400">
            <span>Gen: {telemetry.energy.totalGeneration} MW</span>
            <span>Renewable: {telemetry.energy.renewablePercent}%</span>
          </div>
        </HolographicCard>

        {/* 3. WATER */}
        <HolographicCard
          title="WATER"
          subtitle="Hydro Matrix"
          icon={<Droplets className="w-5 h-5 text-cyan-400" />}
          badge={telemetry.water.status}
          badgeColor={telemetry.water.leakActive ? 'red' : 'cyan'}
        >
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-extrabold font-display text-white">
                {telemetry.water.reservoirLevel}%
              </div>
              <div className="flex items-center gap-1 text-xs font-mono text-cyan-400 mt-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>{telemetry.water.trend} reservoir balance</span>
              </div>
            </div>
            <div className="w-24 h-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparkWater}>
                  <Area type="monotone" dataKey="v" stroke="#00f0ff" fill="#00f0ff33" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-cyan-500/10 flex justify-between text-[11px] font-mono text-slate-400">
            <span>Leakage: {telemetry.water.leakageRate} L/min</span>
            <span>Purity: {telemetry.water.waterPurity}%</span>
          </div>
        </HolographicCard>

        {/* 4. WASTE */}
        <HolographicCard
          title="WASTE"
          subtitle="Plasma Reclamation"
          icon={<Trash2 className="w-5 h-5 text-purple-400" />}
          badge={telemetry.waste.status}
          badgeColor="amber"
        >
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-extrabold font-display text-white">
                {telemetry.waste.cityWideFill}%
              </div>
              <div className="flex items-center gap-1 text-xs font-mono text-amber-400 mt-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>{telemetry.waste.trend} surge warning</span>
              </div>
            </div>
            <div className="w-24 h-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparkWaste}>
                  <Area type="monotone" dataKey="v" stroke="#9d4edd" fill="#9d4edd33" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-cyan-500/10 flex justify-between text-[11px] font-mono text-slate-400">
            <span>Active Drones: {telemetry.waste.collectionVehiclesActive}</span>
            <span>Peak Sector: Sector 3 ({telemetry.waste.sectors['Sector 3']}%)</span>
          </div>
        </HolographicCard>

        {/* 5. AIR QUALITY */}
        <HolographicCard
          title="AIR QUALITY"
          subtitle="Atmospheric Health"
          icon={<Wind className="w-5 h-5 text-cyan-300" />}
          badge={telemetry.environment.status}
          badgeColor="green"
        >
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-extrabold font-display text-white">
                AQI {telemetry.environment.aqi}
              </div>
              <div className="flex items-center gap-1 text-xs font-mono text-emerald-400 mt-1">
                <ArrowDownRight className="w-3.5 h-3.5" />
                <span>-4% particulates</span>
              </div>
            </div>
            <div className="w-24 h-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparkAir}>
                  <Area type="monotone" dataKey="v" stroke="#00f0ff" fill="#00f0ff33" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-cyan-500/10 flex justify-between text-[11px] font-mono text-slate-400">
            <span>CO2: {telemetry.environment.co2Level} ppm</span>
            <span>Canopy: {telemetry.environment.greenCanopy}%</span>
          </div>
        </HolographicCard>

        {/* 6. PUBLIC SAFETY */}
        <HolographicCard
          title="PUBLIC SAFETY"
          subtitle="Civil Defense"
          icon={<Shield className="w-5 h-5 text-emerald-400" />}
          badge="Stable"
          badgeColor="green"
        >
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-extrabold font-display text-white">
                {healthScores.safety}%
              </div>
              <div className="flex items-center gap-1 text-xs font-mono text-emerald-400 mt-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Response corridors clear</span>
              </div>
            </div>
            <div className="w-24 h-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[{ v: 92 }, { v: 94 }, { v: 95 }, { v: 96 }]}>
                  <Area type="monotone" dataKey="v" stroke="#00ff9d" fill="#00ff9d33" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-cyan-500/10 flex justify-between text-[11px] font-mono text-slate-400">
            <span>Active Incidents: {activeIncidents.length}</span>
            <span>Fleet ETA: ~2.4 mins</span>
          </div>
        </HolographicCard>
      </div>

      {/* Split Section: City Health Radial Breakdown & Interactive 3D Mini Twin */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* City Health Radial Gauge & Subsystem Decomposition */}
        <HolographicCard
          title="CITY HEALTH INDEX"
          subtitle="Composite Municipal Telemetry"
          icon={<Activity className="w-5 h-5 text-cyan-400" />}
          badge={`${cityHealth} / 100`}
          className="lg:col-span-1"
        >
          <div className="flex flex-col items-center justify-center py-2">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="75%"
                  outerRadius="100%"
                  barSize={12}
                  data={radialData}
                  startAngle={90}
                  endAngle={-270}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                  <RadialBar
                    clockWise
                    dataKey="value"
                    cornerRadius={8}
                    background={{ fill: '#0a162c' }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-extrabold font-display text-white tracking-tight">
                  {cityHealth}
                </span>
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
                  HEALTH SCORE
                </span>
              </div>
            </div>

            {/* Subsystem Breakdown Bars */}
            <div className="w-full space-y-2 mt-4 text-xs font-mono">
              {Object.entries(healthScores).map(([sub, score]) => (
                <div key={sub}>
                  <div className="flex justify-between text-slate-300 capitalize mb-1">
                    <span>{sub}</span>
                    <span className="font-bold text-white">{score}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </HolographicCard>

        {/* 3D Interactive Spatial Twin Preview */}
        <div className="lg:col-span-2 rounded-xl overflow-hidden border border-cyan-500/25 bg-[#050916] flex flex-col">
          <div className="flex items-center justify-between px-5 py-3 border-b border-cyan-500/20 bg-slate-900/60">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-bold uppercase text-white tracking-wider">
                Spatial Digital Twin // Live Sensor View
              </span>
            </div>
            <Link
              to="/app/3d-city"
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <span>Expand Fullscreen</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="relative flex-1 min-h-[360px]">
            <CityScene height="100%" showControls={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

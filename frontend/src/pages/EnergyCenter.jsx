import React, { useState } from 'react';
import { useCity } from '../context/CityContext';
import { HolographicCard } from '../components/common/HolographicCard';
import { soundManager } from '../utils/sound';
import {
  Zap,
  Sun,
  Wind,
  Factory,
  Home,
  Sliders,
  ArrowRight,
  TrendingUp,
  Activity,
  BatteryCharging,
  CheckCircle2
} from 'lucide-react';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export function EnergyCenter() {
  const { telemetry, simulateEnergyControls } = useCity();

  const [solarMult, setSolarMult] = useState(1.0);
  const [windMult, setWindMult] = useState(1.0);
  const [indDemand, setIndDemand] = useState(1.0);
  const [resDemand, setResDemand] = useState(1.0);

  const energy = telemetry?.energy || {
    totalGeneration: 345,
    totalConsumption: 298,
    renewablePercent: 67,
    gridStability: 96,
    peakDemand: 360,
    solarOutput: 142,
    windOutput: 88,
    fossilOutput: 115,
    status: 'Stable'
  };

  const handleApplySimulation = (s = solarMult, w = windMult, i = indDemand, r = resDemand) => {
    simulateEnergyControls({
      solarMultiplier: s,
      windMultiplier: w,
      industrialDemand: i,
      residentialDemand: r
    });
  };

  // Pie chart breakdown
  const pieData = [
    { name: 'Solaris Solar', value: energy.solarOutput, color: '#ffaa00' },
    { name: 'Offshore Wind', value: energy.windOutput, color: '#00ff9d' },
    { name: 'Clean Core/Fusion', value: energy.fossilOutput, color: '#00f0ff' },
  ];

  // Dynamic Generation vs Consumption Curve
  const energyTrend = [
    { time: '06:00', gen: Math.round(280 * solarMult), demand: Math.round(260 * indDemand) },
    { time: '09:00', gen: Math.round(330 * solarMult), demand: Math.round(310 * indDemand) },
    { time: '12:00', gen: Math.round(380 * solarMult), demand: Math.round(340 * indDemand) },
    { time: '15:00', gen: Math.round(360 * solarMult), demand: Math.round(330 * indDemand) },
    { time: '18:00', gen: Math.round(290 * windMult), demand: Math.round(350 * resDemand) },
    { time: '21:00', gen: Math.round(240 * windMult), demand: Math.round(280 * resDemand) },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
        <div>
          <div className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
            // MUNICIPAL GRID COMMAND
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Smart Energy Grid & Microgrid Flow
          </h1>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-slate-400">GRID STATUS:</span>
          <span className="text-emerald-400 font-bold">{energy.status}</span>
        </div>
      </div>

      {/* 4 Primary Dials */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <HolographicCard title="TOTAL GENERATION" icon={<Zap className="w-4 h-4 text-emerald-400" />}>
          <div className="text-3xl font-bold font-display text-emerald-400">
            {energy.totalGeneration} <span className="text-lg">MW</span>
          </div>
          <div className="text-xs text-slate-400 font-mono mt-1">Solar + Wind + Clean Core</div>
        </HolographicCard>

        <HolographicCard title="TOTAL CONSUMPTION" icon={<Activity className="w-4 h-4 text-cyan-400" />}>
          <div className="text-3xl font-bold font-display text-white">
            {energy.totalConsumption} <span className="text-lg">MW</span>
          </div>
          <div className="text-xs text-slate-400 font-mono mt-1">Peak buffer reserve: +{energy.totalGeneration - energy.totalConsumption} MW</div>
        </HolographicCard>

        <HolographicCard title="RENEWABLE RATIO" icon={<Sun className="w-4 h-4 text-amber-400" />}>
          <div className="text-3xl font-bold font-display text-amber-400">
            {energy.renewablePercent}%
          </div>
          <div className="text-xs text-emerald-400 font-mono mt-1">Zero-carbon generation target</div>
        </HolographicCard>

        <HolographicCard title="GRID STABILITY" icon={<BatteryCharging className="w-4 h-4 text-cyan-300" />}>
          <div className="text-3xl font-bold font-display text-cyan-300">
            {energy.gridStability}%
          </div>
          <div className="text-xs text-slate-400 font-mono mt-1">50.02 Hz Synced Phase</div>
        </HolographicCard>
      </div>

      {/* Architecture Flow Visualization (Section 12) */}
      <HolographicCard
        title="MICROGRID ARCHITECTURE & FLOW DYNAMICS"
        subtitle="Solar Farm -> Power Station -> Distribution Grid -> End Consumers"
        icon={<TrendingUp className="w-4 h-4 text-cyan-400" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-4">
          {/* Node 1: Generation */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-amber-500/30 flex flex-col items-center text-center">
            <div className="p-3 rounded-xl bg-amber-950/60 text-amber-400 mb-2">
              <Sun className="w-6 h-6 animate-spin-slow" />
            </div>
            <div className="text-xs font-bold text-white font-mono">1. SOLAR & WIND FARMS</div>
            <div className="text-[11px] text-amber-300 font-mono mt-1">{energy.solarOutput + energy.windOutput} MW Clean Out</div>
            <div className="text-[10px] text-slate-400 mt-1">Solaris & Offshore Array</div>
          </div>

          {/* Node 2: Power Station */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-emerald-500/30 flex flex-col items-center text-center">
            <div className="p-3 rounded-xl bg-emerald-950/60 text-emerald-400 mb-2">
              <Zap className="w-6 h-6 animate-pulse" />
            </div>
            <div className="text-xs font-bold text-white font-mono">2. CLEAN CORE STATION</div>
            <div className="text-[11px] text-emerald-300 font-mono mt-1">Thermal Eff: 97.4%</div>
            <div className="text-[10px] text-slate-400 mt-1">Frequency Lock Active</div>
          </div>

          {/* Node 3: Distribution Grid */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/30 flex flex-col items-center text-center">
            <div className="p-3 rounded-xl bg-cyan-950/60 text-cyan-400 mb-2">
              <BatteryCharging className="w-6 h-6 animate-bounce" />
            </div>
            <div className="text-xs font-bold text-white font-mono">3. HIGH-VOLTAGE GRID</div>
            <div className="text-[11px] text-cyan-300 font-mono mt-1">98.4% Transmission Eff</div>
            <div className="text-[10px] text-slate-400 mt-1">Dynamic Substation Mesh</div>
          </div>

          {/* Node 4: End Consumers */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-indigo-500/30 flex flex-col items-center text-center">
            <div className="p-3 rounded-xl bg-indigo-950/60 text-indigo-400 mb-2">
              <Home className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-white font-mono">4. CIVIC CONSUMERS</div>
            <div className="text-[11px] text-indigo-300 font-mono mt-1">{energy.totalConsumption} MW Demand</div>
            <div className="text-[10px] text-slate-400 mt-1">Homes, Industry, Offices</div>
          </div>
        </div>
      </HolographicCard>

      {/* Interactive Energy Simulation Controls (Section 12) */}
      <div className="p-6 rounded-2xl bg-[#090f25]/90 border border-cyan-500/30 shadow-neon-cyan">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase mb-4">
          <Sliders className="w-4 h-4" />
          <span>INTERACTIVE GENERATION & DEMAND SIMULATION</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
          {/* Solar Slider */}
          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Solar Capacity</span>
              <span className="text-amber-400 font-bold">{Math.round(solarMult * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="2.0"
              step="0.1"
              value={solarMult}
              onChange={(e) => {
                const val = Number(e.target.value);
                setSolarMult(val);
                handleApplySimulation(val, windMult, indDemand, resDemand);
              }}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>

          {/* Wind Slider */}
          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Wind Generation</span>
              <span className="text-emerald-400 font-bold">{Math.round(windMult * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="2.0"
              step="0.1"
              value={windMult}
              onChange={(e) => {
                const val = Number(e.target.value);
                setWindMult(val);
                handleApplySimulation(solarMult, val, indDemand, resDemand);
              }}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
          </div>

          {/* Industrial Demand Slider */}
          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Industrial Load</span>
              <span className="text-cyan-400 font-bold">{Math.round(indDemand * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="1.8"
              step="0.1"
              value={indDemand}
              onChange={(e) => {
                const val = Number(e.target.value);
                setIndDemand(val);
                handleApplySimulation(solarMult, windMult, val, resDemand);
              }}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Residential Demand Slider */}
          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Residential Demand</span>
              <span className="text-indigo-400 font-bold">{Math.round(resDemand * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="1.8"
              step="0.1"
              value={resDemand}
              onChange={(e) => {
                const val = Number(e.target.value);
                setResDemand(val);
                handleApplySimulation(solarMult, windMult, indDemand, val);
              }}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-400"
            />
          </div>
        </div>
      </div>

      {/* Dynamic Energy Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Generation Source Donut */}
        <HolographicCard
          title="GENERATION MIX"
          subtitle="Power Source Distribution"
          className="lg:col-span-1"
        >
          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  dataKey="value"
                  paddingAngle={5}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#070d1e', borderColor: '#00f0ff', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1 text-xs font-mono mt-2">
            {pieData.map((d, i) => (
              <div key={i} className="flex justify-between">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                  {d.name}
                </span>
                <span className="font-bold text-white">{d.value} MW</span>
              </div>
            ))}
          </div>
        </HolographicCard>

        {/* 24-Hour Projected Generation vs Demand */}
        <HolographicCard
          title="SIMULATED GENERATION VS DEMAND"
          subtitle="Hourly Microgrid Balancing"
          className="lg:col-span-2"
        >
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={energyTrend}>
                <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} domain={[150, 450]} />
                <Tooltip contentStyle={{ backgroundColor: '#070d1e', borderColor: '#00f0ff', color: '#fff', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="gen" stroke="#00ff9d" fill="#00ff9d22" name="Generation (MW)" strokeWidth={2} />
                <Area type="monotone" dataKey="demand" stroke="#00f0ff" fill="#00f0ff22" name="Demand (MW)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </HolographicCard>
      </div>
    </div>
  );
}

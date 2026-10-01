import React, { useState } from 'react';
import { useCity } from '../context/CityContext';
import { HolographicCard } from '../components/common/HolographicCard';
import { soundManager } from '../utils/sound';
import {
  Droplets,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  ArrowRight,
  Activity,
  Layers,
  Sparkles,
  Flame
} from 'lucide-react';

export function WaterCenter() {
  const { telemetry, triggerWaterLeak, repairWaterLeak } = useCity();
  const [acting, setActing] = useState(false);

  const water = telemetry?.water || {
    reservoirLevel: 81,
    dailyConsumption: 42.8,
    waterPurity: 98.4,
    leakageRate: 18,
    distributionEfficiency: 94.2,
    leakActive: false,
    activeLeakDetails: null,
    status: 'Normal'
  };

  const handleLeakToggle = async () => {
    setActing(true);
    soundManager.playClick();
    if (water.leakActive) {
      await repairWaterLeak();
    } else {
      await triggerWaterLeak();
    }
    setActing(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
        <div>
          <div className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
            // AQUA-NET SCADA TELEMETRY
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Smart Water Management & Pipeline Grid
          </h1>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-xs font-mono">
          <span className={`w-2 h-2 rounded-full ${water.leakActive ? 'bg-red-400 animate-ping' : 'bg-cyan-400'}`} />
          <span className="text-slate-400">NETWORK INTEGRITY:</span>
          <span className={water.leakActive ? 'text-red-400 font-bold' : 'text-cyan-300 font-bold'}>
            {water.status}
          </span>
        </div>
      </div>

      {/* Critical Leak Alert Banner (if leak active) */}
      {water.leakActive && (
        <div className="p-5 rounded-2xl bg-red-950/70 border border-red-500/60 shadow-lg text-red-200 animate-slideUp font-mono">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-red-900/80 text-red-300 shrink-0">
                <AlertTriangle className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-wide uppercase text-white font-display">
                  CRITICAL: PIPELINE LEAK DETECTED // SECTOR 4
                </h3>
                <div className="text-xs mt-1 text-red-300 space-y-0.5">
                  <div>• Location: Sector 4 Trunk V-17</div>
                  <div>• Estimated Loss Rate: 82 L/min</div>
                  <div>• AI Recommendation: Close Valve V-17, Redirect secondary supply, Notify maintenance</div>
                </div>
              </div>
            </div>

            <button
              onClick={handleLeakToggle}
              disabled={acting}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 text-black font-bold text-xs shadow-neon-green hover:scale-105 active:scale-95 disabled:opacity-50 transition whitespace-nowrap"
            >
              EXECUTE VALVE ISOLATION
            </button>
          </div>
        </div>
      )}

      {/* 4 Core Water Dials */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <HolographicCard title="RESERVOIR CAPACITY" icon={<Droplets className="w-4 h-4 text-cyan-400" />}>
          <div className="text-3xl font-bold font-display text-cyan-300">
            {water.reservoirLevel}%
          </div>
          <div className="text-xs text-slate-400 font-mono mt-1">Deep Horizon Aquifer reserve</div>
        </HolographicCard>

        <HolographicCard title="DAILY CONSUMPTION" icon={<Activity className="w-4 h-4 text-emerald-400" />}>
          <div className="text-3xl font-bold font-display text-white">
            {water.dailyConsumption} <span className="text-lg">M-Liters</span>
          </div>
          <div className="text-xs text-slate-400 font-mono mt-1">42.8 L per capita/day</div>
        </HolographicCard>

        <HolographicCard title="PURITY INDEX" icon={<ShieldCheck className="w-4 h-4 text-emerald-400" />}>
          <div className="text-3xl font-bold font-display text-emerald-400">
            {water.waterPurity}%
          </div>
          <div className="text-xs text-emerald-300 font-mono mt-1">Bio-filtration standard optimal</div>
        </HolographicCard>

        <HolographicCard
          title="DISTRIBUTION EFFICIENCY"
          icon={<Droplets className="w-4 h-4 text-cyan-400" />}
          badgeColor={water.leakActive ? 'red' : 'green'}
          badge={water.leakActive ? 'LEAK ACTIVE' : 'OPTIMAL'}
        >
          <div className={`text-3xl font-bold font-display ${water.leakActive ? 'text-red-400' : 'text-cyan-300'}`}>
            {water.distributionEfficiency}%
          </div>
          <div className="text-xs text-slate-400 font-mono mt-1">Leak loss: {water.leakageRate} L/min</div>
        </HolographicCard>
      </div>

      {/* Architecture Flow (Section 13) */}
      <HolographicCard
        title="HYDRAULIC NETWORK TOPOLOGY"
        subtitle="Reservoir -> Treatment Plant -> Distribution Network -> Municipal Outlets"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/25 text-center">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 mx-auto flex items-center justify-center text-cyan-400 mb-2">
              <Droplets className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-white font-mono">1. DEEP AQUIFER</div>
            <div className="text-xs text-cyan-300 font-mono mt-1">8.4M Liters Reserve</div>
            <div className="text-[10px] text-slate-400 mt-1">Green Valley Basin</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/25 text-center">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 mx-auto flex items-center justify-center text-cyan-400 mb-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-xs font-bold text-white font-mono">2. TREATMENT PLANT</div>
            <div className="text-xs text-emerald-300 font-mono mt-1">98.4% Purity Index</div>
            <div className="text-[10px] text-slate-400 mt-1">Bio-UV Filtration</div>
          </div>

          <div className={`p-4 rounded-xl text-center border ${water.leakActive ? 'bg-red-950/40 border-red-500/50' : 'bg-slate-900/60 border-cyan-500/25'}`}>
            <div className="w-10 h-10 rounded-xl bg-cyan-950 mx-auto flex items-center justify-center text-cyan-400 mb-2">
              <Layers className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-white font-mono">3. TRUNK MATRIX V-17</div>
            <div className={`text-xs font-mono mt-1 ${water.leakActive ? 'text-red-400 font-bold' : 'text-cyan-300'}`}>
              {water.leakActive ? 'LEAK: 82 L/MIN' : 'Pressure: 4.8 Bar'}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Sector 4 Distribution</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/25 text-center">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 mx-auto flex items-center justify-center text-cyan-400 mb-2">
              <CheckCircle2 className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="text-xs font-bold text-white font-mono">4. SECTOR CONSUMERS</div>
            <div className="text-xs text-indigo-300 font-mono mt-1">42.8 ML/Day Delivered</div>
            <div className="text-[10px] text-slate-400 mt-1">Homes, Schools, Industry</div>
          </div>
        </div>
      </HolographicCard>

      {/* Interactive Simulation Trigger Button (Section 13) */}
      <div className="p-6 rounded-2xl bg-[#090f25]/90 border border-cyan-500/30 shadow-neon-cyan flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
            // SCADA SIMULATION DRILL
          </div>
          <h3 className="text-lg font-bold font-display text-white mt-0.5">
            Pipeline Rupture Simulation
          </h3>
          <p className="text-xs text-slate-400 font-sans max-w-lg mt-1">
            Simulate an unexpected trunk pipeline breach in Sector 4 to test AI pressure sensor alarms and automated valve isolation.
          </p>
        </div>

        <button
          onClick={handleLeakToggle}
          disabled={acting}
          className={`px-6 py-3 rounded-xl font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md ${
            water.leakActive
              ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-neon-green'
              : 'bg-red-500/90 hover:bg-red-500 text-white shadow-red-500/30'
          }`}
        >
          {water.leakActive ? 'RESET & REPAIR LEAK' : 'CREATE WATER LEAK'}
        </button>
      </div>
    </div>
  );
}

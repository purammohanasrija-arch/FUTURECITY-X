import React, { useState } from 'react';
import { useCity } from '../context/CityContext';
import { HolographicCard } from '../components/common/HolographicCard';
import { soundManager } from '../utils/sound';
import {
  Trash2,
  Sparkles,
  Truck,
  RotateCw,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Compass,
  ArrowRight
} from 'lucide-react';
import { api } from '../services/api';

export function WasteCenter() {
  const { telemetry, optimizeWaste } = useCity();
  const [optimizing, setOptimizing] = useState(false);
  const [surging, setSurging] = useState(false);

  const waste = telemetry?.waste || {
    cityWideFill: 64,
    sectors: {
      'Sector 1': 32,
      'Sector 2': 67,
      'Sector 3': 94,
      'Sector 4': 41,
      'Central District': 58,
      'Innovation District': 44,
      'Industrial Zone': 78,
      'Green Valley': 25,
    },
    collectionVehiclesActive: 18,
    status: 'Moderate',
    urgentPickups: ['Sector 3 - Smart Bin Node 12']
  };

  const handleOptimize = async () => {
    setOptimizing(true);
    soundManager.playClick();
    await optimizeWaste();
    setOptimizing(false);
  };

  const handleSurge = async () => {
    setSurging(true);
    soundManager.playClick();
    try {
      await api.simulateWasteSurge();
      soundManager.playAlert();
    } catch (e) {}
    setSurging(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
        <div>
          <div className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
            // PLASMA RECLAMATION & URBAN RECYCLING
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Smart Waste Management & Autonomous Logistics
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSurge}
            disabled={surging}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/30 text-amber-300 font-mono text-xs transition"
          >
            Simulate Surge
          </button>
          <button
            onClick={handleOptimize}
            disabled={optimizing}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-mono font-bold text-xs shadow-neon-pink hover:scale-105 active:scale-95 disabled:opacity-50 transition flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-purple-200" />
            <span>{optimizing ? 'OPTIMIZING...' : 'OPTIMIZE ROUTE (AI)'}</span>
          </button>
        </div>
      </div>

      {/* Sector Waste Fill Bars Grid (Section 14) */}
      <HolographicCard
        title="SECTOR WASTE LEVELS"
        subtitle="Automated Ultrasonic Sensor Bin Grid"
        icon={<Trash2 className="w-4 h-4 text-purple-400" />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-2 font-mono text-xs">
          {Object.entries(waste.sectors || {}).map(([sec, fill]) => {
            const isCritical = fill > 85;
            const isModerate = fill > 60;
            const color = isCritical ? 'text-red-400' : isModerate ? 'text-amber-400' : 'text-emerald-400';
            const barBg = isCritical ? 'from-red-500 to-pink-500' : isModerate ? 'from-amber-500 to-yellow-400' : 'from-emerald-400 to-teal-500';

            return (
              <div key={sec} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/60">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-bold text-white text-xs">{sec}</span>
                  <span className={`font-bold ${color}`}>{fill}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${barBg} rounded-full transition-all duration-500`}
                    style={{ width: `${fill}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-2">
                  <span>Status:</span>
                  <span className={color}>{isCritical ? 'CRITICAL OVERFLOW' : isModerate ? 'Moderate' : 'Normal'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </HolographicCard>

      {/* Urgent Pickups & Autonomous Fleet Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HolographicCard
          title="AI PRIORITY PICKUP QUEUE"
          subtitle="Dynamic Routing Recommendations"
          icon={<AlertTriangle className="w-4 h-4 text-amber-400" />}
        >
          <div className="space-y-3">
            {waste.urgentPickups?.length > 0 ? (
              waste.urgentPickups.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/30 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                    <span className="text-white font-bold">{item}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-red-900/60 text-red-300 font-bold border border-red-500/30">
                    URGENT
                  </span>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-xs text-emerald-400 font-mono flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>All priority receptacles cleared. Autonomous sweep optimal.</span>
              </div>
            )}
          </div>
        </HolographicCard>

        <HolographicCard
          title="AUTONOMOUS COLLECTION FLEET"
          subtitle="Drones & Plasma Haulers"
          icon={<Truck className="w-4 h-4 text-cyan-400" />}
        >
          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-3 rounded-lg bg-slate-900/50 border border-cyan-500/15">
              <div className="text-slate-400 text-[10px]">Active Compactor Drones</div>
              <div className="text-2xl font-bold text-cyan-300 mt-1">12 Units</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/50 border border-cyan-500/15">
              <div className="text-slate-400 text-[10px]">Ground Plasma Haulers</div>
              <div className="text-2xl font-bold text-purple-300 mt-1">6 Units</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/50 border border-cyan-500/15">
              <div className="text-slate-400 text-[10px]">Bio-Energy Recaptured</div>
              <div className="text-2xl font-bold text-emerald-400 mt-1">27.6 MWh</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/50 border border-cyan-500/15">
              <div className="text-slate-400 text-[10px]">Fleet Battery Status</div>
              <div className="text-2xl font-bold text-white mt-1">89% Avg</div>
            </div>
          </div>
        </HolographicCard>
      </div>
    </div>
  );
}

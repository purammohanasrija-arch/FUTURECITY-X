import React, { useState } from 'react';
import { useCity } from '../context/CityContext';
import { HolographicCard } from '../components/common/HolographicCard';
import { soundManager } from '../utils/sound';
import {
  Train,
  Bus,
  Car,
  Bike,
  Activity,
  Clock,
  Compass,
  CheckCircle2,
  Users,
  Layers
} from 'lucide-react';

export function TransportCenter() {
  const { telemetry, cityObjects, selectObject } = useCity();
  const [selectedStation, setSelectedStation] = useState(null);

  const transport = telemetry?.transport || {
    activeVehicles: 840,
    metroLinesActive: 3,
    dailyPassengers: 148200,
    onTimeRate: 98.2,
    delaysCount: 2,
    modeBreakdown: {
      metro: 48,
      autonomousBus: 26,
      roboTaxi: 18,
      smartBicycle: 8,
    }
  };

  const metroStations = cityObjects.filter(o => o.type === 'metro');

  const routes = [
    { id: 'RT-HL-A', name: 'Hyperloop Apex Transit', headway: '4 min', speed: '420 km/h', ridership: '48,200', status: 'ON TIME' },
    { id: 'RT-BL-01', name: 'Blue Line Automated Orbital', headway: '6 min', speed: '95 km/h', ridership: '34,500', status: 'ON TIME' },
    { id: 'RT-RL-02', name: 'Red Line Industrial Feeder', headway: '8 min', speed: '80 km/h', ridership: '28,900', status: '2 MIN DELAY' },
    { id: 'RT-BUS-X', name: 'Eco-Bus Autonomous Pod Network', headway: '3 min', speed: '45 km/h', ridership: '36,600', status: 'ON TIME' }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
        <div>
          <div className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
            // RAPID TRANSIT & MULTI-MODAL LOGISTICS
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Smart Multi-Modal Transport Center
          </h1>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-indigo-500/30 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
          <span className="text-slate-400">ON-TIME PERFORMANCE:</span>
          <span className="text-indigo-300 font-bold">{transport.onTimeRate}%</span>
        </div>
      </div>

      {/* 4 Multi-Modal KPI Dials */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <HolographicCard title="DAILY PASSENGERS" icon={<Users className="w-4 h-4 text-cyan-400" />}>
          <div className="text-3xl font-bold font-display text-white">
            {transport.dailyPassengers?.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 font-mono mt-1">Across all autonomous channels</div>
        </HolographicCard>

        <HolographicCard title="ACTIVE TRANSIT PODS" icon={<Train className="w-4 h-4 text-indigo-400" />}>
          <div className="text-3xl font-bold font-display text-indigo-300">
            {transport.activeVehicles} <span className="text-lg">Pods</span>
          </div>
          <div className="text-xs text-slate-400 font-mono mt-1">Hyperloop, buses & robo-taxis</div>
        </HolographicCard>

        <HolographicCard title="ACTIVE HYPER-LINES" icon={<Layers className="w-4 h-4 text-emerald-400" />}>
          <div className="text-3xl font-bold font-display text-emerald-400">
            {transport.metroLinesActive} <span className="text-lg">Lines</span>
          </div>
          <div className="text-xs text-emerald-300 font-mono mt-1">Zero-headway safety automation</div>
        </HolographicCard>

        <HolographicCard title="SYSTEM DELAYS" icon={<Clock className="w-4 h-4 text-amber-400" />}>
          <div className="text-3xl font-bold font-display text-amber-400">
            {transport.delaysCount} <span className="text-lg text-slate-400">Minor</span>
          </div>
          <div className="text-xs text-slate-400 font-mono mt-1">Average delay: &lt; 2 minutes</div>
        </HolographicCard>
      </div>

      {/* Transit Routes Matrix & Clickable Metro Stations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transit Routes Table */}
        <HolographicCard
          title="TRANSIT LINES & CORRIDORS"
          subtitle="Real-Time Schedule Matrix"
          icon={<Train className="w-4 h-4 text-indigo-400" />}
        >
          <div className="space-y-3 font-mono text-xs">
            {routes.map((rt) => (
              <div key={rt.id} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/60 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-xs">{rt.name}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Speed: {rt.speed} • Ridership: {rt.ridership}/day • Headway: {rt.headway}
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                  rt.status === 'ON TIME' ? 'bg-emerald-950 text-emerald-300 border-emerald-500/30' : 'bg-amber-950 text-amber-300 border-amber-500/30'
                }`}>
                  {rt.status}
                </span>
              </div>
            ))}
          </div>
        </HolographicCard>

        {/* Clickable Metro Stations */}
        <HolographicCard
          title="INTERACTIVE METRO STATIONS"
          subtitle="Click to view live passenger and track status"
          icon={<Compass className="w-4 h-4 text-cyan-400" />}
        >
          <div className="space-y-3 font-mono text-xs">
            {metroStations.map((st) => (
              <div
                key={st.id}
                onClick={() => {
                  soundManager.playClick();
                  selectObject(st);
                  setSelectedStation(st);
                }}
                className="p-3.5 rounded-xl bg-slate-900/60 hover:bg-cyan-950/60 border border-cyan-500/20 hover:border-cyan-400 cursor-pointer transition flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-white text-xs flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    {st.name}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {st.sector} • Crowd: {st.crowdDensity} • Platforms: {st.platforms}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-cyan-300 font-bold">ETA: {st.nextArrival}</div>
                  <div className="text-[10px] text-emerald-400 font-bold">{st.status}</div>
                </div>
              </div>
            ))}
          </div>
        </HolographicCard>
      </div>
    </div>
  );
}

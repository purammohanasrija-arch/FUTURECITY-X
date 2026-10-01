import React from 'react';
import { useCity } from '../context/CityContext';
import { HolographicCard } from '../components/common/HolographicCard';
import {
  Leaf,
  Wind,
  Flame,
  Volume2,
  Droplets,
  Trees,
  Activity,
  CheckCircle2
} from 'lucide-react';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

export function EnvironmentCenter() {
  const { telemetry } = useCity();

  const env = telemetry?.environment || {
    aqi: 68,
    co2Level: 412,
    temperature: 24,
    noiseLevel: 56,
    greenCanopy: 44,
    waterPurity: 98.4,
    healthScore: 82,
    status: 'Good'
  };

  const aqiWeekly = [
    { day: 'Mon', aqi: 72, co2: 418 },
    { day: 'Tue', aqi: 68, co2: 415 },
    { day: 'Wed', aqi: 64, co2: 412 },
    { day: 'Thu', aqi: 78, co2: 422 },
    { day: 'Fri', aqi: 82, co2: 428 },
    { day: 'Sat', aqi: 58, co2: 405 },
    { day: 'Sun', aqi: 52, co2: 398 },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
        <div>
          <div className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
            // BIOSPHERE & ATMOSPHERIC SENSORS
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Environment & Ecological Health Center
          </h1>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-slate-400">ECO-HEALTH SCORE:</span>
          <span className="text-emerald-400 font-bold">{env.healthScore} / 100 [{env.status}]</span>
        </div>
      </div>

      {/* 6 Environmental Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 1. AQI */}
        <HolographicCard title="AIR QUALITY INDEX (AQI)" icon={<Wind className="w-4 h-4 text-cyan-400" />}>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold font-display text-emerald-400">{env.aqi}</span>
            <span className="text-xs font-mono text-slate-400">/ 500 (Moderate Clean)</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
            <div className="h-full bg-emerald-400" style={{ width: `${(env.aqi / 200) * 100}%` }} />
          </div>
        </HolographicCard>

        {/* 2. CO2 Concentration */}
        <HolographicCard title="CARBON CONCENTRATION" icon={<Activity className="w-4 h-4 text-amber-400" />}>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold font-display text-white">{env.co2Level}</span>
            <span className="text-xs font-mono text-slate-400">ppm</span>
          </div>
          <div className="text-xs text-emerald-400 font-mono mt-2">Target &lt; 450 ppm nominal</div>
        </HolographicCard>

        {/* 3. Ambient Temperature */}
        <HolographicCard title="MICROCLIMATE TEMPERATURE" icon={<Flame className="w-4 h-4 text-orange-400" />}>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold font-display text-cyan-300">{env.temperature}°C</span>
            <span className="text-xs font-mono text-slate-400">Urban heat island shielded</span>
          </div>
          <div className="text-xs text-slate-400 font-mono mt-2">Humidity: 52% • Wind: 14 km/h</div>
        </HolographicCard>

        {/* 4. Acoustic Noise Level */}
        <HolographicCard title="ACOUSTIC DAMPENING" icon={<Volume2 className="w-4 h-4 text-purple-400" />}>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold font-display text-purple-300">{env.noiseLevel}</span>
            <span className="text-xs font-mono text-slate-400">dB</span>
          </div>
          <div className="text-xs text-slate-400 font-mono mt-2">Active sound cancellation barriers active</div>
        </HolographicCard>

        {/* 5. Urban Green Canopy */}
        <HolographicCard title="GREEN BIO-CANOPY" icon={<Trees className="w-4 h-4 text-emerald-400" />}>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold font-display text-emerald-400">{env.greenCanopy}%</span>
            <span className="text-xs font-mono text-slate-400">City coverage</span>
          </div>
          <div className="text-xs text-emerald-300 font-mono mt-2">Bio-Dome & Green Valley absorption optimal</div>
        </HolographicCard>

        {/* 6. Hydro Quality Index */}
        <HolographicCard title="AQUATIC BIO-PURITY" icon={<Droplets className="w-4 h-4 text-cyan-400" />}>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold font-display text-cyan-400">{env.waterPurity}%</span>
            <span className="text-xs font-mono text-slate-400">Pure Grade A</span>
          </div>
          <div className="text-xs text-cyan-300 font-mono mt-2">Continuous spectroscopic bio-testing</div>
        </HolographicCard>
      </div>

      {/* 7-Day Trend Chart */}
      <HolographicCard
        title="7-DAY ATMOSPHERIC & CARBON RECOVERY CORRELATION"
        subtitle="AQI Index vs CO2 ppm Trends"
      >
        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={aqiWeekly}>
              <XAxis dataKey="day" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} domain={[30, 100]} />
              <Tooltip contentStyle={{ backgroundColor: '#070d1e', borderColor: '#00f0ff', color: '#fff', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="aqi" stroke="#00f0ff" strokeWidth={2.5} name="AQI Index" dot={{ fill: '#00f0ff', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </HolographicCard>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { HolographicCard } from '../components/common/HolographicCard';
import { api } from '../services/api';
import {
  BarChart3,
  TrendingUp,
  Activity,
  Zap,
  Car,
  Wind,
  Filter
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

export function AnalyticsCenter() {
  const [timeframe, setTimeframe] = useState('Today');
  const [trafficData, setTrafficData] = useState([]);
  const [energyData, setEnergyData] = useState([]);
  const [envData, setEnvData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [tRes, eRes, envRes] = await Promise.all([
          api.getTrafficAnalytics(),
          api.getEnergyAnalytics(),
          api.getEnvironmentAnalytics()
        ]);
        if (tRes.success) setTrafficData(tRes.data);
        if (eRes.success) setEnergyData(eRes.data);
        if (envRes.success) setEnvData(envRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAnalytics();
  }, [timeframe]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
        <div>
          <div className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
            // HISTORICAL TIME-SERIES & MULTIVARIATE TELEMETRY
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Civic Analytics Center
          </h1>
        </div>

        {/* Timeframe Filter */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-cyan-500/30 font-mono text-xs">
          {['Today', '7 Days', '30 Days'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1 rounded-lg transition ${
                timeframe === t ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Row 1: Traffic Hourly Distribution & Energy Multi-Source Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Traffic Load */}
        <HolographicCard
          title="HOURLY VEHICULAR TRAFFIC LOAD"
          subtitle="Vehicles in Transit vs Average Velocity"
          icon={<Car className="w-4 h-4 text-cyan-400" />}
        >
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#070d1e', borderColor: '#00f0ff', color: '#fff' }} />
                <Area type="monotone" dataKey="vehicles" stroke="#00f0ff" fill="#00f0ff22" name="Vehicles" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </HolographicCard>

        {/* Multi-Source Energy Generation */}
        <HolographicCard
          title="ENERGY GENERATION PROFILE"
          subtitle="Solar, Wind, and Clean Core vs Municipal Demand"
          icon={<Zap className="w-4 h-4 text-emerald-400" />}
        >
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={energyData}>
                <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#070d1e', borderColor: '#00f0ff', color: '#fff' }} />
                <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }} />
                <Bar dataKey="solar" stackId="a" fill="#ffaa00" name="Solaris Solar" />
                <Bar dataKey="wind" stackId="a" fill="#00ff9d" name="Offshore Wind" />
                <Bar dataKey="fossil" stackId="a" fill="#00f0ff" name="Clean Core" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </HolographicCard>
      </div>

      {/* Row 2: Environmental Trends */}
      <HolographicCard
        title="ENVIRONMENTAL CORRELATION MATRIX"
        subtitle="Weekly Air Quality Index (AQI) vs Carbon Dioxide (ppm)"
        icon={<Wind className="w-4 h-4 text-cyan-300" />}
      >
        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={envData}>
              <XAxis dataKey="day" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} domain={[30, 100]} />
              <Tooltip contentStyle={{ backgroundColor: '#070d1e', borderColor: '#00f0ff', color: '#fff' }} />
              <Line type="monotone" dataKey="aqi" stroke="#00f0ff" strokeWidth={2.5} name="AQI Index" dot={{ fill: '#00f0ff', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </HolographicCard>
    </div>
  );
}

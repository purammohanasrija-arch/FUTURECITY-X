import React, { useState } from 'react';
import { useCity } from '../context/CityContext';
import { HolographicCard } from '../components/common/HolographicCard';
import { soundManager } from '../utils/sound';
import {
  FlaskConical,
  Play,
  ArrowRight,
  TrendingUp,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Clock,
  Car,
  Zap,
  Droplets,
  Trash2,
  Wind,
  Activity,
  History,
  AlertTriangle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';

export function SimulationLab() {
  const { runSimulation, simulationHistory } = useCity();

  // Slider State (Section 25)
  const [population, setPopulation] = useState(20);
  const [cars, setCars] = useState(15);
  const [factories, setFactories] = useState(10);
  const [rainfall, setRainfall] = useState(0);
  const [solar, setSolar] = useState(25);
  const [publicTransport, setPublicTransport] = useState(20);
  const [waterConsumption, setWaterConsumption] = useState(10);
  const [wasteGeneration, setWasteGeneration] = useState(15);

  const [running, setRunning] = useState(false);
  const [activeResult, setActiveResult] = useState(null);

  const handleRun = async () => {
    setRunning(true);
    soundManager.playClick();
    try {
      const res = await runSimulation({
        population,
        cars,
        factories,
        rainfall,
        solar,
        publicTransport,
        waterConsumption,
        wasteGeneration
      });
      setActiveResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setRunning(false);
    }
  };

  const handleResetSliders = () => {
    soundManager.playClick();
    setPopulation(0);
    setCars(0);
    setFactories(0);
    setRainfall(0);
    setSolar(0);
    setPublicTransport(0);
    setWaterConsumption(0);
    setWasteGeneration(0);
    setActiveResult(null);
  };

  const handleLoadHistory = (sim) => {
    soundManager.playClick();
    if (sim.parameters) {
      setPopulation(sim.parameters.population || 0);
      setCars(sim.parameters.cars || 0);
      setFactories(sim.parameters.factories || 0);
      setRainfall(sim.parameters.rainfall || 0);
      setSolar(sim.parameters.solar || 0);
      setPublicTransport(sim.parameters.publicTransport || 0);
      setWaterConsumption(sim.parameters.waterConsumption || 0);
      setWasteGeneration(sim.parameters.wasteGeneration || 0);
    }
    setActiveResult(sim);
  };

  // Comparative Radar Data for Before vs After
  const radarData = activeResult ? [
    { metric: 'Traffic', before: activeResult.results.traffic.before, after: activeResult.results.traffic.after },
    { metric: 'Energy', before: activeResult.results.energy.before, after: activeResult.results.energy.after },
    { metric: 'Water', before: activeResult.results.water.before, after: activeResult.results.water.after },
    { metric: 'Waste', before: activeResult.results.waste.before, after: activeResult.results.waste.after },
    { metric: 'Air Quality', before: activeResult.results.airQuality.before, after: activeResult.results.airQuality.after },
    { metric: 'Overall', before: activeResult.results.overallHealth.before, after: activeResult.results.overallHealth.after },
  ] : [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-amber-400 uppercase">
            <FlaskConical className="w-4 h-4" />
            <span>SIGNATURE INNOVATION ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            What-If City Policy & Stress Simulator
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetSliders}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Sliders</span>
          </button>
          <button
            onClick={handleRun}
            disabled={running}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 text-black font-mono font-bold text-xs shadow-neon-amber hover:scale-105 active:scale-95 disabled:opacity-50 transition flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>{running ? 'RUNNING SCENARIO...' : '▶ RUN SIMULATION'}</span>
          </button>
        </div>
      </div>

      {/* 8 Multi-System Simulation Sliders Grid (Section 25) */}
      <HolographicCard
        title="CIVIC PARAMETER INPUT CONTROLS"
        subtitle="Adjust Demographic, Environmental, and Infrastructure Variables"
        icon={<TrendingUp className="w-4 h-4 text-amber-400" />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs py-2">
          {/* 1. Population */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-cyan-500/15">
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Population Shift</span>
              <span className="text-cyan-400 font-bold">{population >= 0 ? `+${population}` : population}%</span>
            </div>
            <input
              type="range"
              min="-20"
              max="50"
              value={population}
              onChange={(e) => setPopulation(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>-20%</span>
              <span>+50%</span>
            </div>
          </div>

          {/* 2. Cars */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-cyan-500/15">
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Private Vehicles</span>
              <span className="text-amber-400 font-bold">{cars >= 0 ? `+${cars}` : cars}%</span>
            </div>
            <input
              type="range"
              min="-20"
              max="50"
              value={cars}
              onChange={(e) => setCars(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>-20%</span>
              <span>+50%</span>
            </div>
          </div>

          {/* 3. Factories */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-cyan-500/15">
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Factory Activity</span>
              <span className="text-red-400 font-bold">{factories >= 0 ? `+${factories}` : factories}%</span>
            </div>
            <input
              type="range"
              min="-20"
              max="50"
              value={factories}
              onChange={(e) => setFactories(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>-20%</span>
              <span>+50%</span>
            </div>
          </div>

          {/* 4. Rainfall */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-cyan-500/15">
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Precipitation Shock</span>
              <span className="text-cyan-300 font-bold">{rainfall >= 0 ? `+${rainfall}` : rainfall}%</span>
            </div>
            <input
              type="range"
              min="-20"
              max="100"
              value={rainfall}
              onChange={(e) => setRainfall(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-300"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>-20%</span>
              <span>+100%</span>
            </div>
          </div>

          {/* 5. Solar */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-cyan-500/15">
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Solar Capacity</span>
              <span className="text-emerald-400 font-bold">+{solar}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={solar}
              onChange={(e) => setSolar(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>0%</span>
              <span>+100%</span>
            </div>
          </div>

          {/* 6. Public Transport */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-cyan-500/15">
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Public Transit Surge</span>
              <span className="text-indigo-400 font-bold">+{publicTransport}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={publicTransport}
              onChange={(e) => setPublicTransport(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>0%</span>
              <span>+100%</span>
            </div>
          </div>

          {/* 7. Water Consumption */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-cyan-500/15">
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Water Demand</span>
              <span className="text-cyan-400 font-bold">{waterConsumption >= 0 ? `+${waterConsumption}` : waterConsumption}%</span>
            </div>
            <input
              type="range"
              min="-20"
              max="50"
              value={waterConsumption}
              onChange={(e) => setWaterConsumption(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>-20%</span>
              <span>+50%</span>
            </div>
          </div>

          {/* 8. Waste Generation */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-cyan-500/15">
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Waste Generation</span>
              <span className="text-purple-400 font-bold">{wasteGeneration >= 0 ? `+${wasteGeneration}` : wasteGeneration}%</span>
            </div>
            <input
              type="range"
              min="-20"
              max="50"
              value={wasteGeneration}
              onChange={(e) => setWasteGeneration(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>-20%</span>
              <span>+50%</span>
            </div>
          </div>
        </div>
      </HolographicCard>

      {/* Simulation Results: BEFORE vs AFTER (Section 26) */}
      {activeResult ? (
        <div className="space-y-6 animate-fadeIn">
          {/* BEFORE vs AFTER Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {Object.entries(activeResult.results).map(([key, item]) => {
              const isBetter = item.shift === 'better';
              const isWorse = item.shift === 'worse';
              const color = isBetter ? 'text-emerald-400' : isWorse ? 'text-red-400' : 'text-slate-300';

              return (
                <div key={key} className="p-4 rounded-xl bg-[#090f25]/90 border border-cyan-500/25">
                  <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                    {key}
                  </div>
                  <div className="flex items-center gap-2 mt-2 font-display text-base font-bold">
                    <span className="text-slate-400 line-through text-sm">{item.before}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                    <span className={color}>{item.after}</span>
                  </div>
                  <div className={`text-[10px] font-mono mt-1 ${color}`}>
                    {item.change} {item.shift.toUpperCase()}
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI Explanation & Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HolographicCard
              title="SCENARIO OUTCOME RADAR"
              subtitle="Multivariate Stress Profile"
            >
              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                    <PolarGrid stroke="#1e293b" />
                    <PolarAngleAxis dataKey="metric" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                    <PolarRadiusAxis domain={[0, 100]} stroke="#334155" />
                    <Radar name="Baseline" dataKey="before" stroke="#64748b" fill="#64748b" fillOpacity={0.2} />
                    <Radar name="Simulated" dataKey="after" stroke="#00f0ff" fill="#00f0ff" fillOpacity={0.4} />
                    <Tooltip contentStyle={{ backgroundColor: '#070d1e', borderColor: '#00f0ff', color: '#fff' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </HolographicCard>

            <HolographicCard
              title="AI CORE SIMULATION ANALYSIS"
              subtitle="Causal Attribution & Policy Mitigation"
              icon={<Sparkles className="w-4 h-4 text-cyan-400" />}
            >
              <div className="space-y-4">
                <p className="text-xs text-slate-200 leading-relaxed font-sans bg-slate-950/60 p-3.5 rounded-xl border border-cyan-500/15">
                  {activeResult.aiSummary}
                </p>

                <div>
                  <div className="text-xs font-mono text-cyan-400 uppercase font-bold mb-2">
                    Recommended Civic Mitigations:
                  </div>
                  <div className="space-y-1.5">
                    {activeResult.recommendations?.map((rec, i) => (
                      <div key={i} className="text-xs font-mono text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </HolographicCard>
          </div>
        </div>
      ) : (
        <div className="p-8 rounded-2xl bg-slate-900/40 border border-dashed border-slate-700 text-center font-mono text-xs text-slate-400">
          Adjust the sliders above and click <span className="text-amber-400 font-bold">"RUN SIMULATION"</span> to evaluate municipal systemic impact.
        </div>
      )}

      {/* Simulation History (Section 27) */}
      <HolographicCard
        title="HISTORICAL SCENARIO ARCHIVE"
        subtitle="Review and Reload Prior Simulation Runs"
        icon={<History className="w-4 h-4 text-cyan-400" />}
      >
        <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
          {simulationHistory.map((sim) => (
            <div
              key={sim.id}
              onClick={() => handleLoadHistory(sim)}
              className="p-3 rounded-xl bg-slate-900/60 hover:bg-cyan-950/60 border border-slate-700/60 hover:border-cyan-500/40 cursor-pointer transition flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs"
            >
              <div>
                <div className="font-bold text-white flex items-center gap-2">
                  <span className="text-amber-400">{sim.title}</span>
                  <span className="text-slate-500">[{sim.id}]</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Health Result: {sim.results?.overallHealth?.before} → {sim.results?.overallHealth?.after} ({sim.results?.overallHealth?.change})
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] text-slate-500">{new Date(sim.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  Inspect
                </span>
              </div>
            </div>
          ))}
        </div>
      </HolographicCard>
    </div>
  );
}

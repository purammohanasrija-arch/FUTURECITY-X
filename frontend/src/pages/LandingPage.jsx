import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CityScene } from '../components/3d/CityScene';
import { SystemBootSequence } from '../components/landing/SystemBootSequence';
import { soundManager } from '../utils/sound';
import {
  ArrowRight,
  Shield,
  Zap,
  Car,
  Droplets,
  Trash2,
  Train,
  Leaf,
  Cpu,
  BarChart3,
  FlaskConical,
  Activity,
  Layers,
  Sparkles,
  ChevronDown
} from 'lucide-react';

export function LandingPage() {
  const [booting, setBooting] = useState(false);
  const navigate = useNavigate();

  const handleEnterCity = () => {
    soundManager.playClick();
    setBooting(true);
  };

  const scrollToSystems = () => {
    soundManager.playClick();
    document.getElementById('systems-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const subsystems = [
    { name: '3D Digital Twin', desc: 'Real-time WebGL interactive city model with procedural skyscrapers and facilities.', icon: <Layers className="w-5 h-5 text-cyan-400" /> },
    { name: 'Autonomous Traffic', desc: 'Adaptive signal balancing, congestion heatmaps, and moving vehicle fleets.', icon: <Car className="w-5 h-5 text-amber-400" /> },
    { name: 'Smart Energy Grid', desc: 'Solar and wind microgrids with dynamic consumption load shifting.', icon: <Zap className="w-5 h-5 text-emerald-400" /> },
    { name: 'Aqua-Net Telemetry', desc: 'Automated leak detection, aquifer levels, and pressure isolation protocols.', icon: <Droplets className="w-5 h-5 text-cyan-400" /> },
    { name: 'Automated Waste Management', desc: 'Smart bin fill tracking and AI-driven drone collection route optimization.', icon: <Trash2 className="w-5 h-5 text-purple-400" /> },
    { name: 'Multi-Modal Transit', desc: 'Hyperloop, automated bus pods, and real-time station arrival tracking.', icon: <Train className="w-5 h-5 text-indigo-400" /> },
    { name: 'Public Safety & Emergency', desc: 'Incident dispatch corridors, severity telemetry, and responder tracking.', icon: <Shield className="w-5 h-5 text-red-400" /> },
    { name: 'What-If Simulation Lab', desc: 'Multi-variable scenario engine to model population, transit, and policy shocks.', icon: <FlaskConical className="w-5 h-5 text-pink-400" /> },
  ];

  return (
    <div className="relative min-h-screen bg-[#050811] text-slate-100 font-sans overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* Boot Animation Sequence Modal */}
      {booting && <SystemBootSequence onComplete={() => setBooting(false)} />}

      {/* Top Navbar Header */}
      <header className="fixed top-0 left-0 right-0 z-40 h-20 border-b border-cyan-500/20 bg-[#050918]/80 backdrop-blur-xl px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 shadow-neon-cyan">
            <Cpu className="w-6 h-6 text-black" />
          </div>
          <div>
            <div className="text-base font-extrabold font-display tracking-widest text-white">
              FUTURECITY <span className="text-cyan-400">X</span>
            </div>
            <div className="text-[10px] font-mono text-cyan-400/80">
              AI SMART CITY DIGITAL TWIN
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 text-xs font-mono text-slate-300 hover:text-white transition"
          >
            Operator Sign In
          </button>
          <button
            onClick={handleEnterCity}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-black font-mono font-bold text-xs shadow-neon-cyan hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>ENTER THE CITY</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Title Badges */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-6 shadow-sm">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>NEXT-GENERATION URBAN OPERATING SYSTEM</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-wider text-white mb-4">
          FUTURECITY <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">X</span>
        </h1>

        {/* Subtitle */}
        <h2 className="text-lg sm:text-2xl font-mono text-cyan-300 tracking-widest uppercase mb-4">
          THE DIGITAL TWIN OF TOMORROW'S CITY
        </h2>

        {/* Supporting text */}
        <p className="max-w-2xl text-slate-300 text-sm sm:text-base leading-relaxed mb-8 font-sans">
          Explore, monitor, simulate and optimize a living futuristic city powered by AI. Real-time telemetry, interactive 3D spatial simulation, and predictive policy modeling in one cohesive digital twin.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={handleEnterCity}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-black font-mono font-bold text-sm tracking-wider shadow-neon-cyan hover:shadow-cyan-400/50 hover:scale-105 transition-all flex items-center gap-2.5"
          >
            <span>ENTER THE CITY</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={scrollToSystems}
            className="px-8 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/30 text-cyan-300 font-mono text-sm tracking-wider transition-all flex items-center gap-2"
          >
            <span>EXPLORE SYSTEMS</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* 3D City Hero Visual with Floating HUD stats */}
        <div className="relative w-full max-w-5xl rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl bg-[#060b1c]">
          {/* Floating HUD Cards around 3D City */}
          <div className="absolute top-4 left-4 z-20 hidden sm:flex flex-col gap-2.5 pointer-events-none">
            <div className="px-3.5 py-2 rounded-xl bg-[#080d22]/90 backdrop-blur-md border border-cyan-500/30 text-left shadow-lg">
              <div className="text-[10px] font-mono text-slate-400 uppercase">TRAFFIC</div>
              <div className="text-lg font-bold font-display text-amber-400">72%</div>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-[#080d22]/90 backdrop-blur-md border border-cyan-500/30 text-left shadow-lg">
              <div className="text-[10px] font-mono text-slate-400 uppercase">ENERGY</div>
              <div className="text-lg font-bold font-display text-emerald-400">94%</div>
            </div>
          </div>

          <div className="absolute top-4 right-4 z-20 hidden sm:flex flex-col gap-2.5 pointer-events-none">
            <div className="px-3.5 py-2 rounded-xl bg-[#080d22]/90 backdrop-blur-md border border-cyan-500/30 text-right shadow-lg">
              <div className="text-[10px] font-mono text-slate-400 uppercase">AIR QUALITY</div>
              <div className="text-lg font-bold font-display text-cyan-400">AQI 78</div>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-[#080d22]/90 backdrop-blur-md border border-emerald-500/30 text-right shadow-lg">
              <div className="text-[10px] font-mono text-slate-400 uppercase">CITY STATUS</div>
              <div className="text-lg font-bold font-display text-emerald-400">ONLINE</div>
            </div>
          </div>

          {/* Interactive 3D Canvas */}
          <div className="h-[460px] sm:h-[540px] w-full">
            <CityScene height="100%" showControls={true} />
          </div>
        </div>
      </section>

      {/* Subsystems Grid Section */}
      <section id="systems-section" className="py-24 px-6 border-t border-cyan-500/15 bg-[#030612]/90">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-mono tracking-widest text-cyan-400 uppercase mb-2">
              // MUNICIPAL ARCHITECTURE
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold font-display text-white">
              Eight Synchronized City Subsystems
            </h3>
            <p className="text-slate-400 text-sm mt-3 font-sans">
              Interconnected neural loops monitor, adjust, and optimize civic infrastructure with zero latency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {subsystems.map((s, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#090f23]/60 backdrop-blur-md border border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-neon-cyan transition-all duration-300 group"
              >
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 w-fit mb-4 group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <h4 className="text-base font-bold font-display text-white mb-2">
                  {s.name}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Feature Callout: What-If Simulation Lab */}
      <section className="py-20 px-6 border-t border-cyan-500/15 bg-gradient-to-b from-[#050a1c] to-[#040713]">
        <div className="max-w-6xl mx-auto rounded-3xl p-8 sm:p-12 border border-cyan-500/30 bg-[#080f28]/80 backdrop-blur-2xl shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/50 border border-amber-500/30 text-amber-300 text-xs font-mono mb-4">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>SIGNATURE FEATURE</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-bold font-display text-white mb-4">
              What-If Urban Policy Simulator
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
              Test municipal policy shocks before physical implementation. Adjust population influx, autonomous vehicle saturation, industrial output, and solar grid capacity to observe instant systemic ripple effects.
            </p>
            <button
              onClick={handleEnterCity}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-black font-mono font-bold text-xs uppercase tracking-wider shadow-neon-amber hover:opacity-90 transition flex items-center gap-2"
            >
              <span>Launch Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="w-full lg:w-96 p-5 rounded-2xl bg-slate-950/80 border border-cyan-500/25 font-mono text-xs text-slate-300 space-y-3">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Simulation Run</span>
              <span className="text-cyan-400">#42-OMEGA</span>
            </div>
            <div className="flex justify-between">
              <span>Population Shift</span>
              <span className="text-amber-400 font-bold">+25%</span>
            </div>
            <div className="flex justify-between">
              <span>Private Vehicles</span>
              <span className="text-red-400 font-bold">+18%</span>
            </div>
            <div className="flex justify-between">
              <span>Solar Capacity</span>
              <span className="text-emerald-400 font-bold">+35%</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-white">
              <span>Overall Health Impact</span>
              <span className="text-emerald-300">88 → 91 pts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-cyan-500/20 bg-[#030612] text-xs font-mono text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-slate-400">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>FUTURECITY X © 2026 // Next-Gen Urban Twin</span>
        </div>
        <div>Engineered with React, Three.js, Node.js & Google Gemini</div>
      </footer>
    </div>
  );
}

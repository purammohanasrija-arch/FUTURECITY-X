import React, { useState } from 'react';
import { useCity } from '../../context/CityContext';
import { soundManager } from '../../utils/sound';
import {
  Sparkles,
  X,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  Zap,
  TrendingUp,
  Sliders,
  ShieldCheck
} from 'lucide-react';

export function AIOptimizerModal({ isOpen, onClose }) {
  const { cityHealth, applyOptimization } = useCity();
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  if (!isOpen) return null;

  const handleApply = async () => {
    setApplying(true);
    soundManager.playClick();
    setTimeout(async () => {
      await applyOptimization();
      setApplying(false);
      setApplied(true);
      soundManager.playSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn font-sans">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-[#080d22] border border-cyan-500/40 shadow-neon-cyan text-slate-100">
        {/* Top Glow bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-emerald-400" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-cyan-500/20 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 shadow-neon-cyan">
              <Sparkles className="w-6 h-6 text-black" />
            </div>
            <div>
              <div className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
                AUTOMATED SYNAPSE // NEURAL OPTIMIZER
              </div>
              <h2 className="text-xl font-bold font-display text-white">
                City-Wide AI System Optimizer
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3-Step Optimization Architecture: Current -> Analysis -> Actions */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Step 1: Current City State */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center font-display font-extrabold text-xl text-cyan-400">
                {cityHealth}
              </div>
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase">Current Baseline</div>
                <div className="text-sm font-bold text-white">Municipal Health Index: {cityHealth}/100</div>
              </div>
            </div>

            <ArrowRight className="w-5 h-5 text-cyan-400 hidden sm:block shrink-0" />

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center font-display font-extrabold text-xl text-emerald-400">
                95
              </div>
              <div>
                <div className="text-xs font-mono text-emerald-400 uppercase">Projected Optimized</div>
                <div className="text-sm font-bold text-emerald-300">+7 to +9 pts Improvement</div>
              </div>
            </div>
          </div>

          {/* Step 2: AI Neural Analysis */}
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-cyan-300">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>NEURAL DIAGNOSTIC SYNTHESIS</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Algorithmic audit detected cross-sector sub-optimizations: localized traffic buildup along Sector 3 chokepoints, sub-optimal battery buffering during peak solar generation, and container saturation in Sector 3 Smart Bin Node 12.
            </p>
          </div>

          {/* Step 3: Recommended Actions */}
          <div className="space-y-3">
            <div className="text-xs font-mono tracking-widest text-slate-400 uppercase flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Recommended Autonomous Actions</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-cyan-500/15 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <div className="font-bold text-white font-mono">1. Dynamic Signal Balancing</div>
                  <div className="text-slate-400 mt-0.5">Extend Junction 07 green phase (+8s) to clear northbound freight backlogs.</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-cyan-500/15 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <div className="font-bold text-white font-mono">2. Solar Peak Buffer Feed</div>
                  <div className="text-slate-400 mt-0.5">Direct 18 MW of Solaris solar surplus into industrial microgrid storage.</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-cyan-500/15 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <div className="font-bold text-white font-mono">3. Autonomous Waste Routing</div>
                  <div className="text-slate-400 mt-0.5">Dispatch compactor drones to Sector 3 Node 12 to reduce fill from 94% to 45%.</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-cyan-500/15 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <div className="font-bold text-white font-mono">4. Public Transit Pod Surge</div>
                  <div className="text-slate-400 mt-0.5">Increase Hyperloop and autonomous electric bus frequency by 25%.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="flex items-center justify-between p-6 border-t border-cyan-500/20 bg-slate-950/60">
          <div className="text-xs font-mono text-slate-400">
            {applied ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                OPTIMIZATION ACTIVE (City Health: 95/100)
              </span>
            ) : (
              'Simulated real-time parameter elevation'
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={applying || applied}
              className="px-5 py-2 text-xs font-mono font-bold uppercase rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-400 text-black shadow-neon-cyan hover:opacity-90 disabled:opacity-50 transition flex items-center gap-2"
            >
              {applying ? 'Engaging Synapse...' : applied ? 'Applied Successfully' : 'Apply AI Optimization'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

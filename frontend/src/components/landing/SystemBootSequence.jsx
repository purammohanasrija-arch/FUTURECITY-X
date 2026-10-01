import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { soundManager } from '../../utils/sound';
import { Cpu, CheckCircle2, Shield, FastForward } from 'lucide-react';

export function SystemBootSequence({ onComplete }) {
  const navigate = useNavigate();

  const bootSteps = [
    { title: 'CITY CORE', status: 'ONLINE', delay: 400 },
    { title: 'TRAFFIC NETWORK', status: 'ONLINE', delay: 800 },
    { title: 'ENERGY GRID', status: 'ONLINE', delay: 1200 },
    { title: 'WATER NETWORK', status: 'ONLINE', delay: 1600 },
    { title: 'TRANSPORT SYSTEM', status: 'ONLINE', delay: 2000 },
    { title: 'PUBLIC SAFETY', status: 'ONLINE', delay: 2400 },
    { title: 'AI CORE', status: 'ONLINE', delay: 2800 },
  ];

  const [visibleCount, setVisibleCount] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    soundManager.playBootSound();

    const timeouts = bootSteps.map((step, idx) => {
      return setTimeout(() => {
        setVisibleCount(idx + 1);
        soundManager.playBeep(800 + idx * 100, 0.05);
        if (idx === bootSteps.length - 1) {
          setTimeout(() => {
            setComplete(true);
            soundManager.playSuccess();
            setTimeout(() => {
              if (onComplete) onComplete();
              navigate('/app');
            }, 1000);
          }, 600);
        }
      }, step.delay);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const handleSkip = () => {
    soundManager.playClick();
    if (onComplete) onComplete();
    navigate('/app');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030611] font-mono text-cyan-300">
      {/* Background Holographic Scanlines */}
      <div className="absolute inset-0 bg-cyber-grid pointer-events-none opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-cyan-950 border border-cyan-500/30 text-xs text-slate-300 hover:text-white transition"
      >
        <span>Skip Sequence</span>
        <FastForward className="w-3.5 h-3.5" />
      </button>

      {/* Center Boot Terminal Box */}
      <div className="relative w-full max-w-xl p-8 rounded-2xl bg-[#070e24]/90 border border-cyan-500/40 shadow-neon-cyan backdrop-blur-xl">
        {/* Terminal Header */}
        <div className="flex items-center gap-3 pb-4 mb-6 border-b border-cyan-500/20">
          <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-500/30">
            <Cpu className="w-6 h-6 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold font-display tracking-widest text-white">
              INITIALIZING FUTURECITY X...
            </h2>
            <div className="text-[10px] text-cyan-400/80">
              SYNAPSE CORE v2.6.4 // DIGITAL TWIN BOOTSTRAP
            </div>
          </div>
        </div>

        {/* Step-by-Step Online Sequence */}
        <div className="space-y-3 font-mono text-xs">
          {bootSteps.slice(0, visibleCount).map((step, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-cyan-500/15 animate-fadeIn"
            >
              <span className="text-slate-300 font-bold tracking-wider">
                {step.title} {'.'.repeat(Math.max(2, 28 - step.title.length))}
              </span>
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {step.status}
              </span>
            </div>
          ))}
        </div>

        {/* Final Status Completion Banner */}
        {complete && (
          <div className="mt-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center animate-slideUp">
            <div className="text-sm font-bold font-display text-emerald-300 tracking-widest">
              SYSTEM STATUS: OPERATIONAL
            </div>
            <div className="text-[11px] text-emerald-400/80 font-mono mt-1">
              Entering Central Command Center...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

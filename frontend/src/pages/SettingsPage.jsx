import React, { useState } from 'react';
import { useCity } from '../context/CityContext';
import { useAuth } from '../context/AuthContext';
import { HolographicCard } from '../components/common/HolographicCard';
import { soundManager } from '../utils/sound';
import {
  Settings,
  User,
  Sliders,
  Volume2,
  VolumeX,
  Gauge,
  Cpu,
  Shield,
  CheckCircle2,
  EyeOff
} from 'lucide-react';

export function SettingsPage() {
  const { user } = useAuth();
  const { performanceMode, togglePerformanceMode, soundMuted, toggleSound } = useCity();

  const [simSpeed, setSimSpeed] = useState('1.0x');
  const [telemetryInterval, setTelemetryInterval] = useState('4s');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    soundManager.playSuccess();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto font-sans">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
        <div>
          <div className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
            // TERMINAL PREFERENCES & HARDWARE CALIBRATION
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            System Settings & Display Matrix
          </h1>
        </div>

        {saved && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-mono text-xs animate-fadeIn">
            <CheckCircle2 className="w-4 h-4" />
            <span>Preferences Saved</span>
          </div>
        )}
      </div>

      {/* Operator Identity Card */}
      <HolographicCard
        title="OPERATOR CREDENTIALS"
        subtitle="Active Session Node"
        icon={<User className="w-4 h-4 text-cyan-400" />}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
          <div className="space-y-1">
            <div className="text-base font-bold text-white">{user?.name || 'Administrator'}</div>
            <div className="text-slate-400">{user?.email || 'admin@futurecity.io'}</div>
            <div className="text-cyan-400">Assigned Sector: {user?.sector || 'Central District'}</div>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 uppercase font-bold text-center">
            Security Role: {user?.role || 'operator'}
          </div>
        </div>
      </HolographicCard>

      {/* Engine & Performance Mode (Section 36) */}
      <HolographicCard
        title="HARDWARE & GRAPHICS ENGINE"
        subtitle="Frame Rates & WebGL Optimizations"
        icon={<Cpu className="w-4 h-4 text-purple-400" />}
      >
        <div className="space-y-4 font-mono text-xs">
          {/* Performance Mode Switch */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/60">
            <div>
              <div className="font-bold text-white">Performance Mode (Low GPU Latency)</div>
              <div className="text-slate-400 text-[11px] mt-0.5">
                Reduces shadow depth and heavy post-processing for laptops and integrated GPUs.
              </div>
            </div>
            <button
              onClick={() => {
                soundManager.playClick();
                togglePerformanceMode();
              }}
              className={`px-4 py-1.5 rounded-lg font-bold border transition ${
                performanceMode
                  ? 'bg-emerald-500 text-black border-emerald-400'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {performanceMode ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>

          {/* Sound Synthesizer Audio Switch */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/60">
            <div>
              <div className="font-bold text-white">Synthesizer Sound Effects</div>
              <div className="text-slate-400 text-[11px] mt-0.5">
                Web Audio API procedural sound cues on interaction, alerts, and boot.
              </div>
            </div>
            <button
              onClick={() => {
                soundManager.playClick();
                toggleSound();
              }}
              className={`px-4 py-1.5 rounded-lg font-bold border transition ${
                !soundMuted
                  ? 'bg-cyan-500 text-black border-cyan-400'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {!soundMuted ? 'ACTIVE' : 'MUTED'}
            </button>
          </div>

          {/* Simulation Speed & Interval */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-slate-400 mb-1">SIMULATION TICK SPEED</label>
              <select
                value={simSpeed}
                onChange={(e) => setSimSpeed(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-cyan-500/25 text-white"
              >
                <option value="0.5x">0.5x (Slow Motion Telemetry)</option>
                <option value="1.0x">1.0x (Standard Real-Time)</option>
                <option value="2.0x">2.0x (Accelerated Scenario)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">TELEMETRY REFRESH INTERVAL</label>
              <select
                value={telemetryInterval}
                onChange={(e) => setTelemetryInterval(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-cyan-500/25 text-white"
              >
                <option value="2s">2 seconds (High Frequency)</option>
                <option value="4s">4 seconds (Balanced)</option>
                <option value="10s">10 seconds (Low Bandwidth)</option>
              </select>
            </div>
          </div>
        </div>
      </HolographicCard>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-black font-mono font-bold text-xs shadow-neon-cyan hover:scale-105 active:scale-95 transition"
        >
          SAVE TERMINAL CONFIGURATION
        </button>
      </div>
    </div>
  );
}

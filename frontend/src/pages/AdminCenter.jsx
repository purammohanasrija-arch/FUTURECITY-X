import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCity } from '../context/CityContext';
import { HolographicCard } from '../components/common/HolographicCard';
import { soundManager } from '../utils/sound';
import {
  ShieldCheck,
  Users,
  Database,
  Terminal,
  RotateCcw,
  AlertOctagon,
  CheckCircle2
} from 'lucide-react';

export function AdminCenter() {
  const { user } = useAuth();
  const { refreshCityData, addNotification } = useCity();
  const [resetting, setResetting] = useState(false);

  const sampleUsers = [
    { name: 'Commander Sarah Vance', role: 'admin', sector: 'Central District', status: 'ACTIVE' },
    { name: 'Alex Chen', role: 'operator', sector: 'Innovation District', status: 'ACTIVE' },
    { name: 'Elena Rostova', role: 'citizen', sector: 'Green Valley', status: 'ACTIVE' },
    { name: 'Dr. Marcus Vance', role: 'operator', sector: 'Industrial Zone', status: 'STANDBY' },
  ];

  const handleResetData = async () => {
    setResetting(true);
    soundManager.playClick();
    setTimeout(async () => {
      await refreshCityData();
      setResetting(false);
      soundManager.playSuccess();
      addNotification({
        title: 'Master State Recalibrated',
        message: 'Telemetry database re-synchronized to baseline parameters.',
        type: 'success'
      });
    }, 1000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-sans">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
        <div>
          <div className="text-xs font-mono tracking-widest text-amber-400 uppercase">
            // LEVEL-3 SECURITY CLEARANCE ACCESS
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Administrator Command Console
          </h1>
        </div>

        <span className="px-3 py-1 rounded-full bg-amber-950 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold">
          ROOT OPERATOR: {user?.name}
        </span>
      </div>

      {/* Admin Subsystems */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Directory Management */}
        <HolographicCard
          title="CIVIC SECURITY DIRECTORY"
          subtitle="Role-Based Access Control Registry"
          icon={<Users className="w-4 h-4 text-cyan-400" />}
        >
          <div className="space-y-3 font-mono text-xs">
            {sampleUsers.map((u, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">{u.name}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{u.sector}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-500/30 uppercase font-bold">
                    {u.role}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold">{u.status}</span>
                </div>
              </div>
            ))}
          </div>
        </HolographicCard>

        {/* Master State Controls */}
        <HolographicCard
          title="SYSTEM TELEMETRY BUS MANAGEMENT"
          subtitle="Emergency Drill & Seed Controls"
          icon={<Database className="w-4 h-4 text-amber-400" />}
        >
          <div className="space-y-4 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-cyan-500/20">
              <div className="font-bold text-white">Re-Sync Master Telemetry</div>
              <div className="text-slate-400 text-[11px] mt-1">
                Refreshes all memory stores, recalculates 8-sector congestion, and synchronizes live WebGL spatial state.
              </div>
              <button
                onClick={handleResetData}
                disabled={resetting}
                className="mt-3 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold flex items-center gap-1.5 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{resetting ? 'RE-SYNCING...' : 'RE-SYNC CITY DATABASE'}</span>
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/30">
              <div className="font-bold text-red-300">Broadcast City-Wide Emergency Drill</div>
              <div className="text-slate-400 text-[11px] mt-1">
                Transmits alert sirens and audio cues across all connected operator consoles.
              </div>
              <button
                onClick={() => {
                  soundManager.playAlert();
                  addNotification({
                    title: 'EMERGENCY DRILL BROADCAST',
                    message: 'Civil Defense Level 2 Drill initiated. All secondary corridors cleared.',
                    type: 'alert'
                  });
                }}
                className="mt-3 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-400 text-white font-bold flex items-center gap-1.5 transition"
              >
                <AlertOctagon className="w-3.5 h-3.5" />
                <span>EXECUTE DRILL ALERT</span>
              </button>
            </div>
          </div>
        </HolographicCard>
      </div>
    </div>
  );
}

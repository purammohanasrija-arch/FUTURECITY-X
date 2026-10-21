import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { soundManager } from '../../utils/sound';
import {
  LayoutDashboard,
  Box,
  Car,
  Zap,
  Droplets,
  Trash2,
  Train,
  Leaf,
  ShieldAlert,
  HardHat,
  Bot,
  FlaskConical,
  BarChart3,
  AlertTriangle,
  Settings,
  ShieldCheck,
  X
} from 'lucide-react';

export function Sidebar({ mobileOpen, onCloseMobile }) {
  const { isAdmin } = useAuth();

  const navItems = [
    { name: 'Overview', path: '/app', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: '3D City', path: '/app/3d-city', icon: <Box className="w-4 h-4" />, badge: 'LIVE' },
    { name: 'Traffic', path: '/app/traffic', icon: <Car className="w-4 h-4" /> },
    { name: 'Energy', path: '/app/energy', icon: <Zap className="w-4 h-4" /> },
    { name: 'Water', path: '/app/water', icon: <Droplets className="w-4 h-4" /> },
    { name: 'Waste', path: '/app/waste', icon: <Trash2 className="w-4 h-4" /> },
    { name: 'Transport', path: '/app/transport', icon: <Train className="w-4 h-4" /> },
    { name: 'Environment', path: '/app/environment', icon: <Leaf className="w-4 h-4" /> },
    { name: 'Public Safety', path: '/app/public-safety', icon: <ShieldAlert className="w-4 h-4" /> },
    { name: 'Infrastructure', path: '/app/infrastructure', icon: <HardHat className="w-4 h-4" /> },
    { name: 'AI City Assistant', path: '/app/ai-assistant', icon: <Bot className="w-4 h-4" />, highlight: true },
    { name: 'Simulation Lab', path: '/app/simulation-lab', icon: <FlaskConical className="w-4 h-4" />, signature: true },
    { name: 'Analytics', path: '/app/analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { name: 'Incidents', path: '/app/incidents', icon: <AlertTriangle className="w-4 h-4" /> },
    { name: 'Settings', path: '/app/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  if (isAdmin) {
    navItems.push({
      name: 'Admin Command',
      path: '/app/admin',
      icon: <ShieldCheck className="w-4 h-4" />,
      badge: 'SEC-3'
    });
  }

  const handleNavClick = () => {
    soundManager.playClick();
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Main Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 border-r border-cyan-500/20 bg-[#060b1c]/95 backdrop-blur-2xl flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Header with close button */}
        <div className="flex items-center justify-between p-4 border-b border-cyan-500/20 lg:hidden">
          <span className="text-sm font-bold font-display text-white tracking-widest">
            FUTURECITY <span className="text-cyan-400">X</span>
          </span>
          <button
            type="button"
            aria-label="Close mobile sidebar"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              soundManager.playClick();
              if (onCloseMobile) onCloseMobile();
            }}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 hover:border-cyan-400 transition cursor-pointer flex items-center justify-center"
          >
            <X className="w-5 h-5 pointer-events-none" />
          </button>
        </div>

        {/* Sidebar Header Indicator */}
        <div className="hidden lg:flex items-center justify-between px-5 py-4 border-b border-cyan-500/15">
          <div className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
            // COMMAND NAVIGATION
          </div>
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        </div>

        {/* Nav Links List */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1 font-sans">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/app'}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-mono transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-950/80 to-slate-900 border border-cyan-500/40 text-cyan-300 font-bold shadow-sm'
                    : item.signature
                    ? 'text-amber-300 hover:bg-slate-900/60 hover:text-amber-200'
                    : item.highlight
                    ? 'text-purple-300 hover:bg-slate-900/60 hover:text-purple-200'
                    : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <span className="group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </div>

              {item.badge && (
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {item.badge}
                </span>
              )}

              {item.signature && (
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  LAB
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Subsystem Sync Footer */}
        <div className="p-4 border-t border-cyan-500/15 bg-slate-950/40">
          <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-500/20">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
              <span>Telemetry Link</span>
              <span className="text-emerald-400 font-bold">50 Hz / AES</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1 mt-2 overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-1 w-[92%]" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

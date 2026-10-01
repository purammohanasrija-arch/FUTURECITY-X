import React, { useState } from 'react';
import { useCity } from '../../context/CityContext';
import { useAuth } from '../../context/AuthContext';
import { soundManager } from '../../utils/sound';
import { NotificationDropdown } from './NotificationCenter';
import {
  Sun,
  Moon,
  CloudRain,
  Zap,
  CloudFog,
  Cloud,
  Volume2,
  VolumeX,
  Bell,
  Cpu,
  User,
  Shield,
  Clock,
  Sparkles,
  Menu,
  ChevronDown
} from 'lucide-react';

export function Navbar({ onToggleMobileSidebar }) {
  const {
    simulatedTime,
    timeOfDay,
    setTimeOfDay,
    weather,
    setWeatherMode,
    isNight,
    notifications,
    soundMuted,
    toggleSound,
    cityHealth
  } = useCity();

  const { user, quickDemoLogin, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showWeatherMenu, setShowWeatherMenu] = useState(false);

  const weatherIcons = {
    Sunny: <Sun className="w-4 h-4 text-amber-400" />,
    Cloudy: <Cloud className="w-4 h-4 text-slate-300" />,
    Rain: <CloudRain className="w-4 h-4 text-cyan-400" />,
    Storm: <Zap className="w-4 h-4 text-purple-400" />,
    Fog: <CloudFog className="w-4 h-4 text-slate-400" />,
    Night: <Moon className="w-4 h-4 text-indigo-400" />
  };

  const weatherOptions = ['Sunny', 'Cloudy', 'Rain', 'Storm', 'Fog', 'Night'];

  return (
    <header className="sticky top-0 z-40 h-16 w-full border-b border-cyan-500/20 bg-[#050918]/85 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between font-sans">
      {/* Left: Mobile hamburger & City Identity / Health Pill */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:bg-slate-800"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 shadow-neon-cyan">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-extrabold font-display tracking-widest text-white flex items-center gap-2">
              FUTURECITY <span className="text-cyan-400">X</span>
              <span className="hidden sm:inline-block px-1.5 py-0.2 rounded text-[9px] font-mono uppercase bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                DT-v2.6
              </span>
            </div>
          </div>
        </div>

        {/* Global City Status Badge */}
        <div className="hidden md:flex items-center gap-2 ml-4 px-2.5 py-1 rounded-full bg-slate-900/80 border border-cyan-500/25 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-slate-300">CITY STATUS:</span>
          <span className="text-emerald-400 font-bold">ONLINE</span>
          <span className="text-slate-500">|</span>
          <span className="text-cyan-300 font-bold">HLTH {cityHealth}%</span>
        </div>
      </div>

      {/* Right Controls: Sim Time, Weather, Day/Night Slider, Audio, Notifications, Profile */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Simulated Time Display */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/60 border border-cyan-500/20 text-xs font-mono text-cyan-300">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-bold">{simulatedTime}</span>
        </div>

        {/* Day / Night Cycle Interactive Slider */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900/60 border border-cyan-500/20 text-xs font-mono">
          {isNight ? (
            <Moon className="w-3.5 h-3.5 text-indigo-400" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-amber-400" />
          )}
          <input
            type="range"
            min="0"
            max="24"
            step="0.5"
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(e.target.value)}
            className="w-20 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            title={`Simulated Time: ${simulatedTime}`}
          />
          <span className="text-[11px] text-slate-400">{Math.floor(timeOfDay)}h</span>
        </div>

        {/* Weather Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              soundManager.playClick();
              setShowWeatherMenu(!showWeatherMenu);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-cyan-500/20 text-xs font-mono text-slate-200 transition"
          >
            {weatherIcons[weather?.mode] || <Sun className="w-4 h-4 text-amber-400" />}
            <span className="hidden sm:inline">{weather?.mode}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showWeatherMenu && (
            <div className="absolute right-0 mt-2 w-36 rounded-xl bg-[#080d20] border border-cyan-500/30 shadow-2xl py-1 z-50">
              {weatherOptions.map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    setWeatherMode(mode);
                    setShowWeatherMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-mono flex items-center gap-2 hover:bg-cyan-950/60 transition ${
                    weather?.mode === mode ? 'text-cyan-400 font-bold bg-cyan-950/40' : 'text-slate-300'
                  }`}
                >
                  {weatherIcons[mode]}
                  <span>{mode}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Procedural Web Audio Sound Mute/Unmute */}
        <button
          onClick={toggleSound}
          className={`p-2 rounded-lg border transition ${
            soundMuted
              ? 'bg-slate-900 border-slate-700 text-slate-500'
              : 'bg-cyan-950/60 border-cyan-500/40 text-cyan-400 shadow-sm'
          }`}
          title={soundMuted ? 'Audio Synthesizer Muted' : 'Audio Synthesizer Active'}
        >
          {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Notifications Center Toggle */}
        <div className="relative">
          <button
            onClick={() => {
              soundManager.playClick();
              setShowNotifications(!showNotifications);
            }}
            className="relative p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 border border-cyan-500/20 text-slate-300 hover:text-white transition"
          >
            <Bell className="w-4 h-4 text-cyan-400" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[9px] font-bold text-black animate-pulse">
                {notifications.length}
              </span>
            )}
          </button>

          <NotificationDropdown
            isOpen={showNotifications}
            onClose={() => setShowNotifications(false)}
          />
        </div>

        {/* User Profile & Demo Role Switcher */}
        <div className="relative">
          <button
            onClick={() => {
              soundManager.playClick();
              setShowProfileMenu(!showProfileMenu);
            }}
            className="flex items-center gap-2 p-1.5 pr-2.5 rounded-lg bg-slate-900/80 border border-cyan-500/30 hover:border-cyan-400 transition"
          >
            <div className="w-7 h-7 rounded-md bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-slate-200 leading-none">
                {user?.name?.split(' ')[0] || 'Operator'}
              </div>
              <div className="text-[10px] font-mono text-cyan-400 uppercase leading-none mt-1">
                {user?.role || 'Citizen'}
              </div>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#080d20] border border-cyan-500/30 shadow-2xl p-2 z-50 font-mono text-xs">
              <div className="px-3 py-2 border-b border-cyan-500/15">
                <div className="text-white font-bold">{user?.name}</div>
                <div className="text-[10px] text-slate-400 truncate">{user?.email}</div>
                <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] uppercase font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  Role: {user?.role}
                </span>
              </div>

              {/* Instant Role Switcher for seamless demonstration */}
              <div className="py-2 border-b border-cyan-500/15">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider px-3 mb-1">
                  Quick Demo Switcher
                </div>
                <button
                  onClick={() => {
                    quickDemoLogin('admin');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-cyan-950/60 rounded text-amber-300 flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Switch to Admin</span>
                </button>
                <button
                  onClick={() => {
                    quickDemoLogin('operator');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-cyan-950/60 rounded text-cyan-300 flex items-center gap-1.5"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Switch to Operator</span>
                </button>
                <button
                  onClick={() => {
                    quickDemoLogin('citizen');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-cyan-950/60 rounded text-emerald-300 flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Switch to Citizen</span>
                </button>
              </div>

              <button
                onClick={() => {
                  logout();
                  setShowProfileMenu(false);
                }}
                className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-950/40 rounded transition mt-1"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

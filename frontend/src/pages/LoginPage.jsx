import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { soundManager } from '../utils/sound';
import { Cpu, Shield, ArrowRight, Lock, Mail, Sparkles, User } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, quickDemoLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/app');
    } catch (err) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = async (role) => {
    soundManager.playClick();
    await quickDemoLogin(role);
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-[#030612] flex items-center justify-center p-4 font-sans text-slate-100">
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

      <div className="relative w-full max-w-md p-8 rounded-3xl bg-[#070e24]/90 border border-cyan-500/30 backdrop-blur-2xl shadow-neon-cyan">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-cyan-400" />

        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 shadow-neon-cyan mb-3">
            <Cpu className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-2xl font-bold font-display tracking-widest text-white">
            FUTURECITY <span className="text-cyan-400">X</span>
          </h1>
          <p className="text-xs font-mono text-cyan-400/80 mt-1 uppercase tracking-wider">
            Secure Digital Twin Terminal Login
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-slate-400 mb-1">OPERATOR EMAIL</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="operator@futurecity.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/25 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">SECURITY KEY / PASSWORD</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/25 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-black font-bold font-mono tracking-wider shadow-neon-cyan hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition"
          >
            {loading ? 'AUTHENTICATING...' : 'ACCESS CITY COMMAND'}
          </button>
        </form>

        {/* 1-Click Instant Demo Login Switchers */}
        <div className="mt-6 pt-6 border-t border-cyan-500/15">
          <div className="text-[10px] font-mono text-center text-slate-400 uppercase tracking-widest mb-3">
            Quick 1-Click Evaluation Sign In:
          </div>

          <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
            <button
              onClick={() => handleDemo('admin')}
              className="p-2 rounded-xl bg-slate-900 hover:bg-cyan-950 border border-amber-500/30 text-amber-300 transition flex flex-col items-center gap-1"
            >
              <Shield className="w-4 h-4" />
              <span>Admin</span>
            </button>

            <button
              onClick={() => handleDemo('operator')}
              className="p-2 rounded-xl bg-slate-900 hover:bg-cyan-950 border border-cyan-500/30 text-cyan-300 transition flex flex-col items-center gap-1"
            >
              <Cpu className="w-4 h-4" />
              <span>Operator</span>
            </button>

            <button
              onClick={() => handleDemo('citizen')}
              className="p-2 rounded-xl bg-slate-900 hover:bg-cyan-950 border border-emerald-500/30 text-emerald-300 transition flex flex-col items-center gap-1"
            >
              <User className="w-4 h-4" />
              <span>Citizen</span>
            </button>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-xs font-mono text-cyan-400 hover:underline">
            ← Return to Landing Page
          </Link>
        </div>
      </div>
    </div>
  );
}

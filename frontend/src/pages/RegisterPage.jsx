import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Cpu, Lock, Mail, User, Building } from 'lucide-react';

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('citizen');
  const [sector, setSector] = useState('Central District');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register({ name, email, password, role, sector });
      navigate('/app');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030612] flex items-center justify-center p-4 font-sans text-slate-100">
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

      <div className="relative w-full max-w-md p-8 rounded-3xl bg-[#070e24]/90 border border-cyan-500/30 backdrop-blur-2xl shadow-neon-cyan">
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 shadow-neon-cyan mb-3">
            <Cpu className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-2xl font-bold font-display tracking-widest text-white">
            REGISTER CITIZEN ID
          </h1>
          <p className="text-xs font-mono text-cyan-400/80 mt-1 uppercase tracking-wider">
            FutureCity X Civic Digital Access Pass
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-slate-400 mb-1">FULL NAME</label>
            <div className="relative">
              <User className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="Dr. Jordan Mercer"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/25 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">EMAIL ADDRESS</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="jordan@futurecity.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/25 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">PASSCODE / KEY</label>
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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">CIVIC ROLE</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-cyan-500/25 text-white"
              >
                <option value="citizen">Citizen</option>
                <option value="operator">Operator</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">PRIMARY SECTOR</label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-cyan-500/25 text-white"
              >
                <option value="Central District">Central</option>
                <option value="Innovation District">Innovation</option>
                <option value="Green Valley">Green Valley</option>
                <option value="Industrial Zone">Industrial</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-black font-bold font-mono tracking-wider shadow-neon-cyan hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition"
          >
            {loading ? 'REGISTERING IDENTITY...' : 'CREATE CITIZEN ACCOUNT'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/login" className="text-xs font-mono text-cyan-400 hover:underline">
            Already have an identity key? Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}

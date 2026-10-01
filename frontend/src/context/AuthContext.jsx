import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { soundManager } from '../utils/sound';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('futurecity_token'));
  const [loading, setLoading] = useState(true);

  // Initialize demo user if nothing stored to give an immediate seamless demo experience
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('futurecity_token');
      if (storedToken) {
        try {
          const res = await api.getMe();
          if (res.success && res.user) {
            setUser(res.user);
          }
        } catch (e) {
          // Token expired or invalid
          localStorage.removeItem('futurecity_token');
          setToken(null);
        }
      } else {
        // Auto sign-in as Operator for smooth instant first impression
        try {
          const res = await api.quickDemoLogin('operator');
          if (res.success && res.user) {
            localStorage.setItem('futurecity_token', res.token);
            setToken(res.token);
            setUser(res.user);
          }
        } catch (err) {
          console.warn('Initial demo login fallback');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    soundManager.playClick();
    const res = await api.login({ email, password });
    if (res.success && res.token) {
      localStorage.setItem('futurecity_token', res.token);
      setToken(res.token);
      setUser(res.user);
      soundManager.playSuccess();
      return res.user;
    }
    throw new Error(res.message || 'Login failed');
  };

  const register = async (payload) => {
    soundManager.playClick();
    const res = await api.register(payload);
    if (res.success && res.token) {
      localStorage.setItem('futurecity_token', res.token);
      setToken(res.token);
      setUser(res.user);
      soundManager.playSuccess();
      return res.user;
    }
    throw new Error(res.message || 'Registration failed');
  };

  const logout = () => {
    soundManager.playClick();
    localStorage.removeItem('futurecity_token');
    setToken(null);
    setUser(null);
  };

  const quickDemoLogin = async (role) => {
    soundManager.playClick();
    try {
      const res = await api.quickDemoLogin(role);
      if (res.success && res.user) {
        localStorage.setItem('futurecity_token', res.token);
        setToken(res.token);
        setUser(res.user);
        soundManager.playSuccess();
        return res.user;
      }
    } catch (e) {
      console.error('Demo login failed:', e);
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    role: user?.role || 'citizen',
    isAdmin: user?.role === 'admin',
    isOperator: user?.role === 'operator' || user?.role === 'admin',
    isCitizen: user?.role === 'citizen',
    login,
    register,
    logout,
    quickDemoLogin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

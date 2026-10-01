import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { soundManager } from '../utils/sound';

const CityContext = createContext();

export const CityProvider = ({ children }) => {
  // Telemetry & Systems State
  const [telemetry, setTelemetry] = useState(null);
  const [cityHealth, setCityHealth] = useState(88);
  const [healthScores, setHealthScores] = useState({
    traffic: 78,
    energy: 92,
    water: 85,
    environment: 82,
    safety: 96,
    infrastructure: 89,
  });

  // Time & Weather
  const [timeOfDay, setTimeOfDayState] = useState(14.5); // 0 to 24
  const [simulatedTime, setSimulatedTime] = useState('14:30');
  const [weather, setWeather] = useState({ mode: 'Sunny', temperature: 24, humidity: 52, windSpeed: 14, aqi: 68 });
  const isNight = timeOfDay < 6 || timeOfDay > 19;

  // 3D Objects & Inspector
  const [cityObjects, setCityObjects] = useState([]);
  const [selectedObject, setSelectedObject] = useState(null);

  // Subsystems & Incidents
  const [incidents, setIncidents] = useState([]);
  const [aiInsights, setAiInsights] = useState([]);
  const [simulationHistory, setSimulationHistory] = useState([]);

  // UI Settings & Notifications
  const [performanceMode, setPerformanceMode] = useState(() => localStorage.getItem('futurecity_perf') === 'true');
  const [soundMuted, setSoundMuted] = useState(() => soundManager.isMuted());
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial telemetry
  const refreshCityData = useCallback(async () => {
    try {
      const [statusRes, objRes, incRes, simRes] = await Promise.all([
        api.getCityStatus(),
        api.getCityObjects(),
        api.getIncidents(),
        api.getSimulationHistory()
      ]);

      if (statusRes.success && statusRes.data) {
        setTelemetry(statusRes.data.telemetry);
        setCityHealth(statusRes.data.telemetry.cityHealth);
        setHealthScores(statusRes.data.telemetry.scores);
        setWeather(statusRes.data.weather);
        setSimulatedTime(statusRes.data.simulatedTime);
        setAiInsights(statusRes.data.aiInsights || []);
      }

      if (objRes.success && objRes.data) {
        setCityObjects(objRes.data);
      }

      if (incRes.success && incRes.data) {
        setIncidents(incRes.data);
      }

      if (simRes.success && simRes.data) {
        setSimulationHistory(simRes.data);
      }
    } catch (error) {
      console.warn('Error refreshing city data:', error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCityData();
  }, [refreshCityData]);

  // Micro-fluctuation simulation loop (breathes life into the digital twin every 4s)
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => {
        if (!prev) return prev;
        const vDelta = Math.floor(Math.random() * 21) - 10;
        const pDelta = (Math.random() * 0.4 - 0.2).toFixed(1);
        return {
          ...prev,
          traffic: {
            ...prev.traffic,
            activeVehicles: Math.max(8000, prev.traffic.activeVehicles + vDelta)
          },
          energy: {
            ...prev.energy,
            totalConsumption: Math.max(250, prev.energy.totalConsumption + Math.floor(Math.random() * 3) - 1)
          }
        };
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Time of Day Controller
  const setTimeOfDay = async (hour) => {
    const h = Number(hour);
    setTimeOfDayState(h);
    const hrs = Math.floor(h);
    const mins = Math.floor((h - hrs) * 60);
    const timeStr = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
    setSimulatedTime(timeStr);

    try {
      await api.updateTimeOfDay(h);
    } catch (e) {}
  };

  // Weather Controller
  const setWeatherMode = async (mode) => {
    soundManager.playBeep(900, 0.05);
    const temps = { Sunny: 25, Cloudy: 21, Rain: 18, Storm: 16, Fog: 14, Night: 19 };
    const newWeather = { ...weather, mode, temperature: temps[mode] || 22 };
    setWeather(newWeather);

    addNotification({
      title: 'Atmospheric State Changed',
      message: `Weather adjusted to ${mode}. Environmental sensors calibrated.`,
      type: 'info'
    });

    try {
      await api.updateWeather(mode, newWeather.temperature);
      refreshCityData();
    } catch (e) {}
  };

  // Object Inspection Modal
  const selectObject = (obj) => {
    soundManager.playClick();
    setSelectedObject(obj);
  };

  const closeInspector = () => {
    setSelectedObject(null);
  };

  // Notifications
  const addNotification = (notif) => {
    const newNotif = {
      id: 'notif-' + Date.now() + Math.random(),
      title: notif.title || 'System Notification',
      message: notif.message,
      type: notif.type || 'info', // info, warning, alert, success
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setNotifications(prev => [newNotif, ...prev.slice(0, 19)]);

    if (notif.type === 'alert' || notif.type === 'warning') {
      soundManager.playAlert();
    } else {
      soundManager.playBeep(1100, 0.04);
    }
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Subsystem Actions
  const simulateTrafficDensity = async (density) => {
    try {
      const res = await api.simulateTraffic(density);
      if (res.success && res.data) {
        setTelemetry(prev => ({ ...prev, traffic: res.data }));
        addNotification({
          title: 'Traffic Grid Recalibrated',
          message: `Density set to ${density}%. Congestion level: ${res.data.congestionLevel}`,
          type: res.data.congestionPercent > 75 ? 'warning' : 'info'
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const simulateEnergyControls = async (controls) => {
    try {
      const res = await api.simulateEnergy(controls);
      if (res.success && res.data) {
        setTelemetry(prev => ({ ...prev, energy: res.data }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const triggerWaterLeak = async () => {
    try {
      const res = await api.triggerWaterLeak();
      if (res.success && res.data) {
        setTelemetry(prev => ({ ...prev, water: res.data }));
        addNotification({
          title: 'CRITICAL: Water Leak Detected',
          message: 'Sector 4 Trunk V-17 ruptured (82 L/min). Immediate valve shutoff required.',
          type: 'alert'
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const repairWaterLeak = async () => {
    try {
      const res = await api.repairWaterLeak();
      if (res.success && res.data) {
        setTelemetry(prev => ({ ...prev, water: res.data }));
        soundManager.playSuccess();
        addNotification({
          title: 'Valve V-17 Isolated',
          message: 'Secondary pipeline bypassed. Water network pressure stabilized.',
          type: 'success'
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const optimizeWaste = async () => {
    try {
      const res = await api.optimizeWaste();
      if (res.success && res.data) {
        setTelemetry(prev => ({ ...prev, waste: res.data }));
        soundManager.playSuccess();
        addNotification({
          title: 'Waste Route Optimized',
          message: 'Autonomous compactors routed. Sector 3 capacity cleared.',
          type: 'success'
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const reportIncident = async (incidentData) => {
    soundManager.playClick();
    try {
      const res = await api.createIncident(incidentData);
      if (res.success && res.data) {
        setIncidents(prev => [res.data, ...prev]);
        addNotification({
          title: `Incident: ${res.data.title}`,
          message: `${res.data.type} in ${res.data.sector}. Status: Reported.`,
          type: 'alert'
        });
        return res.data;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const dispatchIncidentUnit = async (incidentId, unitId) => {
    soundManager.playClick();
    try {
      const res = await api.dispatchUnit(incidentId, unitId);
      if (res.success && res.data) {
        setIncidents(prev => prev.map(i => i.id === incidentId ? res.data : i));
        addNotification({
          title: 'Emergency Unit Dispatched',
          message: `${res.data.dispatchedUnit} en route to ${res.data.sector}. Corridors cleared.`,
          type: 'info'
        });
        soundManager.playBeep(980, 0.12);
        return res.data;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const resolveIncident = async (incidentId) => {
    try {
      const res = await api.updateIncident(incidentId, 'Resolved');
      if (res.success && res.data) {
        setIncidents(prev => prev.map(i => i.id === incidentId ? res.data : i));
        soundManager.playSuccess();
        addNotification({
          title: 'Incident Resolved',
          message: `Sector operations restored for Incident #${incidentId}.`,
          type: 'success'
        });
        return res.data;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const runSimulation = async (params) => {
    soundManager.playClick();
    const res = await api.runSimulation(params);
    if (res.success && res.data) {
      setSimulationHistory(prev => [res.data, ...prev]);
      soundManager.playSuccess();
      return res.data;
    }
    throw new Error(res.message || 'Simulation failed');
  };

  const applyOptimization = async () => {
    soundManager.playClick();
    const res = await api.applyOptimization();
    if (res.success && res.data) {
      setTelemetry(res.data.telemetry);
      setCityHealth(res.data.telemetry.cityHealth);
      setHealthScores(res.data.telemetry.scores);
      soundManager.playSuccess();
      addNotification({
        title: 'City-Wide Optimization Engaged',
        message: 'AI protocols elevated City Health Score to 95/100.',
        type: 'success'
      });
      return res.data;
    }
  };

  const togglePerformanceMode = () => {
    const next = !performanceMode;
    setPerformanceMode(next);
    localStorage.setItem('futurecity_perf', next ? 'true' : 'false');
  };

  const toggleSound = () => {
    const next = soundManager.toggleMute();
    setSoundMuted(next);
  };

  const value = {
    loading,
    telemetry,
    cityHealth,
    healthScores,
    timeOfDay,
    simulatedTime,
    isNight,
    weather,
    cityObjects,
    selectedObject,
    incidents,
    aiInsights,
    simulationHistory,
    notifications,
    performanceMode,
    soundMuted,
    setTimeOfDay,
    setWeatherMode,
    selectObject,
    closeInspector,
    addNotification,
    dismissNotification,
    simulateTrafficDensity,
    simulateEnergyControls,
    triggerWaterLeak,
    repairWaterLeak,
    optimizeWaste,
    reportIncident,
    dispatchIncidentUnit,
    resolveIncident,
    runSimulation,
    applyOptimization,
    togglePerformanceMode,
    toggleSound,
    refreshCityData
  };

  return <CityContext.Provider value={value}>{children}</CityContext.Provider>;
};

export const useCity = () => useContext(CityContext);

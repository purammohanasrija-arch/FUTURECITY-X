const API_BASE = import.meta.env.VITE_API_URL || '/api';

function getAuthHeaders() {
  const token = localStorage.getItem('futurecity_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...(options.headers || {})
    }
  };

  try {
    const res = await fetch(url, config);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }
    return data;
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error.message);
    throw error;
  }
}

export const api = {
  // Auth
  register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  getMe: () => request('/auth/me'),
  quickDemoLogin: (role) => request(`/auth/demo/${role}`, { method: 'POST' }),

  // City Core
  getCityStatus: () => request('/city/status'),
  getCityHealth: () => request('/city/health'),
  updateWeather: (mode, temp) => request('/city/weather', { method: 'POST', body: JSON.stringify({ mode, temperature: temp }) }),
  updateTimeOfDay: (hour) => request('/city/time', { method: 'POST', body: JSON.stringify({ hour }) }),
  getCityObjects: (params = '') => request(`/city/objects${params}`),
  getObjectById: (id) => request(`/city/objects/${id}`),
  getInfrastructure: () => request('/city/infrastructure'),
  applyOptimization: () => request('/city/optimize', { method: 'POST' }),

  // Subsystems
  getTraffic: () => request('/traffic'),
  simulateTraffic: (density) => request('/traffic/simulate', { method: 'POST', body: JSON.stringify({ density }) }),

  getEnergy: () => request('/energy'),
  simulateEnergy: (multipliers) => request('/energy/simulate', { method: 'POST', body: JSON.stringify(multipliers) }),

  getWater: () => request('/water'),
  triggerWaterLeak: () => request('/water/simulate', { method: 'POST' }),
  repairWaterLeak: () => request('/water/repair', { method: 'POST' }),

  getWaste: () => request('/waste'),
  optimizeWaste: () => request('/waste/optimize', { method: 'POST' }),
  simulateWasteSurge: () => request('/waste/simulate', { method: 'POST' }),

  getTransport: () => request('/transport'),

  // Incidents
  getIncidents: () => request('/incidents'),
  createIncident: (payload) => request('/incidents', { method: 'POST', body: JSON.stringify(payload) }),
  updateIncident: (id, status) => request(`/incidents/${id}`, { method: 'PUT', body: JSON.stringify({ status }) }),
  dispatchUnit: (id, unitId) => request(`/incidents/${id}/dispatch`, { method: 'POST', body: JSON.stringify({ unitId }) }),

  // Simulation Lab
  runSimulation: (params) => request('/simulation/run', { method: 'POST', body: JSON.stringify(params) }),
  getSimulationHistory: () => request('/simulation/history'),
  getSimulationById: (id) => request(`/simulation/${id}`),

  // AI Core
  askAIChat: (query) => request('/ai/chat', { method: 'POST', body: JSON.stringify({ query }) }),
  getAIAnalysis: () => request('/ai/analyze', { method: 'POST' }),
  getAIOptimizationPlan: () => request('/ai/optimize', { method: 'POST' }),

  // Analytics
  getTrafficAnalytics: () => request('/analytics/traffic'),
  getEnergyAnalytics: () => request('/analytics/energy'),
  getEnvironmentAnalytics: () => request('/analytics/environment'),
};

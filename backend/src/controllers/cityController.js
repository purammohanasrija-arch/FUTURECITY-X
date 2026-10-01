import { cityStore } from '../services/memoryStore.js';

export const getCityStatus = async (req, res) => {
  try {
    const summary = cityStore.getCitySummary();
    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCityHealth = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        overall: cityStore.telemetry.cityHealth,
        maxScore: 100,
        subsystems: cityStore.telemetry.scores,
        status: cityStore.telemetry.cityHealth > 85 ? 'OPTIMAL' : cityStore.telemetry.cityHealth > 70 ? 'STABLE' : 'DEGRADED',
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateWeather = async (req, res) => {
  try {
    const { mode, temperature, humidity } = req.body;
    if (mode) cityStore.weather.mode = mode;
    if (temperature !== undefined) cityStore.weather.temperature = temperature;
    if (humidity !== undefined) cityStore.weather.humidity = humidity;

    // Weather impact on city parameters
    if (mode === 'Rain' || mode === 'Storm') {
      cityStore.telemetry.traffic.averageSpeed = Math.max(20, cityStore.telemetry.traffic.averageSpeed - 8);
      cityStore.telemetry.water.reservoirLevel = Math.min(100, cityStore.telemetry.water.reservoirLevel + 2);
    }

    res.json({
      success: true,
      message: `Weather set to ${cityStore.weather.mode}`,
      data: cityStore.weather
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTimeOfDay = async (req, res) => {
  try {
    const { hour } = req.body; // 0 to 24
    if (hour !== undefined) {
      cityStore.timeOfDay = Number(hour);
      const h = Math.floor(hour);
      const m = Math.floor((hour - h) * 60);
      cityStore.simulatedTime = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    }

    res.json({
      success: true,
      data: {
        timeOfDay: cityStore.timeOfDay,
        simulatedTime: cityStore.simulatedTime,
        isNight: cityStore.timeOfDay < 6 || cityStore.timeOfDay > 19
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCityObjects = async (req, res) => {
  try {
    const { type, sector } = req.query;
    let objects = cityStore.cityObjects;

    if (type) objects = objects.filter(o => o.type === type);
    if (sector) objects = objects.filter(o => o.sector === sector);

    res.json({
      success: true,
      count: objects.length,
      data: objects
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getObjectById = async (req, res) => {
  try {
    const obj = cityStore.cityObjects.find(o => o.id === req.params.id);
    if (!obj) {
      return res.status(404).json({ success: false, message: 'City object not found.' });
    }
    res.json({ success: true, data: obj });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getInfrastructure = async (req, res) => {
  try {
    res.json({
      success: true,
      count: cityStore.infrastructure.length,
      data: cityStore.infrastructure
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const applyCityOptimization = async (req, res) => {
  try {
    const result = cityStore.applyCityOptimization();
    res.json({
      success: true,
      message: 'AI optimization protocols successfully engaged.',
      data: result
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

import { cityStore } from '../services/memoryStore.js';

export const getTrafficData = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        ...cityStore.telemetry.traffic,
        roads: cityStore.roads,
        junctions: cityStore.junctions,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRoads = async (req, res) => {
  try {
    res.json({
      success: true,
      data: cityStore.roads
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getJunctions = async (req, res) => {
  try {
    res.json({
      success: true,
      data: cityStore.junctions
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const simulateTraffic = async (req, res) => {
  try {
    const { density } = req.body;
    if (density === undefined) {
      return res.status(400).json({ success: false, message: 'Density value (0-100) is required.' });
    }

    const updated = cityStore.updateTrafficDensity(Number(density));
    res.json({
      success: true,
      message: `Simulated traffic density updated to ${density}%`,
      data: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

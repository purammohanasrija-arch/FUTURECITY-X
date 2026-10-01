import { cityStore } from '../services/memoryStore.js';
import { runWhatIfSimulation } from '../services/simulationEngine.js';

export const runSimulation = async (req, res) => {
  try {
    const params = req.body;
    const result = runWhatIfSimulation(params);

    res.json({
      success: true,
      message: 'Simulation executed successfully.',
      data: result
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSimulationHistory = async (req, res) => {
  try {
    res.json({
      success: true,
      count: cityStore.simulations.length,
      data: cityStore.simulations
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSimulationById = async (req, res) => {
  try {
    const sim = cityStore.simulations.find(s => s.id === req.params.id);
    if (!sim) {
      return res.status(404).json({ success: false, message: 'Simulation record not found.' });
    }
    res.json({
      success: true,
      data: sim
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

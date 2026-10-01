import { cityStore } from '../services/memoryStore.js';

export const getWaterData = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        ...cityStore.telemetry.water,
        networkFlow: [
          { node: 'Deep Horizon Aquifer', type: 'Reservoir', volumeML: 4200, status: 'OPTIMAL' },
          { node: 'Central Bio-Filtration Facility', type: 'Treatment', flowRate: '3,200 L/s', status: 'ACTIVE' },
          { node: 'Sector Trunk Matrix V-17', type: 'Distribution', pressureBar: cityStore.telemetry.water.leakActive ? 2.4 : 4.8, status: cityStore.telemetry.water.leakActive ? 'BREACHED' : 'NORMAL' },
          { node: 'End-Consumer Outlets', type: 'Consumers', demandMLD: 42.8, status: 'NORMAL' },
        ],
        valves: [
          { id: 'V-12', sector: 'Sector 1', status: 'OPEN', flowLpm: 1240 },
          { id: 'V-15', sector: 'Central District', status: 'OPEN', flowLpm: 2450 },
          { id: 'V-17', sector: 'Sector 4', status: cityStore.telemetry.water.leakActive ? 'WARNING_LEAK' : 'ISOLATED_SECURE', flowLpm: cityStore.telemetry.water.leakActive ? 3120 : 1800 },
          { id: 'V-22', sector: 'Industrial Zone', status: 'OPEN', flowLpm: 2900 }
        ]
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const triggerLeak = async (req, res) => {
  try {
    const updated = cityStore.triggerWaterLeak();
    res.json({
      success: true,
      message: 'Simulated pipeline breach initiated at Sector 4 Trunk V-17.',
      data: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const repairLeak = async (req, res) => {
  try {
    const updated = cityStore.repairWaterLeak();
    res.json({
      success: true,
      message: 'Valve V-17 automated isolation executed. Pipeline secured.',
      data: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

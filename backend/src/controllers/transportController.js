import { cityStore } from '../services/memoryStore.js';

export const getTransportData = async (req, res) => {
  try {
    const stations = cityStore.cityObjects.filter(o => o.type === 'metro');
    res.json({
      success: true,
      data: {
        ...cityStore.telemetry.transport,
        stations,
        routes: [
          { id: 'RT-HL-A', name: 'Hyperloop Apex Transit', status: 'ACTIVE', headwayMin: 4, speedKmh: 420, ridership: 48200 },
          { id: 'RT-BL-01', name: 'Blue Line Automated Orbital', status: 'ACTIVE', headwayMin: 6, speedKmh: 95, ridership: 34500 },
          { id: 'RT-RL-02', name: 'Red Line Industrial Feeder', status: 'ACTIVE', headwayMin: 8, speedKmh: 80, ridership: 28900 },
          { id: 'RT-BUS-X', name: 'Eco-Bus Autonomous Pod Network', status: 'ACTIVE', headwayMin: 3, speedKmh: 45, ridership: 36600 }
        ]
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getStations = async (req, res) => {
  try {
    const stations = cityStore.cityObjects.filter(o => o.type === 'metro');
    res.json({
      success: true,
      count: stations.length,
      data: stations
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

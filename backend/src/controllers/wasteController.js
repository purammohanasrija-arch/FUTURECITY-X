import { cityStore } from '../services/memoryStore.js';

export const getWasteData = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        ...cityStore.telemetry.waste,
        collectionFleet: [
          { id: 'DRN-01', type: 'Aerial Compactor Drone', battery: '88%', assignedSector: 'Sector 3', status: 'COLLECTING' },
          { id: 'DRN-02', type: 'Aerial Compactor Drone', battery: '94%', assignedSector: 'Industrial Zone', status: 'EN_ROUTE' },
          { id: 'ROV-07', type: 'Heavy Ground Hauler', battery: '76%', assignedSector: 'Central District', status: 'COMPACTING' },
          { id: 'ROV-12', type: 'Heavy Ground Hauler', battery: '91%', assignedSector: 'Sector 2', status: 'STANDBY' }
        ],
        smartBins: [
          { id: 'BIN-101', sector: 'Sector 1', fill: 32, status: 'NORMAL' },
          { id: 'BIN-204', sector: 'Sector 2', fill: 67, status: 'MODERATE' },
          { id: 'BIN-312', sector: 'Sector 3', fill: 94, status: 'CRITICAL_OVERFLOW' },
          { id: 'BIN-401', sector: 'Sector 4', fill: 41, status: 'NORMAL' },
          { id: 'BIN-510', sector: 'Industrial Zone', fill: 78, status: 'MODERATE' }
        ]
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const optimizeWaste = async (req, res) => {
  try {
    const updated = cityStore.optimizeWasteRoute();
    res.json({
      success: true,
      message: 'AI Route Optimization dispatched. Sector 3 capacity reclaimed.',
      data: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const simulateWasteIncrease = async (req, res) => {
  try {
    cityStore.telemetry.waste.sectors['Sector 3'] = 98;
    cityStore.telemetry.waste.sectors['Sector 2'] = 82;
    cityStore.telemetry.waste.cityWideFill = 79;
    cityStore.telemetry.waste.status = 'High';
    cityStore.telemetry.waste.urgentPickups.push('Sector 3 - Smart Bin Node 12 (Critical 98%)');

    res.json({
      success: true,
      message: 'Simulated waste surge applied to Sector 3 and Sector 2.',
      data: cityStore.telemetry.waste
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

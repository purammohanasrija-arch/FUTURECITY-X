import { cityStore } from '../services/memoryStore.js';

export const getEnergyData = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        ...cityStore.telemetry.energy,
        architecture: {
          generationNodes: [
            { id: 'sol-01', name: 'Solaris Photovoltaic Farm', type: 'Solar', capacity: '185 MW', output: cityStore.telemetry.energy.solarOutput, status: 'OPTIMAL' },
            { id: 'wnd-01', name: 'Offshore Aero-Turbine Array', type: 'Wind', capacity: '110 MW', output: cityStore.telemetry.energy.windOutput, status: 'OPTIMAL' },
            { id: 'fus-01', name: 'Clean Fusion Substation Alpha', type: 'Clean Core', capacity: '140 MW', output: cityStore.telemetry.energy.fossilOutput, status: 'STABLE' },
          ],
          distributionNodes: [
            { id: 'dst-01', name: 'Central Hyper-Grid Substation', efficiency: 98.4, throughput: '210 MW', status: 'SYNCHRONIZED' },
            { id: 'dst-02', name: 'Innovation Micro-Loop Substation', efficiency: 99.1, throughput: '135 MW', status: 'SYNCHRONIZED' }
          ],
          consumers: [
            { sector: 'Industrial Zone', demand: Math.round(145 * cityStore.telemetry.energy.controls.industrialDemand), priority: 'Standard' },
            { sector: 'Central District & Offices', demand: Math.round(85 * cityStore.telemetry.energy.controls.residentialDemand), priority: 'High' },
            { sector: 'Residential Sectors', demand: Math.round(68 * cityStore.telemetry.energy.controls.residentialDemand), priority: 'Critical' }
          ]
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const simulateEnergy = async (req, res) => {
  try {
    const { solarMultiplier = 1.0, windMultiplier = 1.0, industrialDemand = 1.0, residentialDemand = 1.0 } = req.body;

    const e = cityStore.telemetry.energy;
    e.controls = {
      solarMultiplier: Number(solarMultiplier),
      windMultiplier: Number(windMultiplier),
      industrialDemand: Number(industrialDemand),
      residentialDemand: Number(residentialDemand)
    };

    e.solarOutput = Math.round(142 * e.controls.solarMultiplier);
    e.windOutput = Math.round(88 * e.controls.windMultiplier);
    e.totalGeneration = e.solarOutput + e.windOutput + e.fossilOutput;

    e.totalConsumption = Math.round((145 * e.controls.industrialDemand) + (153 * e.controls.residentialDemand));
    e.renewablePercent = Math.min(100, Math.round(((e.solarOutput + e.windOutput) / e.totalGeneration) * 100));

    const margin = e.totalGeneration - e.totalConsumption;
    e.gridStability = margin >= 0 ? Math.min(100, 90 + Math.round(margin / 10)) : Math.max(30, 90 - Math.round(Math.abs(margin) / 5));
    e.status = e.gridStability > 85 ? 'Stable' : e.gridStability > 60 ? 'Warning: High Load' : 'Critical: Brownout Risk';

    res.json({
      success: true,
      message: 'Energy parameters successfully simulated.',
      data: e
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

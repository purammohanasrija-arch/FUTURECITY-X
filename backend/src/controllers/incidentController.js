import { cityStore } from '../services/memoryStore.js';

export const getIncidents = async (req, res) => {
  try {
    const { status, severity, sector } = req.query;
    let list = cityStore.incidents;

    if (status) list = list.filter(i => i.status.toLowerCase() === status.toLowerCase());
    if (severity) list = list.filter(i => i.severity.toLowerCase() === severity.toLowerCase());
    if (sector) list = list.filter(i => i.sector.toLowerCase() === sector.toLowerCase());

    res.json({
      success: true,
      count: list.length,
      activeCount: list.filter(i => i.status !== 'Resolved').length,
      data: list
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createIncident = async (req, res) => {
  try {
    const { title, type, sector, location, severity } = req.body;
    const incident = cityStore.createIncident({ title, type, sector, location, severity });

    // Lower city health score slightly on critical incidents
    if (severity === 'Critical') {
      cityStore.telemetry.cityHealth = Math.max(50, cityStore.telemetry.cityHealth - 5);
      cityStore.telemetry.scores.safety = Math.max(50, cityStore.telemetry.scores.safety - 8);
    }

    res.status(201).json({
      success: true,
      message: 'New incident reported to Central Command.',
      data: incident
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateIncident = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, severity } = req.body;

    const incident = cityStore.incidents.find(i => i.id === id);
    if (!incident) {
      return res.status(404).json({ success: false, message: 'Incident not found.' });
    }

    if (status) incident.status = status;
    if (severity) incident.severity = severity;

    if (status === 'Resolved') {
      cityStore.telemetry.cityHealth = Math.min(100, cityStore.telemetry.cityHealth + 2);
      cityStore.telemetry.scores.safety = Math.min(100, cityStore.telemetry.scores.safety + 3);
    }

    res.json({
      success: true,
      message: `Incident ${id} updated to ${status || 'new parameters'}.`,
      data: incident
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const dispatchEmergencyUnit = async (req, res) => {
  try {
    const { id } = req.params;
    const { unitId } = req.body;

    const incident = cityStore.dispatchUnit(id, unitId);
    if (!incident) {
      return res.status(404).json({ success: false, message: 'Incident not found.' });
    }

    res.json({
      success: true,
      message: `Unit ${incident.dispatchedUnit} dispatched to ${incident.sector}. Transit telemetry engaged.`,
      data: incident
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

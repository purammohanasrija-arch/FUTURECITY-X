import express from 'express';
import {
  getIncidents,
  createIncident,
  updateIncident,
  dispatchEmergencyUnit
} from '../controllers/incidentController.js';

const router = express.Router();

router.get('/', getIncidents);
router.post('/', createIncident);
router.put('/:id', updateIncident);
router.post('/:id/dispatch', dispatchEmergencyUnit);

export default router;

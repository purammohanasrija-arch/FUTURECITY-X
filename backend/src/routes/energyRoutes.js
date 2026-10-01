import express from 'express';
import { getEnergyData, simulateEnergy } from '../controllers/energyController.js';

const router = express.Router();

router.get('/', getEnergyData);
router.post('/simulate', simulateEnergy);

export default router;

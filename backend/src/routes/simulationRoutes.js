import express from 'express';
import { runSimulation, getSimulationHistory, getSimulationById } from '../controllers/simulationController.js';

const router = express.Router();

router.post('/run', runSimulation);
router.get('/history', getSimulationHistory);
router.get('/:id', getSimulationById);

export default router;

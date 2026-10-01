import express from 'express';
import { getTrafficData, getRoads, getJunctions, simulateTraffic } from '../controllers/trafficController.js';

const router = express.Router();

router.get('/', getTrafficData);
router.get('/roads', getRoads);
router.get('/junctions', getJunctions);
router.post('/simulate', simulateTraffic);

export default router;

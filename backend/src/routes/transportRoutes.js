import express from 'express';
import { getTransportData, getStations } from '../controllers/transportController.js';

const router = express.Router();

router.get('/', getTransportData);
router.get('/stations', getStations);

export default router;

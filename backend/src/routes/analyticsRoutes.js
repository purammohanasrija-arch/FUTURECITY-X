import express from 'express';
import {
  getTrafficAnalytics,
  getEnergyAnalytics,
  getEnvironmentAnalytics
} from '../controllers/analyticsController.js';

const router = express.Router();

router.get('/traffic', getTrafficAnalytics);
router.get('/energy', getEnergyAnalytics);
router.get('/environment', getEnvironmentAnalytics);

export default router;

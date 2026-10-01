import express from 'express';
import {
  getCityStatus,
  getCityHealth,
  updateWeather,
  updateTimeOfDay,
  getCityObjects,
  getObjectById,
  getInfrastructure,
  applyCityOptimization
} from '../controllers/cityController.js';

const router = express.Router();

router.get('/status', getCityStatus);
router.get('/health', getCityHealth);
router.post('/weather', updateWeather);
router.post('/time', updateTimeOfDay);
router.get('/objects', getCityObjects);
router.get('/objects/:id', getObjectById);
router.get('/infrastructure', getInfrastructure);
router.post('/optimize', applyCityOptimization);

export default router;

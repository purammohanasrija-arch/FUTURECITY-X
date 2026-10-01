import express from 'express';
import { getWaterData, triggerLeak, repairLeak } from '../controllers/waterController.js';

const router = express.Router();

router.get('/', getWaterData);
router.post('/simulate', triggerLeak);
router.post('/repair', repairLeak);

export default router;

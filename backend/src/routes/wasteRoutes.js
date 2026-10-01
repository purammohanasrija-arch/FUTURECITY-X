import express from 'express';
import { getWasteData, optimizeWaste, simulateWasteIncrease } from '../controllers/wasteController.js';

const router = express.Router();

router.get('/', getWasteData);
router.post('/optimize', optimizeWaste);
router.post('/simulate', simulateWasteIncrease);

export default router;

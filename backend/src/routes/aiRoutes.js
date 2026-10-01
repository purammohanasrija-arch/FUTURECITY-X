import express from 'express';
import { handleAIChat, handleAIAnalyze, handleAIOptimize } from '../controllers/aiController.js';

const router = express.Router();

router.post('/chat', handleAIChat);
router.post('/analyze', handleAIAnalyze);
router.post('/optimize', handleAIOptimize);

export default router;

import express from 'express';
import { register, login, getMe, quickDemoLogin } from '../controllers/authController.js';
import { verifyAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyAuth, getMe);
router.post('/demo/:role', quickDemoLogin);

export default router;

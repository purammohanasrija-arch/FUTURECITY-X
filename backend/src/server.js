import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import cityRoutes from './routes/cityRoutes.js';
import trafficRoutes from './routes/trafficRoutes.js';
import energyRoutes from './routes/energyRoutes.js';
import waterRoutes from './routes/waterRoutes.js';
import wasteRoutes from './routes/wasteRoutes.js';
import transportRoutes from './routes/transportRoutes.js';
import incidentRoutes from './routes/incidentRoutes.js';
import simulationRoutes from './routes/simulationRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Utility Middleware
app.use(helmet({
  crossOriginResourcePolicy: false, // allows 3D assets/models to load cross-origin
}));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// General Rate Limiter (500 requests per 15 mins)
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: { success: false, message: 'Too many requests from this IP, please try again later.' }
});
app.use('/api', generalLimiter);

// AI-specific Rate Limiter
const aiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 40,
  message: { success: false, message: 'AI query rate limit reached. Please wait a minute.' }
});
app.use('/api/ai', aiLimiter);

// System Health Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'FutureCity X Central Command Server',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/city', cityRoutes);
app.use('/api/traffic', trafficRoutes);
app.use('/api/energy', energyRoutes);
app.use('/api/water', waterRoutes);
app.use('/api/waste', wasteRoutes);
app.use('/api/transport', transportRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/simulation', simulationRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/analytics', analyticsRoutes);

// Catch-all 404 for unmapped API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, message: `API route ${req.originalUrl} not found.` });
});

// Global Error Handler
app.use(errorHandler);

// Initialize Database & Start Server
connectDB().finally(() => {
  app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 FUTURECITY X BACKEND SERVER RUNNING ON PORT ${PORT}`);
    console.log(`🌐 Base API URL: http://localhost:${PORT}/api`);
    console.log(`⚡ AI Core: ${process.env.GEMINI_API_KEY ? 'Gemini 1.5 Flash Connected' : 'Adaptive Telemetry Knowledge Engine'}`);
    console.log(`==================================================\n`);
  });
});

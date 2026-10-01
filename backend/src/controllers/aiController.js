import { askAIChat, getCityOptimizationPlan } from '../services/aiService.js';
import { cityStore } from '../services/memoryStore.js';

export const handleAIChat = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ success: false, message: 'Query string is required.' });
    }

    const reply = await askAIChat(query);
    res.json({
      success: true,
      query,
      reply,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const handleAIAnalyze = async (req, res) => {
  try {
    const insights = cityStore.aiInsights;
    res.json({
      success: true,
      data: {
        insights,
        systemHealth: cityStore.telemetry.cityHealth,
        status: 'AI Diagnostic Scan Complete'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const handleAIOptimize = async (req, res) => {
  try {
    const plan = await getCityOptimizationPlan();
    res.json({
      success: true,
      data: plan
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

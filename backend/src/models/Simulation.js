import mongoose from 'mongoose';

const simulationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    parameters: {
      population: { type: Number, default: 0 },
      cars: { type: Number, default: 0 },
      factories: { type: Number, default: 0 },
      rainfall: { type: Number, default: 0 },
      solar: { type: Number, default: 0 },
      publicTransport: { type: Number, default: 0 },
      waterConsumption: { type: Number, default: 0 },
      wasteGeneration: { type: Number, default: 0 },
    },
    results: {
      traffic: { type: Object },
      energy: { type: Object },
      water: { type: Object },
      waste: { type: Object },
      airQuality: { type: Object },
      overallHealth: { type: Object }
    },
    aiSummary: { type: String },
    recommendations: [{ type: String }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export const Simulation = mongoose.models.Simulation || mongoose.model('Simulation', simulationSchema);

import mongoose from 'mongoose';

const citySystemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    healthScore: { type: Number, default: 85 },
    status: { type: String, enum: ['OPTIMAL', 'STABLE', 'WARNING', 'CRITICAL'], default: 'OPTIMAL' },
    metrics: { type: mongoose.Schema.Types.Mixed },
    lastInspection: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const CitySystem = mongoose.models.CitySystem || mongoose.model('CitySystem', citySystemSchema);

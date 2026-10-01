import mongoose from 'mongoose';

const incidentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ['Traffic Accident', 'Fire', 'Flood', 'Medical Emergency', 'Power Failure', 'Security Incident'],
      required: true
    },
    sector: { type: String, required: true },
    location: { type: String, required: true },
    severity: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
    status: { type: String, enum: ['Reported', 'Dispatched', 'Responding', 'Resolved'], default: 'Reported' },
    time: { type: String },
    dispatchedUnit: { type: String },
    nearestUnits: [
      {
        type: { type: String },
        unitId: { type: String },
        distanceKm: { type: Number },
        etaMin: { type: Number }
      }
    ],
    aiAssessment: { type: String }
  },
  { timestamps: true }
);

export const Incident = mongoose.models.Incident || mongoose.model('Incident', incidentSchema);

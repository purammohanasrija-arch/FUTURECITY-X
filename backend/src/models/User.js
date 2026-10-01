import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['citizen', 'operator', 'admin'], default: 'citizen' },
    title: { type: String, default: 'Citizen' },
    sector: { type: String, default: 'Central District' },
    avatar: { type: String }
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);

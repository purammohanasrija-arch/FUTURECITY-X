import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('⚡ [FutureCity X] No MONGODB_URI provided. Running in high-performance In-Memory Hybrid Store mode.');
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`⚡ [FutureCity X] MongoDB Atlas Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ [FutureCity X] MongoDB connection error (${error.message}). Falling back to In-Memory Hybrid Store.`);
    return false;
  }
};

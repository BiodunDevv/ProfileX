import mongoose from 'mongoose';

export async function connectDB() {
    try {
        if (mongoose.connection.readyState >= 1) {
            return;
        }

        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}
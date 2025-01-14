import mongoose from 'mongoose';
import dotenv from 'dotenv';

const dbConfig = {
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/movie-ranking',
};

const connectDB = async () => {
    try {
        await mongoose.connect(dbConfig.url); // Removidas as opções useNewUrlParser e useUnifiedTopology
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export { connectDB };

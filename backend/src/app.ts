import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import movieRoutes from './routes/movieRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/movie-ranking';

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api', movieRoutes);
app.use('/api/auth', authRoutes);

// Conexão com MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4
} as mongoose.ConnectOptions)
.then(() => {
    console.log('MongoDB connected successfully');
    // Inicia o servidor
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});
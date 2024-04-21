import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import sensorDataRoutes from './infrastructure/routes/sensorDataRoutes';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://Carlos:12345@cluster0.ha8qnnw.mongodb.net/Pruebamulti';

mongoose.connect(MONGO_URI)
.then(() => {
    console.log('MongoDB connected');
})
.catch(err => {
    console.log('MongoDB connection error:', err);
    process.exit(1); 
});

const app = express();
app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true 
}));

app.use('/api', sensorDataRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

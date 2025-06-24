import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { connectDB } from './src/config/database.js';
import errorMiddleware from './middlewares/error.middleware.js';
import propertyRouter from './src/routes/property.routes.js';
import authRouter from './src/routes/auth.routes.js';

dotenv.config();

const app = express();



app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:4000',
    credentials: true,
}));


// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/property', propertyRouter);



// Middleares to handle errors
app.use(errorMiddleware);

app.listen(process.env.PORT || 5000, async () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
    await connectDB()
})
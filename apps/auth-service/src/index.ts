import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import { PORT } from './config';
import { logger, requestContext, errorHandler } from '@legal/logger';

dotenv.config();

const app = express();

app.use(requestContext('auth-service'));

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200 // מסייע לדפדפנים ישנים
}));
app.use(express.json());

app.use('/auth', authRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Auth service running on port ${PORT}`);
});

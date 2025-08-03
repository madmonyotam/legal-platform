import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import { PORT } from './config';
import { logger, requestContext, errorHandler } from '@legal/logger';
import { corsMiddleware } from '@legal/shared-utils';

dotenv.config();

const app = express();

app.use(requestContext('auth-service'));
app.use(corsMiddleware);
app.use(express.json());

app.use('/auth', authRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Auth service running on port ${PORT}`);
});

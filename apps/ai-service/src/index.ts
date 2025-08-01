import express from 'express';
import cors from 'cors';
import aiRoutes from './routes/ai.routes';  
import { enforceInternalAccess } from '@legal/shared-utils';
import { PORT } from './config';
import { logger, requestContext, errorHandler } from '@legal/logger';

const app = express();

app.use(requestContext('ai-service'));

app.use(cors());
app.use(express.json());

app.use('/ai', enforceInternalAccess, aiRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`AI service running on port ${PORT}`);
});
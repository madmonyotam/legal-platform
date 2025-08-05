import express from 'express';
import cors from 'cors';
import clientsRoutes from './routes/clients.routes';
import { enforceInternalAccess, setupHealthRoutes } from '@legal/shared-utils';
import { PORT } from './config';
import { logger, requestContext, errorHandler } from '@legal/logger';

const app = express();

app.use(requestContext('clients-service'));
setupHealthRoutes(app);

app.use(cors());
app.use(express.json());

app.use('/clients', enforceInternalAccess, clientsRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Clients service running on port ${PORT}`);
});
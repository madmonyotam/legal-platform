import express from 'express';
import cors from 'cors';
import caseRoutes from './routes/case.routes';
import { enforceInternalAccess, setupHealthRoutes } from '@legal/shared-utils';
import { logger, requestContext, errorHandler } from '@legal/logger';
import { PORT } from './config';

const app = express();

app.use(requestContext('case-service'));
setupHealthRoutes(app);

app.use(cors());
app.use(express.json());

app.use('/cases', enforceInternalAccess, caseRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Case service listening on port ${PORT}`);
});
